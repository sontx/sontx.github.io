---
title: 'Pragma: pack keyword'
layout: post
description: >
  Đây là keyword quy định giá trị Alignment cho các trường trong struct,
  union hoặc class.  Mình có một bài viết về struct alignment tại đây bạn có thể tham
  khảo lại để hiểu rỏ hơn ý nghĩa của từ khóa pack trong bài viết này.
tag: [programming]
comments: true
---

Cú pháp:

```c
#pragma pack( [ show ] | [ push | pop ] [, identifier ] , n  )
```

`pack` keyword cho phép điều chỉnh giá trị alignment ở cấp độ data-declaretion(khai báo dữ liệu). Ở bài viết trước mình hướng dẩn các bạn cách thay đổi giá trị alignment bằng tùy chỉnh trong hộp thoại Properties của Visual C++. Với cách này thực chất ta sẽ sử dụng tùy chỉnh `/Zp` của trình biên dịch, cách này chỉ cung cấp điều khiển ở mức độ module. Nghĩa là nó sẽ áp dụng cho toàn bộ project. Từ khóa `pack` cung cấp cho ta một giải pháp mềm dẻo hơn. Nó chỉ có tác dụng với những struct, union hoặc class được khai báo bên dưới từ khóa `pack`. Ví dụ như sau:

```c
truct A
{
    char x;
    int y;
};
#pragma pack(1)
struct B
{
    char z;
    int w;
};
```

Lúc này chỉ có struct B chịu tác dụng của từ khóa `pack`.

Khi bạn sử dụng `pack` không có đối số thì mặt định nó sẽ nhận giá trị từ tùy chỉnh `/Zp`, nếu giá trị tùy chỉnh `/Zp` cũng không được định nghĩa thì mặt định sẽ là **8**.

```c
// either #pragma pack(8) or #pragma pack(value of /Zp)
#pragma pack
```

Khi bạn thay đổi giá trị alignment của struct, union hoặc class thì có thể làm giảm kích thước của nó trong bộ nhớ. Nhưng điều đó cũng đồng nghĩa với việc giảm hiệu năng hoặc sinh ra một ngoại lệ(exception) hardware-generated do việc truy cập vào vùng nhớ unaligned. Bạn có thể chỉnh sửa cách xử lý ngoại lệ này bằng việc sử dụng hàm [SetErrorMode](https://msdn.microsoft.com/library/windows/desktop/ms680621).

Bây giờ ta sẽ điểm qua một số options trong từ khóa `pack`:

1. **show**: Hiển thị giá trị alignment hiện tại, giá trị này sẽ được hiển thị ở cửa sổ Output dưới dạng một warning message kiểu như thế này "warning C4810: value of pragma pack(show) == 8"

1. **push**: Nó sẽ đẩy giá trị alignment hiện tại vào trong internal stack của trình biên dịch và đặt giá trị alignment hiện tại bằng n(nếu giá trị n này được định nghĩa).

1. **pop**: Đưa vào internal stack rồi thì cần phải lấy ra chứ nhỉ. Nó sẽ lấy giá trị đã push vào stack theo nguyên lý ngăn xếp(pop thì nó sẽ lấy và remove phần tử tại đỉnh của ngăn xếp). Nếu giá trị n không được định nghĩa thì nó sẽ lấy giá trị alignment tương ứng với phần tử đã lấy ra từ stack để gán cho alignment hiện tại. Nếu n được định nghĩa thì lúc này giá trị n sẽ được gán cho giá trị alignment hiện tại. Nếu giá trị identifier được định nghĩa thì lúc này tất cả phần tử sẽ được pop ra khỏi stack cho đến khi gặp và pop được giá trị identifier trong stack. Nếu không tìm thấy bất cứ phần tử nào có identifier tương ứng thì pop bị hủy bỏ.

1. **identifier**: Khi bạn sử dụng push để đẩy một giá trị alignment hiện tại vào internal stack, bạn có thể sử dụng identifier như là tên để nhận dạng sau này. Khi sử dụng với pop, tất cả các phần tử sẽ bị pop ra cho đến khi identifier bị remove. Nếu giá trị identifier không tìm thấy thì pop bị hủy và sẽ không có phần tử nào bị remove khỏi statck(như chưa hề có chuyện gì xảy ra).

1. **n**: Các phần giải thích trên phần nào cũng cho bạn biết được trách nhiệm của n rồi nhỉ. Nó định nghĩa giá trị alignment(bytes) để sử dụng cho packing. Nếu tùy chỉnh /Zp không được đặt cho project thì mặt định giá trị n sẽ là 8. Chú ý rằng giá trị n chỉ được nằm trong 5 giá trị là 1, 2, 4, 8 và 16.

Sau đây là một ví dụ về cách sử dụng `pack` để thay đổi alignment của một struct.

<div data-gist-id="d0c85123adae3f0d5c81cd7c7f15ffab"></div>

Và đây là ví dụ về việc sử dụng **push**, **pop** và **show**.

<div data-gist-id="7ebb390fec622279e38ac03bbeab3c6b"></div>

Bài viết được tham khảo từ địa chỉ: [https://msdn.microsoft.com/en-us/library/2e70t5y1(v=vs.140).aspx]( https://msdn.microsoft.com/en-us/library/2e70t5y1(v=vs.140).aspx)