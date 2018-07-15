---
title: Cài đặt và sử dụng WindowBuilder trong Eclipse
layout: post
description: >
  WindowBuilder là 1 plugs-in của Eclipse thần thánh dùng để thiết kế giao diện AWT hoặc Swing bằng cách kéo thả vì thế nên giúp lập trình viên tiết kiệm khá nhiều thời gian viết code. Theo mặt định thì Eclipse không có cài sẵn WindowBuilder vì thế nên chúng ta sẽ cài bằng tay và đây cũng chính là chủ đề của bài viết này.
tag: [programming]
comments: true
---
<span/>

Download WindowBuilder
--------

Các bạn tải WindowBuilder ở đây: [WindowBuilder Eclipse](http://www.eclipse.org/windowbuilder/download.php), chú ý chọn bản WindowBuilder phù hợp với bản Eclipse hiện tại trong máy nhé.

![](https://4.bp.blogspot.com/-dvgeNwErhg8/Vwd0dbe6vhI/AAAAAAAAOSE/tPpbzAxi5Js6T8_kINjJ3qjRaKzUDF24g/s1600/Capture.PNG)

Install WindowBuilder
----------

Bước tiếp theo khá đơn giản, đầu tiên mở Eclipse lên và vào mục Install New Software… trong menu help.

![](https://4.bp.blogspot.com/-uaieMmWVCMI/Vwd1YhCHJcI/AAAAAAAAOSY/y4uAIhISJnUjRi7biQGpkxYa3NW7BQ8zw/s1600/Untitled.png)

Sau đó thêm file WindowBuilder mới tải vào danh sách Repository như ảnh:

![](https://1.bp.blogspot.com/-teIfiHq-glI/Vwd2E5Iw5rI/AAAAAAAAOSs/Z7kcncZM6jYKlIFYUXQgZ2olraXgSpB7g/s1600/Capture.PNG)

Đặt cho Repository này 1 cái tên, ở đây mình đặt là wb, cuối cùng là nhấn OK. Danh sách hiển thị các mục có trong Repository này, chọn mục cần cài(ở đây mình chọn Swing và WindowBuilder engine) sau đó nhấn next.

![](https://3.bp.blogspot.com/-2KG_V8i86Dg/Vwd3FLqr75I/AAAAAAAAOTE/BUfkIfKLCYMhUa27tk0YZYjXddMfZhXWQ/s1600/Capture.PNG)

> Ở đây mình cài mấy cái này rồi nên nút next nó bị mờ đấy.

Sau khi nhấn next thì hộp thoại mới hiển thị danh sách các mục sẽ được cài đặt, cứ thế mà next tiếp thôi. Tiếp theo hộp thoại xác thực bản quyền các thứ hiện lên, không cần đọc nhỉ, tick vào *I accept the terms…* để nó cho mình cài 😂. Sau khi accept xong thì nút finish sáng lên, click vào đó và đợi nó cài đặt thôi.

How to use it?
-------

Cách sử dụng thì đơn giản cực, đầu tiên tạo 1 class bình thường và thực thi từ JFrame(nếu làm swing) hoặc Frame(awt).

```java
import javax.swing.JFrame;

public class TestSwing extends JFrame {
}
```

Tiếp theo click chuột phải vào file class được tạo ra và chọn **Open With**, chọn tiếp **WindowBuilder Editor**

![](https://4.bp.blogspot.com/-5Puj-Bx1ndA/Vwd6B-CUx5I/AAAAAAAAOTw/_Fby_WdydzQWVRzF4vcexKOpW1cEctJIA/s1600/Untitled.png)

Nếu mới mở lần đầu thì nó sẽ load hơi lâu 1 tí nên các bạn phải kiên nhẩn nhé. Khi mở với **WindowBulder Editor** thì có 2 cửa sổ là Source(để code) và Design(để kéo thả), source thì như trình Java Editor của Eclipse xưa nay vẩn dùng còn design thì là giao diện kéo thả cho phép chúng ta thiết kế giao diện 1 cách trực quan và dĩ nhiên code nó sẽ tự sinh ra trong phần source rồi. Để chuyển đổi giữa 2 chế độ này thì chỉ cần chọn tab tương ứng bên dưới là được:

![](https://1.bp.blogspot.com/-ob0NgAw2a7w/Vwd7dyRJNrI/AAAAAAAAOUI/-ctaJAkSt801X1JKinLqqounwzEqx6MFA/s1600/Capture.PNG)

Giao diện kéo thả nó trông thế này:

![](https://2.bp.blogspot.com/-H9rrDSU2g_o/Vwd71guWX3I/AAAAAAAAOUY/-hem_khwLqk83SCg5Cvtkp845-OyqCSBw/s1600/Capture.PNG)

1. Danh sách các components đã thêm vào, nó sẽ hiển thị dạng cây(như kiểu cây thư mục ấy)
1. Chỉnh sửa hoặc xem các thuộc tính của component được chọn.
1. Đa số các component hiện có, click chuột trái vào 1 component bất kỳ sau đó rê chuột đến nới cần thêm trên cửa sổ(số 4) sau đó click chuột xuống phát nữa để “thả” component này vào chổ đó. Các components được nhóm lại theo từng loại vì thế khá tiện cho tìm kiếm.
1. Cửa số giao diện, kéo thả component vào đây.

Khi bạn muốn thêm 1 component vào danh sách component(số 3) ví dụ như 1 custom component chẳng hạn, đơn giản là click chuột phải vào bất kỳ vị trí nào trong số 3, sau đó chọn **Add component…**

![](https://4.bp.blogspot.com/-wdACd6t26LE/Vwd98O9u6QI/AAAAAAAAOU0/_O-JLPLQgAMwco3nzGdLsVfd1v2MaCzrg/s1600/Untitled.png)

Cửa sổ mới hiện ra cho phép bạn lựa chọn component cần thêm vào, làm như hình nhé:

![](https://1.bp.blogspot.com/-evHfzM4BvHM/Vwd-qvDnF1I/AAAAAAAAOVI/-3kHD-9KKaQcVWzY63YJ-iyVGTBvCKMIg/s1600/Capture.PNG)

Chỉ cần nhập tên component cần thêm vào trong textbox và nó tự động lọc kết quả cho bạn, lựa chọn component trong danh sách hiện ra(trên hình thì có mỗi 1 cái) sau đó chọn OK.

Cửa sổ lúc nảy sẽ tự động update thông tin các trường tương ứng với component vừa được chọn, thay đổi các thông tin này cho phù hợp hoặc để thế mà OK nếu lười.

![](https://3.bp.blogspot.com/-xyQ3C2FGdek/Vwd_Wvi7uzI/AAAAAAAAOVg/_HgQ5f2L0SoeyIjv66th6sO4rta_ecb_g/s1600/Capture.PNG)

Và kết quả đây:

![](https://4.bp.blogspot.com/-LGkqVp8dT40/VweALOuUTCI/AAAAAAAAOV0/Z-B6tmiIXxU9Js_EL6DjxHVoMHoIFg-ig/s1600/Untitled.png)

Chú ý kích thước cửa sổ sẽ không được lưu lại đâu nhé, kiểu như mình thay đổi kích thước cửa sổ bằng cách kéo giảng các cạnh của nó như thế này:

![](https://4.bp.blogspot.com/-F7XITzTCg6Y/VweBICJLI4I/AAAAAAAAOWI/24Eam3sOhpENsrR8YmjoOwrayIw5CBGtQ/s1600/Untitled.png)

Thì kích thước mới này vẩn không được apply vào code và dĩ nhiên là khi chạy thì kích thước cửa sổ sẽ không như ta kéo 😂 Đây không biết có phải là 1 bug hay là 1 “tính năng” thông minh của WindowBuilder nữa. Để giải quyết nó thì làm đơn giản như sau: Vào source code và thêm dòng setSize(100, 100) sau đó quay lại desgin để thay đổi kích thước cửa sổ.

Thật ra thì setSize bao nhiêu cũng được.

![](https://2.bp.blogspot.com/-CcMjvvvtvRM/VweCUEt8peI/AAAAAAAAOWc/CkdgJtTIOw4F29iteKZXjMVaA0GOyHdOA/s0/Capture.PNG)

Tiếp nào!

Để chọn nhiều components trong design thì chỉ cần nhấn giữ Alt và kéo thôi.

![](https://3.bp.blogspot.com/--B3Ig88g5Sc/VweDB2kkb7I/AAAAAAAAOWw/Et88nFBbL1QiRTiGRpQ_UYMJqeHTJ6wdA/s1600/Untitled.png)

Ở cửa sổ design thì có thể dể dàng xem thành quả thiết kế của chúng ta, chỉ cần click chuột phải vào frame và chọn **Test/Preview…**

![](https://1.bp.blogspot.com/-TI1LAoo77-o/VweDi8ocumI/AAAAAAAAOXE/wMCrvITA_6Q0zdkBtuUsG6fkM3ERT5iXg/s1600/Untitled.png)

Bonus
----

Vấn đề giao diện look and feel trong java, khi chạy chế độ preview thì mặt định look and feel là của hệ điều hành, còn khi chạy thực tế thì nó là của java 😂 nói chung là xấu, xấu không thể tả được. Để thay đổi look and feel khi chạy thực thì chỉ cần làm như sau:

OK, gọi hàm này trước khi tạo frame thôi 😂 Hàm này sẽ set look and feel của java thành của hệ điều hành, ở đây có nhiều loại look and feel lắm, từ từ khám phá nhé.

Ví dụ nhỏ để phân biệt look and feel mặt định và của windows:

Look and feel mặt định
![](https://4.bp.blogspot.com/-6GVgqDEg_rc/VweHPPHcxrI/AAAAAAAAOXg/x0nst2x5hpUUR30b6GG4k9Vi7HlDVp-0A/s320/Capture.PNG)

Look and feell của Windows
![](https://3.bp.blogspot.com/--kDwuXtVK08/VweIJsTsQdI/AAAAAAAAOX0/p5xlWt_2Z_8IuKvJXVdGnhSwPvLuKI3sQ/s320/Capture.PNG)

