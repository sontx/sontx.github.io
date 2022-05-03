---
title: Intercommunication với blackcat
layout: post
category:
- projects
comments: true
description: Giao tiếp giữa các processes thì không phải là chủ đề gì quá mới mẻ,
  có nhiều kỹ thuật hổ trợ việc đó vd như pipe hay kể cả socket... nhiều lắm, tha
  hồ lựa. Blackcat cũng dùng các kỹ thuật này, wrap chúng lại để dể xài hơn thôi :))
tags:
- c#
- socket
- namedpipe
- intercommunication
---

[Blackcat](https://github.com/sontx/blackcat) là 1 bộ thư viện tiện ích đơn giản gọn nhẹ giành cho .Net, nó bao gồm nhiều thành phần như Configuration, EventBus, IoC, AppCrash... Hôm nay mình sẽ giới thiệu thành phần **Intercomm**, với Intercomm bạn có thể giao tiếp với các processes trong 1 nốt nhạc :))

![](/assets/img/posts/two-processes-connected-with-a-pipe.png)

Để các processes giao tiếp với nhau thì phải có 1 process đóng vai trò là server còn các processes khác sẽ là client.
Bạn có thể gửi bất cứ thứ gì từ từ client cho server và ngược lại (string, number, object....). Khi gửi dữ liệu đi thì bạn có 2 sự lựa chọn là gửi không cần quan tâm tới phản hồi `sender.SendAsync(data)` và gửi xong chờ phản hồi `sender.SendAsync<type>(data)` trong đó *type* là kiểu dữ liệu mà server sẽ phản hồi lại cho client.

```cs
// client process
using (var sender = new Sender("my-intercomm"))
{
	var response = await sender.SendAsync<string>("Hi server, I'm client1");
}

// server process
using (var receiver = new SingleReceiver("my-intercomm"))
{
	var request = await receiver.ReceiveAsync<string>();
	await receiver.SendAsync("Hello " + request);
}
```

`SingleReceiver` chỉ hổ trợ *1 client - 1 serve*r, nếu bạn muốn *n client - 1 server* thì bạn cần dùng `MultiReceiver`. Dưới đây là ví dụ về `MultiReceiver`, phía client thì mọi thứ vẫn như cũ thôi :))

```cs
using (var receiver = new MultiReceiver("my-intercomm"))
{
	await receiver.WaitForSessionAsync(async session =>
	{
		// mỗi lần 1 client kết nối đến thì 1 session được tạo ra, cứ coi nó là 1 SingleReceiver đi :))
		var request = await session.ReceiveAsync<string>();
		await session.SendAsync("Hello " + request);
	});
}
```

Hiện tại thì blackcat hổ trợ 2 loại intercommunications là thông qua `pipe` và `socket`:
- Blackcat.Intercomm.Pipe: hổ trợ pipe
- Blackcat.Intercomm.Tcp: hổ trợ tcp socket
