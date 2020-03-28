---
title: Inversion of Control Container (IoC) với blackcat
layout: post
category:
- projects
comments: true
description: IoC thì chắc nhiều bạn biết rồi, nếu không biết thì cứ google là ra :))
  blackcat cung cấp 1 IoC container bên dưới của nó sử dụng [TinyIoC](https://github.com/grumpydev/TinyIoC)
  còn nó chỉ có 1 nhiệm vụ giúp IoC thân thiện hơn với người dùng :))
---

[Blackcat](https://github.com/sontx/blackcat) là 1 bộ thư viện tiện ích đơn giản gọn nhẹ giành cho .Net, nó bao gồm nhiều thành phần như Configuration, EventBus, IoC, AppCrash... Hôm nay mình sẽ giới thiệu thành phần **IoC**, với IoC bạn có thể khởi tạo và sử dụng IoC container bằng cách sử dụng các attributes tương tự như cách mà spring làm :)).

Blackcat cung cấp 2 loại attributes chính:
1. Component attributes: `Controller`, `Service`, `Component` dùng để mô tả 1 class là 1 component được quản lý bới IoC container. Khi IoC container tiến hành quét toàn bộ assembly để tự động đăng ký các classes này thì nó sẽ chỉ quét các classes được mô tả bởi mấy attributes này thôi.
2. `Autowired` attribute: giống y chan bên spring thôi, properties nào được mô tả với attribute này thì sẽ được tự động inject :)), ngoài cách này thì bạn có thể inject các components bằng construtor :))

Ở đây có 1 class đặt biệt là `App32Context` (định đặt tên là AppContext rồi mà trùng cmn tên với tụi .Net mất, chán) dùng để quét, đăng ký và quản lý các instances của các components

```cs
// You can annotate your class by Component, Service, Repository or Controller,
// they are the same but for easier to understand their roles.
[Controller]
public class MyApp
{
	// Properties which are annotated with Autowired attribute will
	// be injected automatically
	[Autowired]
	public MyComponent MyComponent {get; set;}

	// myService will be injected automatically
	public MyApp(MyService myService) {...}
	....
}
[Service]
public class MyService {....}
[Component]
public class MyComponent{....}

// Somewhere else...

// App32Context will scan the entry assembly to find classes which are annotated with Controller, Component, Repository or Service attributes.
using (var context = new App32Context())
{
	var myApp = context.Resolve<MyApp>();
	myApp.Start();
}
```

Bạn khó tính và bạn cần nhiều hơn
----

1. Các impl classes của tôi đều nằm ở 1 assembly khác chứ không phải ở assembly chính, giờ làm sao tôi đăng ký nó với app context: constructor của class `App32Context` có nhận các đối số là danh sách các assemblies sẽ được quét đó, nếu không truyền gì thì mặt định là nó quét assembly chính thôi :))
2. Tôi muốn mỗi lần resolve 1 component thì sẽ tạo cho nó một instance mới chứ không dùng chung thì làm thế nào: Khai báo component attribute thành thế này nhé `[Service(Singleton = false)]`

Bonus: mặt định thì `IConfigLoader`, `IEventBus` và `AppCrash` được đăng ký tự động với `App32Context`, vì thế bạn có thể gọi và sử dụng trực tiếp chúng:
```cs
using (var context = new App32Context())
{
	var config = context.Resolve<IConfigLoader>();
	....
}
```
