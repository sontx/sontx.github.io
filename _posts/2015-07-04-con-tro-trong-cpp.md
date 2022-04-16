---
title: Con trỏ trong C++
layout: post
description: >
  Điểm làm nên thương hiệu của C/C++ chính là con trỏ, một loại biến đặt biệt, nó lưu địa chỉ của những biến khác(đúng hơn là lưu địa chỉ của vùng nhớ). Nên nhớ rằng cái gì cũng có tính hai mặt, con trỏ(pointer) tuy mạnh nhưng cũng rất nguy hiểm nếu không biết cách sử dụng. Đọc đến đây chắc hẳn các bạn sẽ tự hỏi tại sao lại phải lưu địa chỉ của biến khác, tại sao lại gọi con trỏ là thương hiệu của C/C++, phần bên dưới sẽ giải đáp phần nào 2 câu hỏi đó.
tag: [programming]
comments: true
category: programming
---
<span/>

Tổ chức bộ nhớ trong C/C++
--------------

Trước khi đi vào nguyên cứu con trỏ ta khảo sát sơ qua về bộ nhớ chương trình lúc chạy(runtime storage).

![](https://1.bp.blogspot.com/-e1jHvtZ9IeA/VZdpZ0SRWDI/AAAAAAAAMkM/n7d9m98f9GU/s1600/Untitled.png)

Về cơ bản runtime storage được chia làm 4 phần như sau:
* Text segment(code segment): chương trình của ta được biên dịch sẽ ra mã máy, khi chương trình chạy thì mã máy đó sẽ được nạp vào đây. Ví dụ điển hình là khi ta khai báo: char st[] = "this is string"; thì chuổi "this is string" sẽ được lưu "cứng" vào vùng nhớ này.
* Global area: lưu biến toàn cục
* Stack segment: khi ta gọi 1 hàm thì nó sẽ được nạp vào đây, các biến được khai báo ở trong hàm(biến cục bộ) sẽ được lưu tại đây,  khi hàm kết thúc thì toàn bộ dữ liệu trong này sẽ tự động giải phóng. Việc đọc ghi trong stack rất nhanh nhưng lưu ý rằng kích thước của nó lại khá bé vì thế nên chúng ta phải sử dụng 1 cách "tiết kiệm", như khi cần lưu trữ các dữ liệu có kích thước lớn thì stack không phải là sự lựa chọn thay vào đó ta lưu vào heap(lưu bằng cách nào thì bên dưới sẽ nói rỏ hơn) ngoài ra việc sử dụng đệ quy cũng có khả năng làm tràng stack.
* Heap segment: đây là nơi lưu trữ biến được cấp phát động, kích thước của heap khá lớn.

Chúng ta sẽ quan tâm đến 2 phần là stack và heap. Các tính chất của stack được tóm tắt lại như bên dưới:
* Nơi lưu trữ biến cục bộ
* Kích thước bị giới hạn -> stack overflow
* Bộ nhớ ở đây chỉ là tạm thời và tự động giải phóng
* Ttruy cập nhanh nhưng kích bé

Các tính chất của heap được tóm tắt lại như sau:
* Kích thước lớn
* Nơi lưu trữ biến cấp phát động
* Không tự giải phóng -> memory leak
* Sử dụng pointer để truy cập
* Các dữ liệu kích thước lớn(như class, struct, array...) nên lưu ở đây

Thế là ta đã tìm hiểu sơ qua về tổ chức bộ nhớ trong C/C++.

Mảng trong C/C++
----------

Trong C/C++ việc khai báo 1 mảng(tỉnh) như sau: 

```cpp
int arr[10];// khai báo 1 mảng int 10 phần tử
arr[1] = 2512;// gán 2512 cho phần tử thứ hai của mảng
```

Với việc khai báo như thế này thì toàn bộ 10 phần tử của mảng sẽ được lưu trong stack, biến arr bây giờ sẽ lưu địa chỉ của phần tử đầu tiên trong mảng.
Với việc khai báo như trên thì stack của chúng ta phải tốn 10 * sizeof(int) là 10 * 4 bytes để lưu, giả sử ta cần 1 mảng có 10000 phần tử thì stack của ta phải cần tới 10000 * 4 bytes để lưu trữ. Vì ta đã biết kích thước của stack khá nhỏ thế nên phải tìm cách lưu dữ liệu của mảng ở nơi khác để đảm bảo stack không bị tràng, heap chính là nơi chúng ta cần lưu.
Để lưu mảng 10 phần tử heap(thay vì stack) ta sẽ sử dụng cấp phát động nghĩa là bộ nhớ được cấp phát khi chương trình chạy. Khai báo như sau: 

```cpp
int * ptr_ arr = new int[10];// cấp phát 10 * sizeof(int) = 10 * 4 bytes trong heap
ptr_arr[1] = 2512;// gán giá trị 2512 cho phần tử thứ hai của mảng

```

Như đã thấy thì tuy khai báo khác nhau nhưng sử dụng lại khá giống nhau. Tiếp theo ta sẽ tìm hiểu kỷ hơn về khai báo bên.

Khai báo một con trỏ trong C/C++
------------

Con trỏ thực chất là biến nguyên(thường là 4 bytes) lưu địa chỉ của những biến khác(đúng hơn là lưu địa chỉ của vùng nhớ). Con trỏ được khai báo như sau: 

```cpp
data_type * pointer_name;
```

Ví dụ: 

```cpp
int* ptr_i;// khai báo biến con trỏ kiểu int->lưu địa chỉ biến int
char* ptr_c;// khai báo biến con trỏ kiểu char->lưu địa chỉ biến char
```

Sử dụng & trước tên biến để lấy địa chỉ của biến đó, sử dụng * trước tên con trỏ để lấy giá trị của biến mà con trỏ đó trỏ tới(thực ra nó sẽ trả về 1 tham chiếu đến biến mà nó trỏ tới). Chú ý rằng con trỏ cũng là 1 biến nên cũng như những biến khác là nó cũng được lưu trong bộ nhớ. Ta có ví dụ như sau: 

```cpp
int var_i = 1303;// khai báo biến int lưu giá trị1303
int * ptr_i;// khai báo con trỏ kiểu int
ptr_i = &var_i;// lưu địa chỉ của biên var_i vào con trỏ ptr_i
* ptr_i = 2512;// gán giá trị 2512 cho biến mà ptr_i trỏ đến
printf("%d\n", var_i);// sẽ hiển thị số 2512 ra màng hình
printf("0x%x\n", &var_i);// địa chỉ của biến var_i vd như 0x1c2af334
printf("0x%x\n", ptr_i);// giá trị của con trỏ ptr_i là 0x1c2af334
printf("%d\n", *ptr_i);// giá trị của biến mà ptr_i trỏ đến là 2512
printf("0x%x\n", &ptr_i);// địa chỉ của con trỏ ptr_i vd như 0x1c2af338
```

Ở ví dụ trên ta sử dụng 1 con trỏ ptr_i để trỏ đến biến var_i. Con trỏ ptr_i sẽ lưu  địa chỉ của biến var_i thông qua đoạn ptr_i = &var_i;(&var_i sẽ trả về địa chỉ của biến var_i trong bộ nhớ), sau khi con trỏ ptr_i trỏ đến biến var_i thì ta có thể toàn quyền thao tác với biến var_i thông qua ptr_i.

Oke! giờ ta quay trở lại ví dụ về mảng ở phần trên. Ta có khai báo: 

```cpp
int * ptr_ arr = new int[10];// cấp phát 10 * sizeof(int) = 10 * 4 bytes trong heap
```

Ở đây ta quan tâm đến 2 thứ là con trỏ và cấp phát động. int * ptr_arr là khai báo con trỏ kiểu int, new int[10] là cấp phát 1 bộ nhớ động trong heap gồm 10 phần tử kiểu int. Cách cấp phát động như sau: 

```cpp
new data_type[number_of_elements];// đối với mảng
// hoặc:
new data_type; // đối với 1 biến trả về con trỏ trỏ đến vùng nhớ được cấp phát
```

`int* ptr_arr = new int[10];` sẽ cấp phát 1 vùng nhớ để lưu 10 phần tử int trong heap và trả về 1 con trỏ(chính là trả về địa chỉ) của vùng nhớ vừa được cấp phát(địa chỉ vùng nhớ của phần tử đầu tiên trong 10 phần tử) sau đó gán cho con trỏ ptr_arr.
Giả sử ta có khai đoạn lệnh: 

```cpp
int * ptr_i = new int;// khởi tạo 1 vùng nhớ 4 bytes và cho ptr_i trỏ đến
*ptr_i = 0x02010502;// gán giá trị cho vùng nhớ mà ptr_i trỏ đến
```

Bên dưới là mô tả về con trỏ ptr_i và vùng nhớ được cấp phát trong bộ nhớ lúc chạy đoạn lệnh trên(Ở đây việc lưu trữ giá trị 0x02010502 trong bộ nhớ sẽ có thể khác nhau tùy vào cách tổ chức dữ liệu theo big-endian hay little-endian, dưới hình là lưu theo big-endian).

![](https://2.bp.blogspot.com/-UcS6aVmKwZ8/VZefVxVy3NI/AAAAAAAAMlk/SURpAxjKL0I/s1600/Untitled.png)

Chú ý là với việc cấp phát động ta phải tự giải phóng vùng nhớ nếu không sử dụng nữa(khác với cấp phát tỉnh là chúng sẽ được tự động thu hồi khi kết thúc chương trình hoặc hàm...), để giải phóng vùng nhớ ta sử dụng delete pointer_name; đối với 1 biến và delete[] pointer_name với 1 mảng.

Đọc đến đây có ai thắc mắt tại sao con trỏ thực chất là 1 biến nguyên(thường là 4 bytes) thế tại sao lại phải khai báo đủ lại con trỏ nào là con trỏ kiểu int, con trỏ kiểu char, con trỏ kiểu float...Câu trả lời  sẽ có trong đoạn  tiếp theo.

Truy xuất thông qua con trỏ
------------

Như đã biết thì con trỏ lưu địa chỉ của biến, và khi ta truy cập đến biến thông qua con trỏ thì nó phải xác định là biến đó có bao nhiêu bytes vì mỗi biến có 1 kiểu dữ liệu riêng(char 1 byte, int 4 bytes, double 8 bytes...) để đọc cho chính xác vì thế nên ta mới có các loại con trỏ khác nhau trỏ đến kiểu dữ liệu tương ứng. Ta có ví dụ cụ thể như sau: 

```cpp
int i = 0x3f20cc01;
char * ptr_c = (char *)&i;
short * ptr_s = (short *)&i;
int * ptr_i = &i;
```

Ở ví dụ trên các biến ptr_c, ptr_s và ptr_i đều cùng trỏ đến biến i(kiểu  int), khi ta lấy giá trị biến i thông qua 3 con trỏ lại có sự khác biệt cụ thể là *ptr_c sẽ trả về 0x01, *ptr_s sẽ trả về 0xcc01 và ptr_i sẽ trả về 0x3f20cc01. Con trỏ kiểu char chỉ đọc 1 byte nó trỏ đến,  con trỏ kiểu short chỉ đọc 2 bytes nó trỏ đến và con trỏ kiểu int sẽ đọc 4 bytes nó trỏ đến.

Một điểm cần chú ý nữa là kích thước của con trỏ trong chương trình không phụ thuộc vào kiểu dữ liệu mà nó trỏ đến cũng như không phụ thuộc vào loại con trỏ, kích thước của nó thực chất phụ thuộc vào trình biên dịch ví dụ như trong trình biên dịch GNU GCC cho 32bit thì con trỏ sẽ có 4 bytes.

Để lấy hoặc đọc giá trị của 1 con trỏ ta sử dụng * trước tên con trỏ đó. Ví dụ *ptr_i sẽ trả về tham chiếu đến vùng nhớ(biến) mà con trỏ ptr_i đã trỏ đến. 

```cpp
int var_i = 3393;
int * ptr_i = &var_i;
*ptr_i = 2512;// tương đương với var_i = 2512;
```

Khi sử dụng mảng động ta có 2 cách để truy cập đến các phần tử của mảng đó là sử dụng [] hoặc sử dụng biểu thức +, -, +=, -=, ++, -- trên con trỏ. Ta sẽ bàn cụ thể đến cách 2, giả sử ta có khai báo: 

```cpp
int arr[10];// khai báo 1 mảng int 10 phần tử
```

Để truy cập đến phần tử thứ i của mảng ta sử dụng biểu thức (ptr_arr + i) sẽ trả về địa chỉ của vùng nhớ phần tử thứ i và dĩ nhiên *(ptr_arr + i) sẽ trả về phần tử thứ i tương đương với cách sử dụng ptr_arr[i]. Ở đây khi ta cộng 1 con trỏ với 1 số nguyên n thì nó sẽ trả về vùng nhớ thứ n * sizeof(data_type), trong đó data_type là kiểu dữ liệu trong khai báo data_type* pointer_name. Một cách nôm na, nếu ta cộng con trỏ với 1 số nguyên n thì nó sẽ nhảy n bước với mỗi bước có độ dài bằng kích thước kiểu dữ liệu của con trỏ(data_type trong khai báo data_type* pointer_name), ví dụ con trỏ kiểu char thì mỗi bước nhảy 1 byte, con trỏ kiểu int mỗi bước nhảy 4 bytes. Chú ý rằng dộ dài mỗi bước nhảy sẽ chỉ phụ thuộc vào data_type của con trỏ chứ không phụ thuộc vào kiểu dữ liệu của biến nó trỏ đến. Ta có ví dụ như sau: 

```cpp
int arr[10];
arr[0] = 0;
arr[1] = 1;
int * ptr_arri = arr;
char * ptr_arrc = (char *)arr;
printf("%d %d", *(ptr_arri + 1), *(ptr_arrc + 1));
```

Kết quả hiển thị sẽ là 1 0. Với ptr_arri + 1 sẽ nhảy 1 bước 4 bytes(vì đây là con trỏ kiểu int) chính là vị trí của phần tử thứ 2 vì đây là mảng int nên mỗi phần tử cách nhau 4 bytes. Với ptr_arrc + 1 sẽ nhảy 1 bước 1 byte(vì đây là con trỏ kiểu char) chính là byte thứ 2 của phần tử thứ 1, vì phần tử đầu tiên của mảng arr là 0 nên 4 bytes của nó đều là 0 -> *(ptr_arrc + 1) trả về 0. Dưới đây ta phân tích sâu hơn về mảng và con trỏ để thấy sự khác nhau giữa chúng.

Mảng và con trỏ
----------

```
char a[6] = {10, 20, 30, 40, 50, 60};
char* p = a;
1. a         = ?  &a       = ?  *a       = ?
2. p         = ?  &p       = ?  *p       = ?
3. p + 1     = ?  (*p) + 1 = ?  *(p + 1) = ? 
4. &p + 1    = ?  &a + 1   = ?
5. a++; -> a = ?
6. p++; -> p = ?
```

Với biến a và p trong bộ nhớ như sau:

![](https://4.bp.blogspot.com/-ineeb8A1wuQ/VZeg7V36M2I/AAAAAAAAMlw/wSUjNJvlHnE/s1600/Untitled.png)

1. Khá đơn giản, giá trị của a sẽ là địa chỉ của phần tử đầu tiên trong mảng là 0x..08, &a là địa chỉ của mảng a bằng 0x..08, *a là giá trị tại địa chỉ 0x..08 chính là giá trị của phần tử đầu tiên  trong mảng là 10.
1. Giá trị của p chính là địa chỉ mà nó trỏ đến, ở đây chính là địa chỉ của phần tử đầu tiên trong mảng a -> kết quả là 0x..08. &p là địa chỉ của con trỏ p và bằng 0x..04. *p chính là lấy giá trị phần tử mà con trỏ p đang trỏ đến chính là giá trị phần tử đầu tiên trong mảng a bằng 10.
1. Vì p là con trỏ kiểu char nên p + 1 sẽ nhảy 1 bước 1 byte chính là địa chỉ của phần tử thứ 2 trong mảng là 0x..09. (*p) + 1 là lấy giá trị của phần tử đầu tiên trong mảng mà p trỏ đến rồi cộng thêm 1 chính là 11. *(p + 1) sẽ nhảy 1 bước 1 byte rồi lấy giá trị tại đó chính là giá trị của phần tử thứ 2 trong mảng mà p trỏ đến là 20.
1. Ở đây cần chú ý, p là con trỏ vì thế nên &p sẽ trả về địa chỉ của 1 con trỏ, vì địa chỉ của con trỏ là 1 số nguyên và thường là 4 bytes vì thế nên &p + 1 sẽ nhảy 1 bước với độ dài là 4 bytes từ địa chỉ của p vậy kết quả sẽ là 0x..08. Tương tự ta thấy a là 1 mảng 6 phần tử kích thước 6 bytes vì thế nên &a sẽ trả về địa chỉ của mảng a nên &a + 1 sẽ nhảy 1 bước nhảy có độ dài 6 bytes từ địa chỉ của a vậy kết quả là 0x..0e.
1. Chú ý rằng a ở đây là hằng con trỏ vì thế nên ta không thể thay đổi giá trị của nó được vậy kết quả sẽ là 1 lỗi biên dịch.
1. p là con trỏ kiểu char nên p++ sẽ nhảy 1 bước nhảy với độ dài 1 byte vậy kết quả sẽ là địa chỉ phần tử thứ 2 trong mảng a là 0x..09.

Ta có đoạn ví dụ nhỏ để hiểu hơn về con trỏ và mảng như sau: 

```cpp
int arr[10];
int * ptr_arr = new int[10];
printf("%d %d", sizeof(arr), sizeof(ptr_arr));
```

Kết quả sẽ là 40 4. sizeof(arr) sẽ là kích thước của mảng arr, mỗi phần tử 4 bytes vậy có 10 phần tử sẽ là 40 bytes. sizeof(ptr_arr) là kích thước của con trỏ ptr_arr(và thường là 4 bytes) vì thế nên kết quả là 4 bytes. Đến đây chắc hẳng có 1 số bạn sẽ thắt mắt rằng tại sao sizeof(ptr_arr) không trả về kích thước mảng động đã cấp phát(cũng là 10 phần tử 40 bytes), đơn giản tại vì cấp phát động chỉ cấp phát 1 vùng nhớ và sử dụng 1 con trỏ để xác định vị trí của vùng nhớ đó, ở đây ptr_arr chỉ là 1 con trỏ để lưu lại địa chỉ của vùng nhớ được cấp phát mà thôi. Để phân biệt đâu là cấp phát tỉnh đâu là cấp phát động ta có cách khá đơn giản đó là cái nào đọc tên được thì là cấp phát tỉnh, cái nào không đọc tên được thì là cấp phát động, giờ thử áp dụng vào ví dụ trên:
1. Đối với dòng đầu tiên int arr[10]; ta có mảng tên là arr -> có tên -> cấp phát tỉnh
1. `int* ptr_arr = new int[10];` ở đây thì mảng này có tên là gì? -> bó tay -> cấp phát động, sẽ có 1 số bạn cho rằng mảng này tên là mảng ptr_arr nhưng như thế là không đúng vì ptr_arr là con trỏ kiểu int chứ không phải là mảng như ví dụ trên đã chứng minh.

Một ví dụ khác về sự khác nhau giữa con trỏ và mảng: 

```cpp
char * ptr_c = "something";
char arr[] = "something";
```

Xâu "something" sẽ được lưu cứng trong code segment và dĩ nhiên là sẽ có 1 địa chỉ. ptr_c = "something" nghĩa là lấy địa chỉ xâu này gán cho con trỏ ptr_c. arr[] = "something" nghĩa là copy xâu này vào mảng arr.

Con trỏ hàm
Con trỏ không chỉ lưu địa chỉ của biến mà nó còn có thể lưu địa chỉ của hàm. Để đơn giản trong sử dụng con trỏ hàm ta cần định nghĩa kiểu con trỏ hàm bằng typedef theo cú pháp như sau: 

```cpp
return_data_type (* pointer_function_name)(data_type1, data_type2...);
```

Ví dụ ta có hàm so sánh hai số a và b được định nghĩa như sau: 

```cpp
int compare(int a, int b);
```

Để định nghĩa 1 con trỏ trỏ đến hàm so sánh ta cần typedef như sau: 

```cpp
typedef int (* ptr_compare)(int, int);
```

Và khi sử dụng thì như với biến bình thường: 

```cpp
ptr_compare ptr_cmp = &compare;// gán địa chỉ của hàm compare cho biến ptr_compare
ptr_cmp(3393, 2512);// tương đương với compare(3393, 2512);
```

Việc gọi hàm thông qua con trỏ giống như sử dụng hàm bình thường. Con trỏ hàm được sử dụng khá nhiều trong các kỹ thuật callback hoặc late-binding. Trong lập trình hướng đối tượng của C++, late-binding được thực thi khi khai báo virtual thực chất cũng sử dụng con trỏ hàm để xác định hàm cần gọi khi thực thi thực sự. 

Con trỏ của con trỏ
-----------

Như định nghĩa thì con trỏ cũng chỉ là 1 biến như những biến khác vì thế nên nó cũng có địa chỉ và và vùng nhớ riêng để lưu trữ. Khái niệm con trỏ của con trỏ(còn gọi là con trỏ cấp 2) chỉ đơn giản là 1 con trỏ trỏ đến 1 con trỏ khác thay vì trỏ đến 1 biến như đã xét ở trên.
Khai báo như sau: 

```cpp
data_type ** pointer_name; //định nghĩa 1 con trỏ tên là pointer_name và trỏ đến 1 con trỏ kiểu data_type
```

Ta có ví dụ về sử dụng con trỏ cấp 2 như sau: 

```cpp
int var_i = 2512;
int * ptr_i = &var_i;
int ** ptr2_i = &ptr_i;
*(*ptr2_i) = 3393;
```

Sau khi thực hiện xong thì giá trị của biến var_i sẽ là 3393. Đầu tiên ta khai báo 1 biến int là var_i lưu giá trị 2512, tiếp theo ta dùng 1 con trỏ là ptr_i để trỏ đến biến int đó. Ta lại dùng 1 con trỏ khác là ptr2_i để trỏ đến con trỏ ptr_i. *ptr2_i sẽ trả về tham chiếu đến giá trị mà nó trỏ đến chính là trả về con trỏ ptr_i, vì thế *(*ptr2_i) sẽ tương đương với *ptr_i và *ptr_i dĩ nhiên lại tương đương với var_i vì thế nên đoạn lệnh *(*ptr2_i) = 3393 sẽ tương đương với var_i = 3393.

Các con trỏ cấp 3, cấp 4...đến cấp n cũng được định nghĩa tương tự.

Con trỏ và cấp phát động
---------------

Như các phần ở trên thì ta đã khái quát sơ bộ về cấp phát động và con trỏ, phần này sẽ đi sâu hơn về cấp phát động.
Đầu tiên ta tua lại 1 chút về cấp phát tỉnh, cách mà ta vẩn thường làm xưa nay. 

```cpp
int a = 10;
int arr[1000];
MyClass myClass;
```

Bên trên là 1 trong các ví dụ về cấp phát tỉnh, việc cấp phát tỉnh rất đơn giản và ta không cần quản lý bộ nhớ. Tuy vậy việc cấp phát tỉnh lại gặp 1 số nhược điểm như:
* Các biến được cấp phát trong stack -> bị giới hạn kích thước.
* Số lượng phần tử của mảng phải luông là 1 hằng số.
* Không thể chủ động giải phóng vùng nhớ khi ta không cần nữa.

Vì thế cấp phát động ra đời và đã giải quyết được những hạn chế mà cấp phát tỉnh mắt phải như:
* Dữ liệu được lưu trong heap nên có thể lưu được những dữ liệu kích thước lớn.
* Việc cấp phát diển ra lúc thực thi chương trình, nhờ đó kích thước của mảng có thể là 1 biến.
* Thu hồi vùng nhớ dể dàng khi không sử dụng.

Cấp phát động sử dụng con trỏ để xác định vị trí của vùng nhớ đã cấp phát, để cấp phát động ta dùng cú pháp: 

```cpp
data_type * ptr_arr = new data_type[number_of_elements];// đối với mảng
// hoặc:
data_type * ptr = new data_type; // đối với 1 biến ném ra 1 ngoại lệ nếu cấp phát thất bại
```

Sau khi cấp phát thì con trỏ ptr_arr sẽ trỏ đến vùng nhớ đã cấp phát như trong hình:

![](https://1.bp.blogspot.com/-D2lgDTtR53U/VZe4LPO2RxI/AAAAAAAAMmU/EmRYfBGYYfw/s1600/Untitled.png)

Sau khi sử dụng xong vùng nhớ đã cấp phát thì ta phải giải phóng nó, sử dụng cú pháp như bên dưới để giải phóng 1 vùng nhớ: 

![](delete[] ptr_arr;// với ptr_arr là con trỏ trỏ đến 1 mảng
delete ptr;// với ptr là con trỏ trỏ đến 1 biến)

Chú ý rằng ở 1 số trình biên dịch thì delete[] và delete sẽ như nhau đối với các kiểu dữ liệu cơ sở nhưng lại khác nhau đối với các class hoặc struct. Ví dụ như ở trình biên dịch visual c++ 2008 thì khi gọi delete list_of_objects sẽ giải phóng toàn bộ vùng nhớ đã cấp phát mà list_of_objects trỏ đến và gọi hàm hủy của thực thể đầu tiên trong danh sách nhưng lại không gọi hàm hủy toàn bộ các thực thể còn lại trong mảng list_of_objects đó. Điều này cực kỳ nguy hiểm nếu trong các thực thể có sử dụng cấp phát động và cần giải phóng khi hàm hủy được gọi. Vì thế nên khi muốn giải phóng 1 mảng thì nên luôn sử dụng delete[].

Sau khi giải phóng vùng nhớ thì bộ nhớ sẽ như sau:

![](https://2.bp.blogspot.com/-_6EhN1ovW7w/VZe4-wo6vKI/AAAAAAAAMmc/Iv2acZJgp_g/s1600/Untitled.png)

Như đã thấy thì con trỏ ptr_arr vẩn còn trỏ đến vùng nhớ đã bị giải phóng vì nó vẩn còn lưu lại địa chỉ vùng nhớ đó, do đó sau khi giải phóng vùng nhớ ta nên gán con trỏ lại bằng NULL.

Như thế nào nếu khi cấp phát 1 vùng nhớ và cho con trỏ ptr_arr trỏ đến vùng nhớ đó sau đó lại gán con trỏ ptr_arr bằng NULL hoặc bằng 1 địa chỉ khác mà không giải phóng vùng nhớ:

![](https://4.bp.blogspot.com/-hf0tQcgo-Ts/VZe513F1gRI/AAAAAAAAMmo/f4PTKhcTQ98/s1600/Untitled.png)

Như trong hình thì con trỏ ptr_arr không còn trỏ đến vùng nhớ đó nữa nhưng vùng nhớ vẩn còn ở đó, như thế ta không cách nào giải phóng được vùng nhớ đã cấp phát vì ta không còn biết địa chỉ của nó trong bộ nhớ(vì con trỏ ptr_arr không còn lưu địa chỉ của vùng nhớ được cấp phát mà lại lưu 1 giá trị khác và trong trường hợp này ta không có con trỏ thứ 2 trỏ đến vùng nhớ được cấp phát đó), hiện tượng như thế gọi là memory leak.

Việc cấp phát động như con dao 2 lưỡi, nếu biết sử dụng sẽ tận dụng tối đa được tài nguyên bộ nhớ, nhưng nếu sử dụng không đúng cách có thể gấy thất thoát tài nguyên bộ nhớ và có thể gấy crash chương trình.

Code mẫu
--------

Cuối cùng là sample về sử dụng con trỏ, chương trình này đơn giản là cho người dùng nhập vào 1 mảng và xuất ra mảng đã được sắp xếp sử dụng cấp phát động và con trỏ hàm: 

```cpp
#include <stdio.h>
#include <conio.h>

typedef bool (* ptr_cmp)(int, int);

// hoán đổi giá trị 2 số
void swap_elements(int * ptr_a, int * ptr_b)
{
    int temp = *ptr_a;
    *ptr_a = *ptr_b;
    *ptr_b = temp;
}

// sắp xép mảng tăng dần/giảm dần(phụ thuộc vào order)
void sort_arr(int * ptr_arr, int n_arr, ptr_cmp order)
{
    for(int i = 0; i < n_arr - 1; i++)
    {
        for(int j = i + 1; j < n_arr; j++)
        {
            if(order(ptr_arr[i], ptr_arr[j]))
            {
                swap_elements(&ptr_arr[i], &ptr_arr[j]);
            }
        }
    }
}

bool inc_compare(int a, int b)
{
    return a > b;
}

bool dec_compare(int a, int b)
{
    return a < b;
}

void print_arr(int * ptr_arr, int n_arr)
{
    for(int i = 0; i < n_arr; i++)
    {
        printf("%d ", ptr_arr[i]);
    }
}

int main()
{
    int n = 6;
    // khởi tạo 1 mảng 6 phần tử trong heap
    // và ptr_arr trỏ đến đó
    int * ptr_arr = new int[n];
    // nhập dữ liệu cho mảng
    printf("Nhap %d gia tri cho mang:\n", n);
    for(int i = 0; i < n; i++)
    {
        printf("Nhap phan tu thu %d: ", i);
        scanf("%d", ptr_arr + i);// có thể thay thế bằng &ptr_arr[i]
    }
    printf("INC: ");
    // sắp xếp tằng dần sử dụng con trỏ hàm
    // trỏ đến hàm inc_compare trong bộ nhớ
    sort_arr(ptr_arr, n, inc_compare);
    print_arr(ptr_arr, n);
    printf("\nDEC: ");
    // sắp xếp giảm dần sử dụng con trỏ hàm
    // trỏ đến hàm dec_compare trong bộ nhớ
    sort_arr(ptr_arr, n, dec_compare);
    print_arr(ptr_arr, n);
    delete[] ptr_arr;
    return 0;
}
```
