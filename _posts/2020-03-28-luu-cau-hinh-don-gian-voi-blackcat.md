---
title: Lưu cấu hình đơn giản với blackcat
layout: post
category:
- projects
comments: true
description: Mỗi khi cần lưu 1 set các cấu hình thì bạn sẽ gặp phải 1 loạt các câu
  hỏi như cấu hình nên lưu ở đâu, format ra sao, khi nào thì cần lưu, khi nào thì
  cần load… tưởng chừng như đơn giản nhưng tự handle thì cũng tốn chút thời gian đó
  :)) (Thực ra thì bản thân .Net cũng hổ trợ việc này rồi nhưng hướng tiếp cận của
  nó hơi khác). Với Configuration của blackcat thì bạn sẽ ko cần phải quan tâm mấy
  thứ vớ va vớ vẩn đó nữa.
tags:
- c#
- configuration
---

[Blackcat](https://github.com/sontx/blackcat) là 1 bộ thư viện tiện ích đơn giản gọn nhẹ giành cho .Net, nó bao gồm nhiều thành phần như Configuration, EventBus, IoC, AppCrash... Hôm nay mình sẽ giới thiệu thành phần **Configuration**, với Configuration bạn có thể lưu hoặc load các cấu hình của ứng dụng chỉ với 1 dòng lệnh :)).

```cs
checkbox1.Checked = ConfigLoader.Default.Get<MyConfig>().EnableFeature1;
```

Để sử dụng thì bạn cần tạo cho mình 1 class mô tả các cấu hình, ví dụ:

```cs
class MyConfig
{
	public bool EnableFeature1 {get;set;}
	public string LoggedUserName {get;set;}
	........
}
```

Khi dùng thì chỉ cần sử dụng `ConfigLoader.Default.Get<YourConfigClass>()`, nó sẽ trả về instance của set cấu hình bạn cần. Trong trường hợp này sẽ như vầy:

```cs
// get config
checkbox1.Checked = ConfigLoader.Default.Get<MyConfig>().EnableFeature1;

// change config
ConfigLoader.Default.Get<MyConfig>().EnableFeature1 = checkbox1.Checked;
```

Mặt định thì mọi cấu hình sẽ được tự động lưu vào file khi bạn đóng ứng dụng.

Đây là 1 số chi tiết mà Configuration sẽ handle cho bạn:

1. Lưu ở đâu: lưu ở file, mặt định là file json (tên file mặt định là *yourAppName.json*) trong working directory, nó sẽ có dạng như vầy nè.

```json
{
  "metadata": {
    "modified": "2019-11-11T14:29:35.3268223+07:00"
  },
  "configs": [
    {
      "key": "MyConfig",
      "data": {
        "enableFeature1": true,
        "loggedUserName": "sontx",
      }
    }
  ]
}
```

2. Khi nào thì lưu: mặt định thì khi tắt ứng dụng nó sẽ tự lưu.
3. Khi nào thì load: khi cần thì load :))

Bạn khó tính và bạn muốn nhiều hơn
-----

1. Giờ tôi không muốn lưu ở file đấy, tôi muốn lưu chổ khác thì làm thế quái nào: Tự impl `IDataStorage` rồi set cho `ConfigLoader.Storage` là được.
2. Giờ tôi không muốn format json đấy thì làm sao nào: Bạn trẻ tự impl `IDataAdapter` rồi set cho `ConfigLoader.Adapter` là được, mình có impl sẵn 1 cái `XmlDataAdapter` để format xml thay vì json đấy.
3. Tôi muốn lưu cấu hình ngay khi tôi change nó thay vì phải đợi đóng ứng dụng đấy thì sao nào: Cái này thì hơi chua đấy, bạn trẻ cần làm 3 việc sau: 
	- Set `ConfigLoader.SaveMode = SaveMode.OnChange`
	- Class cấu hình của bạn cần phải kế thừa từ `AutoNotifyPropertyChange.AutoNotifyPropertyChanged`
	- Các properties của bạn cần phải có keywork `virtual`
4. Tôi muốn thiết đặt các giá trị mặt định của cấu hình cho lần khởi chạy đầu tiên thì làm thê quái nào: Có 2 cách
	- Đặt giá trị mặt định cho properties của class cấu hình :)) trò này thì đơn giản dể làm nhưng khổ cái là không thể thay đổi lúc runtime được.
	- Gọi phương thức `ConfigLoader.InitializeSettings` với đối số là các cấu hình mặt định bạn muốn.
5. Giờ tôi lười tạo cửa sổ để chỉnh sửa cấu hình nhưng tôi lại muốn có cửa sổ để chính sửa cấu hình (lú cmnl) thì làm thế quái nào: Đây là tiêu biểu của việc không muốn tán gái mà vẫn có gấu :)) nhưng rất may mắn cho bạn là `Blackcat.WinForm` hổ trợ việc này :))

```cs
using Blackcat.WinForm;
...........
// một cửa sổ nho nhỏ dể cmn thương sẽ hiển thị ra để bạn edit các cấu hình có trong MyConfig
var configChanged = ConfigLoader.Default.Get<MyConfig>().ShowEditor();
```
