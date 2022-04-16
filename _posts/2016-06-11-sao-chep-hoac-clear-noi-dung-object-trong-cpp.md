---
title: Cách khác để sao chép hoặc clear nội dung thực thể trong C++
layout: post
description: >

tag: [programming]
comments: true
category: programming
---
Như đã biết thì việc sao chép nội dung của các thực thể của class trong C++ được thực hiện bằng copy contructor hoặc toán tử gán, đối với một số lớp đơn giản thì ta có thể không cần thực thi lại tụi này làm gì. Đối với các lớp có chứa con trỏ thì hầu hết trường hợp ta phải định nghĩa lại để có thể copy vùng nhớ mà con trỏ trỏ đến. Trong bài viết này mình không đi cụ thể vào cách xây dựng copy constructor hay nạp chồng toán tử gán, mình sẽ hướng dẩn các bạn một cách khác để copy nội dung của thực thể này sang thực thể khác mà không cần sử dụng đến copy constructor hay toán tử gán cũng như cách clear nội dung các trường của một thực thể một cách nhanh chóng. Dĩ nhiên cách này vẩn không thể thay thế hoàn toàn được phương pháp nạp chồng toán tử gán hay thực thi lại copy constructor, nó chỉ đơn giản là cung cấp một giải pháp khác cho bạn. Chú ý rằng các phương pháp này sẽ không thể sử dụng nếu trong class có định nghĩa các virtual method hoặc chứa các trường là con trỏ.

Sao chép nội dung của thực thể này sang thực thể khác
----------------

Cái này thì là công việc của hàm dựng sao chép(copy constructor) hoặc toán tử gán, nhưng hôm nay ta sẽ thực hiện 1 cách sao chép khác bưa hơn và có vẻ nguy hiểm hơn đó là sử dụng hàm `memcpy`. Bạn có thể google để biết thêm chức năng của hàm này.
Đại khái ta sẽ copy vùng nhớ của thực thể nguồn vào vùng nhớ của thực thể đích mà ko cần quan tâm nó chứa bao nhiêu trường. Số bytes sẽ copy chính bằng **sizeof** của lớp thực thể đó. Đến đây thì mọi ng chắc đủ hình dung cách làm rồi nhỉ. 
Chú ý khi dùng với các class có sử dụng phương thức virtual vì hàm này nó sẽ ghi đè mất cái virtual function table(nhớ ko nhầm là tên nó như thế) của cái thực thể đích bằng cái của thực thể nguồn, cái này nguy hiểm vồn đấy.

Clear nội dung cuả thực thể
-------------

Giả sử thế này, có 1 thực thể A đã được khởi tạo và gán giá trị hoặc sử dụng blabla các kiểu rồi, giờ muốn reset giá trị các trường của nó về zero. Cách đầu tiên nghỉ đến là ta từ từ ngồi gán từng trường của nó thành 0, hơi mệt, giả sử thêm 1 trường nữa thì lại phải vào sửa code.
May sao có hàm `memset`(google để biết thêm chi tiết), ý tưởng là dùng hàm này để set vùng nhớ của thực thể thành 0 hết, như thế thì vô hình chung ta đã set giá trị các trường thành 0 rồi.
Chú ý khi dùng với các class có sử dụng phương thức virtual vì hàm này nó sẽ ghi đè mất cái virtual function table(nhớ ko nhầm là tên nó như thế) thành 0 -> NULL đấy.

Ví dụ
------

Nội dung ví dụ khá đơn giản: ta tạo ra 1 class chứa 1 số trường sau đó tạo 1 thực thể của nó và gán cho các trường của thực thể này 1 số giá trị nào đó. Bước tiếp theo là test 2 chức năng copy và clear bằng cách:

* Copy: tạo ra 1 thực thể thứ 2 từ lớp này và sử dụng memcpy để copy vùng nhớ của thèn thực thể đầu sang thèn mới này.
* Clear: sử dụng memset để set vùng nhớ của thực thể này về 0 hết.

Source code:

```cpp
#include <stdio.h>
#include <string.h>

class MyClass
{
public:
    int field1;
    float field2;
    char * field3;
    double field4;

    void show_fields()
    {
        printf("field1: %d\n", field1);
        printf("field2: %f\n", field2);
        printf("field3: %s\n", field3 != NULL ? field3 : "NULL");
        printf("field4: %lf\n", field4);
    }

    MyClass() {}

    ~MyClass() {/* todo something here :| */};
};

int main()
{
    MyClass myClass;
    // init something
    myClass.field1 = 1;
    myClass.field2 = 2.0f;
    myClass.field3 = "www.sontx.in ";// just PR for my blog :|
    myClass.field4 = 3.0;

    printf("Before:\n");
    myClass.show_fields();

    MyClass other;
    // you can also use default copy constructor to do this
    memcpy(&other, &myClass, sizeof(MyClass));// copy myClass -> other with sizeof(MyClass) bytes
    printf("\nAfter - copy:\n");
    other.show_fields();

    memset(&myClass, 0, sizeof(MyClass));// set sizeof(MyClass) zero bytes -> myClass
    printf("\nAfter - clear:\n");
    myClass.show_fields();
}
```

Đây là kết quả chạy:

![](https://2.bp.blogspot.com/-9grgQ323-rU/V1vHFuLj6aI/AAAAAAAAOzk/hddDCO-b9B4C0R3dfGJo-2tzHofWg3M9ACLcB/s1600/Untitled.png)
