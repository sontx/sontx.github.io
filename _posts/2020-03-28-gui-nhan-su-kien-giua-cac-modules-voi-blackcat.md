---
title: Gửi nhận sự kiện giữa các modules với blackcat
layout: post
category:
- projects
comments: true
description: Nếu bạn từng code android thì chắc cũng biêt đến 1 thư viện khác nổi
  tiến là [greenrobot eventbus](https://github.com/greenrobot/EventBus), nó dùng để
  gửi và nhận các events từ các modules khác nhau theo mô hình pub/sub. EventBus của
  blackcat thực ra là chôm ý tưởng từ thư viện này mà thôi :))
tags:
- c#
- eventbus
---

[Blackcat](https://github.com/sontx/blackcat) là 1 bộ thư viện tiện ích đơn giản gọn nhẹ giành cho .Net, nó bao gồm nhiều thành phần như Configuration, EventBus, IoC, AppCrash... Hôm nay mình sẽ giới thiệu thành phần **EventBus**, với EventBus bạn có thể gửi và nhận sự kiện giữa các mudules một cách đơn giản nhất có thể.

Ý tưởng sẽ như thế này, lấy luôn ảnh của [greenrobot eventbus](https://github.com/greenrobot/EventBus)
![](https://raw.githubusercontent.com/greenrobot/EventBus/master/EventBus-Publish-Subscribe.png)

Lợi ích của nó có thể kể đến như sau:
- Giúp việc giao tiếp giữa các modules/components trở nên đơn giản
- Code sẽ đơn giản và dể đọc hơn
- Đảm bảo được tính liên kết lỏng cmn lẻo giữa các components nè

3 bước để sử dụng eventbus:
--

**Định nghĩa các sự kiện:**
```cs
class MessageEvent
{ 
	/* Additional properties if needed */
}
```

**Đăng ký nhận sự kiện cho subscriber**

Khai báo và thêm `Subscribe` attribute cho subscribing method:

```cs
[Subscribe]
private void OnMessageEvent(MessageEvent msgEvent) {/* Do something */};
```

Đăng ký hoặc hủy đăng ký nhận sự kiện cho subscriber, ví dụ trong 1 form thì bạn có thể đăng ký nhận sự kiện ở `OnLoad` và hủy đăng ký nhận sự kiện ở `OnClosed`

```cs
protected override void OnLoad(EventArgs e)
{
	EventBus.Default.Register(this);
	base.OnLoad(e);
}

protected override void OnClosed(EventArgs e)
{
 EventBus.Default.Unregister(this);
 base.OnClosed(e);
}
 ```
 
**Gửi sự kiện cho các subscribers:**

```cs
EventBus.Default.Post(new MessageEvent());
```

Bạn khó tính và bạn muốn nhiều hơn
----
Tôi cần update lại UI ở subscribing method, làm thế nào để đảm bảo 100% là method của tôi được gọi trong main thread (ui thread): Mặt định thì subscribing methods sẽ được gọi ngay tại thread gọi post -> nghĩa là bạn post event ở background thread thì subscribing method của bạn cũng sẽ được gọi tại background thread đó -> để subscribing methods luôn được gọi trên main thread thì bạn làm như sau.

```cs
// Currently we're supporting several thread modes:
//  Post: default mode, invokes subscribers immediately in current caller thread
//  Thread: invokes subscribers in a new background thread if caller thread is main thread, otherwise invokes subscribers immediately in current caller thread 
//  Async: Always invokes subsribers in a new background thread
//  Main: Invokes subscribers in main thread (UI thread) in blocking mode
//  MainOrder: Invokes subsribers in main thread (UI thread) in non-blocking mode

[Subscribe(ThreadMode = ThreadMode.Main)]
private void OnMessageEvent(MessageEvent msgEvent)
{
	// this stuff will be called in main thread
}
```

Tôi muốn return data cho caller: OK hổ trợ luôn, nhưng chỉ hổ trợ cho `Post` và `Main` thread mode thôi nhé

```cs
// From subscribers
[Subscribe]
private PostHandled ReturnValueForCaller1(MyEvent myEvent)
{
	// do you stuff here
	return new PostHandled {Data = "any data here"};
}
[Subscribe]
private string ReturnValueForCaller2(MyEvent myEvent)
{
	// do you stuff here
	return "any data here";
}

// From caller
var results = EventBus.Default.Post(new MyEvent{...});
```

Giao tiếp giữa các modules hay components của cùng 1 ứng dụng thì bình thường quá, tôi muốn giao tiếp giữa 2 hoặc nhiều ứng dụng kia: Bạn trẻ muốn hơi nhiều rồi đó :)) nhưng may cho bạn là eventbus hổ trợ tận răng nhé :))

```cs
// Client process

var eventbus = ClientEventBus.StartNew("my-eventbus");
eventbus.Post(new MyEvent{...});


// Main process (ex: a windows service)

var eventbus = ServerEventBus.StartNew("my-eventbus);
eventbus.Register(this);
.....

[Subscribe]
private void ListenMyEvent(MyEvent myEvent)
{
...
}
```

Bonus: Ở đây có 1 loại event đặt biệt gọi là sticky event, loại event này sẽ nằm trong bộ nhớ mãi mãi và bạn có thể lấy nó ra bất cứ lúc nào cũng được.

```cs
// Posts a sticky event
EventBus.Default.Post(new MyEvent{...}, true);// MyEvent likes other events but it's still remaining in memory after called
EventBus.Default.Post(new MyEvent{...}, true);// this will replace the first event

// Queries a specific sticky event
var myStickyEvent = EventBus.Default.GetStickyEvent(typeof(MyEvent));

// Removes a specific sticky event
EventBus.Default.RemoveStickyEvent(myStickyEvent);
```
