---
title: Tự viết một spyware cho riêng mình - Keyboard hooking
layout: post
tag: [programming,spyware]
comments: true
---

Phần 2 này sẽ hướng dẩn các bạn cách sử dụng keyboard hooking để ghi lại các phím mà người dùng đã nhấn. 
Đây cũng chính là một trong những tính năng quan trọng nhất của con spy mà chúng ta đang xây dựng. 
Các lý thuyết về hook nói chung và keyboard hooking trong Windows nói riêng đều có ở [phần 1](/2016/06/25/viet-spyware-phan-1) hoặc bạn có thể search thêm trên google 
để tìm hiểu kỷ hơn về phần này. Để thực hiện hook bàn phím, mình chia ra 4 giai đoạn và sẽ được lần lượt đề cập bên dưới.

Đăng ký hook
-------

Để đăng ký keyboard hook bạn cần sử dụng hàm [SetWindowsHookEx](https://msdn.microsoft.com/en-us/library/windows/desktop/ms644990%28v=vs.85%29.aspx?f=255&MSPPError=-2147217396) với hằng số `WH_KEYBOARD_LL` như sau:
<div data-gist-id="e9e0c1ac7312e09b87ea9b19f6b8d4f5"></div>

Nguyên mẫu của hàm SetWindowsHookEx như sau:

```c
HHOOK WINAPI SetWindowsHookEx(
  _In_ int       idHook,
  _In_ HOOKPROC  lpfn,
  _In_ HINSTANCE hMod,
  _In_ DWORD     dwThreadId
);
```

Các đối số như sau:

* idHook [in]: Giá trị kiểu int, nó quy định loại hook mà bạn muốn đăng ký với windows.
* lpfn [in]: Một con trỏ hàm kiểu `HOOKPROC`, bạn có thể hiểu hôm na rằng windows sẽ gọi hàm(hook procedure) mà con trỏ này trỏ tới khi sự kiện hook xảy ra(ở đây chính là khi người dùng nhấn phím).
* hMod [in]: Giá trị kiểu `HINSTANCE`, handle tới DLL chứa hàm mà con trỏ hàm lpfn trỏ đến. Nếu lpfn trỏ đến hàm ngay trong process hiện tại(có thể hiểu nôm na là ngay trong chương trình exe hiện tại) thì ta chỉ cần truyền `NULL` cho nó. Trong ví dụ trên mình truyền `NULL(0)` cho đối số này vì hàm mà lpfn trỏ đến nằm ngay trong chương trình thực thi của chúng ta.
* dwThreadId [in]: Giá trị `DWORD`(chỉ là giá trị int thôi, đừng hoang mang). Giá trị này xác định thread mà hook này được liên kết tới.

Kết quả trả về của hàm [SetWindowsHookEx](https://msdn.microsoft.com/en-us/library/windows/desktop/ms644990%28v=vs.85%29.aspx?f=255&MSPPError=-2147217396) là một `HHOOK`, nếu giá trị này mà `NULL` thì nghĩa là đăng ký hook thất bại(hiếm thấy lắm nên đừng lo). Nhớ lưu lại giá trị này để hủy hook khi kết thúc chương trình nhé.

Keep alive
------

Như các bạn biết đấy, hàm hook procedure sẽ được hệ điều hành gọi khi có sự kiện hook xảy ra(như ở đây là người dùng nhấn phím). Sẽ như thế nào nếu chương trình của mình kết thúc trước khi hệ điều hành gọi hàm hook procedure nhỉ, chà, không ổn rồi. Ở đây ta cần một vòng lặp hoặc một thứ tương tự để giữ cho chương trình của ta luôn luôn chạy. Các bạn có thể dùng `while(true);` có thể dùng `getch()`, có thể dùng `system("pause")`... tất cả đều có thể giữ cho chương trình của ta luôn luôn chạy trong hệ thống mà không thoát ngay lập tức. Nhiều sự lựa chọn nhỉ, nhưng sự thật đau đớn là bạn chỉ có một mà thôi, trong trường hợp bạn hook `WH_KEYBOARD_LL`, lý do thì vì cơ chế của hook này cần thèn [GetPeekMessage](https://msdn.microsoft.com/en-us/library/windows/desktop/ms644943%28v=vs.85%29.aspx?f=255&MSPPError=-2147217396) để có thể gọi hàm callback(hook procedure) khi có sự kiện hook xảy ra, cụ thể các bạn có thể đọc ở [đây](https://stackoverflow.com/a/7460728).

Hàm keep_alive của ta khá đơn giản như sau:

<div data-gist-id="9b989b633cce97ee9b02a3fe5291bc10"></div>

Hàm này cần được gọi trước khi giải phóng hook và sau khi đăng ký hook nhé.

Xử lý dữ liệu hook
------------

Sau khi đăng ký hook thành công thì ta chỉ còn việc ngồi đợi dữ liệu mà người dùng đã nhấn phím gửi về thôi. Khi có dữ liệu hook, windows sẽ gửi nó cho hàm hook procedure mà ta đã đăng ký ở trên. Ở trong hàm hook procedure này ta cần xác định được dữ liệu hook đó có phải là keyboard hook không, vì sao à, đơn giản là bạn có thể đăng ký nhiều loại hook khác nhau nhưng chỉ với một hàm hook procedure để xử lý chúng. Vì thế chúng ta cần cơ chế để phân biệt dữ liệu hook đó thuộc loại nào mà xử lý cho thích hợp. Ở đây ta chỉ có một loại hook là keyboard hook nên cũng không lăng tăng lắm về vấn đề này.

Oh, ở đâu lại lòi ra cái thèn [CallNextHookEx](https://msdn.microsoft.com/en-us/library/windows/desktop/ms644974(v=vs.85).aspx), để hiểu tại sao mình có một ví dụ nhỏ như sau(sẽ xúc phạm đến dân FA đấy :v): A(gái), B(trai) và C(trai) là 3 người bạn chơi với nhau đã lâu, B và C đều có tình cảm với A nhưng vì chai mặt hơn nên C đã cua đổ được A. OK, chuyện bình thường ở huyện. Vấn để xảy ra khi A và C học khác trường và dĩ nhiên là phải yêu xa rồi. Trường thèn B học thì ở giữa 2 trường của A và C. Để giữ lửa tình yêu thì A và C phải thường xuyên trao đổi thư từ sến sẩm các kiểu con đà điểu. Dể đoán là B sẽ trở thành "người đưa thư" bất đắc dĩ cho 2 tụi kia. Vì FA đã lâu và cũng ghét thèn C nên B quyết định bóc trộm thư tình tụi nó ra đọc, nhiều khi còn ghi thêm vài câu "gây xích mích" cho tụi nó chia tay chơi. Dĩ nhiên để không bị phát hiện thì B phải chuyển thư cho A đúng đúng hẹn rồi. Nhưng mà A và C đâu biết toàn bộ nội dung thư tình sến sẩm của tụi nó đã bị B đọc hết :)).

OK, trong câu chuyện này A chính là ứng dụng, B là chương trình hook của ta và C chính là bàn phím. Hiểu nôm na thế cũng được. Dữ liệu bàn phím sẽ được gửi tới chương trình hook của ta trước rồi sau đó mới tới ứng dụng(ví dụ như gỏ chat facebook ấy, thay vì nó gửi tới trình duyệt thì nó phải qua tay thèn chương trình hook mất dạy này). Như ví dụ ở trên thì B có thể chuyển thư cho A(nếu tâm trạng đang vui) hoặc xé thư đốt ra thành tro rồi uống(nếu B tới tháng :v). Cũng như keyboard hook, bạn có thể chuyển dữ liệu hook cho ứng dụng nếu thích hoặc hủy luôn dữ liệu đó. Trong trường hợp xây dựng spy thì càng làm ẩn mình càng tốt, tránh bị nghi ngờ để âm thầm thu thập thông tin. Ta cần chuyển dữ liệu hook lại cho ứng dụng càng nhanh càng tốt, kiểu như chưa hề có vụ "đọc trộm thư" xảy ra 😂

Và để chuyển dữ liệu hook đó cho ứng dụng thì cần sử dụng hàm [CallNextHookEx](https://msdn.microsoft.com/en-us/library/windows/desktop/ms644974(v=vs.85).aspx) mà thôi, thật ra hàm này sẽ chuyển thông tin hook tới các hook procedure khác trong hook chain(hiểu nôm na là một danh sách chứa mấy thèn đã đăng ký hook ấy mà) hiện tại. Sau khi pass hết qua mấy cái hook procedure rồi thì mới tới lược ứng dụng. Tội thèn ứng dụng nhỉ 😂

Vấn đề quan trọng cần bàn ở đây đó là xử lý dữ liệu nhấn phím như thế nào?:

Đầu tiên ta cần xác định tiêu đề cửa sổ mà người dùng đã nhấn để biết là người dùng đang online facebook, word, yahoo hay search google...

<div data-gist-id="547935d456c1464efa7694b97af73ea0" data-gist-hide-footer="true" data-gist-line="21"></div>

Bước tiếp theo bạn cần xác định phím Shift có đang được nhấn hay không, việc này khá quan trọng để xác định người dùng đang nhấn chữ hoa hay chữ thường,...

<div data-gist-id="547935d456c1464efa7694b97af73ea0" data-gist-hide-footer="true" data-gist-line="13"></div>

Tương tự bạn cần xác định phím Caps Lock có đang được nhấn không.

<div data-gist-id="547935d456c1464efa7694b97af73ea0" data-gist-hide-footer="true" data-gist-line="32"></div>

Bước cuối cùng là bạn xác định cụ thể phím được nhấn là phím nào, A, B, C, 1, 2...blabla rồi sau đó kết hợp với tình trạng của các phím Shift và Caps Lock để lưu cho phù hợp.

<div data-gist-id="547935d456c1464efa7694b97af73ea0" data-gist-hide-footer="true" data-gist-line="37-41"></div>
<div data-gist-id="547935d456c1464efa7694b97af73ea0" data-gist-hide-footer="true" data-gist-line="48-51"></div>
<div data-gist-id="547935d456c1464efa7694b97af73ea0" data-gist-hide-footer="true" data-gist-line="59-63"></div>
<div data-gist-id="547935d456c1464efa7694b97af73ea0" data-gist-hide-footer="true" data-gist-line="86-89"></div>

Để xác định tiêu đề của cửa sổ hiện tại bạn cần sử dụng hàm [GetForegroundWindow](https://msdn.microsoft.com/en-us/library/windows/desktop/ms633505%28v=vs.85%29.aspx?f=255&MSPPError=-2147217396) để lấy handle của sổ và sau đó dùng GetWindowTextA để lấy tiêu đề của nó. Khá đơn giản phải không.

Để xác định được cụ thể phím nào được nhấn bạn cần convert `l_param` sang cấu trúc `KBDLLHOOKSTRUCT` như sau:

```c
const KBDLLHOOKSTRUCT * kbdt = (KBDLLHOOKSTRUCT *)l_param;
```

À, `l_param` sẽ chứa nội dung mà phím được nhấn còn `w_param` sẽ chứa tình trạng của phím(press down/up...).

Sau khi convert sang cấu trúc `KBDLLHOOKSTRUCT` bạn sử dụng kbdt->vkCode để lấy virtual key code của phím được nhấn, từ đó chỉ cần dùng mấy câu if else hoặc switch đơn giản là có thể lưu chính xác dữ liệu rồi.

Một điều nữa ở đây chính là việc lưu trữ dữ liệu, khi người dùng nhấn chữ A, giả sử virtual key code của nó là 65 thì bạn cần lưu xâu "A" chứ không phải là giá trị 65, tất cả đều vì mục đích dể đọc thôi 😂

Lại một điều nữa, hàm `write` và hàm `get_position` là 2 hàm phụ trợ, hàm `write` sẽ lưu dữ liệu vào mảng hoặc trực tiếp vào file, hàm `get_position` sẽ trả về số lượng bytes hiện tại mà file hoặc mảng đang lưu. Giả sử như bạn lưu vào mảng, nếu dữ liệu lưu trữ đủ lớn bạn cần chuyển dữ liệu đó vào file và reset mảng để tiếp tục lưu dữ liệu khác. Dữ liệu được lưu vào file sẽ được tập hợp lại ở một nơi cố định trong máy nạn nhân và chờ thời cơ(có mạng :v) để gửi lên server. Đây chỉ là một cách đơn giản để giải quyết vấn đề lưu trữ cho spy của chúng ta. Ở đây còn nhiều điều phải bàn luận nữa, như cấu trúc file, làm sao để phân biệt file chứa dữ liệu keylog với file chứa dữ liệu capture screen...

Hủy hook
-----

Cấp phát xong thì phải thu hồi, đăng ký xong thì phải hủy cũng như yêu là phải... à mà thôi 😂 Để hủy hook thì bạn cần gọi hàm [UnhookWindowsHookEx](https://msdn.microsoft.com/en-us/library/windows/desktop/ms644993(v=vs.85).aspx), đơn giản một dòng như sau:

```c
UnhookWindowsHookEx(ret);
```

Cơ mà thật ra cũng không cần hủy hook đâu, vì spy của ta chạy từ lúc mở máy cho đến khi tắt máy cơ mà 😂 Thôi thì cứ viết vào cho đúng theo cấu trúc vậy.

Tổng kết
-----

Như bạn thấy đấy, với những thứ đơn giản như trên bạn hoàn toàn có thể xây dựng cho mình một con keylogger để khè gái rồi 😂

Ở đây cũng chỉ là các bước hướng dẩn đơn giản, để hoàn tất con spy mất dạy của chúng ta thì còn cần giải quyết nhiều vấn đề nữa. Không sao, học lại 4-5 lần còn chưa nản mà cớ sao mới thấy chút khó khăn như vậy lại bỏ cuộc 😂

Phần tiếp theo sẽ giải quyết vấn đề: Làm sao chụp ảnh màng hình đây ta?

Đọc tiếp [phần 3](/2016/06/29/viet-spyware-phan-3)