---
title: Quản lý và giám sát các thiết bị trong gia đình từ xa(IoT) - Phần 2
layout: post
description: >
  Nối tiếp phần 1, ở phần 2 này chúng ta sẽ xây dựng web service, nơi nhận và xử lý các yêu cầu cũng như lưu trữ dữ liệu từ các thiết bị gửi tới.
tag: [programming,iot]
comments: true
---
<span/>

Yêu cầu
-----

1. Biết chút ít về JSP/Servlet và mô hình MVC, bạn có thể đọc bài viết của mình tại đây
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

