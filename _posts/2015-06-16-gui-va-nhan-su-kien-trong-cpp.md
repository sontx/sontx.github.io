---
title: Gửi và nhận sự kiện trong C++
layout: post
description: Nếu các bạn đã từng sử dụng java/c#  thì chắc hẳng các bạn cũng ít nhiều
  biết đến khái niệm sự kiện(event). Event có rất nhiều ứng dụng trong xử lý giao
  diện, xử lý các input của người dùng; ngoài ra nó còn được dùng để gửi thông điệp
  từ các class với nhau, ở đây ta chủ yếu nguyên cứu về trường hợp này. Dưới đây là
  1 trong những cách tạo và sử dụng sự kiện trong c++, cụ thể như thế nào thì đọc
  tiếp sẽ rỏ.
tags:
- c++
- eventbus
comments: true
category: programming
---

Ta có bài toán như sau: thực hiện 1 công việc(ví dụ như copy file) và cập nhật tiến độ thực hiện lên màng hình console.

Để bài toán trở nên phức tạp và hại não hơn ta phân tích kiểu như sau, cụ thể với ví dụ copy file: cứ mỗi lần copy 1 khối bytes dữ liệu từ file gốc tới file đích ta lại thông báo rằng đã thực hiện xong x%, bên xử lý giao diện sẽ nhận được thông báo đó và tiến hành cập nhật lên console(cập nhật phần trăm lên 1 thanh ProgressBar và tiêu đề của console). Các phần về xử lý file hay hiển thị lên console như thế nào thì mình không đề cập ở đây. Phần chính ta cần quan tâm ở đây chính là làm cách nào để bên xử lý file thông báo phần trăm đã thực hiện cho bên giao diện. 

Cứ tưởng tượng thế này, bên vịt teo cho phép người dùng đăng ký dịch vụ nhận thư rác và spam các kiểu thông qua đầu số 113. Bạn là 1 người muốn nhận các thư rác và spam vì thế bạn đăng ký dịch vụ thông qua số đó. Sau khi đăng ký thì cứ mỗi lần có thư rác và spam thì vịt teo sẽ gửi đến cho bạn, bạn nhận thư rác và đọc nó. Đấy là cách mà chúng ta gửi nhận sự các thông báo trong bài toán.

* Vịt teo tương ứng với bên xử lý file
* Dịch vụ đăng ký nhận thư rác và spam của vịt teo chính là phương thức đăng ký nhận thông báo của bên xử lý file.
* Đầu số 113 chính là tên phương thức đăng ký của chúng ta.
* Người đăng ký nhận thư rác và spam chính là bên giao diện(nhận thông báo từ bên file để cập nhật lên console)
* Việc đăng ký dịch vụ nhận thư rác và spam chính là việc giao diện gọi phương thức đăng ký nhận thông báo của bên xử lý file.
* Mỗi lần đăng ký nhận thư rác và spam thì tổng đài vịt teo sẽ lưu lại số điện thoại của bạn vào danh sách để sau này có thư rác sẽ gửi cho những người có trong danh sách đó, tương ứng ở đây sẽ là việc giao diện đăng ký nhận thông báo thì bên xử lý file sẽ lưu lại con trỏ(số điện thoại) của bên giao diện(người dùng đăng ký) vào danh sách để sau khi xử lý được x% sẽ thông báo cho các phần tử trong danh sách đó.
* Vịt teo gửi thư rác và spam đến cho người dùng chính là việc bên xử lý file gửi thông báo đến những phần tử trong danh sách đã đăng ký mỗi khi thực hiện đc x%
* Người đăng ký nhận thư rác và đọc nó chính là việc giao diện nhận thông báo và cập nhật tiến trình lên console.

Bên trên là bước hình dung cách làm thế nào để bên xử lý file có thể thông báo cho bên giao diện. Có thể mô tả thông qua sơ đồ đơn giản như sau:

![](https://3.bp.blogspot.com/-BHJumB2dn2U/VX-jTg97BxI/AAAAAAAAHAQ/fVQONTtFHRI/s1600/1.png)

Giờ biến chúng thành code nào!

Trước khi code chúng ta cần 1 số quy tắt như sau:
* Khi 1 sự kiện gửi đi sẽ luôn gồm 2 thông tin: 1 là thực thể đã gửi sự kiện(sender), 2 là thông tin bổ sung về sự kiện(args).
* Thông tin về sự kiện là lớp kế thừa từ EventArgs class chứa các thông tin bổ sung cho từng loại sự kiện cụ thể.
* addListener(T* action) là phương thức đăng ký nhận 1 loại sự kiện.
* removeListener(T* action) là phương thức hủy đăng ký nhận 1 loại sự kiện.

Oke! đầu tiền ta xây dựng lớp EventArgs chứa thông tin bổ sung về sự kiện như sau:

```cpp
class EventArgs: OBJECT_BASE {
public:
    static EventArgs empty() {
        return EventArgs();
    }
    virtual ~EventArgs() {}
};
}
```

Tiếp theo ta xây dựng lớp Listener để quản lý các đăng ký và raise sự kiện:

```cpp
template <typename T>
class Listener: OBJECT_BASE{
protected:
    std::vector<T *> _actions;
    int indexof(T* action) {
        for(int i = 0; i < _actions.size(); i++)
            if(action == _actions[i])
                return i;
        return -1;
    }
public:
    void add(T* action) {
        if(indexof(action) >= 0)
            throw "Action already exists!";
        _actions.push_back(action);
    }
    void remove(T* action) {
        int index = indexof(action);
        if(index < 0)
            return;
        _actions.erase(index + _actions.begin());
    }
    void clear() {
        _actions.clear();
    }
    virtual void raise(Object* sender, EventArgs* args) = 0;
};
}
```

Lớp này là 1 abstract class vì nó sẽ phải được định nghĩa lại với kiểu dữ liệu cụ thể tùy vào từng loại sự kiện.
Hai lớp trên là 2 lớp tổng quát cho toàn bộ các loại sự kiện, còn bây giờ là code cụ thể cho sự kiện trong bài toán của ta với tên gọi là ProgressChanged(tên thì bạn tùy ý đặt miễn sao thấy hợp lý là được).
Đầu tiên là 1 lớp "giao diện" nhằm xác định loại class nào được đăng ký sự kiện ProgressChanged và phương thức sẽ được gọi khi sự kiện xảy ra.

```cpp
class IProgressChangedAction {
public:
    virtual void progressChangedAction(base::Object* sender, ProgressChangedEventArgs* args) = 0;
};
```

Tiếp theo là lớp chứa thông tin bổ sung cho sự kiện ProgressChanged kế thừa từ EventArgs

```cpp
class ProgressChangedEventArgs: public base::EventArgs {
private:
    unsigned int _total;
    unsigned int _processed;
public:
    unsigned int getTotal() const {
        return _total;
    }
    unsigned int getProcessed() const {
        return _processed;
    }
    ProgressChangedEventArgs(unsigned int total, unsigned int processed)
        :_total(total), _processed(processed) {
    }
};
```

Lớp này bao gồm 2 thuộc tính là total(tổng dữ liệu sẽ phải xử lý) và processed(lượng dữ liệu đã xử lý).
Cuối cùng là lớp quản lý các đăng ký và raise sự kiện ProgressChanged kế thừa từ Listener class.

```cpp
class ProgressChangedListener: public base::Listener<IProgressChangedAction> {
public:
    virtual void raise(base::Object* sender, base::EventArgs* args) {
        for(int i = 0; i < _actions.size(); i++) {
            _actions[i]->progressChangedAction(sender, static_cast<ProgressChangedEventArgs *>(args));
		}
    }
};
```

Trong 3 lớp bên trên thì ProgressChangedListener sẽ được sử dụng trong lớp xử lý file, IProgressChangedAction sẽ được lớp giao diện kế thừa lại còn ProgressChangedEventArgs sẽ là lớp trung giang nhằm chuyển dữ liệu(chứa thông tin bổ sung cho sự kiện) từ lớp xử lý file đến lớp giao diện.
Thế là xong phần cài đặt cho việc gửi và nhận sự kiện, còn bây giờ là áp dụng vào bài toán cụ thể của ta.
Lớp đầu tiên là lớp xử lý file như bên dưới:

```cpp
class ProcessSomething: OBJECT_BASE {
private:
    ProgressChangedListener pclistener;
    int total = 100;
    int randint(int from, int to) {
        return rand() % ( to - from + 1) + from;
    }
public:
    int getTotalBytes() const {
        return total;
    }
    void addListener(IProgressChangedAction* action) {
        pclistener.add(action);
    }
    void removeListener(IProgressChangedAction* action) {
        pclistener.remove(action);
    }
    void process() {
        srand(time(NULL));
        for(int i = 0; i < total; i++) {
            Sleep(randint(100, 500));// some process here!
            /* raise progress changed event */
            ProgressChangedEventArgs* args = new ProgressChangedEventArgs(total, i + 1);
            pclistener.raise(this, args);
            delete args;
        }
    }
};
```

Ở đây có 3 phương thức đặt biệt
* `void addListener(IProgressChangedAction* action)`: phương thức này sẽ cho phép các lớp kế thừa từ "giao diện" IProgressChangedAction có thể đăng ký nhận sự kiện ProgressChanged từ lớp xử lý file(chính là lớp ProcessSomething).
* `void removeListener(IProgressChangedAction* action)`: cho phép các lớp thừa kế từ IProgressChangedAction có thể hủy đăng ký nhận sự kiện ProgressChanged từ lớp xử lý file.
* `void process()`: lớp thực hiện nhiệm vụ chính là xử lý file và sẽ raise sự kiện mỗi khi xử lý được 1 khối bytes dữ liệu(ở đây chỉ demo đoạn xử lý file bằng phương thức sleep, total ở đây chính là tổng kích thước file). Phương thức `pclistener->raise(this, args)` sẽ raise sự kiện ProgressChanged.

Lớp thứ 2 là lớp giao diện:

```cpp
class Tester: public IProgressChangedAction {
private:
    ProgressBar* pbar;
    ProcessSomething* ppro;
    void updateTitle(int percent) {
        std::stringstream conv;
        conv << "processing[" << percent << "%]...";
        ConsoleHelper::settitle(conv.str());
    }
public:
    virtual void progressChangedAction(base::Object* sender, ProgressChangedEventArgs* args) {
        int processed = args->getProcessed();
        int total = args->getTotal();
        int percent = processed / (float)total * 100.0;
        pbar->setValue(processed);
        updateTitle(percent);
        if(processed == total)
            ConsoleHelper::showmessage("Tester", "Completed!");
        else if(percent > 50 && percent < 80)
            pbar->setProgressColor(10);
        else if(percent > 80)
            pbar->setProgressColor(9);
    }
    void start() {
        ppro->process();
    }
    Tester() {
        pbar = new ProgressBar(10, 10, 60);
        ppro = new ProcessSomething();
        ppro->addListener(this);
        pbar->setMaximun(ppro->getTotalBytes());
    }
    ~Tester() {
        delete pbar;
        delete ppro;
    }
};
```

Lớp này kế thừa từ IProgressChangedAction và dĩ nhiên phải định nghĩa lại phương thức progressChangedAction, phương thức này sẽ được tự động thực thi khi sự kiện ProgressChanged được raise. Ở hàm khởi tạo của lớp giao diện ta khởi tạo 1 thanh ProgressBar và 1 lớp xử lý file, sau đó đăng ký nhận sự kiện ProgressChanged bằng phương thức `ppro->addListener(this)` sau khi gọi phương thức này thì mỗi khi sự kiện ProgressChanged được raise từ lớp xử lý file(ProcessSomething) thì phương thức progressChangedAction của lớp giao diện sẽ được tự động chạy.

Done! thế là mỗi khi phương thức `pclistener->raise(this, args)` trong lớp xử lý file được gọi thì phương thức progressChangedAction sẽ cũng được thực thi, nhờ đó mà ta có thể cập nhật tiến độ thực hiện trong phương thức progressChangedAction.

Và đây là kết quả: 

![](https://2.bp.blogspot.com/-9FwwvSafPWs/VX7h3zSo_PI/AAAAAAAAG94/soNLXKezOQo/s1600/9.PNG)

Tóm lại, muốn gửi thông điệp từ class này qua class khác ta cần định nghĩa 1 lớp chứa thông tin bổ sung cho sự kiện(nếu không cần thì có thể sử dụng trực tiếp lớp EventArgs), 1 lớp quản lý việc đăng ký và raise sự kiện(sử dụng trong lớp gửi sự kiện) và 1 "giao diện" thực thi(lớp nhận sự kiện sẽ kế thừa lại nó). Mỗi lần muốn raise sự kiện chỉ cần gọi phương thức raise trong lớp Listener với đối số tương ứng.

Đây là full source của project này:  http://1drv.ms/1SjsBdH
