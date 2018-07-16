---
title: Quản lý và giám sát các thiết bị trong gia đình từ xa(IoT) - Phần 4
layout: post
description: >
  Nối tiếp [phần 3](/2016/01/11/quan-ly-va-giam-sat-cac-thiet-bi-tu-xa-iot-phan-3), phần 4 này sẽ là phần cuối cùng cũng là phần thú vị nhất. Ở phần này mình sẽ hướng dẩn cách xây dựng một virtual device, cách cài đặt server và deploy webservice của chúng ta, cách truy cập từ internet vô webservice và cuối cùng là video demo sản phẩm. Cùng bắt tay vào làm thôi nào!
tag: [programming,iot]
comments: true
---
<span/>

Xây dựng virtual device
Mục đích của phần này là để kiểm tra hoạt động của server và demo sản phẩm, vì phần thiết bị bên dưới mình không làm nên phải làm phần này thay thế.

Vì mục đích chính của phần này là để phục vụ công việc demo nên các bạn có thể bỏ qua nếu không muốn biết chi tiết xử lý bên trong.
Đầu tiên tạo 1 java project mới với tên là VirtualClient, ta thêm shared project(project ở phần 1) vào build path của VirtualClient.

![](https://docs.google.com/uc?authuser=0&id=0ByMQfqYoGjfUS1h5UnkydERDNms&export=download)

Như thế ta có thể sử dụng được các lớp đã khai báo bên trong shared project.
Bước tiếp theo ta định nghĩa 1 thiết bị ảo(client), tạo 1 lớp mới tên [Client](https://github.com/sontx/iot-client-server/blob/master/VirtualClient/src/com/blogspot/sontx/iot/virtualclient/Client.java). Nhiệm vụ của lớp này là giả lập 1 thiết bị ảo, nó sẽ tự động kết nối đến server và lắng nghe các yêu cầu từ server đó đồng thời tự động phản hồi lại các dữ liệu mà server yêu cầu. Các giá trị energy, power, voltage và amperage đều được sinh ngẫu nhiên trong 1 miền giới hạn nhất định. Riêng giá trị state của thiết bị sẽ được lưu trữ chứ không sinh ngẫu nhiên như các giá trị khác.

Tiếp theo ta xây dựng giao diện của VirtualClient, phần giao diện sẽ hiển thị các nút bấm mỗi nút bấm tương ứng với 1 thiết bị ảo(Client) với background color tương ứng với trạng thái của thiết bị. Người dùng có thể bấm bám nút bấm để thay đổi trạng thái hoạt động của thiết bị(ON/OFF).

![](https://docs.google.com/uc?authuser=0&id=0ByMQfqYoGjfUMGlFY1VNLUNGd1k&export=download)

Tạo class mới là [ClientUI](https://github.com/sontx/iot-client-server/blob/master/VirtualClient/src/com/blogspot/sontx/iot/virtualclient/ClientUI.java) để hiển thị giao diện trên.

Tiếp theo tạo lớp [Program](https://github.com/sontx/iot-client-server/blob/master/VirtualClient/src/com/blogspot/sontx/iot/virtualclient/Program.java) có nhiệm vụ khởi tạo các client và là entry của chương trình.

Ở ví trụ trên mình khởi tạo mặt định 3 thiết bị, các bạn có thể tạo bao nhiêu tùy ý, chỉ cần thay đổi đối số hàm khởi tạo của Program là được.
Như thế là thiết bị ảo của chúng ta đã hoàn tất, nó có thể giả lập được rất nhiều thiết bị cùng lúc.
Bước tiếp theo là export project ra file thực thi, các bạn có thể chạy ngay trên eclipse. 
Click chuột phải vào VirtualClient project và chọn export sau đó tại mục filter các bạn nhập vào là jar tiếp theo chọn jar runable rồi next, tại mục tiếp theo chọn vị trí lưu file và next cho đến hết. Cuối cùng các bạn sẽ được 1 file jar(vc.jar) như hình có thể thực thi mà không cần eclipse.

![](https://1.bp.blogspot.com/-hlokw902etU/VpN6j-vcnyI/AAAAAAAAN3w/wgO7LIvKhvM/s1600/Screenshot+from+2016-01-11+16-48-42.png)

Để chạy thì các bạn mở terminal(Ctrl + Alt+ T) đối với linux hoặc command prompt(Win + R sau đó nhập cmd rồi enter), tiếp theo nhập đường dẩn của file vc.jar sau đó enter cho nó chạy thôi.

Cài đặt server và deploy web service
------------

Tạo file war cho webservice: các bạn click chuột phải vào webservice project và chọn export sau đó chọn WAR file, cửa sổ mới hiện lên các bạn chọn nơi lưu và nhấn finish. 
Nếu các bạn chỉnh chế độ xem là Java EE thì mới thấy tùy chọn này, nếu để chế độ xem là Java thì khi chọn export cửa sổ mới sẽ hiện lên, nhập vào ô filter là “war file” và chọn war file ở bên dưới sau đó nhấn next và làm tương tự bước trên.

Chế độ xem Java EE.
![](https://2.bp.blogspot.com/-YoUNTDuVKNY/VpNYx8M1ZgI/AAAAAAAAN1Q/yEzaNKk8WeE/s1600/Screenshot+from+2016-01-11+14-22-38.png)

Chọn War file từ của sổ Export
![](https://1.bp.blogspot.com/-AfOZg2aTtZo/VpNZKYzl7CI/AAAAAAAAN1k/Q56xDurQduk/s1600/Screenshot+from+2016-01-11+14-25-59.png)

Tiếp theo mình sẻ hướng dẩn các bạn cách cài đặt tomcat server trên hệ điều hành chính là ubuntu(linux), với windows các bạn có thể tìm hiểu thêm trên google.com.
Bên ubuntu các bạn làm theo các bước sau:

**Bước 1:** cài đặt tomcat8, mở terminal và chạy lần lược các lệnh sau

```bash
sudo apt-get update 
sudo apt-get install tomcat8 
sudo apt-get install tomcat8-docs tomcat8-admin tomcat8-examples
```

**Bước 2:** cấu hình tomcat8, ở bước này các bạn sẽ tạo 1 tài khoản người dùng để có thể truy cập vào trang quản lý của tomcat, các bạn mở terminal(Ctrl + Alt + T) và chạy lệnh sau để chỉnh sửa file tomcat-users.xml với quyền root:

```bash
sudo gedit /etc/tomcat8/tomcat-users.xml
```

Ở username và password các bạn có thể thay đổi tên đăng nhập và mật khẩu của mình, ở đây mình để tên đăng nhập là admin và mật khẩu là admin123.
Sau khi chỉnh sửa nội dung file tomcat-users.xml các bạn khởi động lại dịch vụ của tomcat bằng câu lệnh sau(chạy trong termial):

```bash
sudo service tomcat8 restart
```

**Bước 3:** Deploy war file

Các bạn mở trình duyệt lên và nhập vào đường dẩn như sau: http://localhost:8080/manager/html 
Các bạn nhập username và password ở bước 2 để đăng nhập vào trang này nhé.

![](https://4.bp.blogspot.com/-1UTUZdHD8sw/VpNcytxq70I/AAAAAAAAN2U/4lrXfbJjteA/s1600/Screenshot+from+2016-01-11+14-41-22.png)

Sau khi nhập đúng username và password thì nó sẽ chuyển đến trang quản lý của tomcat với giao diện như hình:

![](https://2.bp.blogspot.com/-LGbDDk_bWak/VpNcC-9xCJI/AAAAAAAAN2A/FVkxUYZXpcs/s1600/Screenshot+from+2016-01-11+14-38-18.png)

Tiếp theo các bạn kéo xuống mục WAR file to deploy sau nhấn vào nút chọn file để chọn file war mà chúng ta đã export lúc nảy.

![](https://2.bp.blogspot.com/-VKRnR8sufjo/VpNd25RmchI/AAAAAAAAN2s/ErHF79USk_U/s1600/Screenshot+from+2016-01-11+14-45-39.png)

Tiếp theo là nhấn nút deploy để deploy file war thôi. Hình bên dưới cho thấy file war đã deploy thành công và đang chạy trên tomcat server.

![](https://1.bp.blogspot.com/-aenrT07Y7Qo/VpNevWIcZkI/AAAAAAAAN3A/PiDEBijcap4/s1600/Screenshot+from+2016-01-11+14-49-28.png)

**Bước 4:** cấu hình webservice
Như đã biết ở phần 1, webservice của chúng ta có 1 file cấu hình riêng để thiết đặt các thông tin như ip, port hay superuser…Bây giờ là lúc để tinh chỉnh file đó.
Bây giờ các bạn mở file config với quyền root bằng cách chạy lệnh sau trong terminal:

```bash
sudo gedit /var/lib/tomcat8/webapps/MyWS/config.in
```

Chú ý rằng vị trí của file cấu hình có thể ở nơi khác, điều này tùy thuộc vào việc bạn thiết đặt giá trị của WORKING_DIR.

![](https://1.bp.blogspot.com/-qOh5ZZ0idXs/VpNhqtC2XUI/AAAAAAAAN3Y/nn1DTENZg10/s1600/Screenshot+from+2016-01-11+15-02-14.png)

Cửa sổ gedit hiện ra, bây giờ ta có thể thay đổi các thông tin cấu hình của webservice cho phù hợp ví dụ như địa chỉ server, port hay tài khoản superuser…Ở đây mình thay đổi như sau:

```
dbname=local.db 
address=192.168.1.111 
port=2512 
timeout=10000 
relay-get-realtime=2000 
relay-get-energy=10000 
su-username=admin 
su-password=admin123
```

Sau khi thay đổi bạn lưu lại rồi restart lại tomcat service bằng lệnh:

```bash
sudo service tomcat8 restart
```

Bây giờ webservice sẽ nạp lại cấu hình mới từ file.
Bên Windows các bạn làm theo hướng dẩn tại http://doraprojects.net/blog/?p=1109 hoặc từ google.com

> Chú ý rằng tomcat chạy dựa vào máy ảo java vì thế máy phải cài jre hoặc jdk trước. Cài cách nào thì google.com sẽ trả lời.
Đối với Paspberry Pi2 thì còn tùy thuộc vào hệ điều hành đang chạy trên em nó. Theo mặt định thì nó sẽ chạy Raspbian(cũng là 1 nhánh của linux) vì thế các bạn có thể làm theo hướng dẩn của ubuntu nhưng chú ý là mặt định trên Raspbian thì không có gedit đâu nhé vì thế nên các bạn có thể dùng trình chỉnh sửa text khác để thay thế gedit.

Truy cập từ ngoài internet vào webservice
-------------------

Các bạn đăng nhập vào trang https://www.noip.com và tạo 1 tài khoản, bước này quá đơn giản nên mình không nói cụ thể.
Sau khi có tài khoản các bạn vào mục Add Host như trong hình.

![](https://3.bp.blogspot.com/-ffXkhgKiUa4/VpO-muGjlrI/AAAAAAAAN4M/J93WVZLTA9I/s1600/Screenshot+from+2016-01-11+21-35-04.png)

Nhập hostname vào mục hostname, chú ý rằng hostname nên đặt cho dể nhớ 1 tí để lát còn dùng đến, các mục khác cứ để mặt định như hình. Sau khi nhập xong thì nhấn vào Add Host.

![](https://2.bp.blogspot.com/-62Pjifj0vow/VpO_8zcy_KI/AAAAAAAAN4k/v7yYoBkFq0E/s1600/Screenshot+from+2016-01-11+21-41-45.png)

Kết quả chúng ta được như thế này:

![](https://3.bp.blogspot.com/-5vH4YW-8peY/VpPAOEXfMrI/AAAAAAAAN44/WaSdiiQwshg/s1600/Screenshot+from+2016-01-11+21-45-40.png)

Đừng quan tâm đến địa chỉ IP trong hình, nó chỉ là địa chỉ tạm thời thôi, chú ý cái hostname(trong hình là sontx.no-ip.org).
Bây giờ là lúc động đến router, trong ví dụ bên dưới mình sử dụng Router TL-WR841N của TP-LINK. Các loại router khác các bạn có thể tham khảo tại trang chủ của nó.
Bước 1 đăng nhập vào trang quản lý của router bằng cách kết nối máy tính với router(kết nối wifi hoặc cắm dây), bước này hầu như không cần làm vì thiết bị của bạn chắc đã kết nối sẳn với router để đi ra internet rồi nhỉ.

Tiếp theo nhập địa chỉ 192.168.1.1(địa chỉ mặt định của router), cửa sổ login yêu cầu nhập mật khẩu và username cua admin(cái này thì bạn phải có quyền sinh tử với con router thì mới có thông tin này được). Sau khi login thì giao diện quản lý nó trông thế này.

![](https://4.bp.blogspot.com/-1_7ksiHl9rc/VpPCqWh65_I/AAAAAAAAN5Q/tJ0enEhEF3g/s1600/Screenshot+from+2016-01-11+21-55-36.png)

Chọn mục Dynamic DNS(phía bên trái á) và nhập thông tin tài khoản đăng nhập của No-IP tại mục username và password, tại mục Service Provider chọn No-IP. Tại mục Domain Name nhập vào hostname đã tạo ở bước trước. Sau đó nhấn vào Login và đợi 1 lát để nó kết nối đến No-IP, sau khi thành công sẽ hiển thị thế này:

![](https://2.bp.blogspot.com/-Euykhg0phMs/VpPEj5u4_GI/AAAAAAAAN5o/z5-X3cAB9_s/s1600/Screenshot+from+2016-01-11+22-03-34.png)

OK! nhấn Save để lưu lại.
Tiếp theo vào mục Forwarding, click vào nút “Add New…” và điền thông tin như trong hình, chú ý mục “IP Address” bạn nhập địa chỉ IP của máy tính sẽ chạy webservice của chúng ta.

![](https://4.bp.blogspot.com/-9f-0wVm6pdY/VpPH8spCVyI/AAAAAAAAN6A/VJcFW2nEA6Q/s1600/Screenshot+from+2016-01-11+22-11-40.png)

OK! lưu lại thôi.

![](https://3.bp.blogspot.com/-xJ6HcgM4Bro/VpPJMIFMIFI/AAAAAAAAN6Y/ACEWtg0ZBsw/s1600/Screenshot+from+2016-01-11+22-14-24.png)

Như thế là ta có thể truy cập vào webservice từ internet rồi, quá dể phải không nào!

Chốt
---------

Sau bao khó khăn và giang khó cuối cùng ta đã hoàn tất được webservice, app và virtual devices, đồng thời biết được cách cấu hình cơ bản cho tomcat server và cấu hình router để truy cập vào máy tính cá nhân từ internet. Sau đây là video demo thành quả

<div class="video-wrapper">
  <iframe src="https://www.youtube.com/embed/gXoXk_PRxhI" frameborder="0" allowfullscreen></iframe>
</div>

> Trong video này mình chia làm 2 phần: phần đầu là điều khiển qua mạng LAN(mình sử dụng máy ảo genymotion để demo), phần 2 là mình chạy trực tiếp trên máy thật có kết nối 3G để kiểm tra khả năng điều khiển từ internet. 
Khi điều khiển qua LAN thì các bạn nhập IP của máy tính đang chạy webservice, nếu điều khiển qua internet thì thay vì nhập IP ta sẽ nhập hostname đã cấu hình trong router(trong video này mình nhập là sontx.no-ip.org)

Mọi source code của project này được cập nhật tại github: [https://github.com/sontx/iot-client-server](https://github.com/sontx/iot-client-server).

References
--------

1. https://www.digitalocean.com/community/tutorials/how-to-install-apache-tomcat-7-on-ubuntu-14-04-via-apt-get 
1. http://www.tp-link.vn/faq-419.html