---
title: Làm việc với CSDL trong java
layout: post
description: >
  Các lý thuyết về csdl(database) thì các bạn có thể đọc thêm trên google,
  trong bài này mình sẽ hướng dẩn một cách chi tiết nhất có thể về cách làm việc
  với csdl trong java.  Như bạn đã biết thì trên đời này có hàng tá hệ quản trị csdl
  như MySQL, SQLServer, Oracle... nhưng mà chúng ta không cần dùng dao mổ trâu để
  đi giết gà làm gì 😂.  Vì thế nên mình chọn **SQLite** để hướng dẩn trong
  bài này, nhanh, gọn nhẹ.
tag: [programming]
comments: true
---

Trong bài này mình sử dụng Eclipse nhé, hơi cũ nhưng cũng đủ xài.

Tạo java project
----------

Ở eclipse, bạn làm như sau: File -> Other... -> Java Project, sau đó Next như hình bên dưới.

![](https://1.bp.blogspot.com/-CQyKSkb5uG8/V7FwQzSDWRI/AAAAAAAAPks/oDftoOj47eIPZgcUIhaJlWq8BD002UGcACLcB/s1600/Capture.PNG)

Hộp thoại mới hiện ra, ở đây bạn cần cung cấp một số thông tin về project. Trong ví dụ này mình đặt tên project là DbDemo. Làm như hình nhé, nhập tên cho project xong thì chọn Finish.

![](https://1.bp.blogspot.com/-Nj_S0Ajd9QQ/V7FxK7ZL8II/AAAAAAAAPkw/p1O5i5UrHpktXEPLwCYtNdxW2W8y9lA4wCLcB/s1600/Capture.PNG)

Done! Thế là bạn đã tạo ra được một java project rồi. Dĩ nhiên là project vẩn chưa có gì cả, trống không như hình bên dưới.

![](https://2.bp.blogspot.com/-aY278JqjoJ4/V7FxjTMZRsI/AAAAAAAAPk8/l9BO37-TbAIUeUZIe2N0pNPzS9wOvgoFgCLcB/s1600/Capture.PNG)

Thêm thư viện
-------

Đầu tiên bạn tạo một folder trong project tên là lib như sau: Click chuột phải vào DbDemo -> New -> Folder.

![](https://3.bp.blogspot.com/-Dd3OZXkV4mY/V7FyazD0uuI/AAAAAAAAPlE/IhWc0wEa-KU9j29_rZHYI1ngni6jCG27QCLcB/s1600/Untitled.png)

Hộp thoại xuất hiện, bạn nhập tên folder là lib như hình dưới và chọn finish.

![](https://1.bp.blogspot.com/-miytZ_6diE0/V7FyqymgwBI/AAAAAAAAPlI/yUO79k0_YzsVu-trGDBfw1JdvYepquYIQCLcB/s1600/Capture.PNG)

Cài folder lib này sẽ dùng để chứa các thư viện jar mà bạn add vô project. Hừm! thế thư viện gì và đào đâu ra? Mà dùng nó để làm cái quái gì?

Đây nhé, như bạn đã biết thì ta có cả tá hệ quản trị csdl và java muốn giao tiếp với tụi nó để làm việc với csdl thì cần phải có "driver". Như kiểu có hàng tá loại card màng hình và Windows muốn giao tiếp với tụi nó thì phải cài driver vậy. Vì thế nên ta cần phải tải thêm thư viện của bên thứ 3 tương ứng với loại csdl mà ta muốn làm việc. Trong bài này mình sẽ demo với SQLite nên để lấy thư viện này thì bạn theo link sau: [sqlite-jbdc](https://bitbucket.org/xerial/sqlite-jdbc/downloads).

Vào đây thì bạn sẽ hơi bị hoang mang vì có cả tá version, biết tải cái nào chừ 😵 Đừng lo, cứ cắm đầu tải cái nào mới nhất, version to nhất ấy.

![](https://1.bp.blogspot.com/-psDCDHtqzFs/V7F1LIvoRcI/AAAAAAAAPlY/4B0u_LLJj00X2to9D9kavq-2Kk9Ys8nXACLcB/s1600/Capture.PNG)

Như trong hình thì là 3.8.12.2, click vào để tải ẻm nó về máy. Sau khi tải về bạn kéo thả nó vào folder **lib** lúc nảy vừa tạo ấy.

![](https://2.bp.blogspot.com/-O5z6Hy3aZYc/V7F1uIE_4rI/AAAAAAAAPlc/s4Qtry_iiPYmYjfskcfuTfRsVv_6xKu4QCLcB/s1600/Capture.PNG)

Bước cuối cùng để có thể sử dụng được thư viện jar đó là cần add nó vào build path của project, bạn làm như sau: Click chuột phải vào file jar trong folder **lib** -> Build Path -> Add to Build Path.

![](https://3.bp.blogspot.com/-I2Slwyji7og/V7F2pBS1hiI/AAAAAAAAPlo/DP7PZwK-B_QXXhqhQt9g_GiskQX9t88ggCLcB/s1600/Untitled.png)

Coding
-----

Toát hết mồ hồi, cuối cùng cũng được code rồi 😂 Để làm việc với csdl thì có 4 bước cơ bản mà bạn nên tuân theo như sau:

1. Load driver.
1. Tạo kết nối.
1. Truy vấn.
1. Đóng kết nối.

Cụ thể các bước như sau:

Bước 1: Để load driver bạn có thể sử dụng phương thức `Class.forName` như sau.

```java
Class.forName("org.sqlite.JDBC");
```

Bước 2: Để tạo một kết nối bạn làm như sau.

```java
connection = DriverManager.getConnection(connectionString);
```

Bước 3: Bạn sẽ sử insert, select, update và delete. 4 công việc cơ bản nhất mà bạn có thể làm, mình sẽ nói cụ thể trong các phần bên dưới đây.

Bước 4: Đóng kết nối bạn làm như sau.

```java
connection.close();
```

Insert
------

Bạn sử dụng câu lệnh insert khi cần thêm thông tin vào một bảng trong csdl. Bạn tạo mới một class tên là InsertSample với một hàm main như sau:

<div data-gist-id="29eb4bea7fe682d60e802c2bfae7b0e4"></div>

Code thêm vài dòng như thế này nữa nhé 😂 mình chú thích rất đầy đủ rồi nên có lẻ cũng không cần giải thích gì nhiều.

Select
-----

Câu lệnh select được sử dụng để lấy về các bản ghi(hoặc các dòng) trong một hoặc nhiều bảng. Bạn tạo một class SelectSample và code như bên dưới.

<div data-gist-id="2a9eb65f052a15715aa53d3dc26ab01a"></div>

Đây là kết quả sau khi chạy đoạn lệnh trên, tất cả các bảng ghi trong table đều được "show" ra hết ở đây 😂

![](https://2.bp.blogspot.com/-TqlkrzcIILA/V7GBrM_Jh3I/AAAAAAAAPl4/Vu2GjrfMTm8pY8n1opIAtt-DQad-zoQKQCLcB/s1600/Capture.PNG)

Update
-----

Bạn dùng nó khi bạn cần chỉnh sửa nội dung một hay nhiều bản ghi trong bảng. Ví dụ như cần đổi tên của người có ID là 001 thành "trần xuân soạn chẳng hạn". Tạo một class UpdateSample và code như sau.

<div data-gist-id="f20ce818f5f9871dcd2dd78daa364677"></div>

Bạn thử chạy đoạn lệnh này sau đó chạy lại đoạn lệnh của select bên trên sẽ thấy rỏ tên của người có id 1 đã bị đổi thành "tran xuan soan".

![](https://1.bp.blogspot.com/-NZm9QbiucZo/V7GC-PqF-xI/AAAAAAAAPmA/a7YjrdT0Smwvl7CvL6y67JaAC1n38MmnQCLcB/s1600/Capture.PNG)

Delete
-----

Đôi lúc bạn cần xóa một số bản ghi trong table, ví dụ như xóa những người có chữ "soan" trong tên chẳng hạn. Làm như sau nhé, tạo class DeleteSample.

<div data-gist-id="c1de0a4586fb0d60d08e596bb752d981"></div>

Sau khi chạy đoạn lệnh trên bạn chạy lại đoạn lệnh của select để xem kết quả.

Trước:
![Trước](https://4.bp.blogspot.com/-NZm9QbiucZo/V7GC-PqF-xI/AAAAAAAAPmM/BDEK1Qz-29MGfF9iOkT8Z7sFDyLdbjYYwCEw/s1600/Capture.PNG)
Sau:
![Sau](https://3.bp.blogspot.com/-YWmYHqmAn4Y/V7GEhUW-cpI/AAAAAAAAPmQ/wkb8Ub6NWvYMJQFrfDKlj2eXGzPGg2vbQCEw/s1600/Capture.PNG)

Hai người đầu tiên có chữ "soan" ở trong tên đã bị remove rồi 😂

Chốt
----

Việc lựa chọn hệ quản trị csdl nào là tùy thuộc vào tùng trường hợp, khi bạn cần triển khai những hệ thống lớn, yêu cầu bảo mật blabla các kiểu thì lúc này MySQL hay SQLServer... là một sự lựa chọn hợp lý. Đôi lúc bạn chỉ muốn lưu trữ những thông tin đơn giản như thông tin của game hay của ứng dụng thì SQLite là OK nhất. Ngay chính Firefox hay Chrome cũng đang dùng SQLite để lưu trữ lịch sử trình duyệt cùng các thông tin khác đấy 😂

Đây là source code cho bài viết hôm nay: [ https://github.com/sontx/db-demo]( https://github.com/sontx/db-demo)