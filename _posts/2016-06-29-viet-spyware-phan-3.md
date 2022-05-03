---
title: Tự viết một spyware cho riêng mình - Capture screen
layout: post
tags:
- spyware
- c++
- java
- winapi
comments: true
category:
- programming
- projects
---

[Phần 2](/2016/06/27/viet-spyware-phan-2) chúng ta đã xây dựng xong keylog, phần tiếp theo chúng ta sẽ cùng tìm hiểu cách chụp ảnh màng hình máy tính, 
đây cũng là một trong những tính năng khá quan trọng của spy. Các lý thuyết về phần này như [Device Context(DC)](https://msdn.microsoft.com/en-us/library/windows/desktop/dd162467(v=vs.85).aspx), 
[PICTDESC](https://docs.microsoft.com/en-us/windows/desktop/api/olectl/ns-olectl-tagpictdesc), 
[BITMAP](https://docs.microsoft.com/en-us/windows/desktop/api/wingdi/ns-wingdi-tagbitmap) trong Windows các bạn có thể đọc ngay trên trang chủ để biết thêm chi tiết. 
Mình sẽ nói về 2 bước chính để thực hiện đó là chụp ảnh màng hình và lưu ảnh đã chụp vào file.
  
Lý thuyết
--------

**Device Context(DC)**

Các thiết bị độc lập là một trong những phần cốt lỏi của Windows. Ứng dụng có thể vẽ hoặc in ra nhiều loại thiết bị khác nhau, các API hổ trợ làm việc với các thiết bị độc lập này được chứa trong hai thư viện liên kết động. Đầu tiên là Gdi.dll, nó cũng được gọi là giao diện thiết bị đồ họa(GDI), thư viện thứ hai được gọi là trình điều khiển thiết bị. Tên của thư viện thứ hai phụ thuộc vào thiết bị nơi mà ứng dụng của chúng ta sẽ vẽ lên đó.

Ứng dụng phải định nghĩa GDI để nạp lên trình điều khiển thiết bị cụ thể và chỉ cần nạp trình điều khiển thiết bị một lần duy nhất để chuẩn bị cho quá trình vẽ hình ảnh. Những công việc này được tự động thực hiện khi ta tạo một device context(DC). Một DC là một cấu trúc định nghĩa một tập hợp các vật thể đồ họa kèm theo các thuộc tính của nó, chế độ đồ họa cũng như các hiệu ứng output. Ứng dụng của ta sẽ không truy cập thẳng tới DC, thay vào đó chúng ta sẽ làm việc trên cấu trúc gián tiếp bởi việc gọi các hàm khác nhau.

**Capture desktop**

Device context của desktop chứa toàn bộ dữ liệu hình đồ họa ảnh của desktop, ta chỉ cần lấy handle của Desktop Device Context và chuyển đổi nó thành bitmap thông qua các API của hệ điều hành.

![](https://2.bp.blogspot.com/-SFYM1_6jYGM/V3N8BLK-EQI/AAAAAAAAO3M/njbMmqUs5WMYVugE8oF6kaqtkl8KLRWIACLcB/s1600/capture_screen.png)

Chụp ảnh màn hình
----------

Hiện tại có 2 cách chính để bạn chụp ảnh màng hình:

1. Lợi dụng chức năng của phím Print Screen, bạn không cần quan tâm đến việc phím này có trên bàn phím của bạn hay không. Bạn chỉ cần giả lập sự kiến nhấn phím Print Screen bằng hàm [keybd_event](https://msdn.microsoft.com/en-us/library/windows/desktop/ms646304(v=vs.85).aspx), chi tiết thế nào thì bạn google thêm nhé. Sau khi phím này được nhấn thì ảnh chụp màng hình sẽ được lưu trong clipboard và bạn có thể lấy ảnh từ đó ra.
1. Lấy thông tin hình ảnh của desktop thông qua DC của desktop. Mình sẽ làm cách này cho nó hại não chơi 😂 Cụ thể như thế nào thì đọc bên dưới sẽ biết.

Để chụp ảnh màng hình bạn cần xác định được DC của desktop bằng cách sử dụng hàm [GetDC](https://docs.microsoft.com/en-us/windows/desktop/api/winuser/nf-winuser-getdc) với đối số là NULL để lấy về handle tới DC của desktop. Sau khi có được DC của desktop bạn cần tạo 1 "compatible" DC trong bộ nhớ, nhiệm vụ của thèn này là để bết dữ liệu hình ảnh từ desktop DC vào đây.

Mình sẽ minh họa nguyên lý làm việc của nó như sau: DC của desktop là một bức ảnh(bao gồm khung ảnh và ảnh bên trong) gọi là ảnh 1, bây giờ mình muốn "copy" ảnh bên trong nó ra giấy mình sẽ làm như sau. Đầu tiên mình chuẩn bị một bức ảnh trắng tương tự(từ chất liệu đến kích thước...) gọi là bức ảnh 2 đi. Mình chuẩn bị thêm một tờ giấy "phù hợp" với bức ảnh sắp được "copy". Tiếp theo mình thay thế ảnh trắng trong ảnh 2 bằng tờ giấy. Giờ mình chỉ cần copy toàn bộ hình ảnh từ bức ảnh 1 sang bức ảnh 2, như thế hình ảnh của ảnh 1 sẽ được vẽ lên trên tờ giấy mà ta đã đặt vào trong bức ảnh 2. Xong, nhiệm vụ cuối cùng là lấy tờ giấy chứa hình ảnh của bức ảnh 1 ra khỏi bức ảnh 2. Như thế ta đã có được ảnh "copy" của bức ảnh 1 trên tờ giấy rồi 😂

Hơi rắc rối nhưng mà dù gì cũng dể hiểu hơn nhìn code nhỉ 😂 Còn đây là code để chụp ảnh màng hình sử dụng DC:

<div data-gist-id="868623ac77dd2a7c7978dc0301e461bb"></div>

Trong đoạn code trên bạn chú ý một số hàm như sau:

1. GetDC: Lấy DC từ handle cửa sổ, nếu pass NULL thì nó là desktop. Ta có được ảnh 1.
1. CreateCompatibleDC: Tạo một DC trong bộ nhớ tương thích với DC đã truyền. Đây chính là tạo bức ảnh 2.
1. SelectObject: Cứ hiểu nôm na rằng nó sẽ trảo đổi object trong DC với đối số. Đây chính là tráo đổi ảnh trắng trong ảnh 2 với tờ giấy.
1. CreateCompatibleBitmap: Tạo một bitmap tương thích với DC đã truyền. Đây chính là tờ giấy.
1. StretchBlt: Copy bitmap từ nguồn tới đích. Đây chính là copy ảnh từ ảnh 1 sang ảnh 2.

Sau khi copy xong thì ta cần lưu vào file dể đợi cơ hội gửi cho server chứ 😂

Lưu ảnh vào file
--------
Phần này khá nhẹ nhàng, mình cũng chú thích khá nhiều trong code rồi nên bạn có thể đọc để hiểu hơn. Cách thực hiện như sau: bạn tạo một [PICTDESC](https://docs.microsoft.com/en-us/windows/desktop/api/olectl/ns-olectl-tagpictdesc) chứa thông tin mô tả về ảnh như loại và nội dung ảnh. Từ đó bạn sử dụng hàm [OleCreatePictureIndirect](https://msdn.microsoft.com/en-us/library/windows/desktop/ms694511(v=vs.85).aspx) để tạo một thực thể IPicture. Với [IPicture](https://msdn.microsoft.com/en-us/library/windows/desktop/ms680761(v=vs.85).aspx), bạn có thể dể dàng chuyển đổi dữ liệu hình ảnh từ bộ nhớ sang stream và sau đó lưu xuống file một cách dể dàng.

Đây là toàn bộ source code của phần này, đa số mình tham khảo từ msdn 😂

<div data-gist-id="a91ff47ce95a68dad107ce30130d2a63"></div>

Tổng kết
------

Với hai bước đơn giản như trên bạn đã có thể chụp ảnh màng hình với một giá trị scale để giảm kích thước ảnh. Điểm quan trọng nữa đó là phải nén ảnh để giảm kích thước đến mức tối đa, bởi vì ảnh hiện tại mà chúng ta lưu là Bitmap(bmp) vì thế nên kích thước lớn vãi ra. Bạn nào rảnh có thể nguyên cứu thêm phần này, nén ảnh định dạng png hay jpg trước khi gửi đi là một ý kiến không tồi 😂

Phần tiếp theo dự là sẽ bàn đến việc lưu trữ dữ liệu phía spy.

Đọc tiếp [phần 4](/2016/07/11/viet-spyware-phan-4)
