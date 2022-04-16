---
title: Một cách khác để cấp phát bộ nhớ động trong C++
layout: post
description: >
tag: [programming]
comments: true
category: programming
---

Như các bạn đã biết thì việc cấp phát bộ nhớ động sẽ tốn một khoản thời gian và cũng có thể sẽ xảy ra trường hợp việc cấp phát thất bại vì không đủ bộ nhớ chẳng hạn. Để giải quyết vấn đề này ta có thể sử dụng cách cấp phát một vùng lớn bộ nhớ ngay từ ban đầu, sau đó ta chỉ việc trỏ đúng vị trí và ép kiểu nó sang các kiểu tương ứng là được. Ví dụ thế này: bạn cần mua một số mảnh đất để trồng trọt, việc mua đất sẽ tùy vào mùa màng và thời tiết mà bạn sẽ quyết định mua thêm để trồng các loại cây khác nhau hoặc bán bớt đất. Việc mua và bán đất dĩ nhiên sẽ làm bạn tốn một khoản thời gian để làm giấy tờ các kiểu, có khi đất trống không sẵn có để bạn mua nữa. Để giải quyết vấn đề này, bạn quyết định mua luôn một vùng đất lớn, khi bạn muốn trồng một loại cây A nào đó, bạn chỉ việc xác định vị trí trống còn lại trên vùng đất đã mua kèm theo tổng kích thước cần thiết để trồng loại cây A, từ đó bạn đánh dấu khu đất đó là để trồng cây A. Cứ như vậy bạn có thể xác định các khu đất để trồng các loại cây khác dựa trên vùng đất lớn đã mua.

Ý tưởng là thế, để triển khai ta làm như sau. Đầu tiên cấp phát một vùng nhớ đủ lớn và sử dụng một pointer để quản lý vùng nhớ đó, sử dụng một pointer khác để đánh dấu vị trí địa chỉ còn trống trong vùng nhớ. Mỗi lần một yêu cầu cấp phát được gọi thì ta chỉ việc trả về vị trị còn trống hiện tại trong vùng nhớ sau đó dịch vị trí này lên một đoạn bằng với kích thước yêu cầu cấp phát. Đây là cách đơn giản nhất mà ta có thể thực thi mã lệnh một cách dể dàng, dĩ nhiên còn nhiều vấn đề trong cách này như việc không đủ vùng nhớ cấp phát, cách thu hồi và quản lý vùng nhớ lớn, khởi tạo thực thể…. 
Ở đây mình chỉ cung cấp ý tưởng và từ ý tưởng đó bạn có thể hiểu được những thứ cao siêu sau này mà người ta sử dụng hoặc xây dựng riêng một thư viện hoành tráng sử dụng ý tưởng đó luôn cũng nên.

Code ví dụ cho phần này như sau:

```cpp
#include <stdio.h>
#include <string.h>

struct Person
{
    int age;
    char name[50];
};

struct Animal
{
    char color[10];
    int weigth;
    int sex;
};

void show(Person * person)
{
    printf("-------------\nage: %d\nname: %s\n", person->age, person->name);
}

void show(Animal * animal)
{
    printf("-------------\ncolor: %s\nweigth: %d\nsex: %d\n", animal->color, animal->weigth, animal->sex);
}

const int MAX_POOL_SIZE = 10000;
int * pool;
int * offset;

void init()
{
    pool = new int[MAX_POOL_SIZE];
    offset = pool;
}

void finally()
{
    delete[] pool;
}

void * alloc(int bytes)
{
    if ((offset - pool) + bytes > MAX_POOL_SIZE)
        return NULL;
    void * obj = offset;
    offset += bytes;
    return obj;
}

int main()
{
    init();

    Person * one = (Person *)alloc(sizeof(Person));
    Person * two = (Person *)alloc(sizeof(Person));

    one->age = 10;
    strcpy(one->name, "son dep trai");
    two->age = 44;
    strcpy(two->name, "sontx cung dep trai");

    Animal * three = (Animal *)alloc(sizeof(Animal));
    strcpy(three->color, "xanh");
    three->weigth = 100;
    three->sex = 1;

    show(one);
    show(two);
    show(three);

    finally();
}
```
Mình sử dụng con trỏ pool để quản lý vùng nhớ lớn đó, con trỏ offset sẽ đánh dấu vị trí còn trống trong vùng nhớ. Mảng int 10000 sẽ được cấp phát ngay từ đầu và bạn có thể liên tưởng nó như là một vùng đất lớn mà bạn mua để có thể trồng nhiều loại cây lên đó mà không cần phải mua thêm các vùng đất khác. Hàm alloc sẽ cấp trả về vị trí còn trống trong vùng nhớ lớn đó và tự động dịch chuyển offset đến vị trí tiếp theo(đánh dấu rằng vùng trước đó đã được trồng một loại cây khác). Bạn thấy đấy, các thực thể Person và Animal được sử dụng mà không cần phải **new** hay cấp phát tỉnh gì cả.

Đây là kết quả chương trình:

![](https://4.bp.blogspot.com/-aEIbOG84NtY/V1qDRTgUFLI/AAAAAAAAOzI/o-upBBuN7O0WQKDF3kzTAVuliWXxIfrfgCKgB/s0/Untitled.png)

> Chú ý rằng không phải lúc nào cũng sử dụng được phương pháp này, ví dụ như khi bạn có các lớp phức tạp, các lớp có virtual method, có con trỏ… Phương pháp này chỉ giúp bạn liên tưởng đến một cách cấp phát khác trong C++ hoặc cách lưu trữ và khôi phục dữ liệu(hảy tưởng tượng cái vùng nhớ lớn đó chính là một file).
