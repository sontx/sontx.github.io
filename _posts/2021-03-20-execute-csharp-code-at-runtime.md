---
title: Execute C# code at runtime
layout: post
comments: true
category:
- programming
description: "Chạy code C# lúc runtime được không nhỉ \U0001F914"
tags:
- c#
- roslyn
---

Các bạn chắc cũng biết C# là một ngôn ngữ lập trình biên dịch vì thế muốn chạy được thì phải compile ra binary file (thực ra là IL, tợ tợ như bytecode bên java thôi). Điều này chẳng có gì mới mẻ cả, cho đến một ngày.... trong lúc ngồi nghỉ vu vơ chờ crush rep tin nhắn, đầu tôi chợt nảy ra một câu hỏi "Chạy code C# lúc runtime được không nhỉ?". Và thế là tôi vứt crush sang một bên và lên google ngâm cứu, sau một 1 vài phút hỏi bác google thì 2 keywords chính đã lòi ra **Microsoft.CodeAnalysis.CSharp.Scripting** và **Roslyn**.

Bỏ ra thêm 1 chút thời gian đọc blog và tài liệu hướng dẩn thì tôi cũng biết cách giải quyết cái tiêu đề bài viết ngày hôm nay như thế nào :)). Người ta nói kiến thức thì phải chia sẻ, chém gió thì phải có người nghe, vì thế nên tôi viết bài này cho bạn nào cần tìm hiểu về vụ này. Nào, bắt đầu thôi 😉
### [Roslyn](https://github.com/dotnet/roslyn)
Nguyên văn tại repo của roslyn như vầy: *Roslyn is the open-source implementation of both the C# and Visual Basic compilers with an API surface for building code analysis tools.* , có  thể hiểu nôm na roslyn là một open-source compiler cho C#/VB. Điểm quan trọng là nó cung cấp 1 bộ các scripting APIs để phục vụ cái tiêu đề của bài viết này :))

Có một hạn chế nho nhỏ là các scripting APIs này chỉ hổ trợ cho desktop .Net Framework 4.6+ hoặc .Net Core 1.1 trở lên.
Tìm hiểu đến đây thôi, não 1.2MHz của tôi không thể xử lý quá nhiều thông tin phức tạp trong thằng roslyn này được :))

### [Microsoft.CodeAnalysis.CSharp.Scripting](https://www.nuget.org/packages/Microsoft.CodeAnalysis.CSharp.Scripting/)
Đây là 1 package scripting API mà roslyn cung cấp, chỉ cần làm việc với thằng này là đủ. API này cung cấp mấy tính năng cơ bản như thêm các references, pass đối số từ bên ngoài vào script code cũng như compile code...

#### Simple example
Đưới đây là ví dụ đơn giản về cách thực thi 1 script code:

```cs
// Nampespace below should be used to use CSharpScript
using Microsoft.CodeAnalysis.CSharp.Scripting;

........

var sum = await CSharpScript.EvaluateAsync("1 + 2");
Console.WriteLine(sum);// 3

var now = await CSharpScript.EvaluateAsync("System.DateTime.Now");
Console.WriteLine(now);// 3/20/2021 2:24:14 PM
```

`CSharpScript.EvaluateAsync` sẽ tự động compile script code và thực thi nó, kế quả trả về của method chính là kết quả của biểu thức đã thực thi.

Nếu biết chắc chắn kiểu trả về của biểu thức là gì thì nên sử dụng generic method như sau:
```cs
int sum = await CsharpScript.EvaluateAsync<int>("1 + 2");
```

#### Tự động thêm namespace
Như ví dụ ở trên thì tôi phải gọi `System.DateTime.Now` để lấy giá trị date time hiện tại. Tôi có thể hoàn toàn sử dụng `DateTime.Now` mà không cần tới namespace `System` bằng cách cấu hình như sau:

```cs
var now = await CSharpScript.EvaluateAsync("DateTime.Now", ScriptOptions.Default.WithImports("System")); 
Console.WriteLine(now);// 3/20/2021 2:24:14 PM
```

`ScriptOptions.Default.WithImports("System")` sẽ tự động thêm `using system;` vào script của chúng ta.

Nếu bạn muốn tự động thêm `using static xxx;` để import các static members hoặc nested types của 1 type nào đó:

```cs
var result = await CSharpScript.EvaluateAsync("Abs(-3)", ScriptOptions.Default.WithImports("System.Math"));  
Console.WriteLine(result);// 3
```

#### Thêm references
Cũng giống như 1 C# project, một số references được add mặt định, một số khác bạn phải tự thân vận động bằng cách add bằng tay. Khi evaluate script code cũng vậy, nếu bạn muốn sử dụng 1 em nào đó mới thì làm như sau:

```cs
var result = await CSharpScript.EvaluateAsync("System.Net.Dns.GetHostName()", ScriptOptions.Default.WithReferences(typeof(System.Net.Dns).Assembly));
```

Có 1 điểm lưu ý ở đây đó là `Assembly` mà bạn truyên vào hàm `WithReferences` thì prop `Location` của nó phải khác null 😶 Nếu xui mà bạn load dll như 1 mảng bytes (nghĩa là không ai lần ra được dll đó nằm ở đâu trong máy bạn) thì hàm đó sẽ tạch tạch và tạch. Để giải quyết vụ này, bạn sẽ cần tạo ra một `MetadataReference` bằng cách gọi hàm `MetadataReference.CreateFromImage` và sau đó truyền vào `WithReferences`.

#### Handle lỗi
Cái này đơn giản thôi, sử dụng `try catch` để handle `CompilationErrorException` exception. Exception này chứa 1 list các lỗi khi compile script của chúng ta.

```cs
try
{
    var result = await CSharpScript.EvaluateAsync("System.Net.Dns.GetHostName()");
    Console.WriteLine(result);
}
catch (CompilationErrorException e)
{
    Console.WriteLine(string.Join(Environment.NewLine, e.Diagnostics));
}
```

Lỗi hiển thị khi chạy đoạn code trên sẽ như vầy: *(1,1): error CS0234: The type or namespace name 'Net' does not exist in the namespace 'System' (are you missing an assembly reference?)*
#### Performance

Nói thẳng luôn là nó chậm vãi linh hồn, vì mỗi lần gọi `EvaluateAsync` thì phải compile code rồi mới chạy. Nếu script của bạn được gọi nhiều lần thì nên compile trước rồi sau đó mới thực thi.

```cs
// compile once
var script = CSharpScript.Create(yourScript);

// run many times
for(var i = 0; i < 100; i++)
{
    var result = await script.RunAsync();
    // do something
}
```

#### Truyền data vào script
Để script code có thể hữu ích hơn thì tính năng này không thể thiếu :)) Ví dụ tôi có 1 script code như sau:

```cs
private string GuessAge(int yourSecretAge)
{
    return $"Your age is {yourSecretAge}";
}
```

Bây giờ chương trình của tôi sẽ sử dụng script này để *đoán* tuổi của người dùng :)) Script thì viết quá ngon, vấn đề là làm sao để truyền đối số vô hàm `GuessAge`. Tôi làm như sau:

1. Định nghĩa một *global* class.
2. Đăng ký global class này khi compile.
3. Tạo 1 global class instance và truyền nó vào script khi thực thi, bên trong script sẽ lấy dữ liệu của bên ngoài truyền vào từ global object này.

**Bước 1:**
```cs
public class Global
{
    public int Age { get; set; }
}
```

**Bước 2:**
```cs
var compiledCode = CSharpScript.Create(guessAgeScript, null, typeof(Global));
```

**Bước 3:**
```cs
var result = await compiledCode
    .ContinueWith("return GuessAge(Age);")// biến "Age" ở đây được tự động móc lốp từ global object ra
    .RunAsync(new Global { Age = enteredAge });// truyền giá trị vào script

Console.WriteLine("Result from script: " + result.ReturnValue);
```

Global object khi truyền vào script thì các members của nó sẽ được bung ra hết, nên bên trong script không cần care tới global object mà chỉ cần dùng thẳng các props của nó.

> Chú ý 1 tí là cái global class nó phải được public ra ngoài nhé, ví dụ như `internal class Global .....` là tạch đấy, chúng ta chỉ chơi với `public` :)) .

### Conclusion
Đọc được đến tận đây thì chắc hẳn bạn cũng biết cách thực thi C# code lúc runtime như thế nào rồi nhỉ. Đi xa hơn 1 tí, bạn hoàn toàn có thể viết 1 cái editor đơn giản để edit và run C# code  như hình bên dưới :))
![](https://1.bp.blogspot.com/-IrSdf_UKTFI/YFW7Jca2_HI/AAAAAAAAeDw/s_JM5Ihc8JQUZxHh-817ikqTgRNL_GSHwCLcBGAsYHQ/s0/Untitled.png)
-  Check syntax realtime
-  Code highligting
-  Nice UI :))

PS: Nếu bạn cảm thấy ngứa mắt vì lỗi sai chính tả thì tôi xin lỗi nhé :))
