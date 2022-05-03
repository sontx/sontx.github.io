---
title: Quản lý và giám sát các thiết bị trong gia đình từ xa(IoT) - Phần 2
layout: post
description: Nối tiếp [phần 1](/2016/01/07/quan-ly-va-giam-sat-cac-thiet-bi-tu-xa-iot-phan-1),
  ở phần 2 này chúng ta sẽ xây dựng web service, nơi nhận và xử lý các yêu cầu cũng
  như lưu trữ dữ liệu từ các thiết bị gửi tới.
tags:
- iot
- java
- tomcat
comments: true
category: programming
---

<span/>

Yêu cầu
-----

1. Biết chút ít về JSP/Servlet và mô hình MVC, bạn có thể đọc bài viết của mình tại [đây](/2015/07/25/su-dung-mvc-de-xay-dung-web-dong/)
1. Lập trình socket với java, đọc tại đây
1. Ngôn ngữ truy vấn SQL(biết 1 chắc biết cái này)

Tạo và cấu hình các projects
------------

Chúng ta sẽ xây dựng 3 chức năng chính cho web service là:
1. Lưu trữ dữ liệu vào database.
1. Xử lý yêu cầu và gửi phản hồi cho app.
1. Giao tiếp với các thiết bị.

Nào! chiến thôi! 
Đầu tiên mở eclipse lên và tạo 1 dynamic project tên là MyWS(my web service), ở đây mình dùng tomcat8.

![](https://docs.google.com/uc?authuser=0&id=0ByMQfqYoGjfUUHhCOG1TUzBjNXc&export=download)

Tạo thêm 1 java project tên là Shared(chia sẽ các java bean và 1 số class dùng chung giữa app và webservice để đở tốn công viết đi viết lại)
Tiếp theo ta cấu hình java build path của MyWS như sau: vào tab projects và chọn add.. sau đó tick vào shared project rồi chọn OK.

![](https://docs.google.com/uc?authuser=0&id=0ByMQfqYoGjfULWoxV3Z4bGh5TEk&export=download)

> Sau bước này thì MyWS sẽ tự động link đến shared project.

Vào Web Deployment Assembly rồi chọn Add… –> Project –> Shared sau đó Finish. Làm bước này để khi deploy MyWS sẽ tự động tạo ra thư viện shared.jar và add vào folder chứa thư viện của MyWS, như thế sẽ tránh được lỗi không tìm thấy class lúc runtime(mặt dù lúc biên dịch hoặc export ra war file vẩn ko báo lỗi).

![](https://docs.google.com/uc?authuser=0&id=0ByMQfqYoGjfUbFdWN3gyeE1NckE&export=download)

Bước tiếp theo là add thư viện của bên thứ 3 để làm việc với SQLite database, ở đây mình dùng sqlite4java(các bạn có thể tải tại đây). Giải nén ra và kéo file sqlite4java.jar vào folder lib theo đường dẩn WebContent/Web-INF/lib, tiếp theo chọn file native library tương ứng với hệ điều hành đang chạy theo bản sau và kéo thả nó chung với file lib folder sqlite4java.jar:

Tên file | Hệ điều hành
----- | --------
libsqlite4java-linux-amd64.so | Linux 64bit
libsqlite4java-linux-i386.so | Linux 32bit
sqlite4java-win32-x64.dll | Windows 64bit
sqlite4java-win32-x86.dll | Windows 32bit
libsqlite4java-linux-arm.so | Linux ARM(PI2)

Nếu chạy trên pi2 thì các bạn sử dụng *libsqlite4java-linux-arm.so*

![](https://docs.google.com/uc?authuser=0&id=0ByMQfqYoGjfUQjFMV0JkYVdWLXc&export=download)

> Thực ra sqlite4java.jar chỉ là 1 wrap library để dể dàng giao làm việc với SQLite database, nó sẽ gọi các hàm chính trong native library.

Xây dựng csdl
------

Tiếp theo ta định nghĩa các bảng dữ liệu của web service:

tb_energy: ta dùng bảng này để lưu lịch sử điện năng tiêu thụ của các thiết bị, thực ra chúng ta có thể tạo cho mỗi thiết bị 1 bảng energy riêng để việc truy vấn nhanh hơn(vì chủ yếu truy vấn theo từng thiết bị).

device_id | energy | utc
----- | ------ | -----
INT4 | INT4 | INT4

tb_device: bảng này lưu thông tin của các thiết bị bao gồm id và tên của nó.

device_id | name
---- | ------
INT4 | nvarchar(50)

tb_account: lưu thông tin người dùng, mỗi người dùng đều cần username và password để login vào hệ thống trước khi có thể quản lý và giám sát thiết bị của mình. Ở đây ta dùng bassword hash để tăng chút gì đó gọi là bảo mật, dù gì thì mật khẩu cũng không nên để plain text được.

id | username | password_hash
---- | ------ | -----
INTEGER | nvarchar(25) | nvarchar(1000)

Xây dựng Model java bean
-------

Trong Shared project ta tạo các java bean như sau:
Energy class lưu trữ thông tin điện năng tiêu thụ của thiết bị bao gồm id, gía trị điện năng và thời gian ghi nhận:

```java
public class Energy implements Serializable {
    private static final long serialVersionUID = 1L;
    private int deviceId;// device id
    private int energy;// energy value
    private int utc;// time 
    ....
}
```

Account class lưu trữ thông tin người dùng gồm id, tên đăng nhập và mật khẩu(đã được băm):

```java
public class Account implements Serializable {
    private static final long serialVersionUID = 1L;
    private int id;
    private String userName;
    private String passwordHash;
    ....
}
```

Device class dùng để lưu trữ thông tin của 1 thiết bị bao gồm id và tên:

```java
public class Device implements Serializable {
    private static final long serialVersionUID = 1L;
    private int id;
    private String name;
    ....
}
```

RealTime class dùng để lưu tạm các gía trị real-time như hiệu điện thế, cường độ, trạng thái của thiết bị blabla…Những thông tin này sẽ không được lưu vào csdl:

```java
public class RealTime implements Serializable {
    private static final long serialVersionUID = 1L;
    private int power;
    private short voltage;
    private int amperage;
    private byte state;
    ....
}
```

Các bạn chú ý là mỗi class java bean trên đều thực thi từ giao diện Serializable, mục đích là cho phép java convert thực thể của java bean này thành mảng byte để có thể truyền đi qua mạng.
Cái trường serialVersionUID thực ra không cần cũng được cơ mà xóa thì nó warning nhìn nhứt mắt lắm . Mục đích của trường này là để xác định phiên bản của class java bean này mỗi lần nó serial hoặc deserial… Ví dụ thế này nhé: class RealTime hiện tại có 4 trường lần lượt như trên, ta mã hóa thành mảng byte rồi lưu đâu đó, tiếp theo ta thêm 1 trường xyz nào đó vào class RealTime này rồi convert dữ liệu đã lưu lại thành thực thể của class RealTime(hiện tại có tới 5 trường thay vì 4 như lúc nảy) thì chuyện gì sẽ xảy ra với trường thứ 5 là xyz nó sẽ có gía trị bao nhiêu?

Xây dựng Model DAO
---------

Ta định nghĩa giao diện giao tiếp csdl ISQLDb cho DAO như sau:

```java
// open database
void open();
// close database
void close();
// add an energy to database
void addEnergy(Energy energy);
// get energies of a device
List<Energy> getEnergies(int deviceId);
// get energies of a device in period
List<Energy> getEnergies(int deviceId, int beginUTC, int endUTC);
// add new device to database
void addDevice(Device newDevice);
// get device info by id
Device getDevice(int deviceId);
// get all devices in database
List<Device> getAllDevices();
// update device info
void updateDevice(Device device);
// add new account to database
void addAccount(Account account);
// remove an exist account by id
void removeAccount(int id);
// get an exist account by user name
Account getAccount(String username);
// update an exist account 
void updateAccount(Account account);
// get all accounts
List<Account> getAllAccounts();
```

> Giao diện này quan trọng trong trường hợp bạn muốn chuyển từ SQLite sang hệ quản trị csdl khác như MySQL nó sẽ giúp mọi thứ trở nên đơn giản và ít chỉnh sửa code hơn.

Bước tiếp theo là thực thi giao diện ISQLDb, ở phần này không có gì cao siêu, chỉ là mấy câu lệnh SQL đơn giản thôi dưới đây là các đoạn thực thi chính:

```java
@Override
public void addEnergy(Energy energy) {
    String sql = "INSERT INTO %s(device_id, energy, utc) VALUES(%d, %d, %d)";
    sql = String.format(sql, TableInfo.ENERGY_TABLE_NAME, 
            energy.getDeviceId(), energy.getEnergy(), energy.getUtc());
    mQueue.execute(new SQLiteHelper.NonQueryJob(sql)).complete();
}

@Override
public List<Energy> getEnergies(int deviceId) {
    String sql = "SELECT * FROM %s WHERE device_id = %d";
    sql = String.format(sql, TableInfo.ENERGY_TABLE_NAME, deviceId);
    return mQueue.execute(new SQLiteHelper.EnergyQueryJob(sql)).complete();
}
......
```

Đọc thì hơi hoang mang vì có 1 số thứ nhìn là lạ:

1. TableInfo: là lớp lưu trữ thông tin của các bảng trong csdl bao gồm tên bảng và cấu trúc bảng. 
1. mQueue.execute(…).complete(): Vì thư viện SQLite chúng ta đang dùng hổ trợ đa luồng nên để tránh xung đột thì mọi truy vấn đều phải đưa vào 1 hàng đợi riêng SQLiteQueue, phương thức complete() sẽ thực thi truy vấn của chúng ta và trả về kết qủa(kết qủa là gì thì phụ thuộc vào lớp kế thừa từ SQLiteJob class) 
1. SQLiteHelper.NonQueryJob, SQLiteHelper.DeviceQueryJob và SQLiteHelper.EnergyQueryJob, SQLiteHelper.AccountQueryJob: đây là 4 lớp mình xây dựng được kế thừa từ SQLiteJob, nó sẽ định nghĩa cụ thể cách thức truy vấn và xử lý dữ liệu trả về…Thực ra thì không cần tụi này cũng được thôi, viết hết vô lớp SQLiteDb luôn cũng chạy tốt cơ nhìn nhứt mắt lắm.
1. SQLHelper.prepareString(…): phương thức này xử lý chuổi string cần lưu để đảm bảo sẽ lưu được các chuổi string đặt biệt vd như chuổi Son”s, dấu ” là cả vấn đề! Tạo thêm 1 lớp TemporaryObject trong DAO, nhiệm vụ của nó đơn giản là lưu các real time value vào list trong bộ nhớ.

```java
public final class TemporaryObject {
    private List<RealTime> data;

    public void clear() {
        data.clear();
    }

    public RealTime get(int deviceId) {
        for (int i = 0; i < data.size(); i++) {
            if (data.get(i).getDeviceId() == deviceId) {
                return data.get(i);
            }
        }
        return null;
    }

    public void add(RealTime rt) {
        data.add(rt);
    }

    public boolean exists(int deviceId) {
        for (int i = 0; i < data.size(); i++) {
            if (data.get(i).getDeviceId() == deviceId) {
                return true;
            }
        }
        return false;
    }

    public void update(RealTime rt) {
        for (int i = 0; i < data.size(); i++) {
            if (data.get(i).getDeviceId() == rt.getDeviceId()) {
                data.set(i, rt);
            }
        }
    }

    public TemporaryObject() {
        data = new ArrayList<>();
    }

}
```

Xây dựng các lớp quản lý cấu hình
-----------

DAO của Model đã hoàn tất, trước khi xử phần BO ta xây dựng 1 số lớp quản lý cấu hình. Đầu tiên ta tạo thêm 3 lớp Convert(shared), Config(web) và [ConfigLoader](https://github.com/sontx/iot-client-server/blob/master/MyWS/src/com/blogspot/sontx/iot/myws/utils/ConfigLoader.java)(web) trong package utils:

1. Convert: sẽ chứa các phương thức chuyển đổi dữ liệu. 
1. Config: chứa các dữ liệu cấu hình của web service. 
1. ConfigLoader: hổ trợ cho Config class, nhiệm vụ chính là để nạp cấu hình từ file.

> File cấu hình ở đây có cấu trúc gồm từng dòng, mỗi dòng tương ứng với 1 loại cấu hình. Trong mỗi dòng gồm 2 phần là key và value, ví dụ như sau: 
address=192.168.1.111 
port=2512 
dbname=mydata.db

Trong Config class ta định nghĩa các trường cấu hình như sau:

```java
// thư mục làm việc chính của ta, nơi lưu dữ liệu, file cầu hình blabla. các bạn có thể thay đổi gía trị của nó sang 1 địa chỉ bất kỳ để dể debug
public static final String WORKING_DIR;
// tên file cấu hình
public static final String CONFIG_FILE_NAME;
// đường đẩn tới file csdl
public static final String DB_PATH;
// địa chỉ nơi mà server sẽ lắng nghe các kết nối từ device
public static final String SERVER_ADDRESS;
// port server dùng để lắng nghe kết nối từ device
public static final int SERVER_PORT;
// timeout khi truyền nhận dữ liệu
public static final int DATA_IN_TIMEOUT;
// thời gian trì hoản giữa các lần lấy gía trị real time từ device
public static final int RELAY_GET_REALTIME;
// thời gian trì hoản giuwax các lần lấy gía trị energy từ device
public static final int RELAY_GET_ENERGY;
// tên đăng nhập của superuser
public static final String SU_USERNAME;
// mật khẩu plaintext của superuser
public static final String SU_PASSWORD;
```

> Chú ý rằng server sẽ làm việc với các thiết bị 1 cách chủ động, nghĩa là nó sẽ gửi yêu cầu đến thiết bị và sau đó thiết bị gửi dữ liệu phản hồi. Ví dụ server muốn lấy gía trị real-time thì nó sẽ gửi gói tin yêu cầu lấy real-time cho device sau đó thiết bị sẽ gửi lại gía trị real-time cho server.

Xây dựng BO của Model
----------

Bây giờ ta code tiếp phần BO, tạo class SQLMgr trong package bo, lớp này sẽ xử lý vấn đề logic trước khi đẩy dữ liệu xuống hoặc lấy dữ liệu tên từ DAO. Một số phương thức chính như sau:

```java
public void addEnergy(Energy energy) {
    if (energy != null && energy.getDeviceId() > 0 && energy.getEnergy() > 0 && energy.getUtc() > 0)
        mSQLDb.addEnergy(energy);
}

public List<Energy> getEnergies(int deviceId) {
    return deviceId > 0 ? mSQLDb.getEnergies(deviceId) : null;
}

private List<Energy> getEnergies(int deviceId, DateTime begin, DateTime end) {
    int beginUTC = begin.toInteger();
    int endUTC = end.toInteger();
    return mSQLDb.getEnergies(deviceId, beginUTC, endUTC);
}

public float[] getEnergies(int deviceId, int year) {
    DateTime begin = new DateTime(1, 1, year, 0, 0, 0);
    DateTime end = new DateTime(31, 12, year, 23, 59, 59);
    List<Energy> energies = getEnergies(deviceId, begin, end);
    return energies != null ? Convert.getEnergyGroupByMonths(energies, year) : null;
}
...........
```

Ở đây có 4 thứ cần chú ý: 

1. DateTime class, lớp này mình viết sẳn để dùng cho tiện, tại hiện tại chỉ cần quan tâm đến chức năng convert từ DateTime tới gía trị int và ngược lại được định nghĩa sẳn trong class. 
1. Account.checkUserName, phương thức static checkUserName trong class Account dùng để kiểm tra xem user name có hợp lệ không. 
1. mSQLDb là thuộc tính kiểu giao diện ISQLDb, ở đây nó là mSQLDb = new SQLiteDb(Config.DB_PATH); 
1. Convert.getEnergyGroupBy…: Phương thức này sẽ nhóm các dữ liệu điện năng thành các gía trị float theo thời gian. Ở đây có nhóm theo 24h, theo ngaỳ và theo tháng.

Tiếp theo ta thêm 1 lớp nữa là TemporaryManager trong BO, nhiệm vụ cửa lớp này là xử lý logic trước khi gọi TemporaryObject. Các phương thức chính như sau:

```java
// phương thức này sẽ reset các gía trị tạm của 1 thiết bị, dùng trường hợp thiết bị ngắt kết nối với server
public void off(int deviceId) {
    if (deviceId > 0) {
        RealTime realTime = temporaryObject.get(deviceId);
        if (realTime != null) {
            realTime.setAmperage(0);
            realTime.setPower(0);
            realTime.setVoltage((short) 0);
            realTime.setState((byte) 0);// 0 - OFF, else ON 
        }
    }
}
// lấy thông tin real time của 1 thiết bị
public RealTime get(int deviceId) {
    return deviceId > 0 ? temporaryObject.get(deviceId) : null;
}
// lưu thông tin real time của 1 thiết bị(thêm mới nếu chưa có trong list hoặc cập nhật nếu đã có)
public void set(RealTime realTime) {
    if (realTime != null) {
        if (temporaryObject.exists(realTime.getDeviceId()))
            temporaryObject.update(realTime);
        else
            temporaryObject.add(realTime);
    }
}
```

Các lớp trợ giúp truyền nhận dữ liệu
------------

Cần chuẩn bị một số thứ trước khi xây dựng controller, trong shared làm 1 số công việc sau:
Tạo TransmissionObject class: nhiệm vụ của nó là chứa dữ liệu phản hồi mà client yêu cầu và tình trạng của yêu cầu(như yêu cầu thành công, yêu cầu thất bại do lỗi login…).

```java
/ lỗi login
public static final int CODE_AUTH_ERR = 1;
// yêu cầu thành công
public static final int CODE_DATA_OK = 2;
// ko tìm thấy dữ liệu đã yêu cầu 
public static final int CODE_DATA_NULL = 3;
private int code;// chứa tình trạng của yêu cầu
private Object data;// dữ liệu chính mà client yêu cầu
```

Ở đây ta có 1 số quy ước, mỗi lần client gửi yêu cầu đến server đều phải kèm theo thông tin login, nghĩa là mỗi yêu cầu đều phải được xác thực trước khi thực hiện. Thực ra điều này là không cần thiết nếu bạn truy cập từ trình duyệt vì nó hổ trợ session nghĩa là chỉ cần login lần đầu. Lý do ta phải xác thực mỗi lần gửi yêu cầu đến server là vì lớp HttpURLConnection của app android không hổ trợ session nghĩa là nó đơn giản là gửi yêu cầu đến web service rồi nhận lại phản hồi, do đó ta không thể biết được yêu cầu đó đã login chưa. Dĩ nhiên là có cách để lưu lại lịch sử đăng nhập để tránh tình trạng phải login lại mỗi lần gửi yêu cầu nhưng ở bài viết này mình chỉ làm theo cách này cho nhanh.

Thêm 2 phương thức cho Convert class giúp chuyển đổi 1 object thành mảng bytes và ngược lại nhờ đó ta có thể truyền các objects từ server tới client:

```java
// chuyển đổi 1 object thành mảng bytes, object phải thực thi giao diện Serializable
public static byte[] objectToBytes(Object obj) {
    ByteArrayOutputStream baos = null;
    ObjectOutputStream oos = null;
    try {
        baos = new ByteArrayOutputStream();
        oos = new ObjectOutputStream(baos);
        oos.writeObject(obj);
        byte[] ret = baos.toByteArray();
        return ret;
    } catch (IOException e) {
        e.printStackTrace();
    } finally {
        try {
            if (baos != null)
                baos.close();
            if (oos != null)
                oos.close();
        } catch (IOException e) {
        }
    }
    return null;
}
// chuyển đổi mảng bytes được tạo ra từ phương thức objectToBytes(...) thành object
public static Object bytesToObject(byte[] bytes) {
    ByteArrayInputStream bais = null;
    ObjectInputStream ois = null;
    try {
        bais = new ByteArrayInputStream(bytes);
        ois = new ObjectInputStream(bais);
        Object obj = ois.readObject();
        return obj;
    } catch (Exception e) {
        e.printStackTrace();
    } finally {
        try {
            if (bais != null)
                bais.close();
            if (ois != null)
                ois.close();
        } catch (IOException e) {
        }
    }
    return null;
}
```

Thực ra đây chỉ là 1 cách convert dữ liệu để truyền đi qua mạng, bạn có thể dùng JSON, xml hoặc thậm chỉ là parse từ trang jsp(nếu làm cách này nghĩa là bạn sẽ hổ trợ trực tiếp truy cập thông qua trình duyệt và bên app chỉ cần lấy nội dung trang web sau đó parse để lấy dữ liệu). Vì cách convert ra bytes và sau đó từ bytes convert ngược lại đơn giản chỉ cần thông qua 2 phương thức trên nên mình dùng cách này cho tiện.

Tạo IDataConvert interface, định nghĩa giao diện convert dữ liệu để gửi từ server tới client và convert dữ liệu đã nhận từ server ở client.

```java
public interface IDataConvert {
    // convert objects để gửi cho client
    byte[] encode(Object in);
    // lấy objects đã từ server ở client
    Object decode(byte[] in);
}
```

Giao diện này cũng tương tự như ISQLDb, nó giúp việc chuyển đổi từ các cách thức convert dữ liệu 1 cách dể dàng. Ngoài cách convert kiểu bytes ra ta còn convert kiểu text như xml chẳng hạn nhưng mình định nghĩa giao diện bên trên sử dụng kiểu bytes vì đơn giản text chỉ là mảng bytes.

Tạo SerialConvert class thực thi giao diện IDataConvert bên trên, mình định nghĩa 1 sample convert dữ liệu sử dụng cách thức serial của java. Bạn có thể tạo 1 XmlConvert, JSONConvert hoặc blablaConvert thực thi từ IDataConvert để convert dữ liệu theo cách riêng của bạn. Nỗi dung của class này:

```java
public final class SerialConvert implements IDataConvert {
    private static SerialConvert instance = null;

    public static SerialConvert getInstance() {
        if (instance == null)
            instance = new SerialConvert();
        return instance;
    }

    private SerialConvert() {
    }

    @Override
    public byte[] encode(Object in) {
        return in != null ? Convert.objectToBytes(in) : null;
    }

    @Override
    public Object decode(byte[] in) {
        return in != null ? Convert.bytesToObject(in) : null;
    }

}
```

> Thực ra ở đây cũng không cần dùng single-ton, cơ mà viết xong class này rồi mới chộ ra nên để vậy luôn tại lười xóa qúa

Finally, tạo CrossFlatform class, dùng để convert dữ liệu để gửi đi qua mạng. Nếu bạn muốn sử dụng xml hoặc json hoặc blabla để convert dữ liệu thì chỉ cần làm 2 việc là tạo ra 1 class thực thi từ IDataConvert và thay thế gía trị của trường dataConvert bên dưới thành instance của class bạn vừa tạo, nói thì dài dòng nhưng làm thì cũng nhanh thôi.

```java
private static IDataConvert dataConvert = SerialConvert.getInstance();

public static byte[] toBytes(TransmissionObject obj) {
    return dataConvert.encode(obj);
}

public static TransmissionObject fromBytes(byte[] bytes) {
    Object obj = dataConvert.decode(bytes);
    if (obj == null || !(obj instanceof TransmissionObject))
        return null;
    return (TransmissionObject) obj;
}
```

> Phương thức toBytes dùng ở server còn fromBytes dùng ở client.

Lớp quản lý kết nối và điều khiển thiết bị
-----------

Đầu tiên ta xây dựng giao thức truyền nhận dữ liệu giữa thiết bị và server. Cấu trúc gói tin của ta như sau:

> Package: start[1] length[1] data[n] checksum[1] stop[1] 
start: 1 byte, đánh dấu bắt đầu gói tin 
length: 1 byte, chiều dài dữ liệu(data) 
data: n bytes, dữ liệu chính cần truyền đi 
checksum: 1 byte, kiểm tra sai lệch dữ liệu, ở đây ta dùng mã vòng crc 
stop: 1 byte, đánh dấu kết thúc gói tin

![](https://docs.google.com/uc?authuser=0&id=0ByMQfqYoGjfUQllYaGhONnYtZlk&export=download)

Đầu tiên server sẽ mở port để lắng nghe kết nối, sau khi các thiết bị kết nối thành công thì server sẽ gửi các yêu cầu tới cho thiết bị, các thiết bị nhận được yêu cầu sẽ phản hồi lại. Các yêu cầu có thể lặp đi lặp lại sau 1 khoản thời gian nhất định(ví dụ như lấy thông tin điện năng chẳng hạn), có các yêu cầu chỉ gửi 1 lần như lấy thông tin id của thiết bị hoặc điều khiển bật tắt thiết bị.

![](https://docs.google.com/uc?authuser=0&id=0ByMQfqYoGjfUdG5KbjBKempDSVk&export=download)

Cụ thể sau khi kết nối thành công:
1. Phía server sẽ yêu cầu lấy id của thiết bị.`a
1. Sau khi lấy được id của thiết bị, server tiến hành kiểm tra xem id đó đã có trong csdl chưa, nếu chưa thì nó sẽ thêm mới vào csdl.
1. Phía server sẽ bắt đầu vòng lặp gửi yêu cầu lấy thông tin điện năng và thông tin real-time sau 1 khoản thời gian xác định, các yêu cầu này đều nằm trong 1 hàng đợi. Thông tin điện năng sẽ được lưu trữ vào csdl, thông tin real-time sẽ được lưu vào bộ nhớ tạm. Vòng lặp kết thúc chỉ khi thiết bị ngắt kết nối tới server.
1. Khi vòng lặp chính ở bước 3 chưa kết thúc, ta có thể yêu cầu điều khiển thiết bị từ app bằng cách gửi yêu cầu đến server, lúc này server sẽ đưa yêu cầu của ta vào 1 hàng đợi công việc để thực thi.

![](https://docs.google.com/uc?authuser=0&id=0ByMQfqYoGjfUS2VXMkJaQ2NEVE0&export=download)

Mỗi một thiết bị kết nối đến server thì 1 thực thể client được tạo ra để làm việc với thiết bị đó, các client này chạy độc lập trong các thread khác nhau. Việc giao tiếp giữa client và device sẽ thông qua 1 giao thức dựa vào lớp Protocol.

![](https://docs.google.com/uc?authuser=0&id=0ByMQfqYoGjfUeWw5dnNhdXY1c2M&export=download)

Việc thiết kế đã xong, bây giờ code cụ thể từng phần. Các lớp bên dưới đều được tạo trong shared project, thực ra các lớp này nên nằm ở MyWS project hơn nhưng tại 1 số lớp bên dưới cần dùng cho việc xây dựng VirtualClient project(sẽ xuất hiện ở phần 3) nên mình nhét vô shared project luôn.

Đầu tiên ta tạo lớp Protocol làm nhiệm vụ quy định giao thức liên lạc giữa thiết bị. Hai phương thức chính như sau:

```java
// đọc phần data của gói tin, phương thức sẽ chờ cho đến khi có dữ liệu trong 1 khoản timeout nhất định.
public byte[] readData() {
.....................
}

// nhiệm vụ của nó là gửi phần dữ liệu chính đến thiết bị bằng cách tạo ra 1 gói tin rồi nhét data vô sau đó send đi 
public boolean writeData(byte[] data) {
.....................
}
```

Tạo lớp BaseJob có chức năng mô tả 1 công việc của client, các công việc này sẽ được lưu vào 1 hàng đợi và thực thi lần lược. Toàn bộ lớp được định nghĩa như sau:

```java
public abstract class BaseJob {
    // chu kỳ lặp lại của 1 công việc, nó chỉ cần thiết với các công việc cần thực hiện lặp đi lặp lại như lấy điện năng chẳng hạn
    private final int initWaitTime;
    private int currentWaitTime = 0;
    // giao thức quy định cách giao tiếp với thiết bị
    protected final Protocol protocol;
    // thực chất là id của thiết bị
    protected final int clientId;
    // quy định cách xử lý khi nhận được dữ liệu phản hồi từ thiết bị
    protected final IJobExecutor executor;

    // reset lại công việc
    public void reset() {
        currentWaitTime = initWaitTime;
    }

    // kiểm tra xem công việc có thể thực hiện được chưa đồng thời giảm thời gian chờ
    public boolean checkAndReduce(int milis) {
        boolean canExecute = currentWaitTime <= 0;
        currentWaitTime -= milis;
        return canExecute;
    }

    // thực hiện công việc, tùy vào từng loại công việc mà định nghĩa khác nhau. trả về true nếu thực hiện thành công và false nếu thất bại.
    public abstract boolean execute();

    // kiểm tra xem công việc này có thể sử dụng lại được không
    public abstract boolean canReused();

    public BaseJob(IJobExecutor executor, int clientId, int waitTime, Protocol protocol) {
        this.executor = executor;
        this.clientId = clientId;
        initWaitTime = waitTime;
        currentWaitTime = waitTime;
        this.protocol = protocol;
    }
}
```

Giao diện IJobExecutor được định nghĩa như sau:

```java
// khi client nhận được id của thiết bị gửi đến
void onHasId(int deviceId);
// khi client nhận được thông tin điện năng
void onHasEnergy(Energy energy);
// khi client nhận được thông tin real-time
void onHasRealTime(RealTime realtime);
// khi thiết bị ngắt kết nối
void onDisconnected(int deviceId);
```

Tiếp theo ta định nghĩa các công việc cụ thể từ BaseJob class, các bạn có thể xem cụ thể trong project(link ở cuối bài viết), ở đây mình chỉ show 2 trong số các class đó. 

```java
// định nghĩa công việc lấy id của thiết bị, ManagerJob định nghĩa các công việc không thể reused, thực ra thì cho IdJob kế thừa trực tiếp từ BaseJob cũng được.
public class IdJob extends ManagerJob {

    public IdJob(IJobExecutor executor, Protocol protocol) {
        super(executor, protocol);
    }

    @Override
    public boolean execute() {
        // gửi yêu cầu cho thiết bị
        if (protocol.request(Protocol.TYPE_ID)) {
            // yêu cầu gửi thành công, giờ nó sẽ nhận lại dữ liệu phản hồi từ thiết bị
            byte[] data = protocol.readData();
            // chuyển đổi bytes đã nhận ra id của thiết bị
            int id = Protocol.parseInt(data, Protocol.TYPE_ID);
            if (id < 0)
                return false;
            // thực thi tác vụ đã định nghĩa trong IJobExecutor khi đã nhận được id
            executor.onHasId(id);
            return true;
        } else {
            return false;
        }
    }
}

// định nghĩa công việc lấy thông tin điện năng của thiết bị. lớp MonitorJob mô tả công việc có thể reused, thực ra thì bạn hoàn toàn có thể kế thừa trực tiếp từ BaseJob.
public class EnergyJob extends MonitorJob {

    public EnergyJob(IJobExecutor executor, int clientId, int waitTime, Protocol protocol) {
        super(executor, clientId, waitTime, protocol);
    }

    @Override
    public boolean execute() {
        // gửi yêu cầu lấy thông tin điện năng
        if (protocol.request(Protocol.TYPE_ENERGY)) {
            // lấy dữ liệu phản hồi từ thiết bị
            byte[] data = protocol.readData();
            // chuyển bytes dữ liệu thành gía trị điện năng
            int energyValue = Protocol.parseInt(data, Protocol.TYPE_ENERGY);
            if (energyValue < 0)
                return false;
            // tạo thực thể Energy với các thông tin như id thiết bị, gía trị điện năng và thời gian nhận
            Energy energy = new Energy();
            energy.setDeviceId(clientId);
            energy.setEnergy(energyValue);
            energy.setUtc(DateTime.now().toInteger());
            // thực thi tác vụ đã định nghĩa trong IJobExecutor khi nhận được thông tin điện năng
            executor.onHasEnergy(energy);
            return true;
        } else {
            return false;
        }
    }
}
```

Bây giờ ta xây dựng tiếp lớp Client có nhiệm vụ giao tiếp với thiết bị. Các phương thức chính như sau:

```java
// khơi tạo hàng đợi với 2 công việc mặt định là lấy thông tin điện năng và real-time
private void initJobQueue() {
.................
}

// bắt đầu hàng đợi công việc
private void startJobQueue() {
.................
}

// entry của thread
@Override
public void run() {
.................
}
```

Lớp cuối cùng của phần này là DeviceManager nhiệm vụ của nó là lắng nghe các kết nối, tạo và quản lý các clients. Lớp này khá dể hiểu nếu các bạn đã lập trình kết nối TCP sử dụng socket trong java, dưới đây mình chỉ show lại các trường, full code các bạn xem trong link project:

```java
public final class DeviceManager implements Runnable, OnClientStoppedListener {
    private static DeviceManager instance = null;
    // việc lắng nghe kết nối sẽ được thực thi ở 1 thread khác
    private final Thread worker = new Thread(this);
    // ServerSocket để lắng nghe kết nối
    private ServerSocket server;
    // danh sách các clients
    private final List<Client> clients = new ArrayList<Client>();
    private final Object lock = new Object();
    // quy định các tác vụ cần thực hiện khi nhận được dữ liệu từ thiết bị
    private final IJobExecutor executor;
    // chu kỳ lấy thông tin điện năng là 1s
    private int timewaitEnergy = 1000;
    // chu kỳ lấy thông tin real-time là 1s
    private int timewaitRealtime = 1000;
    // timeout cho việc nhận dữ liệu là 10s
    private int timeout = 10000;
    ......
}
```

Xây dựng Controller
------------

Chuẩn bị đã xong(hi vọng là thế), bây giờ trở lại web service project. Mô hình chúng ta sẽ như thế này:

![](https://docs.google.com/uc?authuser=0&id=0ByMQfqYoGjfUZHoyUmVWd2hpUVU&export=download)

Tạo LifecycleListener class kế thừa từ ServletContextListener class, chức năng của nó là khởi tạo các tài nguyên cần thiết cho web service hoạt động đồng thời tự động khởi chạy DeviceManager để lắng nghe và quản lý các kết nối từ các thiết bị. Nội dung như sau:

```java
@WebListener
public class LifecycleListener implements ServletContextListener {
    // tự động thực thi webservice stop
    public void contextDestroyed(ServletContextEvent arg0) {
        SQLMgr.destroyInstance();
        TemporaryManager.destroyInstance();
        DeviceManager.getInstance().stop();
    }

    // khởi tạo và bắt đầu DeviceManager
    private void initializeDeviceManager() {
        // khởi tạo DeviceManager từ các thông tin cấu hình
        DeviceManager.createInstance(Config.SERVER_ADDRESS, Config.SERVER_PORT, new JobExecutor());
        DeviceManager deviceManager = DeviceManager.getInstance();
        deviceManager.setTimeout(Config.DATA_IN_TIMEOUT);
        deviceManager.setTimewaitEnergy(Config.RELAY_GET_ENERGY);
        deviceManager.setTimewaitRealtime(Config.RELAY_GET_REALTIME);
        // bắt đầu lắng nghe các kết nối từ thiết bị
        deviceManager.start();
    }
    // khởi tạo TemporaryManager, nạp các thiết bị trong csdl vô bộ nhớ
    private void initializeTemporaryManager() {
        List<Device> devices = SQLMgr.getInstance().getAllDevices();
        TemporaryManager.createInstance(devices);
    }

    // tự động thực thi khi webservice start
    public void contextInitialized(ServletContextEvent arg0) {
        SQLMgr.getInstance();// để ép SQLMgr khởi tạo và kết nối csdl
        initializeTemporaryManager();
        initializeDeviceManager();
    }
}
```

Ở đây có JobExecutor class, nó là lớp thực thi từ IJobExecutor để định nghĩa cách thức xử lý khi nhận được dữ liệu từ thiết bị. Nội dung như sau:

```java
public class JobExecutor implements IJobExecutor {
    // khi nhận được id nghĩa là 1 thiết bị vừa kết nối với server, lúc này ta kiểm tra xem thiết bị đó đã có trong csdl chưa, nếu chưa có thì lưu vô csdl.
    @Override
    public void onHasId(int deviceId) {
        Device device = SQLMgr.getInstance().getDevice(deviceId);
        if (device == null && deviceId > 0) {
            device = new Device();
            device.setId(deviceId);
            device.setName("Unknown");
            SQLMgr.getInstance().addDevice(device);
        }
    }
    // lưu thông tin điện năng vào csdl
    @Override
    public void onHasEnergy(Energy energy) {
        SQLMgr.getInstance().addEnergy(energy);
    }
    // lưu real-time vào bộ nhớ
    @Override
    public void onHasRealTime(RealTime realtime) {
        TemporaryManager.getInstance().set(realtime);
    }
    // reset thông tin real-time của thiết bị trong bộ nhớ
    @Override
    public void onDisconnected(int deviceId) {
        TemporaryManager.getInstance().off(deviceId);
    }
}
```

Bây giờ ta xây dựng các servlets với các chức năng như sau:

Tên | Các chức năng
---- | ---------
AccountServlet | Kiểm tra login, thay đổi mật khẩu
DeviceServlet | Lấy thông tin 1 hoặc tất cả thiết bị, đổi tên hoặc bật tắt thiết bị
EnergyServlet | Lấy thông tin điện năng của 1 thiết bị trong ngày, tháng, năm hoặc toàn bộ
RealTimeServlet | Lấy thông tin real-time của 1 thiết bị

Đầu tiên tạo BaseServlet class kế thừa từ HttpServlet. Nhiệm vụ của nó là xác thực đăng nhập trước khi yêu cầu được xử lý. Các servlet khác được tạo ra sẽ kế thừa từ nó và mỗi khi 1 yêu cầu được gửi đến servlet thì phương thức kiểm tra đăng nhập trong BaseServlet sẽ được gọi trước tiên. Dài dòng rồi, đọc code sẽ hiểu:

```java
// các servlet kế thừa từ BaseServlet sẽ phải thực thi phương thức này, khi phương thức này được gọi nghĩa là việc login đã thành công và giờ chỉ việc xử lý yêu cầu người dùng nữa thôi
protected abstract void doWork(HttpServletRequest request, HttpServletResponse response)
        throws ServletException, IOException;
// lấy id của thiết bị, sẽ dùng ở 1 số subclass
protected int getDeviceId(HttpServletRequest request) {
        return Convert.parseInt(request.getParameter("id"), -1);
    }
// gửi phản hồi lại cho client
protected void doResp(Object data, HttpServletResponse resp) throws IOException {
        TransmissionObject obj = new TransmissionObject();
        obj.setCode(data != null ? TransmissionObject.CODE_DATA_OK : TransmissionObject.CODE_DATA_NULL);
        obj.setData(data);
        resp.getOutputStream().write(CrossFlatform.toBytes(obj));
    }
// tự động gửi phản hồi login fail 
private void responseAuthenticationError(HttpServletResponse response) throws IOException {
    TransmissionObject obj = new TransmissionObject();
    obj.setCode(TransmissionObject.CODE_AUTH_ERR);
    response.getOutputStream().write(CrossFlatform.toBytes(obj));
}
// xử lý yêu cầu login và gọi doWork, chú ý rằng phương thức doGet và doPost đều được đánh dấu là final để đảm bảo rằng các servlet con kế thừa từ BaseServlet sẽ chỉ thực thi yêu cầu(doWork(...)) khi login thành công!
@Override
protected final void doGet(HttpServletRequest request, HttpServletResponse response)
        throws ServletException, IOException {
    String username = request.getParameter("username");
    String passwordHash = request.getParameter("passhash");
    if (username == null || passwordHash == null) {
        responseAuthenticationError(response);
    } else if (!SQLMgr.getInstance().checkLogin(username, passwordHash)) {
        responseAuthenticationError(response);
    } else {
        doWork(request, response);
    }
}
```

Trong controller package tạo DeviceServlet class kế thừa từ BaseServlet, nhiệm vụ của nó là lấy thông tin, cập nhật và điều khiển thết bị. Nội dung chính như sau:

```java
// lấy thông tin 1 thiết bị bởi id của nó
private Object responseDevice(HttpServletRequest request) {
................
}
// lấy toàn bộ thiết bị có trong csdl
private Object responseAllDevices() {
................
}
// đổi tên thiết bị
private Object responseUpdate(HttpServletRequest request) {
................
}
// bật tắt thiết bị, nếu thiết bị chưa kết nối đến server thì kết quả là sai
private Object responseTurn(HttpServletRequest request) {
................
}

@Override
protected void doWork(HttpServletRequest request, HttpServletResponse response)
        throws ServletException, IOException {
    String req = request.getParameter("req");
    if (req == null)
        return;
    Object data = null;
    switch (req) {
    case "single":
        data = responseDevice(request);
        break;
    case "all":
        data = responseAllDevices();
        break;
    case "rename":
        data = responseUpdate(request);
        break;
    case "turn":
        data = responseTurn(request);
        break;
    }
    doResp(data, response);
}
```

Tạo tiếp 1 servlet tên là EnergyServlet kế thừa từ BaseServlet, nhiệm vụ của nó đơn giản là nhận, xử lý và phản hồi các yêu cầu lấy thông tin điện năng của 1 thiết bị. Nội dung chính như sau:

```java
// điện năng của ngày
private Object responseDay(HttpServletRequest request) {
................
}
// điện năng của tháng
private Object responseMonth(HttpServletRequest request) {
................
}
// điện năng của năm
private Object responseYear(HttpServletRequest request) {
................
}
// toàn bộ điện năng
private Object responseAll(HttpServletRequest request) {
................
}

@Override
protected void doWork(HttpServletRequest request, HttpServletResponse response)
        throws ServletException, IOException {
    String req = request.getParameter("req");
    if (req == null)
        return;
    Object data = null;
    switch (req) {
    // lấy điện năng tiêu thụ trong 1 ngày
    // req=day&id=102120250&day=25&month=12&year=2015
    case "day":
        data = responseDay(request);
        break;
    // lấy điện năng tiêu thụ trong 1 tháng
    // req=month&id=102120250&month=12&year=2015
    case "month":
        data = responseMonth(request);
        break;
    // lấy điện năng tiêu thụ trong 1 năm
    // req=year&id=102120250&year=2015
    case "year":
        data = responseYear(request);
        break;
    // lấy toàn bộ điện năng của thiết bị
    // req=year&id=102120250
    case "all":
        data = responseAll(request);
        break;
    }
    doResp(data, response);
}

Tạo tiếp RealTimeServlet servlet kế thừa từ BaseServlet, nhiệm vụ của nó là nhận, xử lý và gửi phản hồi các yêu cầu lấy thông tin real-time của 1 thiết bị. Nội dung của nó ngay bên dưới, khá đơn giản:

```java
@Override
protected void doWork(HttpServletRequest request, HttpServletResponse response)
        throws ServletException, IOException {
    int deviceId = getDeviceId(request);
    doResp(TemporaryManager.getInstance().get(deviceId), response);
}
```

Thêm 1 servlet là AccountServlet nữa(hơi nhiều servlet rồi nha!) kế thừa từ BaseServlet, nhiệm vụ hiện tại của nó chỉ đơn giản là cập nhật mật khẩu người dùng và kiểm tra đăng nhập người dùng.

```java
// kiểm tra login
private Object responseCheckLogin(HttpServletRequest request) {
................
}
// thay đổi mật khẩu người dùng
private Object responseChangePasswordHash(HttpServletRequest request) {
................
}

@Override
protected void doWork(HttpServletRequest request, HttpServletResponse response)
        throws ServletException, IOException {
    String req = request.getParameter("req");
    if (req == null)
        return;
    Object data = null;
    switch (req) {
    case "check":
        data = responseCheckLogin(request);
        break;
    case "changepass":
        data = responseChangePasswordHash(request);
        break;
    }
    doResp(data, response);
}
```

Về cơ bản là gần xong controller rồi, hơi nhàm chán phải không, bây giờ làm chút gì đó khác biệt nào.

Quản lý người dùng
------------

Phần này khá hay ho, ý tưởng thế này: mỗi người dùng bình thường sẽ có 1 tài khoản và mật khẩu để được sử dụng tài nguyên của web service và như thế là sẽ có nhiều người dùng trong hệ thống và thông tin mỗi người dùng sẽ được lưu trong csdl. Để quản lý những người dùng đó(như xóa hoặc thêm người dùng mới) ta định nghĩa một super-user(nếu các bạn đọc các đoạn code bên trên thì sẽ thấy 1 số chổ hơi kỳ lạ đó là trường SU_USERNAME, SU_PASSWORD trong Config và su-username và su-password trong ConfigLoader, chúng sẽ phục vụ cho việc định nghĩa super-user).

> Hệ thống chỉ có duy nhất 1 superuser, thông tin đăng nhập của superuser không được lưu trong csdl mà được lưu trong file cấu hình của chúng ta(mặt định tên đăng nhập là admin và password cũng là admin). Superuser sẽ quản lý những người dùng khác thông qua giao diện web.

Bắt tay vào làm thôi nào, tạo 1 servlet tên là SuperuserServlet và không kế thừa từ BaseServlet như các servlet khác. Nhiệm vụ của nó chỉ đơn giản là chuyển hướng đến jsp page, nội dung chính như sau:

```java
// superuser kiểm tra xem người dùng có đang login trong session hiện tại không
public static boolean logined(HttpServletRequest request) {
    String s_logined = (String) request.getSession().getAttribute("logined");
    boolean logined = Convert.parseInt(s_logined, 0) != 0;
    return logined;
}
// superuser kiểm tra tình trạng login, nếu chưa login thì nó sẽ kiểm tra thông tin đăng nhập và lưu tình trạng login vào session
private void checkLogin(HttpServletRequest request) {
................
}
// xóa 1 người dùng
private void deleteAccount(HttpServletRequest request) {
................
}
// tạo 1 người dùng mới
private void createAccount(HttpServletRequest request) {
................
}
// superuser đăng xuất khỏi hệ thống
private void logout(HttpServletRequest request) {
................
}

protected void doGet(HttpServletRequest request, HttpServletResponse response)
        throws ServletException, IOException {
    if (!logined(request)) {
        checkLogin(request);
    } else {
        String req = request.getParameter("req");
        if (req != null) {
            switch (req) {
            case "delete":
                deleteAccount(request);
                break;
            case "new":
                createAccount(request);
                break;
            case "logout":
                logout(request);
                break;
            }
        }
    }
    RequestDispatcher dispatcher = request.getRequestDispatcher("SuperuserPage.jsp");
    dispatcher.forward(request, response);
}

protected void doPost(HttpServletRequest request, HttpServletResponse response)
        throws ServletException, IOException {
    doGet(request, response);
}
```

Xây dựng trang jsp SuperuserPage.jsp 
Trang quản lý như sau:

![](https://docs.google.com/uc?authuser=0&id=0ByMQfqYoGjfUVE1VUGxsRGRqTUU&export=download)

Nhìn thẩm mỹ qúa phải không, để có thể hiển thị đẹp được như thế ta làm như sau tạo trang SuperuserPage.jsp trong WebContent. Ta chia trang chính làm 2 phần là header và content, phần header sẽ cố định cho các trang và phần content sẽ được load tùy vào mục đích hiển thị, nội dung chính như bên dưới:

```jsp
<%
    boolean logined = SuperuserServlet.logined(request);
%>
</head>
<frameset rows="80px, *" frameborder="no">
    <frame src="Header.jsp" scrolling="no"/>
    <%
        if (!logined) {
    %>
    <frame src="Login.jsp"/>
    <%
        } else {
    %>
    <frame src="Manager.jsp" name="content" />
    <%
        }
    %>
</frameset>
```

> Nếu người dùng chưa [login](https://github.com/sontx/iot-client-server/blob/master/MyWS/WebContent/Login.jsp) thì nó sẽ tự động chuyển sang trang login ngược lại nó sẽ chuyển sang trang quản lý người dùng.

Nếu các bạn đã tìm hiểu qua về JSP thì có thể dể dàng đọc hiểu code bên trên. Trang này chỉ đơn giản là lấy toàn bộ người dùng từ csdl và hiển thị ra 1 table, mỗi dòng gồm tên đăng nhập và 1 link để xóa người dùng tương ứng. Trang [NewAccount](https://github.com/sontx/iot-client-server/blob/master/MyWS/WebContent/NewAccount.jsp) được hiển thị khi người dùng nhấn vào link tạo mới người dùng.

> Trang này yêu cầu người dùng(superuser) nhập tên người dùng và mật khẩu để tạo ra người dùng(normal) mới trong csdl. Trước khi yêu cầu được gửi tới server để thực hiện thì thông tin phải được kiểm tra bằng javascript trước(kiểm tra tên đăng nhập có hợp lệ không, kiểm tra độ dài mật khẩu…)

Để tự động chuyển hướng đến trang đăng nhập của superuser khi người dùng chỉ nhập đường dẩn đến webservice(vd như localhost:8080/MyWS) thì ta cần chỉnh sửa lại nội dùng của web.xml như sau:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<web-app xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns="http://xmlns.jcp.org/xml/ns/javaee" xsi:schemaLocation="http://xmlns.jcp.org/xml/ns/javaee http://xmlns.jcp.org/xml/ns/javaee/web-app_3_1.xsd" id="WebApp_ID" version="3.1">
  <display-name>MyWS</display-name>
  <welcome-file-list>
    <welcome-file>SuperuserServlet</welcome-file>
  </welcome-file-list>
</web-app>
```

Về cơ bản thì phần quản lý của superuser đã hoàn tất, còn 1 số trang như login và header thì các bạn có thể tham khảo thêm ở trong project.

Chốt
----

Qua phân 2 này chúng ta đã hoàn tất được phần chủ chốt là web service, phần 3 tiếp theo sẽ là xây dựng ứng dụng android để làm việc với web service này. Các bạn có thể đọc lại phần 1 tại [đây](/2016/12/28/quan-ly-va-giam-sat-cac-thiet-bi-tu-xa-iot-phan-1). 
Mọi source code của project này được cập nhật tại github: [https://github.com/sontx/iot-client-server](https://github.com/sontx/iot-client-server).

References
------

1. https://code.google.com/p/sqlite4java 
1. https://docs.oracle.com/javaee/6/api/javax/servlet/ServletContextListener.html 
1. http://www.tutorialspoint.com/java/java_serialization.htm 
1. http://stackoverflow.com/questions/25284556/translate-crc8-from-c-to-java
