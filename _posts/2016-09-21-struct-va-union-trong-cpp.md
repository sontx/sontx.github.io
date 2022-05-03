---
title: Struct và union trong C++
layout: post
description: Để lưu các dữ liệu có cấu trúc phức tạp như lưu thông tin 1 sinh viên
  thì ta có thể sử dụng các kiểu dữ liệu cơ bản như int, char...nhưng nếu ta phải
  lưu 1 danh sách sinh viên thì sẽ thế nào. Giả sử sinh viên cần thông tin về tên,
  giới tính, tuổi và tổng điểm như thế chúng ta có thể tạo ra 4 mảng tương ứng với
  4 thông tin, với index thứ i trong mảng tương ứng với việc lưu thông tin sinh viên
  thứ i. Cách giải quyết này khá thô sơ và cũng khá phức tạp, giả dụ như thêm 1 số
  thông tin cho sinh viên như tên lớp, địa chỉ...Để giải quyết những bài toán yêu
  cầu lưu dữ liệu phức tạp như thế này C/C++ đã đưa ra khái niệm struct, 1 kiểu dữ
  liệu có cấu trúc do người dùng tự định nghĩa. Chúng ta sẽ tìm hiểu chi tiết về struct
  và anh em họ của nó là union ngay sau đây.
tags:
- c++
- struct
- union
comments: true
category: programming
---

<span/>

Struct
-------

Struct đơn giản là một kiểu dữ liệu do người dùng tự định nghĩa từ các kiểu dữ liệu khác(có thể từ các kiểu dữ liệu cơ bản như int, short, long, char... hoặc từ những kiểu dữ liệu khác mà người dùng đã định nghĩa). Nó cho phép bạn nhóm các phần tử có kiểu dữ liệu khác nhau, trái ngược với mảng vì mảng cho phép nhóm các phần tử cùng kiểu.
Struct thường dùng như một bản ghi, ví dụ như khi bạn muốn lưu thông tin một quyển sách thì bạn có thể định nghĩa một struct chứa các phần tử như sau:

* char * title: tiêu đề sách.
* char * author: tác giả.
* int year: năm phát hành.

Để khai báo 1 struct ta có nhiều cách, ở đây mình giới thiệu cách thông dụng nhất. Cấu trúc khai báo 1 struct như sau: 

```cpp
struct struct_name {
    data_type1 data_name1;// khai báo thành viên dữ liệu thứ 1
    data_type2 data_name2;// khai báo thành viên dữ liệu thứ 2
    data_type3 data_name3;// khai báo thành viên dữ liệu thứ 3
    ........
};// chú ý dấu ; ở cuối khai báo struct
```

struct_name là tên của struct mình muốn định nghĩa, các dòng khai báo data_type1 data_name1, data_type2 data_name2... là các dòng khai báo các thành viên dữ liệu của struct(khai báo như khai báo biến bình thường), cuối cùng là dấu ; phải nhớ thêm vào cuối khai báo struct. Sau khai báo trên thì struct_name sẽ là 1 kiểu dữ liệu mới và được sử dụng y như các kiểu dữ liệu đã có(int, char, float...) như sau:
Mình sẽ lấy ví dụ về kiểu int và kiểu struct_name(vừa định nghĩa) để so sánh: 

```cpp
int val;// khai báo biến val kiểu int
struct_name val;// khai báo biến val kiểu struct_name

int* val;// khai báo biến val là con trỏ int
struct_name* val;// khai báo biến val là con trỏ kiểu struct_name
```

Về cơ bản là thế, vì struct là dạng dữ liệu có cấu trúc nên ta phải sử dụng chúng hơi khác bình thường. Cụ thể thế nào thì ta sẽ tìm hiểu thông qua ví dụ ngay đầu bài viết, mô tả thông tin sinh viên: 

```cpp
struct Student {
    char* name;
    char sex;
    int age;
    float totalPoint;
};
```

Bên trên là struct tên là Student mô tả 1 sinh viên gồm 4 thông tin là tên, giới tính, tuổi và tổng điểm, sau khai báo này ta có Student là 1 kiểu dữ liệu mới. Ta sẽ lần lược tìm hiểu cách khai báo 1 sinh viên, truy suất, thay đổi thông tin hoặc gán thông tin của sinh viên này cho sinh viên kia(giống với gán biến này cho biến kia).
Khởi tạo 1 sinh viên, có 2 cách: hoặc là khai báo như khai báo biến hoặc là cấp phát động.

```cpp
// cách 1: khai báo như khai báo biên, bộ nhớ được cấp phát trong stack
Student student1;

// cách 2: khai báo bằng cấp phát động, bộ nhớ được cấp phát trong heap
// chú ý phải giải phóng bộ nhớ sau khi sử dụng
Student* student2 = new Student();
```

Để truy suất hoặc thay đổi thông tin 1 sinh viên ta sử dụng dấu . nếu dùng cách 1 hoặc -> nếu dùng cách 2 cụ thể như sau: 

```cpp
// với cách 1: ta sử dụng dấu . để truy suất đến từng thành viên dữ liệu của struct
Student student1;// khai báo student1 là 1 sinh viên thuộc kiểu Student
student1.sex = 1;// gán 1 cho biến sex của student1
student1.age = 20;// gán tuổi của student1 là 20
printf("Total point is %0.2f\n", student1.totalPoint);// hiển thị tổng điểm của student1

// với cách 2: ta sử dụng -> để truy suất đến từng thành viên dữ liệu của struct
Student * student2 = new Student();// khai báo student2 là 1 sinh viên thuộc kiểu Student
student2->sex = 1;// gán 1 cho biến sex của student2
student2->age = 20;// gán tuổi của student2 là 20
printf("Total point is %0.2f\n", student2->totalPoint);// hiển thị tổng điểm của student2
```

Để gán thông tin của  sinh viên 1 cho sinh viên 2 ta gán như với 2 biến bình thường, chú ý là nếu sử dụng cấp phát động phải truy suất trực tiếp đến bộ nhớ đã cấp phát rồi mới gán cụ thể như sau: 

```cpp
/* với cách 1 */
Student student1;// khai báo student1
// gán thông tin cho student1
....
Student student2;// khai báo student2
// gán thông tin choh studen2
....
student1 = student2;// gán thông tin của student2 cho student1

/* với cách 2 */
Student* student1 = new Student();// khai báo student1
// gán thông tin cho student1
....
Student* student2 = new Student();// khai báo student2
// gán thông tin choh studen2
....
*student1 = *student2;// gán thông tin của student2 cho student1
// với cách 2 này ta không dùng student1 = student2 vì như thế là gán 2 con trỏ cho nhau
```

Thực ra có 1 bug nguy hiểm ở đây, nó liên quan đến cơ chế "gán" của struct và vấn đề bộ nhớ mà ta sẽ tìm hiểu ở các phần bên dưới.
Về cơ bản thì cách sử dụng struct đã được mình đề cập ở bên trên, bây giờ ta sẽ đến với phần hay ho hơn đó là đi sâu vào tìm hiểu struct.

Vấn đề bộ nhớ trong struct
-------------

Kích thước bộ nhớ của 1 struct được tính bằng tổng kích thước của các thành viên, như ở ví dụ trên thì tổng kích thước Student sẽ là  4 + 1 + 4 + 4 = 13 bytes. Dữ liệu các biến thành viên sẽ được lưu liên tiếp nhau trong bộ nhớ nghĩa là địa chỉ của struct chính là địa chỉ của biến đầu tiên được định nghĩa trong struct, ở ví dụ trên thì địa chỉa của 1 biến Student chính là địa chỉ của biến name trong struct Student đó. Bây giờ ta sẽ tìm hiểu khái niệm Alignment, một khái niệm khá hay ho trong C++. Để đi vào tìm hiểu nó ta sẽ chạy 1 đoạn ví dụ nhỏ như sau:

```cpp
#include <stdio.h>

// total = 4 + 1 + 4 + 4 = 13 bytes
struct Student {
    char* name;   // 4 bytes
    char sex;   // 1 byte
    int age;   // 4 bytes
    float totalPoint; // 4 bytes
};

int main() {
    printf("%d\n", sizeof(Student));
}
```

Theo tính toán thì kích thước của struct Student sẽ là 13 bytes nhưng kết quả hiện thị lại khác với tính toán ban đầu:

![](https://3.bp.blogspot.com/-K2snVXEB2g4/Vf-_9FG48SI/AAAAAAAANqA/ytdEvUR5F-c/s1600/Capture.PNG)

Vâng! 16 bytes, 3 bytes ở đâu được thêm vào thế nhỉ! Nếu chú ý thì khi dùng sizeof 1 struct bất kỳ kết quả sẽ luôn là bội của 4, lý do ở đây là cách cấp phát bộ nhớ cho từng biến trong C++.
Để tăng tốc độ truy suất thì C++ chia khối bộ nhớ thành các block, mỗi block mặt định sẽ là 4 bytes, mỗi biến trong struct sẽ nằm trong 1 hoặc nhiều block liên tiếp nhau. Mỗi lần truy suất dữ liệu của 1 biến thì nó sẽ đọc luôn cả 1 hoặc nhiều block. Giả sử ta có 1 biến char 1 byte nhưng nó vẩn chiếm trọn 1 block 4 bytes nghĩa là thừa ra 3 bytes, mỗi lần truy suất đến biến char đó thì hệ thống phải đọc hoặc ghi 1 lúc 4 bytes, điểm lớn nhất ở đây chính là tốc độ đọc ghi nhanh hơn nhiều so với việc truy suất từng byte. Kích thước mỗi block có thể được thay đổi trong thiết đặt trình biên dịch và nó chính là Alignment mà mình muốn nói đến. Alignment chính là cách mà trình biên dịch cấp phát cho từng biến thành viên của struct trong bộ nhớ.
Ở ví dụ trên thì các block của Student được chia như sau:

![](https://1.bp.blogspot.com/-uDu_wpVUoyw/Vf_FM9717AI/AAAAAAAANqQ/8F0s_eascyM/s1600/WP_20150921_001.jpg)

Dưới đây là đoạn code thực tế để kiểm tra sơ đồ bên trên: 

```cpp
#include <stdio.h>

// total = 4 + 1 + 4 + 4 = 13 bytes
struct Student {
    char* name;   // 4 bytes
    char sex;   // 1 byte
    int age;   // 4 bytes
    float totalPoint; // 4 bytes
};

int main() {
    printf("%d\n", sizeof(Student));
    Student student;
    printf("%d %d %d %d %d\n", &student, 
            &student.name, 
            &student.sex, 
            &student.age, 
            &student.totalPoint);
}
```

Đây là kết quả hiển thị của đoạn code trên:

![](https://3.bp.blogspot.com/-npOyMOhKE_w/Vf_GKOI7pWI/AAAAAAAANqc/90bUj4cGPQM/s1600/Capture.PNG)

Như đã thấy, địa chỉ của biến student chính là địa chỉ của biến name, biến name tốn 4 bytes từ 36 đến 39(36, 37, 38 và 39), tiếp theo biến sex tốn 1 byte là 40 nhưng biến age lại bắt đầu từ 44 nghĩa là 3 bytes 41, 42 và 43 đã bị bỏ qua(chúng là các bytes thừa), tiếp theo sau 4 bytes của biến age là 4 bytes của biến totalPoint từ địa chỉ 48 trở đi.

Các bạn có thể thay đổi giá trị kích thước của mỗi block bằng cách vào properties của project và chọn như hình:

![](https://4.bp.blogspot.com/-JR-G8XkAMA8/Vf_Hi1ZQTqI/AAAAAAAANqk/4hdzIWgsOuk/s1600/Capture.PNG)

Mặt định default sẽ là 4 bytes, kích thước tối đa hổ trợ ở đây là 16 bytes. Nếu muốn xác định cụ thể kích thước thật của struct hoặc không muốn sử dụng chức năng Alignment thì bạn có thể set kích thước block tới 1 byte.

Sử dụng struct nâng cao
--------------

Ở phần này mình sẽ hướng dẩn 1 số cách sử dụng nâng cao của struct trong C++.
Đầu tiên là hàm dựng trong struct, nếu bạn chưa tìm hiểu qua OOP thì bạn có thể hiểu hàm dựng là phương thức sẽ được gọi đầu tiên nhất khi ta khai báo mỗi biến struct. Hàm dựng là hàm có tên trùng với tên struct và không có kiểu trả về(thực ra nó sẽ trả về chính thực thể struct mới được tạo ra).
Ở ví dụ trên ta có thể viết hàm dựng cho struct Student của ta như sau: 

```cpp
// total = 4 + 1 + 4 + 4 = 13 bytes
struct Student {
    char* name;   // 4 bytes
    char sex;   // 1 byte
    int age;   // 4 bytes
    float totalPoint; // 4 bytes

    Student() {
        name = new char[10];
        strcpy(name, "sontx");
        sex = 1;
        age = 20;
        totalPoint = 7.0;
    }
    
    Student(const char* stname, char stsex, int stage, float stpoint) {
        name = new char[10];
        strcpy(name, stname);
        sex = stsex;
        age = stage;
        totalPoint = stpoint;
    }
};
```

Ở đây hàm dựng của ta sẽ có nhiệm vụ khởi tạo các giá trị mặt định ban đầu cho struct Student mỗi khi có 1 biến Student được tạo ra. Ở ví dụ trên có 2 hàm dựng khác đối số, nếu theo cách khởi tạo như bên trên thì hàm dựng 1 sẽ được gọi, nếu muốn sử dụng hàm dựng 2 ta chỉ cần truyền đúng số lượng và kiểu đối số lúc khởi tạo như sau(chỉ dùng cho cách khởi tạo 2): 

```cpp
Student * student1 = new Student("sontx", 1, 21, 8.0);
```

Tiếp theo ta sẽ tìm hiểu hàm hủy trong struct, hàm hủy là hàm sẽ được gọi khi biến struct đó bị hủy(thu hồi vùng nhớ) như khi delete...Hàm hủy có tên trùng với tên struct và có ~ phía trước, không có đối số và không có kiểu trả về. Ở ví dụ trên ta khai có cấp phát cho biến name, bây giờ ta sẽ thu hồi vùng nhớ của biến name trong hàm hủy như bên dưới: 

```cpp
// total = 4 + 1 + 4 + 4 = 13 bytes
struct Student {
    char* name;   // 4 bytes
    char sex;   // 1 byte
    int age;   // 4 bytes
    float totalPoint; // 4 bytes

    Student() {
        name = new char[10];
        strcpy(name, "sontx");
        sex = 1;
        age = 20;
        totalPoint = 7.0;
    }
    
    Student(const char* stname, char stsex, int stage, float stpoint) {
        name = new char[10];
        strcpy(name, stname);
        sex = stsex;
        age = stage;
        totalPoint = stpoint;
    }

    ~Student() {
        delete[] name;
    }
};
```

Có 1 chú ý nhỏ là hàm hủy chỉ có 1 nhưng hàm khởi tạo có thể có 1 hoặc nhiều. Nếu không định nghĩa hàm khởi tạo thì trình biên dịch sẽ từ động tạo ra hàm khởi tạo mặt định, hàm mặt định sẽ không làm gì cả, còn nếu đã định nghĩa hàm khởi tạo thì khi định nghĩa biến struct đó ta phải định sử dụng 1 trong các hàm khởi tạo đã định nghĩa. Có 1 điều đó là thực ra hàm khởi tạo có trả về 1 thực thể struct khi khởi tạo chứ không phải là không trả về gì cả nhưng chúng đã được "ẩn" bên dưới và ta cũng không cần quan tâm lắm đến điều đó.
Tiếp theo là hàm dựng sao chép(hay có thể gọi là hàm khởi tạo sao chép), được gọi khi bạn khai báo 1 biến và gán giá nó cho 1 biến khác ngay lúc khai báo. Ví dụ như sau: 

```cpp
// khởi tạo 1 biến student1
Student student1;
// gán biến student1 cho biến student2 ngay lúc khai báo biến student2
Student student2 = student1;
```

Như ví dụ trên thì hàm dựng sao chép sẽ được gọi, nhiệm vụ của nó là sẽ khởi tạo biến student2 và sao chép lần lượt từng giá trị của các biến thành viên trong student1 cho student2. Hàm dựng sao chép cũng tương tự hàm dựng bình thường nhưng đối số của nó là 1 biến cùng kiểu struct như ví dụ sau: 

```cpp
// total = 4 + 1 + 4 + 4 = 13 bytes
struct Student {
    char* name;   // 4 bytes
    char sex;   // 1 byte
    int age;   // 4 bytes
    float totalPoint; // 4 bytes

    Student() {
        name = new char[10];
        strcpy(name, "sontx");
        sex = 1;
        age = 20;
        totalPoint = 7.0;
    }
    
    Student(const char* stname, char stsex, int stage, float stpoint) {
        name = new char[10];
        strcpy(name, stname);
        sex = stsex;
        age = stage;
        totalPoint = stpoint;
    }
    
    Student(const Student& instance) {
        name = new char[10];
        strcpy(name, instance.name);
        sex = instance.sex;
        age = instance.age;
        totalPoint = instance.totalPoint;
    }

    ~Student() {
        delete[] name;
    }
};
```

Nếu không định nghĩa hàm dựng sao chép thì 1 hàm dựng sao chép mặt định sẽ được sử dụng, nhiệm vụ của nó sẽ chỉ đơn giản là gán lần lượt các biến thành viên bên này cho bên kia. Nếu ta định nghĩa hàm dựng sao chép lại như bên trên thì ta phải đảm bảo gán đầy đủ dữ liệu của các biến thành viên của biến bên phải vào biến bến trái.
Một phần quan trọng nữa về struct trong C++ đó là struct có hướng đối tượng, nó chỉ khác class ở 1 điểm đó là mặt định các biến thành viên của nó là public còn class lại là private. Nếu bạn chưa tìm hiểu về OOP thì chưa cần tìm hiểu về vấn đề này.
Việc tiếp theo trong struct đó là nạp chồng toán tử, ở bài viết này mình sẽ không đề cập đến điều này vì "lười".

Các vấn đề khác trong struct
--------------

Vấn đề đầu tiên mình muốn nói đến chính là việc gán 2 biến của cùng 1 struct cho nhau. Nếu trong các biến thanh viên của struct không có con trỏ thì bạn không cần quan tâm đến vấn đề này vì cơ chế khi gán biến(gọi là thực thể trong hướng đối tượng) này cho biến khác(cùng 1 struct nhé) trong struct là nó sẽ gán lần lượt từng giá trị thành viên dữ liệu của biến này cho biến kia kia. Nếu trong struct có chứa con trỏ thì nó sẽ gán địa chỉ mà con trỏ này đang lưu vào con trỏ kia, bây giờ ta có 2 con trỏ cùng trỏ đến 1 vùng nhớ, chuyển gì sẽ xảy ra nếu ta giải phóng 1 trong 2 biến struct(dĩ nhiên là sẽ phải giải phóng các vùng nhớ được cấp phát động cho các biến thành viên trước đó), vùng nhớ mà 2 con trỏ trong 2 biến struct đang trỏ chung đến sẽ bị giải phóng trong khi vẩn còn 1 biến struct được sử dụng, 1 bug rất nguy hiểm. Ví dụ như bên dưới: 

```cpp
#include <stdio.h>
#include <string.h>

// total = 4 + 1 + 4 + 4 = 13 bytes
struct Student {
    char* name;   // 4 bytes
    char sex;   // 1 byte
    int age;   // 4 bytes
    float totalPoint; // 4 bytes

    Student() {
        name = new char[10];
        strcpy(name, "sontx");
        sex = 1;
        age = 20;
        totalPoint = 7.0;
    }

    Student(const char* stname, char stsex, int stage, float stpoint) {
        name = new char[10];
        strcpy(name, stname);
        sex = stsex;
        age = stage;
        totalPoint = stpoint;
    }
    
    ~Student() {
        delete[] name;
    }
};

int main() {
    Student* student1 = new Student();
    Student student2 = *student1;
    delete student1;
    printf("%s\n", student2.name);
}
```

Chương trình trên sẽ hiển thị 1 chuỗi rác trong bộ nhớ chứ không phải chuổi "sontx" mà chúng ta cần. Ở ví dụ này thì biến con trỏ name ở student1 và name trong student2 đều cùng trỏ đến 1 vùng nhớ sau khi gán student1 = *student2, sau khi delete student1 thì vùng nhớ đó cũng bị giải phóng vì thế nên khi ta truy cập lại vùng nhớ đó ở lệnh printf thì nó sẽ hiển thị giá trị rác. Cách giải quyết cho vấn đề này là ta phải định nghĩa lại hàm dựng sao chép như sau: 

```cpp
Student(const Student& instance) {
    name = new char[10];
    strcpy(name, instance.name);
    sex = instance.sex;
    age = instance.age;
    totalPoint = instance.totalPoint;
}
```

Việc này chỉ giải quyết 1/2 vấn đề, ta cần phải nạp chồng phép gán và thực hiện tương tự như với hàm dựng sao chép nhưng chú ý thêm 1 điều là phải giải phóng vùng nhớ đã cấp phát động cho các biến thành viên trước đó vì khi gọi phép gán thì biến struct đó đã được khởi tạo trước nghĩa là 1 số biến đã được cấp phát động ví dụ như biến name ở trong ví dụ trên. 

```cpp
const Student& operator = (const Student& instance) {
    if(name != NULL)
        delete[] name;
    name = new char[10];
    strcpy(name, instance.name);
    sex = instance.sex;
    age = instance.age;
    totalPoint = instance.totalPoint;
}
```

Vấn đề tiếp theo là việc khởi tạo biến struct, nếu kích thước struct nhỏ bạn có thể sử dụng 1 trong 2 cách, nếu kích thước struct lớn thì nên sử dụng cách 2(cấp phát động). Nếu sử dụng cách 1 thì biến sẽ được cấp phát ở stack(kích thước nhỏ), nếu sử dụng cách 2 thì biến sẽ được cấp phát ở heap(kích thước lớn).

Union
-----

Tiếp theo ta sẽ tìm hiểu về anh em họ của struct là union. Union khá giống struct và chỉ khác 1 điểm đó là kích thước của union bằng với kích thước của thành viên dữ liệu có kích thước lớn nhất, các thành viên dữ liệu của union sẽ chia sẽ chung 1 không gian nhớ. Ta có ví dụ sau:

```cpp
union MyUnion {
    int a;
    int b;
    char c;
    bool d;
};
```

Kích thước của MyUnion sẽ là 4 bytes vì kích thước kiểu dữ liệu lớn nhất ở đây là int 4 bytes, như vậy 4 biến a, b, c, d sẽ sử dụng chung 1 vùng nhớ 4 bytes.

Ví dụ nhỏ về sử dụng kết hợp giữa struct và union
-------------

Phần cuối này mình sẽ hướng dẩn cách lưu giá trị màu sắt trong C++. Như đã biết, 1 màu sẽ gồm 3 giá trị là R, G và B, một số khác sẽ có thêm giá trị A(alpha) với mỗi giá trị sẽ là 1 số nguyên từ 0 đến 255(tốn 1 byte lưu trữ). Với màu hổ trợ alpha ta cần 4 bytes lưu trữ, bài toán của ta là làm sao lưu trữ và chuyển đổi giữa giá trị nguyên của 1 màu sang các giá trị thành phần A, R, G và B. Bên dưới là đáp án của chúng ta: 

```cpp
union Color {
    int value;
    struct {
        unsigned char a;
        unsigned char r;
        unsigned char g;
        unsigned char b;
    };
};
```

Ở trên mình định nghĩa 1 union Color chứa 2 thành viên dữ liệu là value và struct, kích thước biến value là 4 bytes bằng với kích thước struct ví thế nên union Color sẽ có kích thước là 4 bytes(bằng với kích thước thành viên dữ liệu lớn nhất). Vì 2 thành viên dữ liệu của union Color chia sẽ chung không gian vùng nhớ nên bạn cứ tượng tựng biến value  sẽ chia làm 4 phần, mỗi phần 1 byte và lần lượt là các biến a, r, g và b trong struct như hình:

![](https://3.bp.blogspot.com/-u-vBbmStm3s/VgAby35vU-I/AAAAAAAANq8/jKI4NyWCoks/s1600/WP_20150921_003.jpg)

Ta có ví dụ về việc sử dụng union trên như sau: 

```cpp
#include <stdio.h>
#include <string.h>

union Color {
    int value;
    struct {
        unsigned char a;
        unsigned char r;
        unsigned char g;
        unsigned char b;
    };
};

int main() {
    Color color;
    color.a = 0x22;
    color.r = 0x1F;
    color.g = 0x05;
    color.b = 0xAC;
    printf("%0.8X\n", color.value);
}
```

Kết quả hiển thị ra màng hình như sau:

![](https://4.bp.blogspot.com/-LzlZJt79gdg/VgAcQV2FVyI/AAAAAAAANrE/bhtY64mexDE/s1600/Capture.PNG)

Như đã thấy, giá trị biến value chính là giá trị của 4 bytes từ 4 biến a, r, g và b. Chú ý là bit thấp ở bên phải vì thế nên giá trị của a sẽ nằm bên phải cùng tiếp đến là biến r, g và b ở bên trải cùng(big-endian). Bạn có thể sử dụng union để tách các byte của một biến, ví dụ bạn có một biến long 8 bytes và bạn muốn tách biến này ra làm 8 bytes riêng lẻ để lưu vào 8 biến khác thì bạn có thể định nghĩa một union tương tự như Color bên trên.
