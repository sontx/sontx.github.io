---
title: Tự viết một spyware cho riêng mình - Tổng quan về badspy project và lý thuyết keyboard hooking
layout: post
description: >
  Spyware là loại phần mềm gián điệp chuyên âm thầm thu thập thông tin victim và gửi về máy chủ của hacker.
  Loạt bài viết này mình sẽ hưởng dẩn cách viết một con spyware từ a-z sử dụng các hàm win32 api. Mục đích chính
  là nguyên cứu và học tập là chính, bạn nào có ý tưởng đem nó đi phát tán thì nên nghỉ lại nhé, con spyware chỉ dừng
  lại ở mức "chạy được" và chỉ lòe được các bạn nữ không hiểu biết về công nghệ thôi. Một lần nữa mình xin nhắc lại, mục đích chính là NGUYÊN CỨU để hiểu biết thêm về spyware vì thế bạn nào có ý định đen tối thì kiềm chế nhé.
tag: [programming,spyware]
comments: true
category: [programming,projects]
---

Một kỹ thuật khá hay trong Windows đó chính là hooking, chính Unikey mà ta thường dùng hằng ngày hay các chương trình keyloger cũng sử dụng kỹ thuật này. Vậy hook là gì? làm sao để sử dụng nó? câu trả lời sẽ có ngay tại [đây](https://google.com) 😂. Loạt bài này mình sẽ hướng dẩn các bạn viết một con spy(not just keylog), thật ra mình cũng chỉ mới nguyên cứu về chủ đề ngày trong đồ án môn học kỳ vừa rồi nên mọi thứ đều chỉ mới ở mức beginner mà thôi 😂. Toàn bộ source code của con spy(mình đặt tên là badspy) này đều có ở link cuối bài viết này, nếu bạn muốn có thể đọc tham khảo. Nội dung hôm nay chúng ta sẽ tìm hiểu về keylog(phần lý thuyết), một trong những chức năng quan trọng của spy(đây thực ra chỉ là nội dung mình copy nguyên si từ bài báo cáo ra thôi 😂).

Tổng quan về badspy
------------

Đây là toàn bộ chức năng mà badspy có thể làm được, với phiên bản hiện tại thì toàn bộ chức năng đều được xây dựng xong nhưng vẩn đang còn trong giai đoạn thử nghiệm(cơ mà bản release sẽ khá lâu vì tác giả bận học lại nên hầu như không có thời gian phát triển tiếp 😂).

![](https://2.bp.blogspot.com/-rLK-oocOX4A/V245Hz9jhDI/AAAAAAAAO2Y/7AI71OzVlDQLU3K05CE_gUZJTTidyg9agCKgB/s0/usecase.png)

Dự án được chia làm 2 projects chính:

* badspy: đây là con spy yêu dấu của chúng ta, được viết trên ngôn ngữ Visual C++ và có thể chạy độc lập mà không cần thêm thư viện vcruntime. IDE hiện tại đang dùng là Visual Studio 2015.
* badserver: đây là con server quản lý các con spy khác, toàn bộ thông tin mà spy thu thập được sẽ gửi về server này. Server thì được viết bằng java, IDE là IntelliJ IDEA.

Ngoài ra trong respo của badspy còn chứa 1 folder docs, chứa một số tài liệu liên quan và quan trọng là chứa bài báo cáo đồ án 😂 bạn nào muốn tìm hiểu thì có thể tải nó về đọc trước cho vui.

Windows keyboard hooking 
-----------

**Khái niệm về hook**

Hook là cơ chế mà một ứng dụng có thể chặn một sự kiện giống như các thông điệp, sự kiện chuột, bàn phím…Hàm chặn một sự kiện cụ thể được gọi là hook procedure, một hook procedure có thể thực thi khi nhận được sự kiện, lúc này nó có thể chỉnh sửa hoặc hủy sự kiện đó.

Hooks thường sẽ làm chậm hệ thống vì nó làm tăng số lượng xử lý cho mỗi thông điệp bị hook. Hook chỉ nên được cài đặt khi cần thiết và gở bỏ khi không cần đến nữa.

Hệ thống hổ trợ nhiều loại hook khác nhau, mỗi loại cung cấp một cơ chế message-handling khác nhau.

Mỗi loại hook sẽ được quản lý trong một hook chain, một hook chain là một danh sách của các con trỏ đặt biệt, các con trỏ này thực chất là hàm callback của hook procedure. Khi một thông điệp xảy ra thì hệ thống sẽ chuyển thông điệp cho lần lượt các hook procedure trong hook chain tương ứng. Các hành động trong hook procedure còn tùy thuộc vào loại hook, một số có thể chỉnh sửa hoặc hủy thông điệp, một số khác chỉ đơn giản là giám sát…

**Keyboard hooking**

Keyboard hooking là một trong những loại hook cơ bản được Windows hổ trợ, nhiệm vụ của nó là chặn bắt phím được nhấn. Keyboard hooking được sử dụng trong chương trình Unikey và một số chương trình tiện ích khác. Đặt biệt, một số kẻ xấu còn lợi dụng công nghệ keyboard hooking để xây dựng chương trình keylogger nhằm đánh cắp thông tin người dùng.

Keylogger – ghi lại các phím đã nhấn
------------

Sử dụng kỉ thuật keyboard hooking để chặn bắt các phím mà người dùng đã nhấn. Khi người dùng nhấn phím bất kỳ thì spy sẽ ghi lại phím được nhấn kèm với tiêu đề của cửa sổ mà người dùng đã focus, như thế ta có thể xác định được nội dung mà người dùng đang nhập là thuộc chương trình nào.

Sử dụng hàm [SetWindowsHookEx](https://msdn.microsoft.com/en-us/library/windows/desktop/ms644990%28v=vs.85%29.aspx?f=255&MSPPError=-2147217396) để đăng ký hook với hệ điều hành, để đăng ký keyboard hooking ta sử dụng cú pháp sau:

```c
SetWindowsHookEx(WH_KEYBOARD_LL, (HOOKPROC)hook_proc, dll_instance, 0);
```

Trong đó hằng số `WH_KEYBOARD_LL` thông báo với hệ điều hành rằng ta sẽ đăng ký hook bàn phím. Hàm hook_proc sẽ được gọi khi có bất cứ phím nào được nhấn, khi đó ta chỉ việc phân tích dữ liệu từ phím được nhấn và lưu vào file. Biến số dll_instance là giá trị handle đến DLL chứa hook procedure, ở đây chính là hook_proc. Nếu hàm thành công sẽ trả về handle tới hook_procedure, hàm trả về `NULL` nếu việc đăng ký hook thất bại.

Sau khi đăng ký hook thành công, việc tiếp theo ta phải làm là xử lý dữ liệu hook khi có phím được nhấn. Thuật toán được mô tả như sau:

![](https://3.bp.blogspot.com/-lf2aA0w-yHc/V2419jwUMNI/AAAAAAAAO18/wZNk7_fbyU4nLKcUAfBhdOE75vHD8Wj-wCKgB/s1600/keyboard-hooking.png)

Khi chương trình kết thúc ta cần hủy hook, thật ra việc này là không cần thiết khi đây là một chương trình spy, nghĩa là nó sẽ chạy xuyên suốt từ khi người dùng vô Windows cho đến khi người dùng logoff hoặc shutdown máy. Để hủy hook ta chỉ cần gọi hàm [UnhookWindowHookEx](https://msdn.microsoft.com/en-us/library/windows/desktop/ms644993(v=vs.85).aspx) với đối số là handle mà hàm [SetWindowsHookEx](https://msdn.microsoft.com/en-us/library/windows/desktop/ms644990%28v=vs.85%29.aspx?f=255&MSPPError=-2147217396) trả về.

Badspy project
--------

Toàn bộ source code của badspy-project tại đây: [https://github.com/sontx/badspy-project](https://github.com/sontx/badspy-project)

Đọc tiếp [phần 2](/2016/06/27/viet-spyware-phan-2).
