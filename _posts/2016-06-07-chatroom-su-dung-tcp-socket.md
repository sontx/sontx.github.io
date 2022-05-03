---
title: Chatroom sử dụng TCP Socket
layout: post
description: Như các bạn đã biết thì socket là kỷ thuật được sử dụng khá phổ biến
  để các chương trình giao tiếp trong mạng. Với socket thì ta có thể làm đủ thứ trò
  hay ho như truyền nhận file, chat, teamview(phiên bản chế)…Hôm nay mình sẽ hướng
  dẩn các bạn cách viết một chương trình chatroom đơn giản sử dụng TCP Socket của
  java và C#.
tags:
- c#
- java
- socket
- multithreading
comments: true
category: programming
---

<span/>

Tìm hiểu về TCP Socket
-----------

Mấy định nghĩa về socket hay giao thức TCP thì các bạn có thể đọc thêm trên mạng, đầy ra đó. Mình chỉ nói ngắn gọn thế này.

1. TCP: đây là một giao thức được sử dụng khá phổ biến. HTTP(khi bạn lướt web), FTP(khi bạn truyền file), SMTP(khi bạn gửi mail)…đều sử dụng giao thức TCP cả. Nó cung cấp khả năng truyền nhận đáng tin cậy, đảm bảo các gói tin đúng thứ tự và phải kết nối trước khi làm việc. Đại khái là bên kia sẽ nhận đúng những gì mà bạn đã gửi.
1. Socket: lớp Socket và một số lớp khác như InetAddress, ServerSocket…đều được hổ trợ trực tiếp trong java chuẩn, nghĩa là bạn không cần phải sử dụng thêm thư viện của bên thứ ba. Lớp Socket trong java hổ trợ làm việc với giao thức TCP và để giao tiếp với nhau thì java hổ trợ sử dụng giao tiếp dạng stream. Đối với C# thì cũng tương tự, các lớp làm việc với socket như TcpClient, IPAddress, TcpListener… đều được C# hổ trợ tận răng và không cần thêm thư viện của bên thứ ba nào cả.

Mô hình client-server
------------

Đây là mô hình được sử dụng nhiều nhất trên thế giới, ngay chính các trang web bạn xem hằng ngày cũng được xây dựng theo mô hình này. Ở đây client sẽ đóng vai trò là khách, server là chủ, khách sẽ yêu cầu các tài nguyên/xử lý từ chủ, chủ xử lý và phản hồi lại các kết quả cho khách(nghĩa là chủ phải phục vụ khách). Ví dụ như khi bạn lướt vào trang mp3.zing.vn và tải một bài nhạc, khi đó trình duyệt sẽ là client và nó sẽ yêu cầu bài hát đến thèn server(là thèn server mp3 zing), thèn server tìm kiếm/xử lý xong nó sẽ gửi dữ liệu bài hát lại cho trình duyệt.

Dể nhận thấy rằng một server thường sẽ phục vụ cho nhiều client và số lượng các client sẽ tăng giảm một cách không thể biết trước được.

![](https://4.bp.blogspot.com/-RJyBwXEBRbs/V1UEySpOmOI/AAAAAAAAOwA/8b-37TQblecn04QEzkI0vvGBZf4ZLBTVACKgB/s1600/Client-server-model.svg.png)

Sử dụng TCP socket trong mô hình client-server
-------------

Đây là mô hình được sử dụng nhiều nhất trên thế giới, ngay chính các trang web bạn xem hằng ngày cũng được xây dựng theo mô hình này. Ở đây client sẽ đóng vai trò là khách, server là chủ, khách sẽ yêu cầu các tài nguyên/xử lý từ chủ, chủ xử lý và phản hồi lại các kết quả cho khách(nghĩa là chủ phải phục vụ khách). Ví dụ như khi bạn lướt vào trang mp3.zing.vn và tải một bài nhạc, khi đó trình duyệt sẽ là client và nó sẽ yêu cầu bài hát đến thèn server(là thèn server mp3 zing), thèn server tìm kiếm/xử lý xong nó sẽ gửi dữ liệu bài hát lại cho trình duyệt. 
Dể nhận thấy rằng một server thường sẽ phục vụ cho nhiều client và số lượng các client sẽ tăng giảm một cách không thể biết trước được.

![](https://4.bp.blogspot.com/-RJyBwXEBRbs/V1UEySpOmOI/AAAAAAAAOwA/8b-37TQblecn04QEzkI0vvGBZf4ZLBTVACKgB/s1600/Client-server-model.svg.png)

Sử dụng TCP socket trong mô hình client-server
------------

Client sẻ sử dụng một socket để làm việc với server theo 3 bước: 
1. Kết nối tới server.
1. Trao đổi dữ liệu với server.
1. Đóng kết nối.

Server sẽ làm việc với client theo 5 bước: 
1. Bind tới một endpoint(một địa chỉ IP và port) trên server.
1. Bắt đầu lắng nghe kết nối.
1. Đợi các kết nối.
1. Tạo một worker khi có kết nối mới.
1. Quay lại bước 3.

![](https://1.bp.blogspot.com/-cz9TB5eHJFQ/V1UFW4lj-XI/AAAAAAAAOww/rPW03jGRZPkt3J3ado7MWda-9Q2bBCqNwCKgB/s1600/Drawing1.png)

Worker ở đây sẽ là một lớp wrapper có nhiệm vụ làm việc trực tiếp với client và nó sẽ được thực thi trong một thread khác để đảm bảo server có thể phục vụ được nhiều client cùng lúc. Thực ra khi server chấp nhận một kết nối, nó sẽ sinh ra một socket để ta làm việc với client và socket này sẽ được Worker bao bọc lại cùng với nó là một thread mới được sinh ra. Sau khi Worker được sinh ra thì server sẽ quay lại lắng nghe tiếp các kết nối khác, vòng lặp như thế sẽ diễn ra mãi mãi cho đến khi ta đóng server bằng phương thức close hoặc có một lỗi xảy ra trong lúc lắng nghe. Thông thường thì server sẽ cần phải hoạt động 24/7 nên ít khi xảy ra trường hợp cần phải đóng server.

Thiết kế Chatroom
----------

Mình sẽ xây dựng một chatroom đơn giản như sau: mỗi người dùng sẽ có một tài khoản, khi một người dùng gửi tin nhắn thì tất cả mọi người còn lại đều sẽ nhận được tin nhắn đó. 
Để đơn giản thì người dùng chỉ cần điền một tên bất kỳ để phân biệt với những người dùng khác chứ không cần phải register mất thời gian.
Người dùng sẻ sử dụng một chương trình client để kết nối đến server chat của ta thông qua một địa chỉ IP và port. Server chỉ có nhiệm vụ quản lý các kết nối và broadcast tin nhắn đến các client khác cùng kết nối vào server.

Chatroom on Java
---------

**Client**

Đầu tiên ta tạo client với một socket như sau:

```java
socket = new Socket(InetAddress.getByName(serverAddress), serverPort);
```

Khi tạo socket như thế này thì mặt định nó sẽ tự động kết nối đến server tại địa chỉ serverAddress và port là serverPort. Sau khi kết nối thành công đến server thì ta sử dụng 2 luồng là InputStream và OutputStream để đọc và ghi dữ liệu với server. 
Tiếp theo ta cần tạo mới 1 thread để đợi nhận các message mà server gửi về cho ta, phương thức đọc dữ liệu từ **InputStream** là read như sau:

```java
byte[] buffer = new byte[2048];
int receivedBytes = in.read(buffer);
```

Hàm read sẽ blocks thread hiện tại cho đến khi dữ liệu sẵn có để đọc hoặc một lỗi xảy ra. Dữ liệu sau khi đọc sẽ được lưu vô mảng buffer, số lượng bytes đã đọc được chính là giá trị trả về của hàm read. 
Để tạo mới một thread thì bạn có thể sử dụng lớp Thread có sẵn trong java và có nhiều cách triển khai từ lớp Thread đó như: sử dụng anonymous class thực thi từ Runnable, class chính thực thi từ Runnable, tạo class phụ thực thi từ Runnable hoặc kế thừa từ Thread. Ở đây mình cho lớp Client kế thừa từ thread luôn.

Để gửi dữ liệu đi thì bạn sử dụng phương thức write của **OutputStream**.

```java
out.write(message.getBytes());
```

> Thực ra thì bạn có thể sử dụng các lớp có sẳn trong java như **BufferReader** hay **BufferWriter**… để làm việc cho tiện nhưng mình lại thích dùng **InputStream** với **OutputStream** hơn.

Vì input và output của ta đều là String còn 2 thèn **InputStream** và **OutputStream** lại chỉ chơi với bytes nên ta phải convert string sang bytes và ngược lại:

```java
"this is a string".getBytes();// to convert a string to bytes array
new String(buffer, 0, receivedBytes);// to convert bytes array to string
```

Phía client sẽ có 2 thread, một thread chính sẽ có nhiệm vụ đợi người dùng nhập message và gửi đi, thread kia sẽ có nhiệm vụ là đợi nhận message từ server gửi xuống.
Source code của client: 

```java
package com.blogspot.sontx.tut.chatroom;

import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.net.InetAddress;
import java.net.Socket;
import java.net.UnknownHostException;
import java.util.Scanner;

public class Client extends Thread {
    private final Socket socket;
    private final InputStream in;
    private final OutputStream out;

    public Client(String serverAddress, int serverPort) throws UnknownHostException, IOException {
        socket = new Socket(InetAddress.getByName(serverAddress), serverPort);
        in = socket.getInputStream();
        out = socket.getOutputStream();
    }

    private void send(String message) throws IOException {
        out.write(message.getBytes());
    }

    @Override
    public void run() {
        byte[] buffer = new byte[2048];
        try {
            while (true) {
                int receivedBytes = in.read(buffer);
                if (receivedBytes < 1)
                    break;
                String message = new String(buffer, 0, receivedBytes);
                System.out.println(message);
            }
        } catch (IOException e) {
        }
        close();
        System.exit(0);
    }

    private void close() {
        try {
            socket.close();
        } catch (IOException e) {
        }
    }

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        Client client = null;
        String username = scanner.nextLine();
        try {
            client = new Client("localhost", 3393);
            client.send(username);
            client.start();
            while (true) {
                String message = scanner.nextLine();
                client.send(message);
            }
        } catch (IOException e) {
        }
        if (client != null)
            client.close();
        scanner.close();
    }
}
```

Server
-----

Khởi tạo ServerSocket như sau:

```java
serverSocket = new ServerSocket(port);
```

*ServerSocket* khi khởi tạo như thế sẽ tự động bind và lắng nghe trên tất cả các địa chỉ với port được truyền vào.

> Chú ý rằng một máy tính sẽ có rất nhiều địa chỉ IP chứ không phải một thôi đâu nhé. 
Để biết các địa chỉ IP của máy thì bạn có thể sử dụng lệnh ipconfig trên Windows hoặc ifconfig trên Linux.

Bước tiếp theo là đợi các kết nối đến và accept chúng bằng phương thức accept() của ServerSocket, phương thức này sẽ blocks thread hiện tại cho đến khi có một kết nối đến hoặc một lỗi xảy ra.

```java
Socket socket = serverSocket.accept();
```

**Socket** mới được sinh ra từ phương thức `accept()` sẽ được sử dụng để giao tiếp với socket từ client vừa kết nối đến server. Tiếp theo ta xây dựng lớp Worker(mỗi Worker sau khi sinh ra sẽ được thêm vào list để quản lý) để bao bọc socket vừa được sinh ra từ `accept()` này lại như sau:

```java
private class Worker extends Thread {
    private final Socket socket;
    private final InputStream in;
    private final OutputStream out;
    private String username = null;

    public Worker(Socket socket) throws IOException {
        this.socket = socket;
        in = socket.getInputStream();
        out = socket.getOutputStream();
    }

    private void send(String message) throws IOException {
        out.write(message.getBytes());
    }

    @Override
    public void run() {
        byte[] buffer = new byte[2018];
        try {
            while (true) {
                int receivedBytes = in.read(buffer);
                if (receivedBytes < 1)
                    break;
                String message = new String(buffer, 0, receivedBytes);
                if (username == null)
                    username = message;
                else
                    broadcastMessage(this, message);
            }
        } catch (IOException e) {
        }
        removeWorker(this);
    }

    private void close() {
        try {
            socket.close();
        } catch (IOException e) {
        }
    }
}
```

Trông nó khá giống với Client phải không nào. Ở đây có chút khác biệt khi nhận message, mesage đầu tiên mà client gửi lên sẽ được sử dụng làm username, các message sau đó thì sẽ được broadcast ra cho các client khác như sau:

```java
private void broadcastMessage(Worker from, String message) {
    synchronized (this) {
        message = String.format("%s: %s", from.username, message);
        for (int i = 0; i < workers.size(); i++) {
            Worker worker = workers.get(i);
            if (!worker.equals(from)) {
                try {
                    worker.send(message);
                } catch (IOException e) {
                    workers.remove(i--);
                    worker.close();
                }
            }
        }
    }
}
```

Message khi broadcast sẽ được kèm theo tên gửi gửi theo định dạng:

```
username: message
```

Tiếp theo ta sử dụng một vòng lặp để gửi message đã nhận cho toàn bộ các client khác trong danh sách(trừ cái Worker đã nhận message ra). Khi gửi đến một Worker bất kỳ mà bị lỗi thì ta chỉ việc remove cái Worker đó ra khỏi danh sách là được.
Toàn bộ source code của Server.java như sau:

```java
package com.blogspot.sontx.tut.chatroom;

import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.net.ServerSocket;
import java.net.Socket;
import java.util.ArrayList;
import java.util.List;

public class Server {
    private final ServerSocket serverSocket;
    private final List<Worker> workers = new ArrayList<>();

    public Server(int port) throws IOException {
        serverSocket = new ServerSocket(port);
    }

    private void waitForConnection() throws IOException {
        while (true) {
            Socket socket = serverSocket.accept();
            Worker worker = new Worker(socket);
            addWorker(worker);
            worker.start();
        }
    }

    private void addWorker(Worker worker) {
        synchronized (this) {
            workers.add(worker);
        }
    }

    private void removeWorker(Worker worker) {
        synchronized (this) {
            workers.remove(worker);
            worker.close();
        }
    }

    private void broadcastMessage(Worker from, String message) {
        synchronized (this) {
            message = String.format("%s: %s", from.username, message);
            for (int i = 0; i < workers.size(); i++) {
                Worker worker = workers.get(i);
                if (!worker.equals(from)) {
                    try {
                        worker.send(message);
                    } catch (IOException e) {
                        workers.remove(i--);
                        worker.close();
                    }
                }
            }
        }
    }

    private class Worker extends Thread {
        private final Socket socket;
        private final InputStream in;
        private final OutputStream out;
        private String username = null;

        public Worker(Socket socket) throws IOException {
            this.socket = socket;
            in = socket.getInputStream();
            out = socket.getOutputStream();
        }

        private void send(String message) throws IOException {
            out.write(message.getBytes());
        }

        @Override
        public void run() {
            byte[] buffer = new byte[2018];
            try {
                while (true) {
                    int receivedBytes = in.read(buffer);
                    if (receivedBytes < 1)
                        break;
                    String message = new String(buffer, 0, receivedBytes);
                    if (username == null)
                        username = message;
                    else
                        broadcastMessage(this, message);
                }
            } catch (IOException e) {
            }
            removeWorker(this);
        }

        private void close() {
            try {
                socket.close();
            } catch (IOException e) {
            }
        }
    }

    public static void main(String[] args) {
        try {
            Server server = new Server(3393);
            server.waitForConnection();
        } catch (IOException e) {
        }
    }
}
```

> Chú ý rằng trong các phương thức addWorker, removeWorker và broadcastMessage đều sử dụng keyword synchronized để đảm bảo rằng chỉ một trong các việc đó xảy ra trong một thời điểm vì hiện tại ta đang sử dụng đa luồng để làm việc nên không thể được hàm nào được gọi lúc nào đâu.

Chatroom on C#
-------

Cách thiết kế là như nhau, vấn đề ở đây chỉ là ngôn ngữ và lớp hổ trợ thôi và bạn sẽ thấy chúng không khác biệt nhau lắm đâu.

Client
Phần này các bạn chỉ cần chú ý một số điểm sau:
1. Sử dụng lớp TcpClient thay vì dùng Socket: thực ra trong C# có hổ trợ lớp Socket, lớp này hổ trợ nhiều giao thức khác nhau(trong đó có cả UDP) còn bên java thì chỉ mỗi TCP thôi. Vì nó “siêu” như thế nên sẽ khó sử dụng hơn một bên java một tí, giải pháp thay thế ở đây là TcpClient, lớp này wrap lại cái Socket kia thôi nhưng dể sử dụng hơn nhiều với lại nó hổ trợ giao thức TCP theo mặt định luôn nên khỏi phải thiết đặt này nọ. Cách sử dụng của TcpClient khá giống với Socket bên java(đọc code sẽ thấy khá rỏ).
1. Sử dụng lớp Stream cho cả input và output: tụi C# nó không chia ra InputStream và OutputStream như java(cơ mà sau này .Net trên Windows Phone vẩn chia ra làm 2 như thế thì phải) mà sử dụng lớp Stream chung cho cả 2 trường hợp.
1. Để convert từ string sang bytes và ngược lại ta sử dụng lớp Encoding: Encoding.UTF8.GetBytes(“this is a string”) để convert từ string sang bytes. Encoding.UTF8.GetString(buffer, 0, receivedBytes) để convert từ bytes sang string.
1. Thread trong C# thì hơi khác 1 tẹo bên java: như đã biết thì java cho phép ta kế thừa từ lớp Thread để tạo một thread mới nhưng thèn C# nó không cho kế thừa, thay vào đó nó ta sẽ cần truyền vào một “con trỏ hàm” để thực thi. Trong java thì khi thread chạy, nó sẽ bắt đầu thực thi từ hàm run của Runnable, trong C# thì khi thread chạy nó sẽ thực thi hàm đã truyền vào Thread lúc khởi tạo(có 2 loại nguyên mẫu hàm được chấp nhận, loại nào thì google sẽ rỏ).

Cấu trúc code phần này thì gần như “y chan” bên java(thực ra thì mình copy code bên java qua và sửa lại đôi chổ thôi :v)

```cs
using System;
using System.Text;
using System.Net.Sockets;
using System.Threading;
using System.IO;

namespace Chatroom
{
    class Client
    {
        private TcpClient socket;
        private Stream stream;

        public Client(string serverAddress, int serverPort)
        {
            socket = new TcpClient(serverAddress, serverPort);
            stream = socket.GetStream();
        }

        private void Send(string message)
        {
            byte[] buffer = Encoding.UTF8.GetBytes(message);
            stream.Write(buffer, 0, buffer.Length);
        }

        public void Start()
        {
            new Thread(Run).Start();
        }

        private void Run()
        {
            byte[] buffer = new byte[2048];
            try
            {
                while (true)
                {
                    int receivedBytes = stream.Read(buffer, 0, buffer.Length);
                    if (receivedBytes < 1)
                        break;
                    string message = Encoding.UTF8.GetString(buffer, 0, receivedBytes);
                    Console.WriteLine(message);
                }
            }
            catch (IOException) { }
            catch (ObjectDisposedException) { }
            Close();
            Environment.Exit(0);
        }

        private void Close()
        {
            socket.Close();
        }

        static void Main(string[] args)
        {
            Client client = null;
            string username = Console.ReadLine();
            try
            {
                client = new Client("localhost", 3393);
                client.Send(username);
                client.Start();
                while (true)
                {
                    string message = Console.ReadLine();
                    client.Send(message);
                }
            }
            catch (IOException) { }
            catch (ObjectDisposedException) { }
            if (client != null)
                client.Close();
        }
    }
}
```

Server
----

Phần này cũng thế thôi, sêm sêm bên java, một số điểm lưu ý như sau:
1. Sử dụng lớp TcpListener thay thế cho lớp Socket: như đã nói ở phần trên thì C# có hổ trợ lớp Socket để làm việc, lớp Socket này vừa có thể đảm nhiệm vai trò là client vừa có thể là server. Để dể dàng cho việc coding thì chúng ta sử dụng thèn TcpListener, thực ra thèn này cũng chỉ wrap lại cái Socket kia thôi nhưng nó hổ trợ trực tiếp để làm việc với giao thức TCP. Việc khởi tạo thèn này thì y chan bên ServerSocket của java thôi. À, chú ý là phải gọi hàm Start của TcpListener thì nó mới bắt đầu lắng nghe nhé, bên java thì mặt định là nó nghe luôn.
1. Sử dụng AcceptTcpClient của TcpListener: TcpListener thì có thể accept cho ta một Socket hoặc tạo luôn một TcpClient để dể bề làm việc. Như đã nói thì ta sử dụng TcpClient để code thay vì Socket nhé, dể thì tội gì không làm 
1. synchronized bên java thì bên C# sẽ là lock! enough.
1. Java nó sử dụng %s, %d, %f… các thứ để format(như kiểu của C ấy) nhưng thèn C# nó sử dụng {0}, {1}, {2}… nghĩa là nó ếu quan tâm đến kiểu dữ liệu tương ứng, cái nào nhét vô cũng được cả, nó chỉ cần gọi ToString là xong.
1. Property trong C# bằng với getter và setter trong java: mục đích sử dụng thì như nhau thôi, bên C# thì cái property này nó sêm sêm như là một biến nhưng lại có thể quản lý được việc truy suất như là một getter/setter. C# phiên bản mới còn cho phép gán giá trị mặt định cho property nữa , nói chung là bưa đó.
1. Chú ý quan trọng: trong java thì class(non-static class) con nó có quan hệ đến class cha, nghĩa là class con nó sẽ reference đến thèn cha. Bạn xem code của java sẽ thấy thèn Worker sẽ gọi trực tiếp các phương thức non-static của thèn Server mà không cần phải trỏ tới một instance cụ thể nào của Server cả. Trong C# thì các class con đều sêm sêm như static class của java, nghĩa là nó chỉ đơn thuần là một class nằm bên trong một thèn khác mà thôi, chẳng reference gì cả, vì thế nên ta không thể gọi trực tiếp các phương thức của thèn class chứa nó mà không chỉ rỏ ra instance nào được. Một điểm nhỏ nữa là static class trong C# nó không sêm sêm như static class trong java đâu nhé. Trong code Worker bạn sẽ thấy có một biến serverInstance truyền cho mỗi Worker để chỉ ra thực thể hiện tại của Server.

Code em nó đây:

```cs
using System;
using System.Collections.Generic;
using System.IO;
using System.Net;
using System.Net.Sockets;
using System.Text;
using System.Threading;

namespace Chatroom
{
    class Server
    {
        private TcpListener serverSocket;
        private List<Worker> workers = new List<Worker>();

        public Server(int port)
        {
            //serverSocket = new TcpListener(port);// deprecated
            // the same way
            serverSocket = new TcpListener(IPAddress.Any, port);
            serverSocket.Start();
        }

        private void WaitForConnection()
        {
            while (true)
            {
                TcpClient socket = serverSocket.AcceptTcpClient();
                Worker worker = new Worker(socket, this);
                AddWorker(worker);
                worker.Start();
            }
        }

        private void AddWorker(Worker worker)
        {
            lock (this)
            {
                workers.Add(worker);
            }
        }

        private void RemoveWorker(Worker worker)
        {
            lock (this)
            {
                workers.Remove(worker);
                worker.Close();
            }
        }

        private void BroadcastMessage(Worker from, String message)
        {
            lock (this)
            {
                message = string.Format("{0}: {1}", from.Username, message);
                for (int i = 0; i < workers.Count; i++)
                {
                    Worker worker = workers[i];
                    if (!worker.Equals(from))
                    {
                        try
                        {
                            worker.Send(message);
                        }
                        catch (Exception)
                        {
                            workers.RemoveAt(i--);
                            worker.Close();
                        }
                    }
                }
            }
        }

        class Worker
        {
            private readonly TcpClient socket;
            private readonly Stream stream;
            public string Username { get; private set; } = null;
            private readonly Server serverInstance;

            public Worker(TcpClient socket, Server serverInstance)
            {
                this.socket = socket;
                this.stream = socket.GetStream();
                this.serverInstance = serverInstance;
            }

            public void Send(string message)
            {
                byte[] buffer = Encoding.UTF8.GetBytes(message);
                stream.Write(buffer, 0, buffer.Length);
            }

            public void Start()
            {
                new Thread(Run).Start();
            }

            private void Run()
            {
                byte[] buffer = new byte[2018];
                try
                {
                    while (true)
                    {
                        int receivedBytes = stream.Read(buffer, 0, buffer.Length);
                        if (receivedBytes < 1)
                            break;
                        string message = Encoding.UTF8.GetString(buffer, 0, receivedBytes);
                        if (Username == null)
                            Username = message;
                        else
                            serverInstance.BroadcastMessage(this, message);
                    }
                }
                catch (IOException) { }
                catch (ObjectDisposedException) { }
                serverInstance.RemoveWorker(this);
            }

            public void Close()
            {
                socket.Close();
            }
        }

        static void Main(string[] args)
        {
            try
            {
                Server server = new Server(3393);
                server.WaitForConnection();
            }
            catch (IOException) { }
        }
    }
}
```

Có một giải pháp khác cho chú ý thứ 6 bên trên đó là sử dụng sự kiện, mình sẽ nói cụ thể hơn về phần này trong một bài viết khác(nếu có hứng):

```cs
using System;
using System.Collections.Generic;
using System.IO;
using System.Net;
using System.Net.Sockets;
using System.Text;
using System.Threading;

namespace Chatroom
{

    delegate void MessageEventHandler(object sender, MessageEventArgs e);

    class MessageEventArgs : EventArgs
    {
        public string Message { get; private set; }

        public MessageEventArgs(string message)
        {
            this.Message = message;
        }
    }

    class Server
    {
        private TcpListener serverSocket;
        private List<Worker> workers = new List<Worker>();

        public Server(int port)
        {
            //serverSocket = new TcpListener(port);// deprecated
            // the same way
            serverSocket = new TcpListener(IPAddress.Any, port);
            serverSocket.Start();
        }

        private void WaitForConnection()
        {
            while (true)
            {
                TcpClient socket = serverSocket.AcceptTcpClient();
                Worker worker = new Worker(socket);
                AddWorker(worker);
                worker.Start();
            }
        }

        private void Worker_MessageReceived(object sender, MessageEventArgs e)
        {
            BroadcastMessage(sender as Worker, e.Message);
        }

        private void Worker_Disconnected(object sender, EventArgs e)
        {
            RemoveWorker(sender as Worker);
        }

        private void AddWorker(Worker worker)
        {
            lock (this)
            {
                workers.Add(worker);
                worker.Disconnected += Worker_Disconnected;
                worker.MessageReceived += Worker_MessageReceived;
            }
        }

        private void RemoveWorker(Worker worker)
        {
            lock (this)
            {
                worker.Disconnected -= Worker_Disconnected;
                worker.MessageReceived -= Worker_MessageReceived;
                workers.Remove(worker);
                worker.Close();
            }
        }

        private void BroadcastMessage(Worker from, String message)
        {
            lock (this)
            {
                message = string.Format("{0}: {1}", from.Username, message);
                for (int i = 0; i < workers.Count; i++)
                {
                    Worker worker = workers[i];
                    if (!worker.Equals(from))
                    {
                        try
                        {
                            worker.Send(message);
                        }
                        catch (Exception)
                        {
                            workers.RemoveAt(i--);
                            worker.Close();
                        }
                    }
                }
            }
        }

        class Worker
        {
            public event MessageEventHandler MessageReceived;
            public event EventHandler Disconnected;
            private readonly TcpClient socket;
            private readonly Stream stream;
            public string Username { get; private set; } = null;

            public Worker(TcpClient socket)
            {
                this.socket = socket;
                this.stream = socket.GetStream();
            }

            public void Send(string message)
            {
                byte[] buffer = Encoding.UTF8.GetBytes(message);
                stream.Write(buffer, 0, buffer.Length);
            }

            public void Start()
            {
                new Thread(Run).Start();
            }

            private void Run()
            {
                byte[] buffer = new byte[2018];
                try
                {
                    while (true)
                    {
                        int receivedBytes = stream.Read(buffer, 0, buffer.Length);
                        if (receivedBytes < 1)
                            break;
                        string message = Encoding.UTF8.GetString(buffer, 0, receivedBytes);
                        if (Username == null)
                            Username = message;
                        else
                            MessageReceived?.Invoke(this, new MessageEventArgs(message));
                    }
                }
                catch (IOException) { }
                catch (ObjectDisposedException) { }
                Disconnected?.Invoke(this, EventArgs.Empty);
            }

            public void Close()
            {
                socket.Close();
            }
        }

        static void Main(string[] args)
        {
            try
            {
                Server server = new Server(3393);
                server.WaitForConnection();
            }
            catch (IOException) { }
        }
    }
}
```

Kết quả demo
-------

Kết quả demo sẽ tương tự cho cả 2 ngôn ngữ là java và C# giống thế này đây(2 cửa sổ bên trên là 2 client, cái bên dưới là server đó):

![](https://1.bp.blogspot.com/-BEqadt57Rvc/V1Z_dc4iy5I/AAAAAAAAOxU/9JBn48fwgnw6WgO4sAh2PJtUkr_1alLuQCKgB/s0/Untitled.png)

> Một phiên bản cao cấp hơn của chatroom là project [chat-socket](https://github.com/sontx/chat-socket) với UI được hoàn thiện cùng nhiều chức năng thú vị khác được viết dựa trên java.
