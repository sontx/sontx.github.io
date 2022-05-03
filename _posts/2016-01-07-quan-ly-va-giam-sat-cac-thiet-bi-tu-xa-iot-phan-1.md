---
title: Quản lý và giám sát các thiết bị trong gia đình từ xa(IoT) - Phần 1
layout: post
description: Chào các bạn, vì lý do thi cử và đồ án ngập đầu nên mình không thể viết
  bài trong thời gian qua. Bây giờ mình đã trở lại với 1 chủ đề hoàn toàn mới(với
  mình) đó là Internet of Things(IoT), về lý thuyết của IoT thì các bạn có thể tìm
  hiểu thông qua google.com. Mình cũng chỉ vừa mới nguyên cứu IoT trong thời gian
  ngắn vì thế bài viết sẽ còn nhiều sai sót do đó các bạn có thể đóng góp ngay bên
  dưới phần comment.
tags:
- iot
- java
- tomcat
comments: true
category: programming
---

<span/>

Mở bài
-----

Bài toán: Quản lý và giám sát các thiết bị trong gia đình từ xa.

Viễn tưởng: Hảy thử tưởng tượng, chỉ với 1 chiết điện thoại thông minh ta có thể bật tắt đèn, tivi, tủ lạnh…chỉ cần ngồi ngoài quán net hoặc ở công ty hoặc ở trường chỉ cần có internet ta có thể biết thiết bị nào trong nhà đang hoạt động, hoạt động bao lâu, tiêu tốn bao nhiêu điện năng…và dĩ nhiên ta có thể tắt chúng từ xa nếu thích. Nếu đầu tư thêm, ta có thể khiến căng nhà trở nên thông minh hơn như tự động bật đèn nếu tối, bật quạt nếu nóng…Một viễn cảnh rất tuyệt vời phải không nào! 

How to: Mỗi thiết bị sẽ kết nối đến 1 máy tính trung tâm(đọc phần chuẩn bị bên dưới) thông qua mạng wifi có sẳn trong căng nhà. Mỗi thiết bị bây giờ được gắn với 1 vi mạch xử lý để điều khiển bật tắt và lấy thông tin tiêu thụ điện năng…Sau khi các thiết bị kết nối tới máy tính trung tâm của căng nhà ta có thể điều khiển theo mô hình devices <-LAN-> server <-interet/LAN-> app. 

Khó khăn: Để hoàn tất được công trình này ta cần thực hiện với 1 vài bạn khoa điện tử, vì bài toàn này động đến phần cứng thiết bị bên dưới như làm thế nào để lấy được điện năng tiêu thụ của 1 bóng đèn, làm sao để bật tắt 1 bóng đèn thông qua sóng wifi, làm sao để blabla. Ở các bước tiếp theo mình chỉ hướng dẩn các bạn 3 thứ: xây dựng server, app và điều khiển qua internet. Về phần thứ 4 là phần điều khiển và lấy thông tin thiết bị của căng nhà thì mình không dám chém vì kiến thức có hạn và mình cũng không có hứng thú nguyên cứu sâu về vấn đề này lắm. Sorry vì mình chỉ có thể hướng dẩn 3/4 chặng đường, 1/4 còn lại các bạn có thể làm cùng với 1 số thanh niên bên khoa điện để hoàn tất nốt ý tưởng còn dang dở này nhé! 

Mở rộng: Sau khi nắm toàn quyền kiểm soát ngôi nhà rồi nghĩa là lúc đó mọi(hoặc gần hết) thiết bị trong nhà điều đã được kết nối với nhau thì đó là lúc ta “thổi hồn” vào cho căn nhà để tạo ra 1 smart house thực sự! Kết hợp với các cảm biến như cảm biến nhiệt độ, ánh sáng, chuyển động blabla ta có thẻ bật tắt quạt, đèn, tivi các kiểu, điều chỉnh nhiệt độ điều hòa, tự tắt các thiết bị nếu không cần thiết để tiết kiệm điện…một cách hoàn toàn tự động. Tiếp theo ta có thể nhận diện dọng nói thông qua điện thoại để điều khiển căn nhà. Một hướng khác, tưởng tượng mọi thông tin điện năng tiêu thụ đều được gửi đến thiết bị điều khiển trung tâm(ở đây ta dùng 1 con Raspberry Pi 2) rồi từ con pi2 này có thể gửi thông tin đến 1 server chính để thống kê điện năng tiêu thụ từ đó tín được tiền điện thay vì bây giờ các bác phải trèo trụ điện để xem đồng hồ, tiết kiệm biết bao. Ngoài ra thông tin sử dụng thiết bị của mọi người dùng sẽ được thống kê lại từ đó ta có thể dể dàng biết được loại thiết bị gì được sử dụng với tần suất bao nhiêu, thời gian sử dụng trung bình blabla, chắc thông tin này sẽ có một số bác cần. Và sau vài năm nữa, khi mà đồng hồ thông minh trở nên rẻ và phổ cập hơn, ta có thể chuyển từ điện thoại qua đồng hồ, chỉ cần đồng hồ lên miệng và ra lệnh y như phim khoa học viễn tưởng, tiện hơn điện thoại phải không nào! 
Mà thôi, mơ thế đủ rồi, giờ chiến thôi nào!

Chuẩn bị
-----

Để thực hiện được ý tưởng này chúng ta cần một số thiết bị:

1. Raspberry Pi 2(Pi2): đây chính là đầu não của căng nhà, nơi tập trung xử lý, lưu trữ và điều khiển, kết nối blabla các kiểu. Vì lý do nguyên cứu và tiền năng có hạn nên chúng ta chỉ cần sử dụng chính laptop(hoặc desktop) như 1 con Pi2.
1. Điện thoại thông minh: ở đây chúng ta dùng android, một hệ điều hành thông dụng và dể phát triển. Nếu các bạn chưa có điện thoại thì có thể dùng giả lập.
1. Router, cái này chắc dảy trọ nào cũng có rồi nhỉ, ở đây mình dùng loại TP-LINK WR841N. Đây chính là 1 trong những mấu chốt giúp ta có thể truy cập vô con pi2 thông qua internet.

Tiếp theo là 1 số kiến thức lập trình:
1. Lập trình với java servlet theo mô hình MVC: chúng ta sẽ xây dựng một web service ngay trên con pi2 bằng servlet, lý do sử dụng web service là vì ta có thể hộ trợ cả trình duyệt thay vì mobile như hiện nay.
1. Lập trình java android: dùng phát triển ứng dụng giao tiếp với cái web service bên trên.
1. SQLite, lưu trữ csdl trên pi2: vì ta không cần lưu qúa nhiều thông tin phức tạp nên dùng em nó là hiệu qủa nhất.

Giờ đến phần công cụ:
1. Eclipse EE: cái này dùng để làm webservice, tải bản mới nhất tại đây nhé.
1. Android Studio: cái này thì dùng để phát triển app android, tải ở đây.
1. Tomcat8: java servlet thì không thể thiếu em này được rồi, tải ở đây nhé.
1. Genymotion: gỉa lập máy ảo android cho bạn nào chưa có điện thoại để test, tải ở [đây](https://www.genymotion.com/).

Mô hình
-----

Nhìn sơ sơ nó sẽ như vầy

![](https://docs.google.com/uc?authuser=0&id=0ByMQfqYoGjfURUF5bVZFU1V3ZFE&export=download)

Các thiết bị và app đóng vai trò là client còn pi2 đóng vai trò là server, mọi kết nối sẽ thông qua wifi LAN đối với các thiết bị, đối với app ta có thể kết nối thông qua wifi LAN hoặc internet.
Mô hình kết nối cụ thể sẻ như hình bên dưới:

![](https://docs.google.com/uc?authuser=0&id=0ByMQfqYoGjfUTC1ucUtacE5mNzg&export=download)

1. kết nối thông qua LAN, trường hợp người dùng đang ở nhà. 
1. kết nối thông qua internet, trường hợp người dùng đang ở nơi khác(ngồi ngoài quán nét chẳng hạn).

Nhiệm vụ chúng ta là xây dựng server trên pi2(1), ứng dụng điều khiển trên android(2) và điều chỉnh router(3) để có thể truy cập từ internet vào pi2. Nhiệm vụ 1 và 2 sẽ được thực hiện song song nhau, sau khi hoàn tất ta sẽ điều khiển thông qua wifi LAN, sau khi hoàn tất nhiệm vụ 3 thì ta có thể điều khiển qua internet.

Tạm kết: Phần một đến đây là kết thúc, cảm ơn cảc bạn đã kiên nhẩn để đọc.

Ở phần 2 chúng ta sẽ lâm trận thực sự, xây dựng 1 phần hoặc toàn bộ nếu có thời gian cho webservice và app. Phần 3 mình sẽ nói về vấn đề truy cập vô pi2 thông qua internet và chốt lại 1 số điểm.
