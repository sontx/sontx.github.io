---
title: Quản lý và giám sát các thiết bị trong gia đình từ xa(IoT) - Phần 3
layout: post
description: Trong phần 3 này chúng ta sẽ xây dựng app giám sát và điều khiển thiết
  bị trên android, các bạn có thể đọc lại [phần 2](/2016/01/08/quan-ly-va-giam-sat-cac-thiet-bi-tu-xa-iot-phan-2)
  tại đây về xây dựng web service.
tags:
- iot
- java
comments: true
category: programming
---

<span/>

Yêu cầu
-----

1. Biết chút ít về lập trình ứng dụng trên android
1. Đã đọc qua phần 2

Xây dựng project
--------

Các bạn mở Android Studio và tạo mới 1 project tên là MyApp với minsdk là 16 bước tiếp theo chọn EmptyActivity. 
Sau khi tạo project bạn chọn như trong hình:

![](https://docs.google.com/uc?authuser=0&id=0ByMQfqYoGjfUNGk3cGlZNi1GaHM&export=download)

Tiếp theo kéo thả 2 files là [mpandroidchartlibrary-2-1-6.jar](https://drive.google.com/file/d/0ByMQfqYoGjfUNnRMNW1aSm5XLTA/view?usp=sharing) và **shared.jar** vào folder **libs* như hình. Chú ý, file shared.jar là từ shared project(ở phần 2) export ra, để export ra thư viện các bạn làm như sau: click chuột phải vào shared project và chọn export, cửa sổ hiện ra chọn tiếp jar file rồi sau đó next và chọn nơi lưu file jar sau đó next cho đến hết.

Sau khi thêm 2 file jar vào project các bạn chọn 2 file thư viện đó rồi click chuột phải chọn add as library… và OK. Như thế 2 thư viện trên đã được link vào project android của chúng ta. 
Bước chuẩn bị project đã hoàn tất, bây giờ đến phần chính!

Xây dựng phần kết nối
----------

Phần này là phần trọng tâm của chúng ta, nhiệm vụ của nó sẽ là kết nối đến server sau đó gửi yêu cầu và nhận lại phản hồi từ server. Mỗi lần gửi yêu cầu đến server thì sẽ tự động kèm theo thông tin đăng nhập của người dùng.

![](https://docs.google.com/uc?authuser=0&id=0ByMQfqYoGjfUei1WaG5nMXVuT2M&export=download)

Tạo mới 1 class tên là ConnectionServer trong package lib với nội dung như sau, phần giải thích nằm ngay trong code.

```java
public final class ConnectionServer {
    private static ConnectionServer instance;
    // kích thước bộ đệm đọc dữ liệu
    private static final int BUFFER_SIZE = 2048;
    // địa chỉ ip của server
    private String mIPv4;
    // port của server
    private int mPort;
    // tên web service, ở đây sẽ là MyWS
    private final String mServerName;
    // tài khoản để gửi cho server xác thực mỗi lần gửi yêu cầu
    private Account mAccount;

....................

    // kiểm tra xem tài khoản người dùng có chính xác không
    @Nullable
    public Account checkLogin(Account account) {
....................
    }
	
    // gửi dữ yêu cầu cho server có tự động kèm theo thông tin đăng nhập và sau đó trả về dữ liệu phản hồi.
    private TransmissionObject sendWithAuthentication(String servletName, String params) {
....................
    }

    // lấy toàn bộ thiết bị từ csdl trên server
    @Nullable
    @SuppressWarnings("unchecked")
    public List<Device> getDevices() {
....................
    }
	
    // lấy thông tin real-time của 1 thiết bị bởi id của nó
    @Nullable
    @SuppressWarnings("unchecked")
    public RealTime getRealtime(int deviceId) {
....................
    }

    // lấy thông tin điện năng của 1 thiết bị trong 1 ngày
    @Nullable
    @SuppressWarnings("unchecked")
    public float[] getEnergies(int deviceId, int day, int month, int year) {
....................
    }
	
    // lấy thông tin điện năng của 1 thiết bị trong 1 tháng
    @Nullable
    @SuppressWarnings("unchecked")
    public float[] getEnergies(int deviceId, int month, int year) {
....................
    }

    // lấy thông tin điện năng của 1 thiết bị trong 1 năm
    @Nullable
    @SuppressWarnings("unchecked")
    public float[] getEnergies(int deviceId, int year) {
....................
    }
	
    // đổi tên thiết bị
    public boolean renameDevice(int deviceId, String newName) {
....................
    }

    // bật/tắt thiết bị
    public boolean turnDevice(int deviceId, boolean off) {
....................
    }
	
    // thay đổi mật khẩu đăng nhập của người dùng hiện tại
    public boolean changePassword(String newPasswordHash) {
....................
    }
}
```

> Lớp HttpURLConnection giúp ta gửi chuổi request đến 1 web service bất kỳ và lấy về dữ liệu phản hồi của nó. 
@SuppressWarnings(“unchecked”), xóa nó đi cũng không sao đâu chỉ tại nó warning nhìn nhứt mắt quá nên phải thêm nó vào thôi.

Xây dựng trang home
------------

Chức năng chính của trang home là hiển thị các thông tin cơ bản như server, account…và cho phép xem, điều khiển các thiết bị. Trang home sẽ xây dựng dựa trên trang main đã tạo ra mặt định lúc tạo project. Giao diện khi thiết kế sẽ như sau:

![](https://docs.google.com/uc?authuser=0&id=0ByMQfqYoGjfUVW1WQUM3ZUNfTTg&export=download)

Các chức năng lần lược như sau:

1. Phần username hiển thị tên người dùng hiện tại với 2 chức năng là thay đổi tài khoản và thay đổi mật khẩu. 
1. Server IP và Port hiển thị địa chỉ IP và port của server mà ứng dụng sẻ kết nối đến, người dùng có thể thay đổi các thông tin này bằng cách chọn vào nút hình cờ lê bên phải. 
1. Devices cho phép mở ra cửa sổ mới để hiển thị các thiết bị hiện có trong csdl của server và từ đó người dùng có thể xem lịch sử sử dụng điện năng cũng như giám sát các thiết bị của mình. 
1. Phần cuối cùng là superuser, cho phép người dùng superuser có thể quản lý các tài khoản hiện có trong csdl của server bằng giao diện web.
Về phần thiết kế giao diện home khá đơn giản vì thế mình sẽ ko show ra ở đây, các bạn có thể xem thêm trong project(link cuối bài viết).
Trước khi đi vào phần xử lý chúng ta xây dựng lớp InputBox để hiển thị hộp thoại nhập thông tin. Đầu tiên tạo mới 1 layout tên là dialog_inputbox, thiết kế giao diện như sau:

![](https://docs.google.com/uc?authuser=0&id=0ByMQfqYoGjfUZXBVRm5zcW1leTg&export=download)

Giao diện [InputBox](https://github.com/sontx/iot-client-server/blob/master/android/app/src/main/java/com/blogspot/sontx/myapp/ui/InputBox.java) gồm 5 phần chính là tiêu đề(mặt định là tên ứng dụng), thông điệp hiển thị, vùng nhập text và 2 nút bấm xác nhận.

InputBox sẽ cho phép ta hiển thị hộp thoại nhập liệu và khi người dùng nhập xong và nhấn nút OK thì sự kiện OnInputCompletedListener sẽ được raise, nếu người dùng nhấn Cancel thì sự kiện này sẽ không được raise. Ta dựa vào đối số content của sự kiện để xác định nội dung mà người dùng đã nhập vào là gì.
Tạo lớp Config chứa các key lưu trữ dữ liệu cục bộ của ứng dụng như lưu tên đăng nhập, mật khẩu, thông tin server…

```java
public final class Config {
    // tên của sharedPreferenced
    public static final String SHARED_PREF_NAME = "shared_pref";
    // key lưu  username khi người dùng login
    public static final String SHARED_PREF_ACC_USERNAME = "account_username";
    // key lưu password hash
    public static final String SHARED_PREF_ACC_PASSWORDHASH = "account_passwordhash";
    // key lưu user id, id này chỉ có khi người dùng đăng nhập thành công vào hệ thống
    public static final String SHARED_PREF_ACC_ID = "account_id";
    // key lưu địa chỉ của server
    public static final String SHARED_PREF_SRV_IP = "server_ip";
    // key lưu port của server
    public static final String SHARED_PREF_SRV_PORT = "server_port";

    private Config() {
    }
}
```

Quay lại lớp MainActivity, ở đây chúng ta sẽ xử lý phần logic của trang home. Các phương thức chính của lớp này như sau:

```java
// hiển thị danh sách các thiết bị hiện có, trang DevicesActivity sẽ được đề cập ở phần dưới
private void displayDevices() {
.................
}
// thay đổi tài khoản đăng nhập, nó sẽ xóa thông tin đăng nhập cũ khỏi csdl cục bộ sau đó gọi phương thức checkLogin để hiển thị cửa sổ đăng nhập
private void changeUserName() {
.................
}
// đi đến trang quản lý người dùng của superuser bởi việc mở trang web với link đến servelet superuser
private void gotoSuperUser() {
.................
}
// hiển thị hộp thoại thay đổi địa chỉ ip
private void changeIP() {
.................
}
// tương tự với phương thức trên, phương thức này hiển thị hộp thoại nhập port của server
private void changePort() {
.................
}
```

Đây chỉ mới là 1 phần của trang home, còn 1 số phương thức xử lý khác các bạn có thể xem thêm trong project. Như ở trên xuất hiện 2 trang nữa đó là trang login và trang xem danh sách thiết bị, ta sẽ lần lược xây dựng chúng ngay bên dưới.

Xây dựng trang login
---------

Nhiệm vụ của trang này là cho phép người dùng đăng nhập vào server, cụ thể như sau:

![](https://docs.google.com/uc?authuser=0&id=0ByMQfqYoGjfUcjNzTlZ4UzJMR2s&export=download)

Khi người dùng đăng nhập thành công thì thông tin đăng nhập tự động lưu vào csdl cục bộ và chuyển đến trang home.
Các bạn tạo mới 1 activity và đặt tên là LoginActivity. Phần giao diện ta thiết kế gồm 1 ô nhập username, 1 ô nhập password, 1 nút đăng nhập và 1 progressbar(sẽ hiển thị trong lúc check login):

![](https://docs.google.com/uc?authuser=0&id=0ByMQfqYoGjfURDk5X0JmUGtCRzQ&export=download)

Phần code xml các bạn có thể xem thêm trong project, ở đây có lớp đặt biệt là android.support.design.widget.TextInputLayout, nhiệm vụ của nó là thu nhỏ hint của TextView lại trong lúc nhập.
Phần xử lý logic trong lớp LoginActivity gồm 2 phần chính như sau:

```java
// phương thức này sẽ kiểm tra thông tin nhập vào có hợp lệ không trước khi gửi tới server để kiểm tra
private void attemptLogin() {
    if (mAuthTask != null) {
        return;
    }

    // Reset errors.
    mUsernameView.setError(null);
    mPasswordView.setError(null);

    // Store values at the time of the login attempt.
    String username = mUsernameView.getText().toString();
    String password = mPasswordView.getText().toString();

    boolean cancel = false;
    View focusView = null;

    // Check for a valid password, if the user entered one.
    if (!TextUtils.isEmpty(password) && !isPasswordValid(password)) {
        mPasswordView.setError(getString(R.string.error_invalid_password));
        focusView = mPasswordView;
        cancel = true;
    }

    // Check for a valid username.
    if (TextUtils.isEmpty(username)) {
        mUsernameView.setError(getString(R.string.error_field_required));
        focusView = mUsernameView;
        cancel = true;
    } else if (!isUsernameValid(username)) {
        mUsernameView.setError(getString(R.string.error_invalid_email));
        focusView = mUsernameView;
        cancel = true;
    }

    if (cancel) {
        // There was an error; don't attempt login and focus the first
        // form field with an error.
        focusView.requestFocus();
    } else {
        // Show a progress spinner, and kick off a background task to
        // perform the user login attempt.
        showProgress(true);
        mAuthTask = new UserLoginTask(username, password);
        mAuthTask.execute((Void) null);
    }
}
// lớp này sẽ gửi dữ liệu đã nhập để kiểm tra xem có hợp lệ không
public class UserLoginTask extends AsyncTask<Void, Void, Account> {
    private final String mUsername;
    private final String mPassword;

    UserLoginTask(String username, String password) {
....................
    }
	
    // kiểm tra xem thông tin đăng nhập có hợp lệ không(ở trong 1 thread khác thread chính)
    @Override
    protected Account doInBackground(Void... params) {
....................
    }
	
    // khi kiểm tra xong thì kiểm tra xem kết quả trả về như thế nào. nếu đăng nhập thành công thì đóng login lại. dữ liệu sẽ được lưu vào csdl cục bộ và hiển thị thông báo đăng nhập thành công/thất bại
    @Override
    protected void onPostExecute(final Account account) {
....................
    }

    @Override
    protected void onCancelled() {
....................
    }
}
```

> Chú ý rằng việc kiểm tra tài khoản người dùng sẽ được thực thi trong background thread để tránh block giao diện và quan trọng hơn là tránh báo lỗi vì mọi thao tác truyền dữ liệu qua network đều phải được thực thi ở background thread trong android.
Cũng vì 2 lý do trên mà mọi thao tác liên quan đến gửi yêu cầu và nhận phản hồi từ server đều phải được thực thi ở background thread.

Như thế là trang login đã xong, tiếp theo sẽ là trang làm việc chính của ta, trang xem danh sách thiết bị.

Xây dựng trang xem danh sách thiết bị
----------------

Đầu tiên ta xây dựng cửa sổ loading để hiển thị lúc gửi và nhận yêu cầu từ phía server. Tạo layout mới tên là [dialog_processingbox](https://github.com/sontx/iot-client-server/blob/master/android/app/src/main/res/layout/dialog_processingbox.xml), thiết kế giao diện khá đơn giản chỉ gồm 1 LinearLayout chứa ProgressBar. Ở ProgressBar đặt thuộc tính indeterminate là true để nó quay mãi.

Phần xử lý như sau:

```java
public class ProcessingBox {
    private Dialog mDialog;
    public ProcessingBox(Context context) {
        mDialog = new Dialog(context);
        // không hiển thị tiêu đều của dialog
        mDialog.requestWindowFeature(Window.FEATURE_NO_TITLE);
        mDialog.setContentView(R.layout.dialog_processingbox);
        // không cho phép người dùng đóng dialog này
        mDialog.setCancelable(false);
    }
    public void show() {
        mDialog.show();
    }
    public void hide() {
        mDialog.hide();
    }
    public void dismiss() {
        mDialog.dismiss();
    }
}
```

Chỉ đơn giảnlà tạo dialog mới với giao diện là 1 processingbar thôi.
Tạo mới 1 activity tên là DevicesActivity, phần giao diện chỉ gồm 1 ListView để hiển thị danh sách các thiết bị.

![](https://docs.google.com/uc?authuser=0&id=0ByMQfqYoGjfUNjhiNU9faU1SWm8&export=download)

Để hiển thị custom item trong listview như trên hình ta tạo thêm 1 file layout mới tên là [device_item](https://github.com/sontx/iot-client-server/blob/master/android/app/src/main/res/layout/device_item.xml).

Chuyển đến lớp DevicesActivity, tạo mới 1 custom adapter bên trong class này để hiển thị thông tin thiết bị ra listview:

```java
// lớp lưu giữ thông tin thiết bị và tình trạng thiết bị, mỗi thực thể DeviceHolder sẽ tương ứng với 1 item trong listview
private class DeviceHolder {
    public Device device = null;
    public byte state = 0;
}
// adapter kế thừa từ BaseAdapter để quy định cách hiển thị dữ liệu ra listview
private class DeviceAdapter extends BaseAdapter {
    // danh sách các thiết bị và tình trạng tương ứng của nó
    private final List<DeviceHolder> devices;
    // dùng LayoutInflater để tạo mới view từ xml layout
    private final LayoutInflater inflater;
.......................
}

// lưu giữ các view của listview item tránh trường hợp tìm kiếm lại view mất thời gian
private static class ViewHolder {
    TextView nameView;
    TextView idView;
}
```

Khi activity này được khởi tạo thì nó sẽ tự động lấy danh sách các thiết bị từ server sau đó hiển thị lên listview, sau khi lấy dữ liệu thành công thì nó sẽ bắt đầu quá trình cập nhật trạng thái hoạt động của các thiết bị 1 cách liên tục. Code thực thi chính của phần này như sau:

```java
// hiển thị hộp thoại loading trong khi gửi yêu cầu và nhận phản hồi từ server
processingBox = new ProcessingBox(this);
processingBox.show();
// công việc sẽ diễn ra ở background thread
new Thread(new Runnable() {
    @Override
    public void run() {
        final List<Device> devices = ConnectionServer.getInstance().getDevices();
        // các công việc liên quan đến hiển thị ra giao diện đều phải thực thi từ thread chính
        runOnUiThread(new Runnable() {
            @Override
            public void run() {
                // tắt hộp thoại loading sau khi nhận xong phản hồi từ server
                processingBox.dismiss();
                if (devices == null) {
                    Toast.makeText(DevicesActivity.this, "Network error!", Toast.LENGTH_LONG).show();
                    finish();
                } else {
                    // khởi tạo danh sách các DeviceHolder cho mỗi thiết bị để hiển thị ra listview
                    List<DeviceHolder> holders = new ArrayList<DeviceHolder>(devices.size());
                    for (Device device : devices) {
                        DeviceHolder holder = new DeviceHolder();
                        holder.device = device;
                        holder.state = 0;
                        holders.add(holder);
                    }
                    adapter = new DeviceAdapter(DevicesActivity.this, holders);
                    // hiển thị ra listview
                    devicesView.setAdapter(adapter);
                    // bắt đầu cập nhật trạng thái thiết bị
                    updateDevicesState(holders);
                }
            }
        });
    }
}).start();
```

Phần cập nhật tình trạng thiết bị, ta chỉ cần lấy thông tin real-time của mỗi thiết bị sau 1 khoản thời gian và sau đó cập nhật lại trong danh sách DeviceHolder, quá trình sẽ lặp đi lặp lại sau 1 khoản thời gian nhất định.

```java
private void updateDevicesState(final List<DeviceHolder> devices) {
    pendingStop = false;
    // công việc sẽ được thực hiện ở 1 background thread
    new Thread(new Runnable() {
        @Override
        public void run() {
            boolean brokenDown = false;
            // lặp đi lặp lại quá trình kiểm tra trạng thái hoạt động của thiết bị
            while (!pendingStop && !brokenDown) {
                // cờ đảm bảo chỉ khi có dữ liệu thay đổi thì mới cần cập nhật ra giao diện
                boolean changed = false;
                // kiểm tra tình trạng của mỗi thiết bị trong danh sách
                for (DeviceHolder holder : devices) {
                    RealTime realTime = ConnectionServer.getInstance().getRealtime(holder.device.getId());
                    if (realTime != null) {
                        if (holder.state != realTime.getState()) {
                            holder.state = realTime.getState();
                            changed = true;
                        }
                    } else {
                        brokenDown = true;
                        break;
                    }
                }
                // cập nhật lại giao diện nếu có thay đổi, quá trình cập nhật phải xảy ra ở thread chính vì thế cần gửi thông điệp yêu cầu cập nhật cho thread chính 
                if (changed)
                    updaterHandler.sendEmptyMessage(1);
                long now = System.currentTimeMillis();
                while (System.currentTimeMillis() - now < UPDATE_AFTER && !pendingStop && !brokenDown) {
                    try {
                        Thread.sleep(100);
                    } catch (InterruptedException e) {
                        pendingStop = true;
                        break;
                    }
                }
            }
        }
    }).start();
}
```

> Ở đây mình sử dụng Handler để thay thế cho phương thức runOnUiThread để thực hiện công việc trong thread chính. Thực ra ở trong trường hợp này bạn sử dụng runOnUiThread đều được, mình chỉ sử dụng Hanlder để đổi gió thôi.
Chú ý là các thao tác trên giao diện phải được thực thi ở thread chính nhé!

Tiếp theo là các tác vụ chính trên mỗi thiết bị hiển thị ở listview như sau:

![](https://docs.google.com/uc?authuser=0&id=0ByMQfqYoGjfUa0VBdDBodldHTHM&export=download)

Ta sẽ sử dụng 1 context menu để hiển thị 4 tác vụ này khi người dùng nhấn giữ vào mỗi item ở listview, để làm được điều này bạn tạo mới 1 menu layout với tên [devices_context_menu](https://github.com/sontx/iot-client-server/blob/master/android/app/src/main/res/menu/devices_context_menu.xml).

Code giao diện khá đơn giản vì thế mình không giải thích nhiều. Để hiển thị được context menu khi người dùng nhấn giữ vào từng listview item các bạn làm theo 2 bước sau:
1. Thêm phương thức registerForContextMenu(devicesView) khi activity được khởi tạo. Đối số của nó chính là listview của chúng ta.
1. Ghi đè phương thức onCreateContextMenu của activity và khởi tạo menu từ xml layout bằng câu lệnh: getMenuInflater().inflate(R.menu.devices_context_menu, menu)

Về phần xử lý khi người dùng lựa chọn các menu item tương ứng như sau:

```java
// phướng thức này sẽ được thực thi khi người dùng chọn 1 menu item từ context menu
@Override
public boolean onContextItemSelected(MenuItem item) {
........................
}
// đổi tên thiết bị, hiển thị inputbox cho người dùng nhập tên mới cho thiết bị.
private void renameDevice(final Device device) {
........................
}
// bật tắt thiết bị, làm việc y chan công tắt 
private void turnOFF(final int deviceId, final boolean off) {
........................
}
// khởi động activity để xem lịch sử hoặc xem real-time, chỉ cần truyền id của thiết bị và bên kia sẽ dựa vào đó để lấy thông tin.
private void startTaskActivity(Class target, int deviceId) {
........................
}
```

Như thế là phần xử lý chính của DevicesActivity đã xong, bây giờ ta còn 2 activity chính cần hoàn tất nữa là activity xem lịch sử điện năng và real-time.

Xây dựng trang xem lịch sử điện năng
-------------

Đầu tiên tạo 1 lớp TaskActivity để 2 activity là xem real-time và xem lịch sử điện năng kế thừa với nội dung:

```java
public abstract class TaskActivity extends AppCompatActivity {
    public static final String INTENT_DEVICE_ID = "device_id";
    // lấy id của thiết bị cần xử lý
    protected int getDeviceId() {
        Intent intent = getIntent();
        return intent.getExtras().getInt(INTENT_DEVICE_ID);
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        // tự động đặt tiêu đề cho activity
        setTitle(String.format("Id: %d", getDeviceId()));
    }
}
```

Xong! giờ tạo 1 activity mới tên là [HistoryActivity](https://github.com/sontx/iot-client-server/blob/master/android/app/src/main/java/com/blogspot/sontx/myapp/ui/HistoryActivity.java), phần giao diện thiết kế như sau:

![](https://docs.google.com/uc?authuser=0&id=0ByMQfqYoGjfUNEl1T1JQaTlTdUU&export=download)

Ở đây có mình sử dụng lớp com.github.mikephil.charting.charts.BarChart để hiển thị biểu đồ dạng cột của dữ liệu.
Về phần xử lý, full code như sau:

```java
public class HistoryActivity extends TaskActivity implements View.OnClickListener, OnChartValueSelectedListener {
    // id của thiết bị cần xem lịch sử
    private int mDeviceId;
    // view hiển thị biểu đồ
    private BarChart mBarChart;
    // nhập năm ở đây
    private EditText mYearView;
    // nhập tháng
    private EditText mMonthView;
    // và nhập ngày
    private EditText mDayView;
    // định dạng dữ liệu hiển thị, nôm na nó giống như %0.2f trong C 
    private DecimalFormat mFormat = new DecimalFormat("#.##");

    .........................
}
```

Chúng ta thiết kế trang xem lịch sử sử dụng điện năng dạng truy vấn theo thời gian, người dùng sẽ nhập vào ngày tháng năm và chọn vào các nút tương ứng để xem điện năng của ngày, tháng hoặc năm. Khi nhấn nút thì giá trị thời gian sẽ được gửi cho server để nhận lại phản hồi về các giá trị điện năng tương ứng, khi ứng dụng có được các giá trị điện năng này thì nó sẽ hiển thị ra giao diện dặng biểu đồ cột gồm trục y là giá trị điện năng(kWh) và trục x là giá trị thời gian tương ứng. Khi người dùng touch vào 1 cột bất kỳ trên biểu đồ thì giá trị điện năng của cột đó sẽ hiển thị ra màng hình cho người dùng theo dỏi.

Xây dưng trang xem real-time
-------------

Trang này sẽ hiển thị các giá trị thời gian thực như power, voltage, amperage của thiết bị. Ở đây mình sử dụng biểu đồ đường để vẽ ra real-time của thiết bị, cả 2 biểu đồ đường và biểu đồ cột đều có trong thư viện mpandoirdchart.
Các bạn tạo mới 1 activity tên là RealtimeActivity. Về phần thiết kế giao diện khá đơn giản chỉ gồm 3 biểu đồ đường tương ứng với 3 giá trị real-time là power, voltage và amperage.

![](https://docs.google.com/uc?authuser=0&id=0ByMQfqYoGjfUcVhJYUFLVmNUZGc&export=download)

Phần giao diện của HistoryActivity được định nghĩa trong [activity_history.xml](https://github.com/sontx/iot-client-server/blob/master/android/app/src/main/res/layout/activity_history.xml)

Để canh chiều cao 3 biểu đồ bằng nhau thì ta đặt layout_height là 0 cho mỗi biểu đồ sau đó đặt giá trị layout_weight bằng nhau cho cả 3 biểu đồ(ở trong code mình đặt cả 3 đều là 1).
Về phần xử lý, đơn giản là ta sẽ lấy giá trị real-time của thiết bị sau đó hiển thị lên 3 biểu đồ rồi lặp lại quá trình sau 1 khoản thời gian nhất định. Nếu quá việc lấy dữ liệu real-time không thành công thì ứng dụng sẽ cố gắng “thử” lấy thêm vài lần nữa, nếu quá số lần quy định thì ứng dụng mới chính thức báo lỗi kết nối.
Phương thức cập nhật real-time chính, nó sẽ được thực thi ở background thread:

```java
@Override
public void run() {
    int lastError = 0;// count of try 
    int deviceId = mDeviceId;// id của thiết bị
    // lặp lại quá trình cho đến khi có yêu cầu dừng
    while (!pendingStop) {
        RealTime realTime = ConnectionServer.getInstance().getRealtime(deviceId);
        // lấy được real-time thì thông báo cho thread chính cập nhật lên giao diện
        if (realTime != null) {
            Message msg = mUpdaterHandler.obtainMessage(WHAT_OK, realTime);// everything OK
            mUpdaterHandler.sendMessage(msg);
            lastError = 0;
        // không lấy được real-time thì kiểm tra xem số lần "thử" đã vược quá số lần quy định(ở đây là 5) chưa, nếu chưa thì chỉ yêu cầu hiện warning thôi
        } else if (lastError < 5) {
            mUpdaterHandler.sendEmptyMessage(WHAT_WARNING);// something wrong! try again...
            lastError++;
        } else {
            mUpdaterHandler.sendEmptyMessage(WHAT_ERROR);// connection broken down so we display message and exit thread
            break;
        }
        // ngừng 1 khoản thời gian trước khi tiếp tục cập nhật real-time
        long start = System.currentTimeMillis();
        while ((System.currentTimeMillis() - start < UPDATE_AFTER) && (!pendingStop)) {
            try {
                Thread.sleep(100);
            } catch (InterruptedException e) {
                break;
            }
        }
    }
}
```

Như đã thấy, phương thức trên sẽ gửi thông báo đến thread chính để yêu cầu nó cập nhật giao diện. Để làm được điều đó mình sử dụng Handler và các cờ WHAT_OK, WHAT_WARNING hay WHAT_ERROR để phân biệt giữa các loại yêu cầu hiển thị. Đối với WHAT_OK thì có kèm theo dữ liệu real-time để hiển thị nữa.
Phương thức handleMessage sẽ nhận các thông điệp yêu cầu từ Handler, chúng ta sẽ phân biệt các yêu cầu này dựa vào trường what của đối số msg. Chú ý rằng phương thức handleMessage sẽ được thực thi ở thread chính.

```java
@Override
public boolean handleMessage(Message msg) {
    if (msg.what == WHAT_OK) {
        updateRealtime((RealTime) msg.obj);
    } else if (msg.what == WHAT_WARNING) {
        displayWarning(mPowerChart);
        displayWarning(mAmperageChart);
        displayWarning(mVoltageChart);
    } else if (msg.what == WHAT_ERROR) {
        displayError(mPowerChart);
        displayError(mAmperageChart);
        displayError(mVoltageChart);
    }
    return true;
}
```

Hai phương thức là displayWarning và displayError chỉ đơn giản là hiển thị warning và error lên các biểu đồ tương ứng, các bạn có thể đọc thêm ở trong project. 
Phương thức updateRealtime sẽ phân tích các giá trị power, voltage và amperage từ thực thể RealTime nhận được sau đó hiển thị lên các biểu đồ.

```java
private void updateRealtime(RealTime realTime) {
....................
}

// phương thức này sẽ thêm giá trị value vào biểu đồ sau đó tịnh tiến biểu đồ về bên phải để tạo cảm giác như các đường biểu đồ đang chạy 
private void updateForChart(float value, LineChart chart) {
....................
}
```

Các phương thức xử lý chính đã xong. Đây cũng là phần cuối cùng về xây dựng app android.

Chốt
---------

Như đã thấy thì ở phần này cũng khá đơn giản chỉ cần chú ý đến 1 số thứ như Handler, HttpURLConnection, BarChart, LineChart, Adapter và SharedPreferences. 
Về cơ bản thì công việc của chúng ta đã xong nhưng để demo được thì cần phải có phần thứ 3 là phần thiết bị vì nhờ chúng ta mới có được các giá trị real-time và thông tin điện năng(cái nay thì set cứng trong csdl để test cũng được). Để giải quyết vấn đề này thì mình sẽ thiết kế 1 virtual device để giả lập các thiết bị kết nối vào server. Phần tiếp theo hứa hẹn sẽ có nhiều điều thú vị để làm, các bạn cố gắng theo dỏi nhé.

Mọi source code của project này được cập nhật tại github: [https://github.com/sontx/iot-client-server](https://github.com/sontx/iot-client-server).
