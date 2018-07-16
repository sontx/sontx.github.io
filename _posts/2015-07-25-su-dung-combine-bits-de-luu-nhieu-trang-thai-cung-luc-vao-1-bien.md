---
title: Sử dụng combine bits để lưu nhiều trạng thái cùng lúc vào 1 biến trong C++
layout: post
description: >
  Chắc hẳng các bạn đã biết tới enum, const hay đơn giản là define có thể sử dụng để định nghĩa cho những con số khô khan bằng các tên dể nhớ như: SUMMER = 1, SPRING = 2, WINTER = 3, AUTUMN = 4. Và khi sử dụng thì thay vì phải nhớ 1, 2, 3, 4 thì ta chỉ cần nhớ SUMMER, SPRING, WINTER hay AUTUMN nhờ đó mà ta không bị lẩn lộn hoặc quên các giá trị đó.
tag: [programming]
comments: true
---

Chắc hẳng các bạn đã biết tới enum, const hay đơn giản là define có thể sử dụng để định nghĩa cho những con số khô khan bằng các tên dể nhớ như: SUMMER = 1, SPRING = 2, WINTER = 3, AUTUMN = 4. Và khi sử dụng thì thay vì phải nhớ 1, 2, 3, 4 thì ta chỉ cần nhớ SUMMER, SPRING, WINTER hay AUTUMN nhờ đó mà ta không bị lẩn lộn hoặc quên các giá trị đó.

Chủ đề của bài viết này xuay quanh cách giải quyết vấn đề nhỏ sau: ta có 1 enum định nghĩa các trạng thái như bên dưới. 

```cpp
enum FileAccess {
    READ, // file có thể đọc
    WRITE,  // file có thể viết
    MODIFY, // file có thể được chỉnh sửa
    EXECUTE // file có thể được thực thi
};
```

Ta có 1 biến kiểu kiểu FileAccess để lưu trạng thái truy cập file như sau: 

```cpp
FileAccess mState;
```

Và dĩ nhiên là ta có thể gán giá trị cho mState bằng 1 trong các giá trị của enum FileAccess ví dụ như sau: 

```cpp
mState = READ;// bây giờ biến mState lưu giá trị READ(số 1)
mState = WRITE;// bây giờ biến mState lưu giá trị WRITE(số 2)
mState = MODIFY;// bây giờ biến mState lưu giá trị MODIFY(số 4)
```

Vấn đề nằm ở chổ biến mState không thể lưu cùng lúc 2 hay nhiều giá trị FileAccess và dĩ nhiên mState chỉ có thể hoặc là READ hoặc là WRITE hoặc là MODIFY...Vấn đề đặt ra là làm sao lưu được nhiều trạng thái của FileAccess ví dụ như 1 file có thể vừa đọc vừa viết, file khác lại có thể vừa đọc vừa viết vừa có thể chỉnh sửa nội dung...Và dưới đây là 1 cách để giải quyết vấn đề này bằng combine bits.

Để sử dụng được kỷ thuật này ta cần thay đổi chút ít ở FileAccess và biến mState như sau:
Đối với FileAccess ta định nghĩa lại với giá trị được set cứng như bên dưới. 

```cpp
enum FileAccess {
    READ    = 0x01,// file có thể đọc
    WRITE   = 0x02,// file có thể viết
    MODIFY  = 0x04,// file có thể được chỉnh sửa
    EXECUTE = 0x08 // file có thể được thực thi
};
```

Tại sao lại set các giá trị như thế thì ta sẽ xét ở bên dưới, điều ta cần làm tiếp theo là thay đổi kiểu dữ liệu của mState thành int như sau:

```cpp
int mState;
```

Ok! bước chuẩn bị đã xong, giờ ta xem tại sao lại set giá trị cho các giá trị của FileAccess là giá trị của 2^x nhé. Các giá trị 2^x rất đặt biệt: 1(2^0), 10(2^1), 100(2^2), 1000(2^3)...Như đã thấy thì giá trị của nó luôn chỉ chứa 1 số 1 ở đầu sau đó là các số 0. Giả sử ta OR 2 giá trị 1000(8) và 10(2) với nhau ta sẽ có giá trị mới là 1010(10), giờ ta muốn biết giá trị 1010(10) có chứa 10(2) ở bên trong không thì ta chỉ cần AND giá trị 1010(10) với giá trị 10(2) và kiểm tra kết quả có bằng 10(2) hay không, như ở đây thì 1010 AND 0010 sẽ cho kết quả là 10. Như để biết được 1 giá trị 2^x có ở trong 1 biến được combine từ các giá trị 2^x hay không ta chỉ cần AND biến đó với giá trị 2^x cần kiểm tra rồi so sánh kết quả với giá trị 2^x đó, nếu bằng thì nghĩa là giá trị 2^x có trong biến combine...Ta có code ví dụ như bên dưới: 

```cpp
#include <stdio.h>

int main() {
    int mState;
    int val_2 = 2;  // 00010
    int val_4 = 4;  // 00100
    int val_8 = 8;  // 01000
    int val_16 = 16;// 10000

    mState = val_2 | val_4 | val_16;

    if((mState & val_4) == val_4)
        printf("Has val_4\n");
    else
        printf("Hasn't val_4\n");

    if((mState & val_8) == val_8)
        printf("Has val_8\n");
    else
        printf("Hasn't val_8\n");
}
```

Kết quả sẽ là:

![](https://2.bp.blogspot.com/-XWzt-vb9IL8/VbNVupz9WFI/AAAAAAAAM4A/Iuo3DTNNtVk/s1600/Capture.PNG)

Như ở trên ta chỉ combine các giá trị 2, 4 và 16 nên kết quả kiểm tra cho ta biết "Has val_4" và "Hasn't val_8"

Giả sử ta có giá trị sau khi combine là 1010 được combine từ 8 và 2, giờ ta lại muốn xóa số 2 trong biến đã combine đó thì ta chỉ cần đảo bit số 2 sau đó AND nó với 10 nghĩa là 1010 AND (~0010) = 1010 AND 1101 = 1000. Ta có code ví dụ như sau: 

```cpp
#include <stdio.h>

int main() {
    int mState;
    int val_2 = 2;  // 00010
    int val_4 = 4;  // 00100
    int val_8 = 8;  // 01000
    int val_16 = 16;// 10000

    mState = val_2 | val_4 | val_16;

    mState &= ~val_4;

    if((mState & val_4) == val_4)
        printf("Has val_4\n");
    else
        printf("Hasn't val_4\n");

    if((mState & val_8) == val_8)
        printf("Has val_8\n");
    else
        printf("Hasn't val_8\n");
}
```

Kết quả bây giờ sẽ là:

![](https://1.bp.blogspot.com/-ZGICn4GVT6E/VbNZOvGRGeI/AAAAAAAAM4U/nC1u1oVyP9c/s1600/Capture.PNG)

Rỏ ràng là giá trị val_4 đã bị remove khỏi biến mState.

Tiếp theo ta sẽ áp dụng nó vào bài toán FileAccess ở đầu bài viết. Trước khi áp dụng vào bài toán bên trên, ta sẽ viết thêm 1 số hàm hổ trợ như sau: 

```cpp
// kiểm tra xem có giá trị flag trong state không
bool hasFlag(int state, int flag) {
    return (state &amp; flag) == flag;
}
// thêm 1 giá trị flag vào state
void addFlag(int&amp; state, int flag) {
    mState |= flag;
}
// xóa 1 giá trị flag trong state
void removeFlag(int&amp; state, int flag) {
    mState &amp;= ~flag;
}
```

Chức năng mỗi hàm thì mình đã comment cụ thể ở trong code. Bây giờ ta áp dụng vào bài toán của ta như sau: 

```cpp
#include <stdio.h>

enum FileAccess {
    READ    = 0x01,// file có thể đọc
    WRITE   = 0x02,// file có thể viết
    MODIFY  = 0x04,// file có thể được chỉnh sửa
    EXECUTE = 0x08 // file có thể được thực thi
};

bool hasFlag(int state, int flag) {
    return (state & flag) == flag;
}

void addFlag(int& state, int flag) {
    state |= flag;
}

void removeFlag(int& state, int flag) {
    state &= ~flag;
}

int main() {
    int mState = WRITE;
    
    addFlag(mState, READ);
    addFlag(mState, EXECUTE);

    if(hasFlag(mState, READ))
        printf("Has READ\n");
    else
        printf("Hasn't READ\n");

    if(hasFlag(mState, MODIFY))
        printf("Has MODIFY\n");
    else
        printf("Hasn't MODIFY\n");

    removeFlag(mState, EXECUTE);

    if(hasFlag(mState, EXECUTE))
        printf("Has EXECUTE\n");
    else
        printf("Hasn't EXECUTE\n");
}
```

Và kết quả sẽ là:

![](https://4.bp.blogspot.com/-l-1FPcBy9yA/VbNcCAapRII/AAAAAAAAM4g/FUH09St3bYg/s1600/Capture.PNG)

Như thế là từ 1 biến mState ta có thể lưu rất nhiều trạng thái khác nhau nhờ vào việc combine các bit giá trị của 2^x.