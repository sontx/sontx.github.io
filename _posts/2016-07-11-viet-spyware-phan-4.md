---
title: Tự viết một spyware cho riêng mình - Lưu trữ
layout: post
description: >
  
tag: [programming,spyware]
comments: true
category: [programming,projects]
---

Phần 3 mình đã giới thiệu qua về cách sử dụng các hàm API của Windows để chụp ảnh màng hình, 
các bạn có thể đọc lại ở [đây](/2016/06/29/viet-spyware-phan-3). Phần này sẽ hướng dẩn cách lưu trữ dữ liệu tạm thời trong máy victim và 
cách lưu trữ trên server. Đây chỉ là cách "xôi gà" mà mình nghỉ ra, dĩ nhiên là nó không được tối ưu nhưng nó 
ít nhiều sẽ cung cấp cho bạn ý tưởng để lưu trữ và xử lý dữ liệu của spy.
  
Quy ước lưu trữ
--------

Đây là quy ước mà spy và server đều phải tuân theo để 2 bên có thể hiểu nhau. Hiện tại spy sẽ lưu 2 loại files vào máy victim trước khi gửi đi đó là keylogs và screenshots. Mình gọi chung các loại files này là log file. Tên file sẽ được sinh một cách ngẫu nhiên vì thế nội dung phải cần phải chứa thông tin để phân biệt đâu là file keylog đâu là file screenshot. Nội dung file log được định nghĩa như sau:

1. 2 bytes đầu sẽ dùng để phân biệt các loại file log với nhau. Ví dụ ở đây mình dùng 2 ký tự SS cho screenshot file và KB cho keylog file.
1. 4 bytes tiếp theo sẽ lưu thời gian mà file đó được tạo. Dữ liệu thời gian được lấy từ hàm GetLocalTime, sau đó chỉ cần một số bước dịch bit đơn giản là bạn có thể lưu trữ thông tin thời gian vào 4 bytes với độ chính xác đến từng seconds.
1. Các bytes còn lại chính là nội dung của screenshot hoặc keylog, các nội dung này có thể được mã hóa hay lưu thẳng thì tùy bạn.

![](https://4.bp.blogspot.com/-FWdPhm9ZKIA/V4NE1UcWPiI/AAAAAAAAO9A/VhJ47Y9fhN40RhnYRfOSe9eD3MgGQFSOwCLcB/s1600/Capture.PNG)

Lưu trữ phía spy
---------

Toàn bộ file logs phía spy sẽ được lưu trữ theo quy tắt trên. Các file logs sẽ được đặt tên ngẫu nhiên và được lưu trong một folder. Việc upload các files này lên server sẽ diễn ra trong 2 trường hợp:

1. Khi một file log được khi hoàn tất thì hàm notify_upload được gọi.
1. Spy mới được khởi chạy thì hàm notify_upload được gọi.

Thực ra thì bạn cũng nên xác định sự thay đổi tình trạng mạng để có thể upload ngay khi victim kết nối mạng vào máy tính.

Hàm notify_upload sẽ tạo mới 1 thread để tiến hành upload file log trong thread này. Việc upload trong thread nền đảm bảo việc upload không làm delay các tác vụ khác của spy và con spy của ta không làm cho victim nghi ngờ. Tại sao vậy? Vì khi victim gỏ 1 phím, phím ấy được lưu vào log, nếu log đầy thì ta cần tạo log mới để lưu vậy log cũ coi như là "hoàn tất" và có thể gửi cho server. Việc gửi cho server sẽ tốn 1 khoản thời gian tùy vào tốc độ mạng. Nhưng tác vụ này vẩn còn đang được thực thi cùng thread của hệ thống, cái thread đã gọi hàm hook procedure của ta ấy. Vì thế nên chúng ta phải thực hiện công việc trong hàm hook procedure càng nhanh càng tốt. Chừng nào công việc ở đây càng lâu thì phím người dùng đã nhấn càng lâu được gửi đến application -> tình trạng "phím bị lag" và dể bị nghi ngờ.

Cụ thể phần đẩy lên server mình sẽ nói ở phần tiếp theo vì mục đích của phần này là nói về lưu trữ mà.

File log của ta được xem là "hoàn tất" khi:

1. Đầy log, ta sẽ quy định tổng kích thước tối đa cho file log và mỗi khi dữ liệu ghi vào file thì chỉ cần so sánh tổng đã ghi với giá trị tối đa này thôi. Lớn hơn thì ta đống log lại và tạo log mới để lưu mới.
1. Spy shutdown, trường hợp đang ghi, chưa đầy log mà spy phải thoát(có thể là shutdown máy) thì ta vẩn xem file log đó đã "hoàn tất".

![](https://1.bp.blogspot.com/-M2o56lM0wWg/V4NLoHEQ_oI/AAAAAAAAO9Q/O9chH-EV-RIG8DnVIHMuV7fPF-wbCz91QCLcB/s1600/logfile.png)

Dưới đây là toàn ảnh chụp folder của spy khi nằm trong máy victim.

![](https://2.bp.blogspot.com/-jyNDFcjMj2k/V4NMSOdBIfI/AAAAAAAAO9U/RHgOzpcRAoQSrDGe18ENbtcw4NU7BC8qwCLcB/s1600/spydir.png)

Bao gồm các thành phần như sau:

1. **dt** folder dùng để lưu trữ các file log.
1. **tmp** folder dùng để lưu trữ các file tạm được tải từ server về như file cập nhật của spy, file của các chương trình khác cần cài ngầm...
1. badspy.c.dll và badspy.m.exe là các file thư viện và thực thi của spy.
1. debug.log là file debug của spy sử dụng thư viện [log-cpp](https://github.com/sontx/log-cpp), file này chỉ xuất hiện ở mode debug để phục vụ quá trình "test" sản phẩm. Ở mode release thì nó sẽ không có.

Lưu trữ phía server
-----------

Phía server sẽ ưu tiên lưu trữ sao cho ta có thể dể dàng đọc hiểu nhất và có thể lưu trữ cho nhiều spy khác nhau. Vì thế nên nội dung file log và cấu trúc folders ở đây sẽ khác với phía spy. Server sẽ lưu trữ các thông tin của victim theo cấu trúc cây thư mục, mỗi victim sẽ được cung cấp riêng một thư mục dựa vào địa chỉ MAC như sau:

![](https://3.bp.blogspot.com/-byeNQzq4E0g/V4NOuLtWbDI/AAAAAAAAO9k/QznWAFutTqE7sTc3zz3u38eDG7wuW5K-wCLcB/s1600/serverdir.png)

Dựa vào MAC ta sẽ phân biệt được các máy của victim với nhau, tiếp theo spy-version folder sẽ tương ứng với phiên bản của spy đã gửi log. Vì các spy có thể khác phiên bản nhau, như thế cấu trúc lưu trữ cũng có thể sẽ khác nhau, cho nên việc phân tách các folder riêng biệt cho các phiên bản là cần thiết.

Với phiên bản hiện tại, trong mỗi folder của spy sẽ chứa 2 loại file là desc file và log file:

1. Desc file(description file): đây là file chứa thông tin mô tả về victim, các thông tin này hữu ích để phân biệt các victim ngoài địa chỉ MAC. Hiện tại mới hổ trợ lưu trữ hostname của victim.
1. Log file: các file này sẽ chứa nội dung chính của spy gửi lên, định dạng của file này gồm 2 phần là prefix(loại log) và postfix(thời gian log được tạo ở client). 
- Klog file(keyboard log file): file lưu trữ dữ liệu hook bàn phím của victim.
- Scrot file(screenshot log file): file lưu trữ dữ liệu chụp ảnh màng hình của victim.

Đây là screenshot của 1 folder lưu trữ trên server.

![](https://1.bp.blogspot.com/-e63_0zcvAt8/V4NQNceFcBI/AAAAAAAAO9w/_5uiwb0f8sQnmGyNQWgeOcYPcBNLlPtzwCLcB/s1600/serverdir.png)

Thực ra mình định viết server bằng C# để sử dụng cùng một IDE với cái con spy luôn nhưng mà con "siêu server" ở phòng lại cài linux nên thành ra badserver được viết bằng java. Và bạn thấy đấy, với linux thì ta không cần "đuôi file" như bên Windows vì thế nên ta không cần quan tâm đến phần mở rộng của file.

Ngoài giải pháp này bạn có thể sử dụng một CSDL bất kỳ để lưu trữ như MySQL, SQLServer...để lưu trữ cho tiện quản lý, tìm kiếm, thống kê các kiểu...

Đây là source code của project: [https://github.com/sontx/badspy-project](https://github.com/sontx/badspy-project)
