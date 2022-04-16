---
title: Cách sử dụng thư viện đồ họa winbgim trong CodeBlocks
layout: post
description: Bài viết dưới đây sẽ hướng dẩn các bạn cách sử dụng thư viện đồ họa dos
  winbgim trong codeblocks. Chú ý rằng thư viện đồ họa này hiện tại mới chạy ngon
  trên windows 32bit, đối với windows 64bit thì hên xui, có tin đồn là không hổ trợ
  windows 64bit
tag:
- programming
comments: true
category: programming
---

Đầu tiên các bạn tải file cần thiết về và giải nén ra, tải tại [đây](http://1drv.ms/1c6e98t)

![](http://4.bp.blogspot.com/-O64RhyNX0Ms/VV1O3UKq-zI/AAAAAAAABVI/DJ-JG3SAT4Q/s1600/Capture.PNG)

Tiếp theo các bạn vào đường dẩn **C:\Program Files\CodeBlocks\MinGW**, ở đây các bạn chú ý đến 2 folders là include và lib. Giờ các bạn chỉ cần copy 2 files là graphics.h và winbgim.h vào folder include, file libbgi.a cho vào folder lib

![](https://1.bp.blogspot.com/-QZXPAwYKnXA/VV1Qwe5YgII/AAAAAAAABVU/SPrSgwUyuPg/s1600/Capture.PNG)

Bước tiếp theo sẽ tùy vào cách các bạn code.

Nếu sử dụng project: click chuột phải vào tên project trong management và chọn "build options...", tiếp theo chọn debug ở panel bên trái sau đó chọn tab linker settings ở panel bên phải, sau cùng các bạn click nút add và điền vào libbgi.a sau đó nhấn ok, phía bên phải các bạn điền vào câu thần chú: -lbgi -lgdi32 -lcomdlg32 -luuid -loleaut32 -lole32 cuối cùng là nhấn ok. Làm tương tự cho release ở panel bên trái. Chú ý rằng cách này chỉ có tác dụng đối với mỗi project mà bạn đã chỉnh sửa theo hướng dẩn.

Click chuột phải vào tên project trong management và chọn build options...
![](https://3.bp.blogspot.com/-jgLCHv1xrWM/VV1SrCqEOCI/AAAAAAAABVg/qZVefCkiDX0/s1600/Untitled.png)

Làm tương tự cho Release
![](https://2.bp.blogspot.com/-x6yyY2yZ7ng/VV1UCmBBB3I/AAAAAAAABVs/hCnxF1AXhJk/s1600/Capture.PNG)

Nếu chỉ code từng file đơn giản: đầu tiên chọn menu settings sau đó chọn compiler... sau đó chọn "Global compiler settings" panel ở bên trái, tiếp theo chọn tab "linker settings" ở bên phải rồi làm tương tự như cách 1. Chú ý rằng với cách này thì tất cả các project hoặc files đơn lẻ đều chiệu tác dụng của việc thay đổi này.

![](https://2.bp.blogspot.com/-wQ5bGpVfyOw/VV1XEIgbROI/AAAAAAAABV4/zyRar5iBbPk/s1600/Untitled.png)

Cuối cùng ở trong code các bạn chỉ cần include 1 trong 2 file header là graphics.h hoặc winbgim.h và sử dụng như đúng rồi thôi.

![](https://1.bp.blogspot.com/-LDYd-3tZxkc/VV1YDekN2vI/AAAAAAAABWA/FNq9AJcQw-I/s1600/Capture.PNG)
