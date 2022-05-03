---
title: Kết thúc tiến trình
layout: post
description: Qua các bài viết trướt thì bạn đã biết cách tạo mới một tiến trình sử
  dụng fork rồi. Bây giờ ta sẽ tìm hiểu về các các để kết thúc một tiến trình. Ta
  có thể kết thúc một cách chủ động hay thụ động hoặc chờ một tiến trình kết thúc.
  Tùy vào từng trường hợp cụ thể ta có thể lựa chọn giải pháp thích hợp cho chương
  trình của mình.
tags:
- c++
- process
comments: true
category: programming
---

<span/>

Kết thúc chủ động
-----

Chương trình sẽ chủ động kết thúc thay vì phải nhờ sự can thiệp từ bên ngoài. Đây là cách kết thúc tiến trình hay dùng nhất. Bạn có thể sử dụng một trong 2 cách sau đây để kết thúc một tiến trình:

1. Gọi hàm `exit`.
1. Keyword **return** trong hàm main (thoát khỏi hàm main).

Khi tiến trình kết thúc, mỗi tiến trình có mã kết thúc `exit code` (một số trả về cho tiến trình cha của nó). Mã kết thúc cho biết tình trạng của chương trình, thường thì nó sẽ cho biết chương trình kết thúc hợp lệ hay không.

Đây là ví dụ về việc sử dụng hàm exit để kết thúc tiến trình.

<div data-gist-id="528bf4afde1ea75a5b23b4bb6f6e77f6"></div>

Kết quả tương tự khi sử dụng return trong hàm main.

<div data-gist-id="1aa86ee311571ce5112b59da732cc8a2"></div>

Đây là kết quả khi chạy một trong hai đoạn code trên:

Xử lý thành công
![](https://4.bp.blogspot.com/-MV4aV5PANFA/V3qgkumunaI/AAAAAAAAO4w/Ek1CdzsXqO0cg1ifF1X8tYK4hnVY6D6wQCKgB/s1600/exitprc_ok.png)

Xử lý thất bại
![](https://3.bp.blogspot.com/-oi_PpPhbW1U/V3qgpUaT2TI/AAAAAAAAO5A/VISVKV1CHUgwUjp2IrtE72TRZUsA747AACKgB/s1600/exitprc_fail.png)

Các bạn chú ý dòng Process returned, nó sẽ hiển thị `exit code` của tiến trình.

Khi chương trình của ta gặp một exception hay nói nôm na là bị “độp” giữa chừng mà chúng ta không try catch thì chương trình cũng sẽ trả về một exit code, ví dụ như sau:

<div data-gist-id="47595d3ca7e2f55577be1138487fade9"></div>

Kết quả như sau:

![](https://3.bp.blogspot.com/-HSId1Mf7GEQ/V3qg4N8TN2I/AAAAAAAAO5Q/2MG27aEmwnsPW0KuydbeC14jHH6GUfrhACKgB/s1600/exitprc_exception.png)

Việc sử dụng hàm exit hay return trong hàm main còn tùy vào từng trường hợp. Nếu bạn muốn kết thúc tiến trình khi đang ở trong một hàm khác hàm main, lúc này bạn cần gọi hàm exit. Nếu bạn đang ở ngay tại hàm main rồi thì tốt hơn nên sử dụng **return** keyword.

Kết thúc bị động
--------

Trong Windows, đôi lúc có một số chương trình bị “đơ như cây cơ” lúc này chúng ta chỉ cần mở task manager thần thánh lên để “End Task” hoặc “End Process”. Lúc này tiến trình không tự kết thúc mà bị “ép” phải kết thúc. Các thao tác vào ra hay các tính toán đều bị ngắt, đôi lúc tài nguyên mà chương trình đang kiểm soát còn chưa được giải phóng. Viết kết thúc một tiến trình theo cách này chỉ được sử dụng trong các trường hợp bất khả kháng. Việc làm dụng cách này có thể gây lỗi cho chương trình về sau hay thất thoát tài nguyên hệ thống.

Để kết thúc một tiến trình ta sử dụng hàm kill với định nghĩa như sau:

```c
int kill(int child_pid, int signal_number);
```

Trong đó:

* child_pid là pid của tiến trình cần kết thúc.
* signal_number mặt định là SIGTERM(signal termination).

Đây là đoạn code mẫu để kill một tiến trình.

<div data-gist-id="a7b885c73b3d9ccfe9590d0c3b91d997"></div>

Còn đây là kết quả khi kết thúc tiến trình gedit.

![](https://2.bp.blogspot.com/-x88YweOjRQc/V3qhAX5dxiI/AAAAAAAAO5g/BnzSWGnyARYEPCMOfuTt3YpJAtMLVxjXACKgB/s1600/exitprc_kill.png)

Chờ tiến trình con kết thúc
-------------

Trong một số trường hợp, tiến trình cha cần chờ tiến trình con kết thúc trước khi tiếp tục thực hiện công việc của nó. Các system calls như wait, waitpid được xây dựng để phục vụ việc này.

Một ví dụ về việc chờ một tiến trình khác kết thúc như sau: Tiến trình con gedit thực hiện việc ghi nội dung văn bản vào một file text, tiến trình hiện tại của ta cần chờ cho tiến trình gedit kết thúc để mở nội dung file text đó ra và hiển thị cho người dùng.

Bây giờ ta khảo sát 2 hàm đã đề cập ở trên.

Hàm `wait`, hàm này cho phép tiến trình cha(tiến trình hiện tại) chờ(tạm ngưng tiến trình hiện tại ngay tại lời gọi hàm `wait`) cho đến khi bất kỳ một tiến trình con nào của nó kết thúc. Nguyên mẫu của hàm này như sau:

```c
pid_t wait(int *status);
```

Đối số status lưu giữ tình trạng của tiến trình vừa kết thúc, bạn có thể sử dụng các macro có sẳn như `WIFEXITED`, `WEXITSTATUS`, `WIFSIGNALED`… để biết thêm chi tiết về việc kết thúc của tiến trình con. Hàm trả về giá trị pid của tiến trình con vừa kết thúc nếu thành công, ngược lại hàm trả về -1.

<div data-gist-id="55933473348041abb3df2d768019a1ca"></div>

Ví dụ trên sẽ tạo ra một tiến trình con, tiến trình con sau khi tạo ra sẽ sleep 2 giây, trong lúc này tiến trình cha sẽ đợi cho tiến trình con kết thúc.

Đây là kết quả khi chạy đoạn code trên:

![](https://2.bp.blogspot.com/-uRAB0DG3hTM/V3qhGGwLptI/AAAAAAAAO5w/kC68Ai0qLH4cg6YONDnoISPxHtE8KwzVgCKgB/s1600/exitprc_wait.png)

Hàm `waitpid`, hàm này cũng tương tự với `wait` nhưng bạn cần định nghĩa cụ thể pid của tiến trình con cần chờ. Trong khi đó wait sẽ chờ tất cả các tiến trình con cho đến khi có bất cứ một tiến trình con nào kết thúc. Nguyên mẫu của waitpid như sau:

```c
pid_t waitpid(pid_t pid, int *status, int options);
```

Đối số pid chỉ ra pid cụ thể của tiến trình con cần chờ. Đối số status tương tự như đối với hàm wait. Đối số cuối cùng là options như sau:

* < -1 chờ tất cả child processes có group ID bằng với đối số pid.
* = -1 chờ tất cả child processes, cái này thì giống với wait rồi.
* = 0 chờ tất cả child processes có group ID bằng với thèn gọi hàm này.
* > 0 chờ cho child process cụ thể có pid đã truyền ở đối số đầu.

Đoạn lệnh so sánh sự giống nhau của `wait` và `waitpid`:

```c
waitpid(-1, &status, 0);
// or
wait(&status);
```
