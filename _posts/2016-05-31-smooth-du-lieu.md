---
title: Smooth dữ liệu
layout: post
tags:
- c++
- data-processing
comments: true
category: programming
---

Để mở đầu cho bài viết này mình sẽ lấy ví dụ về IDM thần thánh, trình download được crack nhiều nhất thế giới 😂

Chắc hẳng trong số chúng ta đã không ít người overnight để tải game rồi nhỉ, cả mấy chục G là điều bình thường. Ngồi nhìn tốc độ download lên xuống liên tục mà đau tim. Nhưng bạn có bao giờ để ý tốc độ download hiển thị trên IDM luôn tăng/giảm một cách rất “smooth” không, nó không bao giờ nhảy cái độp một phát từ 1.2MB xuống mấy chục KB/s nhỉ. Giá trị này luôn giảm một cách rất “từ từ” mà tốc độ mạng thì nó không giảm từ từ như thế. Việc hiển thị giá trị kiểu này giúp người dùng có thể dể dàng biết được tốc độ download đang tăng hay đang giảm và nhìn có vẻ dể chịu hơn nhỉ 😂

![](https://4.bp.blogspot.com/-ldAw_2oXfmY/V01FWfzo_7I/AAAAAAAAOqw/Z3Kif5MnIl4NRgwsXBYzlzQm7py0r1ztQCKgB/s1600/Capture.PNG)

Bây giờ ta sẽ đi vào tìm hiểu cách đơn giản nhất để làm mượt dữ liệu, phương pháp tính trung bình của mảng(hoạt động theo nguyên lý hàng đợi).

Ý tưởng của việc này khá đơn giản: bạn cho lần lượt các giá trị input vào 1 hàng đợi có kích thước cố định, khi hàng đợi đầy thì chỉ việc pop giá trị cuối hàng đợi ra. Mỗi bước input như thế bạn sẽ tính giá trịnh trung bình cộng của các phần tử trong mảng và kết quả sẽ là giá trị output tương ứng với input lúc nảy.

Mình sẽ đi vào một ví dụ cụ thể: cho input các số từ 1 đến 50, mỗi số có giá trị random từ 1 đến 1000, hiển thị kết quả smooth tương ứng.

So sánh kết quả input và output bạn sẽ thấy điểm đặt biệt.

Dưới đây là toàn bộ bài giải:

```cpp
#include <stdio.h>
#include <time.h>
#include <string.h>
#include <stdlib.h>

int get_smooth_value(int input)
{
    static int queue_array[] = {0, 0, 0, 0, 0, 0, 0, 0, 0, 0};
    static int current_index = 0;
    static int queue_length = sizeof(queue_array) / sizeof(int);
    // reset index to 0 when reach end of queue
    if (current_index >= queue_length)
        current_index = 0;
    // push input value to queue
    queue_array[current_index++] = input;
    // average of the queue
    int sum = 0;
    for (int i = 0; i < queue_length; i++)
    {
        sum += queue_array[i];
    }
    return sum / queue_length;
}

int main()
{
    srand(time(NULL));
    printf("input\toutput\n");
    for (int i = 0; i < 50; i++)
    {
        // random from 1 to 1000
        int input = rand() % 1000 + 1;
        // push input value into queue array then take output
        int output = get_smooth_value(input);
        printf("%d\t%d\n", input, output);
    }

    system("pause");
}
```

Chúng ta sử dụng một mảng `queue_array` để lưu các giá trị input, về tư tưởng thì chúng ta sẽ sử dụng một hàng đợi để push giá trị input này vào nhưng để tối ưu thì mình sẽ code hơi khác tí. Push lần lược các giá trị input vào mảng `queue_array`, sử dụng một biến `current_index` để lưu lại vị trị phần tử input hiện tại vừa được push vào mảng. Nếu vị trí này là đã cuối mảng `queue_array` rồi thì ta chỉ việc reset giá trị này về 0 để trở về lại đầu mảng(kiểu chạy vòng tròn). Làm như thế chúng ta sẽ đảm bảo được các giá trị trong `queue_array` luôn là các giá trị mới nhất. Việc tiếp theo khá đơn giản đó là tính trung bình cộng của `queue_array` và giá trị này chính là output của ta.

> Kích thước của `queue_array` sẽ ảnh hưởng tới độ “smooth” của output, giá trị này càng lớn thì dữ liệu càng “smooth”. Giá trị này không được quá lớn vì sẽ ảnh hưởng tới độ chính xác khi hiển thị ra cho người dùng.

Kết quả sau khi chạy đoạn code trên như sau:

![](https://3.bp.blogspot.com/-1Pd0e_CQxHk/V01gei3TNhI/AAAAAAAAOrI/E-7nx9wFbmoYJJd5yfkl2VozKeiAx-aIwCKgB/s1600/Capture.PNG)

Chú ý 2 cột giá trị input và output ta sẽ thấy điểm khác biệt, giá trị cột input sẽ random và dĩ nhiên sẽ chẳng theo quy luật nào cả, giá trị cột output lại tăng giảm một cách rất "mượt" theo giá trị tương ứng của input.

Hoạt động của queue_array được mô tả như hình sau với kích thước của queue_array là 5, input lần lượt là 1, 3, 5, 2, 6, 7, 4, 8 và output sẽ là 0.2, 0.8, 1.8, 2.2, 3.4, 4.6, 5.4 và 5.4, mỗi step sẽ tương ứng với một giá trị input được push vào mảng:

![](https://3.bp.blogspot.com/-xrLqBVhY3w0/V01k-bHO5DI/AAAAAAAAOrg/HXjvWni3T9Uwzch9LMmFzQA-cKS-k8FGgCKgB/s1600/Capture.PNG)

Như đã thấy thì các giá trị mới sẽ lần lượt được push vào mảng và khi đến cuối mảng thì nó lại trở về đầu để ghi đè vào giá trị cũ.

Cách smooth dữ liệu bằng mảng khá hiệu quả nhưng lại đơn giản để cài đặt, mức độ smooth của dữ liệu có liên quan chặt chẻ đến kích thước của mảng. Giá trị này càng lớn thì dữ liệu của ta sẽ càng “mượt” nhưng nếu quá lớn thì độ chính xác khi hiển thị sẽ càng thấp. Bạn có thể dùng smooth dữ liệu trong các trường hợp hiển thị tốc độ xử lý(download, upload...), biểu đồ real-time,... để hiển thị được đẹp hơn và người dùng dể biết được chiều hướng thay đổi dữ liệu.
