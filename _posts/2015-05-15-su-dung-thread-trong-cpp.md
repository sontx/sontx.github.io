---
title: Sử dụng thread trong C++
layout: post
description: >
  Bài viết này sẽ hướng dẩn các bạn cách sử dụng thread trong C++ trong Windows. Một bài nâng cao hơn về làm việc với thread trong Win32 [Class C++ và CreateThread Win32 API](/2016/06/13/class-cpp-va-create-thread-win32-api/).
tag: [programming]
comments: true
---

Trước đây khi mới học về lập trình chắc hẳn chúng ta đều được biết rằng các câu lệnh trong chương trình của mình sẽ được thực hiện một cách tuần tự từ trên xuống từng công việc 1, như việc nấu cơm, đầu tiên là đổ gạo vào nồi, tiếp theo là vo gạo, tiếp nữa là đặt nồi lên bếp, và cuối cùng là ngồi đợi cơm chín. Nhưng thực tế thì lúc ngồi đợi cơm chính chúng ta có thể giành thời gian đợi đó để ôm điện thoại nhắn tin cho gấu phải không nào, chứ không ai rảnh mà ngồi nhìn chằm chằm vào nồi cơm đợi cho nó chín cả. Trong lập trình cũng thế, trong lúc đợi công việc 1 hoàn tất thì ta có thể thực hiện công việc 2 để tiết kiệm được thời gian, ví dụ như ta có hàm thứ 1 làm nhiệm vụ tính số fibonacci cực lớn,  hàm thứ 2 làm nhiệm vụ tính số giai thừa cực lớn, điều ta cần ở đây là tính tổng của 2 số này, ta có 2 cách:

* Tính số fibonacci xong rồi tính giai thừa cuối cùng là tổng chúng lại(cách này đa số chúng ta sẽ dùng)
* Tính số fibonacci và trong lúc đợi nó tính(đợi cơm chính) thì ta tính tiếp số giai thừa(ngồi nhắn tin cho gấu), cho 2 việc đó thực hiện song song nhau, sau đó đợi chúng tính song sẽ tổng lại.

Đây chỉ là 1 ví dụ đơn giản về việc thực hiện 2 việc song song nhau để tiết kiệm thời gian, trong thực tế việc thực hiện song song 2 hay nhiều việc được áp dụng khá nhiều trong lập trình giao diện, lập trình xử lý I/O...Cụ thể như việc tìm kiếm 1 phần tử trong 1 mảng rất lớn các phần tử, ta có thể tìm từ đầu đến cuối mảng, ngoài ra ta có thể chia mảng làm nhiều phần và thực hiện việc tìm kiếm phần tử đó trong các phần của mảng cùng lúc. Cũng hơi hoang mang style phải không nào.

rồi! giờ đi vào bài toán thực tế để hiểu cách làm việc song song là như thế nào.
Đầu tiên ta có đoạn code rất bình thường như sau:

![](https://3.bp.blogspot.com/-X4PyIDvLNEw/VVWZ0hgzLJI/AAAAAAAABSw/P1-1XUBUKG4/s1600/Capture.PNG)

Và đây là kết quả:

![](https://3.bp.blogspot.com/-kI9Y25UcLbg/VVWaMeiL5GI/AAAAAAAABS4/pJNttX9lUhs/s1600/Capture.PNG)

Ở đây ta thấy `ham1()` thực hiện xong đến `ham2()` rồi sau đó là vòng `for` trong hàm `main()`, cách thực hiện tuần tự rất dể hiểu; Còn giờ là đoạn code bất thường của chúng ta:

![](https://2.bp.blogspot.com/-lWmH-o9lLeM/VVWc7b3TutI/AAAAAAAABTE/jhGT2c85R48/s1600/Capture.PNG)

Và đây là kết quả:

![](https://4.bp.blogspot.com/-C4FnbacOY9M/VVWdbKg18vI/AAAAAAAABTU/9G9e87PU5dk/s1600/Capture.PNG)

Ở đây kết quả hiển thị bị đảo lộn, không theo một trật tự nào cả, lý do là 3 vòng for trong 3 hàm ham1(), ham2() và main() đã được chạy một cách song song, nghĩa là chúng chạy đồng thời với nhau chứ không theo tuần tự từ trên xuống như đoạn code 1 nữa. Đây chính là cách để làm nhiều việc cùng 1 lúc. Như đã thấy, cả 3 vòng for đều được chạy gần như cùng lúc. Oke! giờ chúng ta sẽ đi vào chi tiết đoạn code bất thường ở trên để xem tại sao lại có thể làm cho 3 vòng for chạy gần như đồng thời được như thế.

Ở đoạn code này có 3 điểm bất thường:
* `#include <windows.h>`: cái này dùng để sử dụng các hàm API của Windows, cụ thể ở đây là hàm `CreateThread(...)`
* `DWORD WINAPI ThreadProc(LPVOID param)`: nôm na đây chính là hàm sẽ được chạy song song với hàm main của chúng ta.
* `CreateThread(...)`: đây chính là hàm sẽ khởi tạo và chạy 1 tiểu trình(thread) trong tiến trình(process) hiện tại, mà tiểu trình và tiến trình là gì thì google.com sẽ giải thích, đại khái nó sẽ làm cho hàm ThreadProc(đối số thứ 3) chạy song song với hàm main, nghĩa là hàm main cứ làm việc của hàm main, hàm ThreadProc cứ làm việc của hàm ThreadProc.

Ở đây cần chú ý đến cách sử dụng hàm CreateThread, tạm thời chúng ta chỉ cần quan tâm đến 1 đối số của hàm là đối số thứ 3, vì vậy sau này bạn muốn cho 1 hàm chạy song song với hàm main thì cứ làm như sau cho đơn giản:

![](https://3.bp.blogspot.com/-OqdksQc60iE/VVWjPyOizQI/AAAAAAAABTk/4pxVY7laiJg/s1600/Capture.PNG)

Như thế bạn chỉ cần truyền tên hàm cần chạy song song với hàm main vô ThreadProc1 như trong hình là được(chú ý là hàm truyền vô cần có nguyên mẫu hàm là `DWORD WINAPI tên_gì_đó_ở_đây(LPVOID param))`
Bây giờ ta nguyên cứu hoạt động của code bất thường ở trên. Đầu tiên mọi việc sẽ được thực hiện tuần tự như sau, hàm main chạy->hàm CreateThread thứ 1 chạy->hàm `CreateThread` thứ 2 chạy->vòng `for` trong `main` chạy. Vấn đề nảy sinh ở đây chính là khi 2 hàm `CreateThread` chạy, nó sẽ có dạng như thế này:

![](https://3.bp.blogspot.com/-4g6Cmpmv6OI/VVWlyB70S6I/AAAAAAAABTw/L7Fpa6pMTOw/s1600/Untitled.png)

Ở đây 2 hàm CreateThread đã làm cho hàm ThreadProc 1 và 2 chạy song song cùng lúc với hàm main, 2 hàm này lại gọi 2 hàm ham1() và ham2() để chạy 2 vòng for trong đó mà không cần quan tâm đến hàm main đang làm gì. Về phần mình, sau khi hàm main gọi xong 2 hàm CreateThread thì sẽ tiếp tục thực hiện vòng for dưới nó vì thế mà cả 3 vòng for đều được chạy cùng lúc mà không phải chờ nhau. Oke! giờ thì làm cái ví dụ nữa cho vui, đoạn code vui của chúng ta đây:

![](https://3.bp.blogspot.com/-X4ftJNOfuzM/VVWpZPQG8NI/AAAAAAAABT8/EXQN5GuH350/s1600/Capture.PNG)

Và đây là kết quả:

![](https://4.bp.blogspot.com/-oo_MHM0JNCM/VVWpiqTmOqI/AAAAAAAABUE/tGV8sNkgP6U/s1600/Capture.PNG)


Như đã thấy, trong lúc đợi cơm chín ta có thể ngồi nhắn tin với gấu phải không nào.

Tóm lại: ta hoàn toàn có thể thực hiện nhiều việc cùng 1 lúc nhờ vào việc tạo thêm các thread mới, mỗi thread mới được tạo ra sẽ có khả năng chạy song song độc lập với thread ban đầu(chính là thread đang chạy hàm main). Như đã thấy, khi một thread được khởi chạy chúng sẽ thực thi 1 hàm ban đầu(đối số thứ 3 của hàm CreateThread) và từ đó ta có ta có thể thực hiện các đoạn lệnh hoặc gọi các hàm khác bên trong hàm này(dĩ nhiên tất cả chúng cũng sẽ được chạy độc lập với hàm main). Tuy ưu điểm của việc thực thi các công việc song song nhờ tạo các thread mới là rất lớn và không thể phủ nhận tầm quan trọng của chúng trong việc xây dựng các chương trình đòi hỏi tốc độ và xử lý giao diện...nhưng cái gì cũng có nhược điểm của nó, vấn đề muôn thủa của thread đó chính là việc chia sẽ tài nguyên dùng chung(ví dụ như 2 thread đều xài chung 1 biến toàn cục chẳng hạn), việc quản lý chia sẽ này được thực hiện thông qua các cơ chế đồng bộ và cấp quyền truy cập cho các thread. Ví dụ như ta có 1 căn phòng và trong đó có thứ ta cần(đây chính là tài nguyên dùng chung), ở bên ngoài có rất nhiều người đang đợi để được vào phòng(đây chính là các thread muốn sử dụng tài nguyên đó), người đến trước sẽ có được chìa khóa và vào phòng, các người khác sẽ phải đợi bên ngoài cho đến khi có được chìa khóa, người vào phòng sẽ sử dụng chìa khóa đó để khóa cửa lại và thực hiện công việc cần thiết của mình trong phòng(sử dụng tài nguyên), sau khi thực hiện xong thì người đó sẽ mở cửa và đưa chìa khóa cho người tiếp theo, nhờ thế mà tránh được việc xung đột tài nguyên dùng chung. Nhưng chuyện gì sẽ xảy ra nếu người vào trong phòng và ở luôn trong đấy(chiếm luôn tài nguyên mà không giải phóng), những người bên ngoài sẽ phải đợi cả đời để được vào phòng, đấy chính là Deadlock, "hai hoặc nhiều tiến trình đi vào vòng lặp chờ tài nguyên mãi mãi"[1].
Thực ra các thread không chạy song song với nhau mà tuần tự nhau bằng một bộ lập lịch, mỗi thread sẽ được phép thực thi công việc trong 1 thời gian nhất định và đến lượt thread khác thực hiện, cứ như thế. Việc phân công thread nào chạy, thread nào chờ, thread được chạy bao lâu...đều do bộ lập lịch quy định. Do tốc độ xử lý của máy tính quá nhanh nên ta thấy các thread dường như là chạy song song với nhau vậy.

References
-------

1. http://vi.wikipedia.org/wiki/Deadlock