---
title: NFTools, tiện ích cài đặt .Net Framework tự động
layout: post
description: >
  Tiện ích nhỏ gọn này hổ trợ bạn kiểm tra và cài đặt các phiên bản .Net Framework bị thiếu trong hệ thống. Chương trình với kích thước siêu nhỏ gọn và không cần thêm thư viện, việc thực thi thông qua command prompt khá nhanh và đơn giản
tag: [programming,utility]
comments: true
---

![](https://4.bp.blogspot.com/-mz2LH_4Zu2E/V03CEllsfkI/AAAAAAAAOtY/qEzQrHFq5UUcjp2r4GK15uJdwi6fnFTPgCKgB/s1600/Untitled.png)

Các chức năng chính được liệt kê ngay dưới đây:

* Cài đặt tất cả các phiên bản bị thiếu.
* Cài đặt phiên bản cụ thể.
* Kiểm tra và cài đặt nếu phiên bản cụ thể còn thiếu.
* Xem tất cả các phiên bản đã cài và các phiên bản còn thiếu.

Cài đặt tất cả các phiên bản bị thiếu.
----------

```
nftools -a 
```

Tiện ích sẽ tự động phát hiện các phiên bản .Net Framework còn thiếu và cài đặt chúng.

![](https://1.bp.blogspot.com/-qH1rQH6jId0/V024_YI_s-I/AAAAAAAAOr8/4lVbHzI9aQMjPpkMBtyWk-Wf4luLYKI-ACKgB/s1600/Capture.PNG)

Cài đặt phiên bản cụ thể.
-----------

```
nftools -i [version]
nftools -i 4.5
```

![](https://3.bp.blogspot.com/-tzv1ox_A8GY/V0286tzhsxI/AAAAAAAAOsU/gcZZtPopZtg87IPTXyoprAvDJgq9pdeKwCKgB/s1600/Capture.PNG)

Kiểm tra và cài đặt nếu phiên bản cụ thể còn thiếu.
------------

```
nftools -c [version]
```

![](https://3.bp.blogspot.com/-6bZP-gnRg5s/V02-Z4hbubI/AAAAAAAAOss/remjQF5tDAgRaDxzONwkZ6TlP1wnAdpKACKgB/s0/Capture.PNG)

Các phiên bản đã cài và các phiên bản còn thiếu.
---------------

```
nftools -s
```

![](https://3.bp.blogspot.com/-W3Op-yCZP0U/V02-5XX_g3I/AAAAAAAAOs8/c8poBaT2XYw2LxlSAgG--ghAmoK5243hACKgB/s1600/Capture.PNG)


> NOTE: Các phiên bản .Net Frameworks được hổ trợ cài đặt đều được nhúng cứng trong file binary vì thế nên nếu bạn muốn update cho tiện ích thì phải can thiệp vào source của chương trình.
Với phiên bản hiện tại hổ trợ cài đặt cho các phiên bản .Net Frameworks cách đây hơn 1 năm, vì mình viết cái tool này vào khoản thời gian đó :D
Các phiên bản hổ trợ là: 1.1, 2.0, 3.0, 3.5, 4.0, 4.5, 4.5.1 và 4.5.2.
Nếu có thời gian thì mình sẽ update thêm sau.

Yêu cầu
-----

Dự án không yêu cầu thêm các thư viên hổ trợ. Dự án được phát triển trên Visual C++ 2008 vì thế nếu bạn muốn chỉnh sửa bổ sung thì có thể sử dụng IDE này để làm việc với project.

* * *

Download: [https://github.com/sontx/nftools/releases](https://github.com/sontx/nftools/releases)

Source: [https://github.com/sontx/nftools](https://github.com/sontx/nftools)