---
title: Cách sử dụng Visual Leak Detector để phát hiện memory leak trong Visual C++
layout: post
description: >
  Hôm nay mình sẽ hướng dẩn cách sử dụng [Visual Leak Detector(VLD)](https://kinddragon.github.io/vld/) để phát hiện memory leak trong chương trình Visual C++. Hiểu một cách đơn giản, memory leak là bug và nó không làm chương trình bị crash lúc runtime nhưng nó lại ảnh hướng tới tài nguyên hệ thống, xảy ra khi bộ nhớ ở heap được cấp phát nhưng quên giải phóng. Phát hiện memory leak là công việc hết sức khó khăng nếu ta không nắm rỏ về con trỏ và cấp phát động trong C++, nhưng may thay công cụ vld đã được xây dựng để hổ trợ cho việc xác định memory leak trong Visual C++ nhờ đó việc phát hiện leak trở nên đơn giản và trực quan hơn.
tag: [programming]
comments: true
category: programming
---

Phần giới thiệu đã xong, bây giờ chúng ta bắt tay vào chủ đề chính. Đầu tiền các bạn tải vld tại trang chủ hoặc tải tại [đây](http://1drv.ms/1EiU8ZW) sau khi tải về các bạn có folder như sau:

![](https://4.bp.blogspot.com/-MgPb296msew/Vd3teWdbqiI/AAAAAAAANmQ/20Gc_Drjbls/s1600/Capture.PNG)

Tiếp theo các bạn tạo 1 project trong Visual C++ với tên là MemoryLeak và copy folder vld vào folder project MemoryLeak vừa tạo như sau:

![](https://2.bp.blogspot.com/-A27y1oImdwQ/Vd3t9onrySI/AAAAAAAANmY/VVb-a0Hx_HQ/s1600/Capture.PNG)

Tiếp theo copy file dbghelp.dll vào folder Debug(nếu chưa có thì tạo mới folder đó) như hình:

![](https://1.bp.blogspot.com/-Lniwg0whAVE/VeP2FOC5cbI/AAAAAAAANnw/2pRqp_YbynU/s1600/Capture.PNG)

OK, bây giờ click chuột phải vào project và chọn Properties:

![](https://4.bp.blogspot.com/-UUpZcJM5iBA/Vd3uc4DemuI/AAAAAAAANmg/w6ET4wZiMZw/s1600/Untitled.png)

Cửa sổ properties của project hiện ra, ta chọn mục Configuration Properties -> Linker -> General và điền vào tùy chọn Additiional Library Directories là vld; như hình:

![](https://2.bp.blogspot.com/-g7EEt8m1Iaw/Vd3u_wW5HmI/AAAAAAAANmo/SP9JdrpRufE/s1600/Capture.PNG)

Bây giờ ta chuyển sang mục Input(bên dưới mục General) và điền vào tùy chọn Additional Dependencies là vld.lib và tùy chọn Ignore Specific Library là LIBCD.lib như hình:

![](https://4.bp.blogspot.com/-SVBJe7GyqUE/Vd3vkA-hxUI/AAAAAAAANmw/Rqmc51mNegA/s1600/Capture.PNG)

Cuối cùng nhấn OK để lưu lại thiết đặt. Tiếp theo ta vào file lưu hàm main của chương trình(thường là file main.cpp) và include vld.h như sau:

```cpp
#include "vld/vld.h"

int main(){

}
```

Mọi bước chuẩn bị đã hoàn tất, bây giờ chúng ta sẽ test thử 1 đoạn code gây memory leak để xem hoạt động của vld như thế nào. Chúng ta cấp phát 1 mảng 3 phần tử mà không giải phóng như sau:

```cpp
#include "vld/vld.h"

int main(){
    int * ptr = new int[3];
}
```

Nhấn F5 và đợi chương trình kết thúc sau đó xem kết quả ở cửa sổ Output của Visual C++ như bên dưới:

![](https://1.bp.blogspot.com/-TIvZUOzyRIE/Vd3xgJ7Vt2I/AAAAAAAANm8/LsFBcVEfW50/s1600/Capture.PNG)

Visual Leak Detector  đã phát hiện ra 1 leak và thông bao ra ở cửa sổ Output. Nếu vld không phát hiện ra leak thì tại cửa sổ Output sẽ hiển thị như sau:

![](https://4.bp.blogspot.com/-jQf7vOh4ypk/Vd3x_c1oeWI/AAAAAAAANnE/V08VkVzh9NA/s1600/Capture.PNG)

Bây giờ ta thực hiện 1 ví dụ nữa về cách phát hiện leak và tìm vị trí của leak đó trong code nhờ vld. 

```cpp
#include <stdio.h>
#include "vld/vld.h"

void alloc() {
    new char[3];
}

int main() {
    printf("To do something...\n");
    int * pi = new int[3];
    printf("To do something...\n");
    float * pf = new float;
    alloc();
    printf("Free something\n");
    delete[] pf;
}
```

Sau khi nhấn F5 ta thấy ở cửa sổ Output hiển thị như sau:

![](https://4.bp.blogspot.com/-wzbhN5Q5aBg/VeP2dQpVoqI/AAAAAAAANn4/5iQbe8XlQfQ/s1600/Capture.PNG)

Visual Leak Detector thông báo rằng đã phát hiện ra 2 leaks(cấp phát cho mảng int và cấp phát mảng char), mọi thông tin chi tiết về vị trí cấp phát và kích thước bộ nhớ chưa thu hồi đều được vld liệt kê ở đây.

![](https://1.bp.blogspot.com/-rw5D_rbmw6E/VeP3T1ykjVI/AAAAAAAANoE/YjvxWPQIngc/s1600/Capture.PNG)

Chú ý đến những vị trí đã đánh dấu mủi tên, nó sẽ chỉ rỏ vị trí nơi đã cấp phát gây leak nhờ đó ta có thể xác định được nguyên nhân gây ra leak và xử lý leak hợp lý hơn.
