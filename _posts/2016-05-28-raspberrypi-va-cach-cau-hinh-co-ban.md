---
title: Raspberry Pi và cách cấu hình cơ bản
layout: post
description: >
  Sau thời gian ăn nằm với đồ án thì mình sẽ trở lại với nhiều chủ đề mà mình có dịp tiếp xúc trong thời gian qua, các chủ đề đều bắt nguồn từ đồ án hoặc những project mà mình từng làm. 96% trong số chúng là mình tự tìm hiểu nên sẽ không tránh được sai sót vì thế nếu bạn nào thấy mình sai thì cứ nhiệt tình góp ý ở mục comment bên dưới, mình sẽ cập nhật nhanh nhất có thể. Trong bài viết này mình sẽ giới thiệu về Raspberry Pi và cách cấu hình một số tính năng để sử dụng nó hiệu quả hơn.
tag: [uncategory]
comments: true
---
Về phương diện một nhà phát triển ứng dụng thì chúng ta không cần hiểu quá sâu về cấu trúc phần cứng của raspberry, chỉ cần biết một số thông tin cơ bản như sau:

* Raspberry là một “Máy tính” siêu nhỏ, vâng, nó là một máy tính(chỉ trừ nó không có màng hình thôi) và nó chẳng khác gì thùng máy ở phòng bạn đâu.
* Vì nó là một máy tính nên dĩ nhiên nó có thể được cài đặt các hệ điều hành từ windows cho đến linux, các hệ điều hành này sẽ được xây dựng riêng cho các thiết bị cấu hình thấp như nó. Khi đã có hệ điều hành hậu thuẩn thì ta có thể dể dàng phát triển các ứng dụng trên raspberry rồi. Có rất nhiều hệ điều hành, bạn tha hồ lựa chọn cho con rasp của mình ở đây: [https://www.raspberrypi.org/downloads/](https://www.raspberrypi.org/downloads/)
* CPU của nó có kiến trúc ARM chứ không phải là x86, đa số trường hợp thì ta sẽ không cần quan tâm đến điều này nhưng khi sử dụng 1 số thư viện được biên dịch cho các kiến trúc khác nhau thì phải cẩn thận kẻo crash bất đắt kỳ tử nhé. Ví dụ dưới đây là các phiên bản khác nhau của bộ thư viện sqlite4java được biên dịch cho rất nhiều hệ điều hành và kiến trúc vi xử lý tương ứng.
![](https://4.bp.blogspot.com/-Shbr4CnNhgs/V0kavP4Q74I/AAAAAAAAOfM/d_pfcLmfZJYcM--3-ARsPWHeqsATes-OwCKgB/s1600/Capture.PNG)

* Bộ nhớ của nó cũng khá ổn, thấp nhất cũng 512M, con hiện tại của mình cũng đc 1G bộ nhớ rồi. Như thế thì có thể lướt facebook được rồi nhỉ :))
* Kích thước khá nhỏ gọn, chỉ lớn hơn con chuột máy tính 1 chút thôi.
* Giá: rẻ, rất rẻ. Chưa đến 1 triệu khi về tới thiên đường Việt Nam chúng ta(giá gốc là 35$ thì phải). Cách đây vài năm thì chắc chẳng ai nghỉ rằng sẽ có ngày cái thùng máy to cồng kềnh sẽ được thu gọn vô 1 cái “hộp nhựa” bỏ vừa túi quần, nhưng với sự phát triển của công nghệ thì không có gì là không thể. Và raspberry ra đời, kích thước nhỏ, hiệu năng cao và giá khá rẻ, chỉ cần tiết kiệm tiền gái gú 1 tháng thôi là đủ tậu 1 em về rồi.
* Hộ trợ: trang chủ của [Raspberry](https://www.raspberrypi.org/) có hổ trợ đầy đủ mọi mọi thứ, từ tài liệu, hỏi đáp forum đến hệ điều hành…Và dĩ nhiên trên internet cũng có khá nhiều chủ đề về con này nên bạn không phải lo lắng nếu gắp vấn đề.

Đoạn đầu làm nhảm đọc chơi thôi, các chi tiết khác bạn nên search thêm trên google sẽ rỏ hơn. Tiếp theo mình sẽ mô tả về "thùng máy" raspberry.

Trên tay “thùng máy” raspberry
-------

Mình sẽ show chi tiết ảnh chụp các phần của raspberry và bạn sẽ thấy nó chẳng khác gì 1 thùng máy.

Đây là 1 con raspberry pi2, thiết kế khá nhỏ gọn nhưng đầy đủ chức năng từ cổng usb, HDMI, sound, sdcard blablabla…Thiết kế trong suốt nên bạn có thể nhìn thấy được toàn bộ “ruột gan” bên trong, trông khá lầ ngầu phải không nào.

![](https://4.bp.blogspot.com/-XEahcTkbZqM/V0ko1GsJQUI/AAAAAAAAOfk/8dqzGwi0uN8LivjLo57crEz_pcdHewwiQCKgB/s1600/P_20160528_104705.jpg)

Ba cổng lần lượt từ trái qua phải là: nguồn, HDMI và sound. Nguồn cung cấp cho raspberry có thể sử dụng ngay cổng usb của laptop hoặc xạc điện thoại(dòng lớn tí không là nó chập chờn lắm). HDMI để xuất hình ảnh ra màng hình, bữa nay thì đa số màng hình đều hổ trợ HDMI cả rồi nên bạn cũng không cần lo lắng về vấn đề này, nếu bạn sử dụng màng hình củ hổ trợ VGA thôi thì có thể sử dụng cáp chuyển đổi. Vấn đề màng hình đối với raspberry không quan trọng lắm vì đa số thời gian chúng ta làm việc với nó thông qua remote terminal chứ không làm trực tiếp.

![](https://4.bp.blogspot.com/-5w4QCkQMfhU/V0kqPvn8KlI/AAAAAAAAOf4/cAzDyabOzU4ly6wf1bRHnwc6jWIHxpQEgCKgB/s1600/P_20160528_104720.jpg)

Còn đây là chổ để bạn “nhét” sdcard, vì raspberry không có “ổ cứng” như thùng máy nên ta sử dụng thẻ nhớ sdcard để thay thế ổ cứng.

![](https://2.bp.blogspot.com/-rn3qZXV5GBk/V0ktu6Yh_gI/AAAAAAAAOgo/I9T3sO8Dyw4LirwnEdLbyCsrzNqKf_WUACKgB/s1600/P_20160528_104801.jpg)

Các cổng kết nối của raspberry bao gồm 4 cổng usb và 1 cổng ethernet. Bốn cổng usb này có thể dùng để cắm chuột, bàn phím, module wifi, usb…nói chung thứ gì bạn cắm vừa thì cứ cắm. Thường thì khi mua raspberry người ta sẽ tặng kèm theo cái module wifi, nghe đồn là thế vì con này mình chôm của người ta chứ không phải mua mới nguyên hộp :)). Không có module wifi cũng không sao cả, đã có cổng ethernet nên chỉ việc cắm cáp mạng vô thôi.

![](https://2.bp.blogspot.com/-HVBHOQ35BH8/V0kuRcJ4t1I/AAAAAAAAOg4/MWQog1P4imskWmEpPsOvgWd1P4qwWpyhwCKgB/s1600/P_20160528_104815.jpg)

> Qua các ảnh review bên trên thì ta thấy rằng raspberry chính nó là một máy tính với đầy đủ các bộ phận từ CPU, RAM, ethernet, cổng usb blablabla…

Đây là ảnh so sánh kích thước của raspberry với con chuột máy tính, khá nhỏ phải không nào. Không những nhỏ mà nó còn khá nhẹ nữa, ngan tầm một chiết smartphone thôi.

![](https://4.bp.blogspot.com/-4CVaFwIAEQ0/V0kvnBHJfjI/AAAAAAAAOhU/iL6vLkmlDUQIF-IScpbIptM7-RmYZjkVACKgB/s1600/P_20160528_104850.jpg)

Để khởi động raspberry bạn chỉ cần cắm nguồn vào cho nó thôi, đèn nguồn sẽ sáng lên như trong hình và nó tự động boot vào hệ điều hành đã cài.

![](https://2.bp.blogspot.com/-UoDiFbWDmr4/V0kwDOVe0JI/AAAAAAAAOhk/ym6TdBIZVjM5LU7cB5v2vXbqAXIMZABiwCKgB/s1600/P_20160528_105032.jpg)

> Nói sơ qua về việc cài đặt hệ điều hành cho raspberry: Lên trang chủ tải hệ điều hành về(có rất nhiều loại, thích cái nào tải cái ấy, free cả), sau đó format sdcard và giải nén file hệ điều hành đã tải vào là xong(đại khái nó đơn giản đến khó tin thế thôi).
Vì raspberry là máy tính nên dĩ nhiên có thể dual-boot rồi, nhưng mà có 1 điểm trừ(bây giờ không biết đã có giải pháp khắc phục chưa) đó là không thể dual-boot vừa linux vừa windows được, chọn thèn này thì phải vứt thèn kia thôi.

Cấu hình
------

Từ phần này trở đi mình sẽ demo về [RASPBIAN JESSIE LITE](https://www.raspberrypi.org/downloads/raspbian/), phiên bản không hổ trợ giao diện desktop(đơn giản là vì nó không cần thiết). Nếu bạn mới sử dụng và chưa quen với linux thì có thể cài các hệ điều hành khác có giao diện desktop như phiên bản [RASPBIAN JESSIE](https://www.raspberrypi.org/downloads/raspbian/) chẳng hạn.

Các bước cài đặt raspbian lite các bạn có thể hỏi thêm bác google, sau đây ta sẽ lần lược cấu hình 2 thứ khá quan trọng cho con rasp yêu quý là remote terminal sử dụng ssh và truyền file bằng ftp.

> Chú ý là phải cắm mạng vô cho con rasp nhé, cáp mạng hay module wifi đều được.

Đầu tiên là bạn phải cần một màng hình, bàn phím và chuột để kết nối vô con rasp. Giao diện đen thui huyền bí sẽ hiển thị như sau:

![](https://1.bp.blogspot.com/-UWv3TiD3sCA/V0kz05AGlfI/AAAAAAAAOiA/MB5kOYZPftYdluiCR02w8X-frX1OL6xpACKgB/s1600/Capture.PNG)

Để đăng nhập thì bạn sử dụng tài khoản mặt định như sau:

```
User: pi
Password: raspberry
```

Nếu bạn muốn thay đổi mật khẩu để tăng tính bảo mật thì chỉ cần sử dụng lệnh: `passwd`

![](https://2.bp.blogspot.com/-YlaR3qXNwXk/V0k1ApcEJhI/AAAAAAAAOiU/K7kfyJ5PzAcbgxV2nZYOXFBFdvgtHj0hwCKgB/s1600/Capture.PNG)

Remote Terminal via SSH
--------------

Đầu tiên bạn cần enable ssh server trên con rasp bạn làm như sau: tại màng hình nhập vào dòng lệnh sau rồi enter.

```
sudo raspi-config
```

Màng hình xanh đỏ sặc sở hiện lên trông khá hại não, sử dụng dấu mũi tên trên bàn phím để di chuyển cái menu nhé. Lựa chọn mục 9 là “Advanced Options”

![](https://1.bp.blogspot.com/-4cYo20a7_ro/V0k3GeIO-QI/AAAAAAAAOis/6EdW73OLu0IdQysJyCEbvreEvSc1PQ5BQCKgB/s1600/Capture.PNG)

Enter để chọn, sau đó lại hiện ra 1 menu hại não không kém, chọn tiếp mục A4 là “SSH”

![](https://4.bp.blogspot.com/-Du4PMrM13RA/V0k3-3fgTnI/AAAAAAAAOjA/_zcff91knzQqoBuP-_GciK-WN2xU1iYkwCKgB/s1600/Capture.PNG)

Nó sẽ hỏi có muốn enable cái ssh server không, ừ thì “Enable” thôi.

![](https://4.bp.blogspot.com/-F6p3ZOVFY_Y/V0k4QHpWEXI/AAAAAAAAOjQ/6vwYgtTlULkzPkFA8acyYSQ4lerbyFtggCKgB/s1600/Capture.PNG)

Enable thành công nó sẽ hiển thị kiểu như thế này.

![](https://1.bp.blogspot.com/-9Zbom0NYkKE/V0k4cpTgt5I/AAAAAAAAOjg/-4ajsA-XelUB-4M4N1SYaskdckzkL7HrgCKgB/s1600/Capture.PNG)

Xong việc rồi, thoát khỏi menu này để trở lại màng hình đen huyền bí thôi.

Giờ câu hỏi là làm sao để remote terminal được. Kiểu như mình không cần phải lắp màng hình, chuột, bàn phím các thứ vào con rasp nữa mà vẩn có thể remote cái cửa sổ đen huyền bí đó từ laptop của ta(cứ tưởng tượng như kiểu teamview ấy). Câu trả lời khá đơn giản, sử dụng bất cứ ssh client nào và kết nối tới con rasp là xong.

Mình sẽ sử dụng PuTTY trong loạt bài viết này, bạn có thể tải về tại trang chủ: [http://www.putty.org/](http://www.putty.org/)

Giao diện của PuTTY như sau:

![](https://3.bp.blogspot.com/-qAHMLeZij9I/V0k5zqjsGpI/AAAAAAAAOj8/mcYzkeeS-KA2RbPDURKg59conRZg_WDaACKgB/s1600/Capture.PNG)

Mục IP sẽ là địa chỉ IP của con rasp, để biết được địa chỉ IP của nó thì có nhiều cách:

1. Vào trang quản lý của router xem luôn: cách này thì cần tài khoản admin mới vô được.
![](https://1.bp.blogspot.com/-nsBOHHnp73I/V0k7LLeRHPI/AAAAAAAAOkU/Pw8zqra-IKk4zE7xhTxolyBgFuCQIsw_QCKgB/s1600/Capture.PNG)
1. Cấu hình địa chỉ IP tỉnh cho con rasp, cách cấu hình thế nào thì hỏi bác google để biết thêm chi tiết: đại khái là cấu hình trong file interfaces.
1. Hỏi google.

Sau khi bạn có được IP của con rasp, điền nó vào mục IP của PuTTY(các cấu hình khác cứ làm như hình nhé) rồi chọn “Open”. Một màn hình đen hiện lên yêu cầu bạn đăng nhập, cứ nhập user và password của con rasp vào là được. Sau khi đăng nhập thành công thì bạn có thể làm việc với con rasp thông qua PuTTY rồi, giao diện của nó chẳng khác gì cái màng hình đen huyền bí lúc ban đầu cấu hình cho rasp nhỉ.

> Các ảnh chụp màng hình bên trên mình sử dụng PuTTY để remote con rasp đấy.

File transfers via FTP
--------

Chỉ cần cài đặt [Pure-FTPd](https://www.pureftpd.org/project/pure-ftpd) trên con rasp theo cú pháp:

```bash
sudo apt-get install pure-ftpd
```

Xong! Về cơ bản ta đã có thể sử dụng các FTP client để truyền nhận file với con rasp. Ví dụ ở đây mình sử dụng [FileZilla](https://filezilla-project.org/). Nhập IP của con rasp, user và password cũng là của con rasp luôn sau đó thì chọn “Quitconnect”

![](https://3.bp.blogspot.com/-Oj2A-45rOKQ/V0lCslxh9oI/AAAAAAAAOks/pNgb-9tDBsoL2qbAep_krTxq0ReXefcrgCKgB/s1600/Capture.PNG)

Một khi đã kết nối và đăng nhập thành công thì bạn có thể gửi nhận file từ laptop với con rasp một cách khá đơn giản.

Kết bài
----

Với một chiết máy tính mini có thể online 24/7 như thế thì ta có cả khối việc để làm như:

1. Biến nó trở thành một server có thể truy cập từ internet với sự hổ trợ của ddns.
1. Quản lý, giám sát các thiết bị trong gia đình.
1. Lưu trữ và phân tích dữ liệu nosql bằng cách kết hợp nhiều con rasp lại với nhau nhằm mục đích nguyên cứu và học tập.
1. Trở thành bộ não của roboot, ví dụ như bạn chế ra một roboot sử dụng arduino để điều khiển bộ phận của nó và thông qua module wifi bạn kết nối nó với con rasp và chính con rasp sẽ chứa chương trình xử lý mọi hoạt động(brain) của con roboot đó như thế thì nó có thể “suy nghỉ” nhanh hơn :))
1. Chốt: dùng để lướt facebook nếu muốn chơi trội và tiết kiệm điện :))