---
title: Class C++ và CreateThread Win32 API
layout: post
description: >
  Làm thế nào để thực thi một hàm non-static của class trong 1 thread? Nếu bạn muốn tìm hiểu *thread* là gì thì có thể đọc thêm ở [đây](/2015/05/15/su-dung-thread-trong-cpp/).
tag: [programming]
comments: true
category: programming
---

Như các bạn đã biết, hàm CreateThread cần biết địa chỉ của hàm mà nó sẽ thực thi khi thread chạy(The starting address for a thread) và dĩ nhiên hàm này phải là hàm tỉnh(static function), bạn phải khai báo static nếu là class member hoặc khai báo bên ngoài class như C style.

![](https://2.bp.blogspot.com/-SZN8HFiT6jA/V147xZQWj-I/AAAAAAAAOz8/48TDa_5E-58gAhKD183sVYjScgFq0_L0ACLcB/s1600/Multithreaded_process.png)

Ví dụ:

```cpp
//..........
CreateThread(NULL, 0, thread_proc, NULL, 0, &threadId);
//..........
DWORD thread_proc(LPVOID lpParameter)
{
    printf("background thread!");
}
```

Nhưng nhiều lúc ta lại muốn thực thi 1 hàm non-static bên trong class thay vì chạy thread_proc như bên trên thì làm thế nào? Cách làm thì đơn giản cực kỳ nhưng cách đây khá lâu khi động đến phần này thì mình lại bí.

Cách làm thì có nhiều nhưng do trình độ có hạn nên chỉ dám đóp góp 2 ngu ý như sau:

Cách đầu tiên
-------

Như ta đã biết, hàm CreateThread cho phép ta pass 1 đối số là con trỏ kiểu void(con trỏ mất dạy nhất, nó có thể là bất cứ con trỏ nào). Ta sẽ pass chính con trỏ của thực thể class cần thực thi hàm non-static vào CreateThread và sau đó nhận lại con trỏ này tại đối số của ThreadProc, bước tiếp theo ta chỉ cần gọi hàm non-static cần thực thi từ con trỏ này.

Ý tưởng như sau:

```cpp
class MyClass
{
public:
    // hàm này sẽ đc thực thi trong thread
    void run_bg_thread()
    {
        printf("Background thread!");
    }
};

//..........
MyClass myClass;
DWORD threadId;
CreateThread(NULL, 0, thread_proc, &myClass, 0, &threadId);
//..........

DWORD thread_proc(LPVOID lpParameter)
{
    MyClass * myClass = (MyClass *) lpParameter;
    myClass->run_bk_thread();
}
```

Ta có thể cải tiến thêm bằng cách đưa đoạn mã tạo thread vào trong class luôn:

```cpp
class MyClass
{
    // phương thức này sẽ đc thực thi trong thread
    void run_bg_thread()
    {
        printf("Background thread!");
    } 
    static DWORD thread_proc(LPVOID lpParameter)
    {
        MyClass * myClass = (MyClass *) lpParameter;
        myClass->run_bg_thread();
    }
public:
    void start_thread()
    {
        CreateThread(NULL, 0, thread_proc, this, 0, &threadId);
    }
};

// khi dùng chỉ cần viết đơn giản như sau
MyClass myClass;
myClass.start_thread();
```

Cách thứ 2
-------

Cách này cao siêu hơn tí, đầu tiên ta sẽ định nghĩa 1 abstract class(đúng hơn là interface nhưng trong C++ nó ko có khái niệm này) chứa 1 public method kiểu pure virtual. Sau đó các lớp nào muốn chạy trong thread thì cần kế thừa từ class này. Chúng ta sẽ tìm hiểu cụ thể ngay bên dưới.
Đầu tiên là abstract class đóng vai trò như là 1 interface:

```cpp
// giống java ko 
class Runnable
{
public:
    virtual void run() = 0;// pure virtual method
};
```

Tiếp theo ta viết 1 class nho nhỏ để tự động tạo thread, bên dưới sử dụng lambda expression cho gọn, ta khỏi phải khai báo thêm static method như cách 1:

```cpp
class Task
{
public:
    static void run(Runnable * runnable);
};

void Task::run(Runnable * runnable)
{
    DWORD threadId;
    CreateThread(NULL, 0, [](LPVOID p)->DWORD { ((Runnable *)p)->run(); return 0; }, runnable, 0, &threadId);
}
```

Rồi, giờ sử dụng thành quả thôi, cách sử dụng khá giống trong java vì thế mình ko giải thích nhiều:

```cpp
class MyClass: public Runnable
{
public:
    virtual void run()
    {
        printf("Background thread!");
    }
};

MyClass myClass;
Task::run(&myClass);
```

Cách 2 này cực ở bước chuẩn bị(2 class trên) nhưng sướng ở bước sử dụng vì thế nên tùy vào độ lười của mỗi ng mà lựa chọn style phù hợp.
