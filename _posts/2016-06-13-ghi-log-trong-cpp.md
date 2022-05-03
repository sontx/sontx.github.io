---
title: Ghi log trong C++
layout: post
description: Trong lúc làm đồ án có động đến việc ghi log để phục vụ debug nên phải
  viết ra cái tiện ích nho nhỏ này, thấy nó cũng hay nên chia sẻ cho các bạn đọc chơi.
  Việc ghi log trong C++ thì dự là có nhiều thư viện hổ trợ rồi, cơ mà xài “cây nhà
  lá vườn” vẩn thích hơn. Log chỉ ghi ra khi ở mode debug và tự động “biến mất” ở
  mode release vì thế sẽ tối ưu khá nhiều cho performance. Trong tiện ích này mình
  sử dụng các macro để ghi log, với mode relase thì nó sẽ bị remove hoàn toàn(bước
  tiền biên dịch) trước khi code chính thức đc biên dịch.
tags:
- c++
- logging
comments: true
category: programming
---

Phiên bản hiện tại hổ trợ ghi log ra màng hình console, file và ngay trên IDE(just win32). Tùy vào từng mục đích sử dụng mà có thể thay đổi đầu ra log cho phù hợp.

Cách sử dụng thì khá đơn giản, nói là tiện ích chứ thực ra là 2 file log.h và log.cpp thôi. Sau khi tải 2 files này về thì add nó vô C++ project của bạn, tiếp theo là include cái log.h và sử dụng đơn giản như sau:

```cpp
#include "log.h"

int main()
{
	LOG("this is a simple log");
}
```

Hiện tại hổ trợ 5 macro để ghi log lần lược là LOG_D(debug), LOG_E(error), LOG_I(info), LOG_W(warning) và LOG(default == LOG_D). Mấy cái này chỉ khác nhau ở tag đc in ra thôi.

Về phần hiển thị thì mỗi dòng log thường gồm 5 phần là: tag, tên file, số dòng, tên hàm và cuối cùng là nội dung log. Với ví dụ bên trên thì output sẽ như sau:

![](https://4.bp.blogspot.com/-xT-K4cT8QE4/V15gCuIuA6I/AAAAAAAAO0Q/IZYXc6uJ7XgbD6RPEF_37r3xYxGx6ucjQCKgB/s1600/1517538_806498912827586_100165633001941524_n.jpg)

Nội dung log bên trên được giải thích như sau:

* Tag: [Debug]
* Tên file: main.cpp
* Dòng thứ: 4
* Tên hàm: main()
* Nội dung log: this is a simple log

Một điểm cần lưu ý là bạn có thể sử dụng định dạng chuẩn như của hàm printf cho việc ghi log ví dụ như:

```cpp
LOG("number is %d, string is %s, float is %0.2f", yourNumber, yourString, yourFloat);
```

Để thay đổi đầu ra của log như thay vì xuất ra console thì xuất ra file chẳng hạn, chỉ cần vào file log.h và thay đổi dòng define như sau, phần còn lại bạn ko cần quan tâm:

```cpp
#define DEBUG_OUTPUT_MODE DEBUG_OUTPUT_CON
```

Đổi thành

```cpp
#define DEBUG_OUTPUT_MODE DEBUG_OUTPUT_FILE
```

Và đây là kết quả khi ghi log ra file:

![](https://4.bp.blogspot.com/-Md9OQQ9DyLs/V15g-6Gz_LI/AAAAAAAAO0s/Fwk6VmFceLwyMZzMqjKA_GLdSGl5qROFwCKgB/s1600/1526739_806501496160661_1723330617666866716_n.jpg)

Mọi chi tiết khác và source code(bao gồm 1 test project để tham khảo) đều có ở đây: [https://github.com/sontx/log-cpp](https://github.com/sontx/log-cpp)
