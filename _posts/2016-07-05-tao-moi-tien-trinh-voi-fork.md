---
title: Tạo mới tiến trình với fork
layout: post
description: Có lẻ các bạn đã quen với Windows, hệ điều hành máy tính phổ biến nhất
  thế giới. Windows được ưu chuộn vì dể sử dụng, sự hổ trợ mạnh mẻ của các hảng phần
  mềm, trò chơi.... Và vì vậy hệ điều hành này nắm vị trí độc tôn trên nền tảng máy
  tính cá nhân. Một đối thủ truyền kiếp của Windows là Linux đang ngày càng một phát
  triển mạnh mẽ, không chỉ hướng tới việc cung cấp nền tảng hệ điều hành cho server
  mà còn hướng tới người dùng cá nhân. Như các bạn đã biết, Linux là tên gọi của một
  hệ điều hành máy tính và cũng là tên hạt nhân của hệ điều hành. Nó có lẽ là một
  ví dụ nổi tiếng nhất của phần mềm tự do và của việc phát triển mã nguồn mở[1]. Trái
  ngược hoàn toàn với việc độc tôn của Windows, Linux cho phép các nhà phát triển
  từ do sử dụng mã nguồn, tự do phân phối... góp phần mở ra kỷ nguyên mà nguồn mở.
  Giới thiệu thế đủ rồi, bữa nay chúng ta sẽ nguyên cứu song song cả Windows và Linux
  cho nó máu. Để mở đầu cho loạt bài viết về Linux, mình sẽ hướng dẩn cách tạo tiến
  trình con trong Linux.
tags:
- c++
- process
- linux
comments: true
category: programming
---

<span/>

Tiến trình(process) trong Linux
-------------

Linux là một hệ điều hành đa nhiệm, vì thế có thể chạy cùng nhiều chương trình. Mỗi một chương trình đang chạy sử dụng một hoặc nhiều tiến trình(process).

Mỗi tiến trình trên Linux được nhận biết thông qua pid của nó. Pid là một số 16 bits được gán tuần tự khi một tiến trình mới khởi tạo.

Mỗi tiến trình có một tiến trình cha. Các tiến trình trong hệ điều hành Linux được sắp xếp thành cây tiến trình, với tiến trình khởi tạo (init) là tiến trình gốc (root). ID của tiến trình cha gọi là ppid(parent pid).

Linux chỉ cho phép tạo tiến trình tối đa 4 cấp.

![](https://1.bp.blogspot.com/-FOcOmgz2z2E/V3YOPT3rebI/AAAAAAAAO3w/_weObxbv_H8BSQ7RSlz7-lWW8WRnEHgfwCLcB/s1600/process_management_of_linux-kernel.png)

Hàm fork
------

Hàm `fork()` sẽ tạo mới một tiến trình bằng việc "sao chép" tiến trình gọi nó. Tiến trình mới được tạo ra gọi là tiến trình con, tiến trình gọi hàm fork là tiến trình cha.

Khi thành công, PID của tiến trình còn sẽ được trả về trong tiến trình cha, nếu mà tiến trình đang gọi hàm `fork` là tiến trình con thì hàm sẽ trả về 0. Ngược lại, nếu hàm thất bại, giá trị -1 sẽ được trả về trong tiến trình cha, lúc này không có bất cứ tiến trình còn mới nào được tạo.

> Những tiến trình mới tạo ra được gọi là các tiến trình con và mỗi tiến trình con lúc ban đầu đều chia sẻ chung tất cả các segments như text, heap hay stack...cho đến khi một tiến trình con cố gắng thay đổi nội dung của stack hoặc heap. Trong trường hợp có bất cứ thay đổi nào, một bản copy riêng biệt của stack hay heap sẽ được tạo ra cho tiến trình con(tiến trình đang cố gắng thay đổi nội dung của statck hoặc heap). Tuy nhiên text segment là readonly vì thế nên cả tiến trình chả và con đều chia sẻ chung vùng này[2].

Sử dụng hàm fork
----------

Như đã đề cập ở trên, khi hàm `fork` thành công nó sẽ trả về PID(giá trị nguyên 2 bytes và dĩ nhiên lớn hơn 0 rồi) của tiến trình con nếu "đứa gọi hàm `fork` là thèn cha", còn khi giá trị này là 0 thì nghĩa là thèn con đang gọi hàm `fork `rồi. Tại sao lại phải phân biệt như thế này, đơn giản là fork sẽ "sao chép" lại thèn cha kiểu như "cha nào con nấy". Và như thế thèn con cũng sẽ lại làm đúng y như những gì cha nó đã làm. Vậy làm sao ta phân biệt được đâu là cha làm, đâu là con làm? Đơn giản ta chỉ cần xét giá trị trả về của hàm fork thôi, nếu 0 nghĩa là thèn đang gọi fork là con, nếu lớn hơn 0 thì thèn đang gọi `fork` là cha. Đây là code cho ví dụ này:

<div data-gist-id="bbbf5731f6126080cac0f56068bcdfd6"></div>

Đây là kết quả

![](https://3.bp.blogspot.com/-RVZfwLGQ57U/V3qZpdL6AxI/AAAAAAAAO4U/oy85BEOw4DMvhKks7aiLYyN2KlvvHMSAgCLcB/s1600/fork.png)

References
------

1. https://vi.wikipedia.org/wiki/Linux
1. https://www.thegeekstuff.com/2013/11/linux-process-and-threads/comment-page-1/
