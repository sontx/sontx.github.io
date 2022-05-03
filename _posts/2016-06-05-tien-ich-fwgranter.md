---
title: Tiện ích FWGranter
layout: post
description: Đây là công cụ tiện ích từ dòng lệnh giúp bạn thêm ứng dụng của mình
  vào danh sách ngoại lệ của tường lửa theo cách đơn giản nhất có thể.
tags:
- utility
- c#
- firewall
comments: true
category:
- project
---

Các chức năng chính như sau:

* Thêm ứng dụng vào danh sách ngoại lệ của tường lửa.
* Xóa ứng dụng khỏi danh sách ngoại lệ của tường lửa.
* Xem tình trạng của tường lửa

![](https://1.bp.blogspot.com/-BP7eNBaXAMg/V1Pr2Q622ZI/AAAAAAAAOvI/IedMD9ERH0YDTUyOxndI7qZXpX-dknPDQCLcB/s1600/Capture.PNG)

Thêm ứng dụng vào danh sách ngoại lệ của tường lửa.
---------

Để thêm một ứng dụng vào danh sách tường lửa, bạn cần truyền tham số cho chương trình như sau:

```
fwgranter -a "c:\myApp.exe"
// hoặc
fwgranter -a "c:\myApp.exe" "superApp"
// hoặc
fwgranter -a -g
```

Với cách một bạn chỉ cần truyền vào đường đẩn đến chương trình muốn thêm vào danh sách ngoại lệ, tên ứng dụng trong danh sách đó sẽ chính là tên file của chương trình(không bao gồm phần mở rộng của file).

Cách hai như cách một nhưng bạn có thể tự định nghĩa tên chương trình thay vì để fwgranter tự động xác định tên.

Cách 3 bạn sẽ hiển thị một hộp thoại để bạn lựa chọn chương trình muốn thêm vào danh sách, tên chương trình sẽ được tự động xác định theo cách một.

![](https://4.bp.blogspot.com/-IWON0QUMya8/V1PsSpTaWMI/AAAAAAAAOvQ/Jq-1RaODRk4yP0dtehQog57ImyV0GHqRACKgB/s1600/Capture.PNG)

Xóa ứng dụng khỏi danh sách ngoại lệ của tường lửa.
-----------

Sau khi thêm chương trình vào danh sách ngoại lệ, nếu bạn muốn xóa bỏ chúng khỏi danh sách này thì có thể làm như sau:

```
fwgranter -rP "c:\myApp.exe"
// hoặc
fwgranter -rN "superApp"
// hoặc
fwgranter -rP -g
```

Với cách 1, bạn cần định nghĩa đường dẩn tới file của ứng dụng muốn xóa khỏi danh sách ngoại lệ.

Với cách 2, bạn chỉ cần định nghĩa tên chương trình cần xóa và fwgranter sẽ làm mọi thứ cho bạn.

Cách cuối cùng sẽ hiển thị hộp thoại cho phép bạn lựa chọn ứng dụng cần remove khỏi danh sách ngoại lệ.

Xem tình trạng của tường lửa.
------------

Để xem tình trạng hiện tại của tường lữa trong máy tính, bạn sử dụng lệnh sau:

```
fwgranter -s
```

Kết quả hiển thị cho bạn biết tường lữa có được cài đặt trong máy chưa, nó được enable chưa hay nó có cho phép các việc thêm ứng dụng vào danh sách ngoại lệ không.

![](https://2.bp.blogspot.com/-vOiJvO-hCFQ/V1Psm0dgAmI/AAAAAAAAOvc/ZR09FoP8J-EgpF8jtrj8L0Zb3dapZIILwCLcB/s1600/Capture.PNG)

Yêu cầu
-----

Chương trình yêu cầu .Net Framework để hoạt động, phiên bản hiện tại hổ trợ .Net Framework phiên bản 4.5 nhưng bạn có thể tự build ra các phiên bản khác từ source code.

IDE được sử dụng là Visual Studio C#

* * *

Download: [https://github.com/sontx/fwgranter/releases](https://github.com/sontx/fwgranter/releases)

Source: [https://github.com/sontx/fwgranter](https://github.com/sontx/fwgranter)
