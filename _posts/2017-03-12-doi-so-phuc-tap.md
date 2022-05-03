---
title: Đối số phức tạp
layout: post
description: Khởi chạy một chương trình khác kèm theo các tham số phức tạp.
comments: true
category: programming
tags:
- c#
- intercommunication
---

Bài toán đơn giản như sau: Chương trình của tôi(tạm gọi là A) cần thực thi 1 chương trình khác(gọi là B) và truyền cho nó rất nhiều đối số.

Tôi tạm chia bài toán làm 2 vấn đề nhỏ: 1 là thực thi một chương trình khác(nói theo cách màu mè là khởi tạo một tiến trình mới) và 2 là truyền đối số cho chương trình đó.

Tôi sẽ lần lượt giải quyết các vấn đề (implement trong C# nhé, nếu ai muốn làm java hay C++ thì mời tôi coffee 😊)

Thực thi một chương trình khác
------------

Cụ thể ở phần này chương trình A “bằng cách nào đó” khởi chạy được chương trình B.

Theo lý thuyết chúng ta cần phải khởi tạo 1 tiến trình mới và nạp process’s image vào bộ nhớ để chạy.

Thực tế trong .Net chúng ta chỉ cần 1 dòng lệnh đơn giản như sau:

``` cs
Process.Start("B-program.exe", "my arguments");
```

Truyền đối số
------------
Ở phần này chương trình A cũng “bằng cách nào đó” cung cấp cho chương trình B một cơ số dữ liệu đầu vào(tôi gọi là truyền đối số).

Theo lý thuyết chúng ta cũng có một cơ số cách như sau:

1. Cách đơn giản nhất là pass các đối số này theo kiểu “command line arguments”.

1. Pipe line, cách này thường dùng để giao tiếp qua về giữa các processes.

1. Socket thần thánh, chương trình A của tôi sẽ là server và mở 1 port trên localhost trong khi đó chương trình B sẽ là client và kết nối vào port đó để trao đổi dữ liệu. Hơi mất công hơn pipe line nhưng cũng giải quyết được vấn đề.

1. Clipboard, nó sẽ là nơi trung gian để trao đổi dữ liệu giữa 2 tiến trình, với bài toán của chúng ta thì cách này không khả thi lắm.

1. Data Copy, đây chỉ là một phần nhỏ của kỹ thuật message queue, nó cũng thường dùng để giao tiếp giữa các tiến trình một cách nhanh chóng. Tôi có nguyên 1 nguyên cứu về đề tài này, bạn có thể tham khảo thêm ở [đây](https://github.com/sontx/message-queue).

1. File mapping, cứ hiểu thế này, bạn có 1 file trên ổ đĩa và hệ điều hành sẽ “treat” nó như thể nó là 1 block of memory trong không gian nhớ của tiến trình. Quá thần thánh rồi, với kiểu này thì 2 hay nhiều tiến trình có thể giao tiếp với nhau 1 cách dể dàng, nhưng chú ý vấn đề đồng bộ dữ liệu nhé.

1. RPC, theo tôi nguyên cứu thì nó cho phép gọi các functions từ xa trên cùng máy hoặc khác máy. Lý thuyết là thế nhưng tôi vẩn chưa có dịp được “trên tay” kỹ thuật này, comming soon.

1. Other

Thực tế với bài toán hiện tại của tôi thì cách đơn giản và hiệu quả nhất chính là command line arguments, như bạn biết thì ví dụ ở trên tôi đã sử dụng cách này.

Problem, như thế nào nếu tôi muốn truyền 1 object Person từ chương trình A qua chương trình B? Có lẻ lựa chọn command line arguments không còn phù hợp nữa, thay vào đó các kỹ thuật cao cấp như pipe line, socket hay data copy... có vẻ sáng lạng hơn. Thực ra với vấn đề này thì cách nào cũng có thể giải quyết được nhưng độ phức tạp khi implement và bảo trì, nâng cấp sau này nó như thế nào thôi.

Đối với command line arguments, tôi sẽ truyền các properties của Person từ A sang B bằng cách tách nó ra thành các argument nhỏ như sau:

``` cs
// Gọi từ chương trình A.
Process.Start("B-program.exe", "-name \"tran xuan son\" -age 23 -sex \"unknown\"");
```

Ở chương trình B bạn sẽ phải phân tích chuổi đối số để lấy được các properties của Person, sau đó khởi tạo thực thể và gán tụi nó vào. Mất công nhỉ.

Socket/pipe line, implement thì dài mà tôi thì lười nên tôi sẽ nói sơ nó như thế này “giao tiếp giữa A và B dựa trên stream”.

Ý tưởng lớn
--------

Đang code project mà dính đến vấn đề này nên tôi phát triển luôn 1 thư viện để giải quyết và share nó cho những ai cần.

Ý tưởng của nó khá đơn giản: dữ liệu mà A truyền qua B sẽ được lưu trung gian ở file tạm.

Cụ thể, A “bằng cách nào đó” convert dữ liệu của các objects cần truyền qua B thành bytes để lưu vào file tạm sau đó sử dụng kỹ thuật command line arguments để pass đường dẩn file tạm này cho B, khi B chạy thì nó cũng sẽ “bằng cách nào đó” convert ngược lại dữ liệu từ trong file ra các objects.

“Bằng cách nào đó”: bạn có nhiều sự lựa chọn, có thể sử dụng kỹ thuật Object Serialization của .Net hoặc các thư viện của bên thứ 3. Thư viện của tôi sử dụng Json.Net của Newtonsoft.

Phần implement của nó khá đơn giản, chỉ gồm 3 classes chính là `ProcessExecutor`, `ArgumentDeserializer` và `ObjectWrapper`.

ProcessExecutor: Nó được sử dụng trong chương trình A để thay thế cho phương thức Start của lớp Process như ví dụ trên.
ArgumentDeserializer: Nó được sử dụng ở chương trình B để “móc” ra các đối số mà bạn đã truyền qua.
ObjectWrapper: Nó chỉ là 1 lớp đơn giản để “bao” argument lại kèm với key của nó.

How to use it?
--------

Ở chương trình A tôi khởi tạo 1 ProcessExecutor, truyền cho nó 2 thông tin là đường dẩn tới file thực thi của chương trình B và danh sách các đối số mà tôi muốn truyền. Các đối số có thể kèm theo key để phân biệt(optional). Theo lý thuyết thì đối số có thể là bất cứ object nào mà tôi muốn. Sau khi “setup” xong tôi gọi hàm Execute để khởi chạy chương trình B.

```cs
var executor = new ProcessExecutor("B-program.exe");
executor.Add("key1", new Person());
executor.Add("key2", new Future());
executor.Add("key3", new World());
executor.Add("key4", new And());
executor.Add("key5", new Love());
executor.Add("don't care about the above lines");
executor.Add(0x3393);
executor.Execute();
```

Ở chương trình B tôi khởi tạo một ArgumentDeserializer và gọi phương thức Deserialize để tiến hành phân tích dữ liệu mà A đã gửi, hàm này trả về true nếu quá trình phân tích duyển ra thành công. Sau khi phân tích dữ liệu mà A đã gửi, tôi gọi hàm GetArgument để lấy các object tương ứng ra một cách đơn giản đến khó tin. Tôi có thể lấy object mà A truyền qua dựa theo key hoặc dựa theo index.

```cs
var deserializer = new ArgumentDeserializer();
if (deserializer.Deserialize()){
	var person = deserializer.GetArgument<Person>(0);
	var future = deserializer.GetArgument<Future>(1);
	var world = deserializer.GetArgument<World>("key3");
	var and = deserializer.GetArgument<And>("key4");
	var love = deserializer.GetArgument<Love>(4);
	var myString = deserializer.GetArgument<string>(5);
	var myCode = deserializer.GetArgument<int>(6);
}
```

Kết
-----

Nữa đêm mất ngủ, mất ngủ thì phải code để não nó không phải nghỉ đến người khác 😶 code nhiều thì cũng chán, mà chán thì lại lên facebook đăng status sến, ngày đăng vài cái status sến thì cũng hơi nhiều nên đành viết note nhảm nhảm cho đở nhàm vậy <-- logic để cái note nhảm này được sinh ra đấy 😎

Cảm ơn những ai đã cố gắng đọc(cuộn) hết từ đầu tới dòng này 😎
