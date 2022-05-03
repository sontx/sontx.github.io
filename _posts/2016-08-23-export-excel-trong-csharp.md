---
title: Export Excel Trong C#
layout: post
description: "Khỏi phải giới thiệu về Microsoft Excel(gọi ngắn gọn là Excel), với
  nó bạn có thể làm đủ thứ việc.  Để tạo và làm việc với file excel thì bạn chỉ cần
  cài chương trình Excel vào máy.  Nhưng đôi khi khách hàng lại yêu cầu tính năng
  export kết quả hoặc dữ liệu ra file excel từ chương trình của mình thì \\\"anh muốn
  em sống sao\\\" \U0001F602.  Thật ra thì nhiều thư viện đã được xây dựng để phục
  vụ cho việc này, và hôm nay mình sẽ giới thiệu về 1 trong số chúng đó là [ClosedXML](https://github.com/ClosedXML/ClosedXML)."
tags:
- c#
- excel
comments: true
category: programming
---

Để biết CloseXML là gì và làm được gì với nó thì mình sẽ dịch nguyên văn trên trang chủ của ClosedXML. Trình độ tiếng anh hạn hẹp nên dịch đôi khi sai sót mong các bạn thông cảm 😂

**Mô tả**

ClosedXML giúp các nhà phát triển tạo ra các file excel 2007/2010 một cách dể dàng hơn. Nó cung cấp các cách làm việc với file excel một cách đơn giản mà bạn không cần phải quan tâm đến cấu trúc phức tạp của XML(thực ra thì file excel là một file nén chứa các file xml bên trong thôi). Bạn có thể sử dụng bất cứ ngôn ngử .Net nào như C# hay VB để làm việc với ClosedXML.

**Bạn có thể làm gì với nó?**

ClosedXML cho phép bạn tạo ra các file excel 2007/2010 mà không cần phải có ứng dụng Microsoft Excel cài đặt sẵn trong máy. Thường sử dụng khi bạn cần tạo các file báo cáo trên một web server.

Bạn cũng không cần phải biết về Microsoft Open XML Format SDK, bạn cũng không cần quan tâm đến XML hay bất cứ công nghệ nào bên dưới. Chỉ với 4 dòng code đơn giản và trực quan bạn đã tạo ra được một file excel đúng "chuẩn".

```cs
var workbook = new XLWorkbook();
var worksheet = workbook.Worksheets.Add("Sample Sheet");
worksheet.Cell("A1").Value = "Hello World!";
workbook.SaveAs("HelloWorld.xlsx");
```

**Trau chuốt hơn một tí**

Đây là những gì mà ClosedXML có thể làm được, khá chuyên nghiệp phải không.
![](https://4.bp.blogspot.com/-Gy8uhqkpui8/V7vsFVA3I6I/AAAAAAAAPps/xctV7_X1c1I_3KYaxeBqpt_FL1UTGTJkACLcB/s1600/Showcase.jpg)

Cách sử dụng
------

Bây giờ bạn đã biết sơ qua về ClosedXML rồi. Phần này mình sẽ hướng dẩn cách export một số dữ liệu ra file excel sử dụng ClosedXML.

**Cài đặt thư viện**

1. Bạn tạo một project C# (console, winforms, wpf...)
1. Click chuột phải vào tên project ở **Solution Explorer** và chọn **Manager NuGet Packages...**
1. Tại cửa sổ của NuGet, bạn nhập vào ô search "closedxml" sau đó chọn ClosedXML như hình bên dưới và click vào nút Install ở bên phải.
![](https://1.bp.blogspot.com/-JEG3cN5TgAc/V7vt_tEQYcI/AAAAAAAAPp8/vNDuLtf70tIkBdUoD2cb0tThBN-UmCjSwCLcB/s1600/Capture.PNG)

Extention NuGet sẽ tự động tải về và cài đặt thư viện ClosedXML vào project cho bạn, việc bạn cần làm là ngồi đợi nó chạy.

![](https://4.bp.blogspot.com/-hBI6TydJx8c/V7vvUKHcqaI/AAAAAAAAPqI/Q5qUOWFa3DQmTQzg1RnDBSRn2Y82liAkwCLcB/s1600/Capture.PNG)

Ngoài ra bạn có thể cài đặt trực tiếp từ cửa sổ lệnh của nuget.
> PM> Install-Package ClosedXML

Tạo và export file Excel
---------

Bạn biết rằng mỗi file excel sẽ tương đương với 1 workbook(thường là thế), trong workbook đó sẽ chứa các worksheets.

![](https://1.bp.blogspot.com/-jknVailanxs/V7vyu8amNtI/AAAAAAAAPqU/4gW_X7fSQhE--IiJKZ8nGvCGIrAHotQsACLcB/s1600/Capture.PNG)

Vì thế trước khi muốn làm việc với excel bạn cần tạo một workbook, sau đó tạo ít nhất một worksheet(tùy nhu cầu của bạn). Từ các worksheet bạn tạo ra, bạn có thể đặt thông tin cho các ô trong đó.

Và đây là kết quả.
![](https://3.bp.blogspot.com/-EnczJK1VkTI/V7vzpzjlJwI/AAAAAAAAPqc/6wFSoM0Q_ncL94n0ERNXWwHhQMmUwvmEQCLcB/s1600/Capture.PNG)

Các ô dữ liệu sẽ lưu trữ các loại dữ liệu khác nhau như string, datetime, double.... việc xác định loại dữ liệu và format cho phù hợp là việc của ClosedXML nên bạn không cần phải lăng tăng về chuyện đó 😉Khi đọc dữ liệu từ các cell trong file excel thì nên kiểm tra trước kẻo dính lỗi, ví dụ cell đang lưu datetime mà đọc lên kiểu double thì độp nhé 😉

Mình chỉ hướng dẩn sơ qua như thế, bạn nào muốn nguyên cứu kỹ hơn để phục vụ cho công việc thì có thể đọc tại trang chủ của nó [closedxml](https://github.com/ClosedXML/ClosedXML).

Như thường lệ, source code của bài này tại đây: [https://github.com/sontx/excel-cshap](https://github.com/sontx/excel-cshap)
