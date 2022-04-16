---
title: Tạo mới tiến trình với exec
layout: post
description: >
  Như đã biết thì hàm `fork()` sẽ tạo mới một tiến trình con bởi việc “sao chép” lại tiến trình cha. Nghĩa là nó sẽ thực thi lại chính chương trình cha đã tạo ra nó, kiểu như cha nào con nấy. Nhưng thực tế không phải lúc nào chúng ta cũng muốn “cha nào con nấy”, đôi lúc thì con sinh ra phải giống “ông hàng xóm” chứ :)). Bài viết này mình sẽ hướng dẩn cách tạo mới tiến trình con rồi thực thi mới một chương trình khác thay vì thực thi lại chương trình cha đã tạo ra nó.
tag: [programming]
comments: true
category: programming
---

Để thực hiện được điều này chúng ta sẽ sử dụng kết hợp giữa `fork()` và một hàm mới đó là `exec(…)`.

Hàm `exec` là một họ các hàm có chức năng thay thế ảnh của tiến trình hiện tại bằng ảnh của tiến trình mới. Chắc hẳng bạn đã từng xem film matrix rồi nhỉ, anh boss có khả năng nhập vào một người bất kỳ và biến người đó thành mình, chà, nghe có vẻ nguy hiểm. Hàm `exec` cũng có “khả năng” tương tự như boss, nó có thể biến chương trình đang chạy hiện tại thành một chương trình khác theo nghĩa đen. Với `exec`, ta có khá nhiều “version” để lựa chọn như sau:

* int execl(const char *path, const char *arg, …);
* int execlp(const char *file, const char *arg, …);
* int execle(const char path, const char *arg, …, char const envp[]);
* int execv(const char *path, char *const argv[]);
* int execvp(const char *file, char *const argv[]);
* int execvpe(const char *file, char *const argv[], char *const envp[]);

Nhìn thì nhiều và hoa mắt nhưng thực ra thì cũng chỉ cung cấp cho người dùng các sự lựa chọn như: Thực thi từ file(bạn có thể truyền tên chương trình) hoặc từ đường dẩn, truyền danh sách đối số bởi một mảng hay truyền kiểu “tôi thích bao nhiêu tôi pass bấy nhiêu”, hay định nghĩa các biến môi trường cho chương trình mới.

Hàm `exec` chỉ trả về khi có lỗi xảy ra, chú ý nhé. Đoạn này thì cũng dể hiểu vì khi hàm `exec` thành công, nó sẽ thay thế chương trình cũ bằng chương trình mới(ngay tiến trình hiện tại gọi nó). Vì thế nên các lênh dưới hàm `exec` sẽ bị thay thế bởi những lệnh khác.

Dưới đây là đoạn code mẫu sử dụng hàm fork kết hợp với `execvp`(một trong các hàm `exec`) để chạy một chương trình khác từ tiến trình con mới được tạo ra.

<div data-gist-id="517ab14cda50acc2821662a0a705978a"></div>

Kết quả như sau:

![](https://4.bp.blogspot.com/-h3urQv8H4jE/V3qeDomy4fI/AAAAAAAAO4g/7VV8Vt07Jtg0Hw4I6mUTVXhIM8920GdWQCLcB/s1600/fork%2526exec.png)

Bạn chú ý rằng danh sách đối số được pass cho chương trình mới bởi hàm `exec` có một quy ước như sau: Đối số đầu tiên nên là tên file của chương trình mới mà chúng ta muốn chạy trong child process, các đối số khác phải là một null-terminated string(là mảng char, hay một xâu kết thúc bởi `NULL`), đối số cuối cùng của danh sách các đối số phải là `NULL`.

Nếu chương trình của bạn không cần đối số gì thì cũng phải định nghĩa tối thiểu như sau:

```c
char * args[] = {"filename.exe", NULL};
```
