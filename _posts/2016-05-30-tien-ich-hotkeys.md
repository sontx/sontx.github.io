---
title: Tiện ích hotkeys
layout: post
tags:
- utility
- c#
- winform
- winapi
- hook
comments: true
category:
- projects
---

Chương trình cung cấp các hotkey(tổ hợp phím) thông dụng như:

* Media: next, back, pause, mute…
* System: restart explorer, logoff, restart system, killer, boss…
* Custom menu: chứa các chương trình tùy chỉnh của người dùng

Media keys
------

Ở một số bàn phím thì chức năng media đã được hổ trợ như việc thêm vào các phím next, back, pause… như hình bên dưới. Vì thế bạn có thể dể dàng để điều khiển bài hát hoặc video đang phát một cách nhanh chóng thay vì phải điều khiển từ giao diện chương trình.

![](https://3.bp.blogspot.com/-3pQT9alnkfQ/V0sfth1pJFI/AAAAAAAAOlM/DHRz6l1pAsMHD1FlLbftxGKBrgeFrd9kACKgB/s1600/e61gP.jpg)

Nhưng không phải loại bàn phím nào cũng hổ trợ chức năng này vì thế chương trình hotkeys sẽ là một giải pháp thay thế khá hiệu quả. Chương trình hổ trợ đầy đủ các chức năng control media mà bạn cần từ next, back, mute cho đến tăng giảm âm lượng…

System keys
------

Một số phím tắt để làm việc với hệ thống như logoff, restart máy, restart explorer… các chức năng này sẽ khá hữu ích khi máy bạn gặp trục trặc hoặc bị đơ giữa chừng.

Ngoài ra chương trình còn hổ trợ các 2 chức năng khá thú vị đó là killer và custom menu, chúng ta sẽ lần lược tìm hiểu chúng ngay dưới đây. Ở phiên bản mới nhất của chương trình hổ trợ thêm tính năng boss dùng để "kill" các chương trình đang chạy trên hệ thống, nghe thì có vẻ khá giống với killer nhưng cụ thể có giống thật không thì chúng ta cùng tiềm hiểu cụ thể bên dưới nhé.

Killer(CTRL + ALT + K)
---------

Chức năng của nó khá đơn giản là cho phép bạn “kill” bất cứ chương trình nào đang chạy trong máy, chỉ cần lựa chọn nó trong danh sách và kill nó thôi. Không những thế nó còn hổ trợ bạn check virus cho file tương ứng với tiến trình đang chạy, killer sử dụng virustotal.com để check vì thế kết quả kiểm tra khá chính xác. Còn đây là giao diện của killer, khá đơn giản và thân thiện, khi check và phát hiện virus thì cửa sổ report sẽ hiển thị lên để thông báo vê loại virus cũng như trình antivirus đã phát hiện nó.

![](https://1.bp.blogspot.com/-4m1Zw64AuWU/V0tBKYcKL0I/AAAAAAAAOoU/-qkG0K3srEM-iQqqnbe20pdLAQmPanP_ACKgB/s1600/Capture.PNG)

> [Virustotal.com](https://virustotal.com/) là một trang web miễn phí cho phép người dùng kiểm tra virus cho một file được up lên, nó sẽ sử dụng hơn 50 chương trình diệt virus khác nhau để check vì thế kết quả kiểm tra sẽ rất thuyết phục.

Boss(CTRL + ALT + B)
--------

Tương tự như killer, tính năng mới này cho phép bạn kill các chương trình đang chạy trong hệ thống. Điểm khác biệt ở đây là nó sẽ kill toàn bộ các chương trình có tên mà bạn đã nhập vào. Ví dụ như trong máy bạn có 3 cửa sổ notepad và bạn muốn tắt toàn bộ chúng, đơn giản chỉ cần mở boss lên và nhập tên notepad là nó tự động kill toàn bộ các tiến trình có tên notepad(chú ý rằng nó cũng sẽ kill luôn những tiến trình có một phần tên notepad trong tên của nó) trong hệ thống. Cũng ví dụ ban nảy, nếu bạn nhập một phần tên thì chương trình sẽ tự động tìm kiếm, cụ thể nếu chỉ nhập note thì nó sẽ kill toàn bộ chương trình có chữ note trong tên và dĩ nhiên notepad của chúng ta cũng nằm trong danh sách đó.

![](https://1.bp.blogspot.com/-Y4Up8-r0B0w/V0vwpBpsrGI/AAAAAAAAOo4/1yJqK-oPC3IxQJmWyKpYaVWR00BRCC9aQCLcB/s1600/Capture.PNG)

Thường thì bạn sẽ ít khi phải sử dụng đến tính năng này, nhưng một số trường hợp bị dính virus hoặc có quá nhiều chương trình đang mở và bạn muốn "force close" thì boss sẽ là ứng cửu viên sáng giá.

Ngoài việc kill ứng dụng thì nó còn hiển thị danh sách các chương trình đang chạy trong hệ thống, trông khá giống Task Manager phải không.

Custom menu(CTRL + ALT + X)
-----------

Chức năng hiển thị menu chứa danh sách các chương trình của người dùng ở góc trái dưới cùng(khá giống với menu Win + X của Windows 10).

![](https://2.bp.blogspot.com/-iNp-7EOZI5M/V0smac9KbyI/AAAAAAAAOmQ/p-qCjIaLXVEyJy2AiqURA9Gv4tjAnXnhQCKgB/s1600/Untitled.png)

Menu có cấu trúc như sau:

—application1

—application2

—appsgroup1

————application1

————application2

————application3

—appsgroup2

————application1

————application2

Như đã thấy thì các mục application sẽ là chương trình thực thi thật sự, các apps cũng có thể được nhóm vào trong 1 group ví dụ như các công cụ hệ thống sẽ được nhóm trong group system như hình trên.

Theo mặt định thì mình đã tích hợp một số công cụ nho nhỏ vào cùng với chương trình, các công cụ này đa số mình lấy từ bộ hirenboot.

Để chỉnh sửa menu này thì khá đơn giản, bạn chỉ việc mở file config.ini trong thư mục của chương trình và chỉnh sửa nội dung cho phù hợp. Cụ thể nội dung của file này có cấu trúc tương xứng với cấu trúc của menu vì thế nên việc chỉnh sửa khá dể dàng.

![](https://4.bp.blogspot.com/-8_PR94xstUs/V0snmpff7OI/AAAAAAAAOmk/sSdpkM29n642XMZKrSHGZ3sDeMjd67u6wCKgB/s1600/Capture.PNG)

Mỗi application**X**(trong đó **X** sẽ được đánh số từ 1..n) section sẽ chứa 2 phần là:

* Name: tên hiển thị ở menu, thường thì đây sẽ là tên chương trình của bạn.
* Path: đường dẩn tới file thực thi của chương trình, khi bạn click vào chương trình ở menu thì file này sẽ được thực thi. Chú ý rằng đường dẩn có thể là tương đối hoặc tuyệt đối, trong file cấu hình mặt định thì mình để đường dẩn tương đối.

Mỗi appsgroup**X**(trong đó **X** sẽ được đánh số từ 1..n) section sẽ gồm 2 phần:

* Name: là tên group
* Cặp giá trị nameY và pathY, là tên và đường dẩn thực thi của chương trình, Y ở đây được đánh số từ 1..n

Bạn có thể tham khảo thêm file cấu hình mặt định hoặc hình bên trên để biết thêm chi tiết.

Các hotkeys khác
---------

Vì đây là chương trình hotkey vì thế nên bạn phải nhớ một số tổ hợp phím của chương trình để gọi các chức năng mà bạn muốn. Nhưng đôi lúc bạn có thể nhầm lẩn giữa tổ hợp phím này và tổ hợp phím khác, hoặc có thể quên, lúc đó một cửa sổ chứa các hotkeys là điều cần thiết. Dĩ nhiên chương trình hổ trợ điều đó, chỉ cần nhấn tổ hợp phím CTRL + ALT + F1 để hiển thị cửa sổ trợ giúp nhanh.

![](https://2.bp.blogspot.com/-MnX05JLlnKg/V0vsIogr8oI/AAAAAAAAOos/xC-FwFQpn1AQRT07lNZZVIQNAe5K0YzBACLcB/s1600/Capture.PNG)

Bạn chỉ cần nhấn tổ hợp phím thích hợp để gọi các chức năng của chương trình, các tổ hợp phím ở phiên bản hiện tại là:

```
CTRL + ALT + Key
```

Trong đó Key là một phím bất kỳ đã được gán với một chức năng, ví dụ như F1 để hiện help, F2 để restart chương trình, X để hiện custom menu…

Một số setting chương trình
-----------

Với phiên bản hiện tại chương trình hổ trợ hai setting là:

* Auto startup: khi tính năng này được bật nghĩa là chương trình sẽ tự động khởi động với hệ thống, như thế bạn có thể sử dụng hotkeys mọi lúc mà không cần phải khởi động chương trình bằng tay.
* Show in taskbar: theo mặt định thì hotkeys sẽ chạy nền trong hệ thống và bạn chỉ làm việc với chương trình thông qua các tổ hợp phím. Nếu chức năng này được bật thì chương trình sẽ hiển thị ở system tray và dĩ nhiên bạn có thể tương tác với chương trình bằng cách click chuột phải vào icon của nó.

![](https://3.bp.blogspot.com/-mevqCRfvkLU/V0ssyzsNnMI/AAAAAAAAOnU/FDMxgDIdRH420LdFEz7DfbewpY9Ki9euwCKgB/s0/Untitled.png)

Đây là giao diện của cửa sổ settings:
![](https://4.bp.blogspot.com/-rl3TTDEpg2M/V0tAiZN-m6I/AAAAAAAAOoA/PMiuntOyVU8iQa47lihUhVwV78CN1GatwCKgB/s0/Capture.PNG)

Video demo
-----

<div class="video-wrapper">
  <iframe src="https://www.youtube.com/embed/1BwKOOlu49Y" frameborder="0" allowfullscreen></iframe>
</div>

Yêu cầu
-----
.Net framework: bạn có thể tải tại [đây](https://www.microsoft.com/en-us/download/details.aspx?id=17718) nếu chưa có. Chú ý rằng từ phiên bản Windows 7 trở đi thì đều được cài đặt sẵn .Net framework rồi.

Dự án được code trên ngôn ngữ C# vì thế nếu bạn muốn chỉnh sửa để tạo ra phiên bản giành riêng thì có thể sử dụng Visual Studio để code và biên dịch.

Dự án hotkeys có sử dụng 2 thư viện hổ trợ là [restsharp](https://restsharp.org/) và VirusTotal project.

* * *

Download: [https://github.com/sontx/hotkeys/releases](https://github.com/sontx/hotkeys/releases)

Source: [https://github.com/sontx/hotkeys](https://github.com/sontx/hotkeys)
