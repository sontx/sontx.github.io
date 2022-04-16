---
title: Tổng quan về sử dụng mô hình MVC để xây dựng web động
layout: post
description: >
  Mô hình MVC là một mô hình thiết kế giúp chúng ta tách ứng dụng thành các thành phần khác nhau, các thành phần có nhiệm vụ riêng biệt và độc lập với nhau. Nhờ việc hoạt động đập lập và tách biệt nhau mà việc nâng cấp và sửa lỗi ứng dụng trở nên đơn giản hơn bao giờ hết.
tag: [programming]
comments: true
category: programming
---

MVC chia ứng dụng làm 3 thành phần là Model, View và Controller, cụ thể như sau:

* Model: là phần ứng dụng giao tiếp với dữ liệu và xử lý logic(những lớp xử lý java).
* View: là phần giao diện người dùng, làm nhiệm vụ hiển thị và nhận yêu cầu từ người dùng(html, css, jsp...).
* Controller: đây là phần kết nối giữa Model và View, nhiệm vụ chính của nó là điều hướng(servlet).

Tiếp theo chúng ta sẽ tìm hiểu kỉ hơn về 3 thành phần này và ứng dụng trực tiếp vào thiết kế 1 trang web đơn giản đó là 1 trang login, nếu login thành công thì hiển thị trang welcome.

Model
------

Đây là phần truy vấn csdl và kiểm tra logic bao gồm 3 thành phần là BO(business object), DAO(data access object) và java bean. Chức năng của các thành phần như sau:

1. BO: đây là phần xử lý logic của chương trình, là trung gian giữa Controller và DAO, các lớp khác muốn giao tiếp với csdl phải thông qua trung giang BO. Nó chỉ biết sự tồn tại của DAO và java bean.
1. DAO: đây là phần làm việc trực tiếp với csdl, chúc năng của nó là truy vấn csdl, chú ý rằng việc giao tiếp csdl chỉ duy nhất xuất hiện ở lớp DAO, các lớp khác muốn làm việc với csdl  phải thông qua nó. Nó chỉ biết sự tồn tại của java bean.
1. Java bean: đây là những class java thường được xây dựng mô phỏng lại 1 cấu trúc bản dữ liệu trong csdl gồm các cấu trúc getter và setter. Nó được ví như mạch máu vì nó xuất hiện ở tất cả 3 thành phần là Model, Controller và cả View, nó giúp 3 thành phần của MVC giao tiếp được với nhau. Java bean không cần biết sự tồn tại của bất kỳ lớp nào khác, nó chỉ đơn thuần là 1 class thuần java.

Đây là mô hình hoạt động của DAO, BO và java bean:

![](https://3.bp.blogspot.com/-294_QmkaaoY/VapkZ3WZ4DI/AAAAAAAAMxw/hDV3uCMODD8/s1600/Untitled.png)

View
---

Phần này quy định về giao diện và tương tác với người dùng thông qua các mã html và javascript. Ở đây ta sử dụng jsp để thay thế cho thuần html để tạo ra 1 trang web động. Các views sẽ được Controller điều hướng đến và chúng chỉ biết đến sự tồn tại của java bean

Dưới đây mình sẽ khái quát về html, javascipt, jsp và servlet.

Html
---

Html, viết tắt cho HyperText Markup Language, hay là "Ngôn ngữ Đánh dấu Siêu văn bản"[1]. Sử dụng để thiết kế giao diện trang web như các nút bấm, textbox, label...và nhận các yêu cầu của người dùng để gửi lên server, html chứa các nội dung tỉnh không thể thay đổi. Html và javascript là thành phần duy nhất nằm ở phía client(nôm na là trình duyệt của người dùng). Đây là 1 ví dụ về html:

```html
<!DOCTYPE html>
<html>
<head>
    <title>Page Title</title>
</head>
<body>
    <h1>This is a Heading</h1>
    <p>This is a paragraph.</p>
</body>
</html>
```

Javascipt
-----

Là 1 loại ngôn ngữ kịch bản dựa trên C, được nhúng trong trang web nhằm giúp xử lý sự kiện từ phía client, xử lý 1 phần thông tin hoặc kiểm tra thông tin trước khi gửi lên server. Javascipt thường được nhúng trong mã html và thường ở phần head. Hiện tại hầu như tất cả các trình duyệt đều hổ trợ javascipt vì thế nên chúng ta không cần phải cài thêm bất cứ gì để có thể sử dụng nó. Đây là 1 ví dụ về javascipt:

```js
function factorial(n) {
    if (n == 0) {
        return 1;
    }
    return n * factorial(n - 1);
} 
```

Jsp
----

Có thể nói jsp là html nhúng code java, jsp chỉ xuất hiện ở server. Code java trong jsp giúp sinh ra mã html và chèn tiếp vào trang html đó, nhờ đó ta có thể thay đổi nội dung trang html lúc thực thi. Jsp được sử dụng chủ yếu để thiết kế giao diện web động, đây chính là View trong mô hình MVC. Trước khi hiển thị ra trình duyệt, tập tin JSP phải được biên dịch thành Servlet, dùng bộ biên dịch JSP (JSP compiler)[2]. Dưới đây là 1 ví dụ về jsp:

```html
<%@page import="quanly.model.bo.SomethingBO"%>
<%@page import="quanly.model.bean.Account"%>
<%@ page language="java" contentType="text/html; charset=ISO-8859-1" pageEncoding="ISO-8859-1"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
    <link rel="stylesheet" type="text/css" href="Default.css" media="all" />
</head>
<body class = "center">
<%
    Account account = (Account) session.getAttribute("account");
    if (account == null)
        return;
%>
    <label style = "font-weight: bold;">Your profile</label>
    <br>
    <label>User name:</label><%=account.getUserName()%> 
    <br>
    <label>Full name:</label><%=account.getFullName()%> 
    <br>
    <label>Age:</label><%=account.getAge()%> 
    <br>
    <label>Gender:</label><%=account.isFemale() ? "female" : "male"%>
</body>
</html> 
```

Servlet
----

Có thể hiểu đơn giản nó là các mã java và có thể được nhúng mã html vào(ngược lại với jsp), cho phép chúng ta tạo ra trang html bằng code java. Đây cũng là 1 cách để thiết kế giao diện nhưng ít khi được sử dụng vì khá phức tạp. Servlet được sử dụng chủ yếu để điều hướng, đây chính là Controller. Dưới đây là 1 ví dụ về servlet: 

```java
@WebServlet("/LoginShowServlet")
public class LoginShowServlet extends HttpServlet {
    private static final long serialVersionUID = 1L;
       
    public LoginShowServlet() {
        super();
    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        doPost(request, response);
    }

    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        SomethingBO.redirect("LoginJSP.jsp", response);
    }
}
```

Dưới đây là những công cụ mà chúng ta sẽ sử dụng đến trong bài viết này:
* Đầu tiên là eclipse, IDE dùng để code chính của chúng ta, các bạn tải bản 32bit ở đây hoặc 64bit ở đây cho Windows.
* Java rumtime, cần thiết để chạy được eclipse, các bạn tải ở đây.
* Tiếp theo là tomcat 7, để tạo server local trên máy, các bạn tải bản 32bit ở đây hoặc bản 64bit ở đây cho Windows.
* CPorts, công cụ kiểm tra xung đột port khi chạy web, các bạn tải ở đây.
* ucanaccess, bộ thư viện giúp giao tiếp csdl thông qua jdbc, các bạn tải ở đây.
* Access, công tạo và quản lý csdl đơn giản có trong bộ office, chúng ta sẽ sử dụng nó để tạo 1 csdl đơn giản và dùng nó để lưu trữ thông tin đăng nhập của người dùng.

Tiếp theo mình sẽ hướng dẩn cách tạo project web động sử dụng tomcat 7 trong eclipse. Đầu tiên giải nén file eclipse và tomcat. Tiếp theo các bạn mở eclipse trong thực mục đã giải nén(lúc mới mở eclipse thì nó sẽ hỏi nơi lưu workspace, các bạn cứ để mặt định rồi nhấn ok), chọn File -> New -> Other.. (hoặc ctrl + N), tiếp theo các bạn chọn Dynamic Web Project như trong hình:

![](https://3.bp.blogspot.com/-94X-q165FSM/VapbLANGSKI/AAAAAAAAMxE/BE4PL0efSsw/s1600/Capture.PNG)

Chọn next, ở cửa sổ New Dynamic Web Project các bạn nhập tên project vào Project name(ví dụ HelloWorld), ở mục Target runtime các bạn chọn New Runtime... và chọn Apache Tomcat v7.0 như trong hình:

![](https://4.bp.blogspot.com/-Iyke1cv8sQE/VapcBma19kI/AAAAAAAAMxM/18P3854-IRY/s1600/Capture.PNG)

Chọn next, ở mục Name là tên của server tomcat chúng ta sẽ tạo, ở mục Tomcat installation directory chọn Browse... và duyệt đến thư mục tomcat giải nén lúc nảy sau đó nhấn ok, ta được như trong hình:

![](https://4.bp.blogspot.com/-B0g7nvi568Y/VapdAeJ1ryI/AAAAAAAAMxU/f1SMvu2MzHo/s1600/Capture.PNG)

Chọn finish, ở cửa sổ New Dynamic Web Project chọn tên server vừa được tạo trong bước bên trên ở mục Target runtime. Tiếp theo các bạn chọn next, rồi chọn next thêm 1 lần nữa, ở mục Generate web.xml deployment desciptor các bạn tick vào và nhấn finish để hoàn tất.
Chú ý ở cửa sổ Project Explorer, project của ta vừa tạo sẽ xuất hiện ở đó. Cấu trúc project của chúng ta như hình:

![](https://4.bp.blogspot.com/-74UP20n4ArY/VapeXDnhw3I/AAAAAAAAMxg/chIkmZyA9fg/s1600/Capture.PNG)

Ở đây ta chỉ cần quan tâm đến mục src(nơi chứa code java của chúng ta, gồm Controller và Model), mục WebContent chứa code jsp(View) và lib(nơi chứa các thư viện dùng thêm của chúng ta). Chú ý rằng các code jsp không được để bên trong 2 folder là META-INF và WEB-INF vì đây là 2 folder cấu hình web, ta không nên động vào.
Giờ chúng ta sẽ tạo 1 jsp đăng nhập có tên là login.jsp bằng cách Ctrl + N và chọn JSP File, một cửa sổ hiện ra và bạn điền vào tên của jsp là login.jsp, sau khi tạo thành công ta được như sau:

![](https://2.bp.blogspot.com/-ZqI6Byh__bU/Va0HErcWtPI/AAAAAAAAMz8/BZa5ui-dFX4/s1600/Capture.PNG)

Chú ý, nếu bạn muốn hiển thị tiếng việt thì phải đổi charset và pageEncoding tới UTF-8, như trong hình thì ta sẽ phải đổi toàn bộ giá trị ISO-8859-1 sang UTF-8. Ở tag <title> ta đặt lại tiêu đề trang web thành "Login Page". Ta tạo 1 form đăng nhập và khi người dùng submit thì kiểm tra tài khoản và mật khẩu có hợp lệ không bàng javascript, nếu hợp lệ thì sẽ được gửi đến cho server còn nếu không hợp lệ ta sẽ hiện box thông báo lỗi. Code lại trang login.jsp như sau: 

```html
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Login Page</title>
<script type="text/javascript">
    function checkLogin() {
        String username = document.getElementById("username").value;
        String password = document.getElementById("password").value;
        if (username == null || username == "") {
            alert("You must enter your user name!");
            return false;
        }
        if (password == null || password == "") {
            alert("You must enter your password!");
            return false;
        }
        return true;
    }
</script>
</head>
<body>
    <h1 style="text-align: center; font-weight: bold;">Loggin to system</h1>
    <center>
        <form method="POST" action="ProcessLoginServlet" onsubmit="return checkLogin()">
            <label>Username:</label> <input type="text" name="username" id="username" /> 
            <br> 
            <label>Password:</label> <input type="password" name="password" id="password" /> 
            <br> 
            <input type="submit" value="login" />
        </form>
    </center>
</body>
</html>
```

Thế là đã cơ bản hoàn tất trang login.jsp, tiếp theo ta sẽ xây dựng tiếp trang welcome.jsp. Trang này sẽ hiển thị nội dung chào mừng account đã đăng nhập. Chú ý rằng đây chỉ là 1 trang html bình thường, điểm đặt biệt là ta có thể chèn code java vào đây để tạo ra các tag mới nhờ đó mà nội dung trang html có thể thay đổi lúc runtime. Để chèn code java vào nội dung trang jsp ta dùng thẻ <% // nội dung code java ở đây %>, để xuất giá trị từ java sang html ta dùng thẻ <%= // giá trị cần xuất ra ở đây %>. Trong nội dung trang welcome.jsp ta sẽ sử dụng java bean là Account class, để tạo welcome.jsp các bạn tạo file jsp như với login.jsp và code lại như sau: 

```html
<%@page import="com.blogspot.sontx.web.helloworld.model.bean.Account"%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<%
    Account account = (Account)request.getAttribute("account");
%>
<title>Welcome - <%= account.getUserName() %></title>
</head>
<body>
    User name:<%= account.getUserName() %> <br/>
    Full name:<%= account.getFullName() %> <br/>
    Age:<%= account.getAge() %> <br/>
    Address:<%= account.getAddress() %>
</body>
</html>
```

Ở đây ta lấy thông tin account được lưu từ HttpServletRequest, sau đó sử dụng các thẻ <%= ...%> để trích xuất từ dữ liệu từ code java sang text của html và gửi về cho người dùng.

Ok! thế là phần View của chúng ta đã hoàn tất, giờ ta sẽ xây dựng Model.
Đầu tiên ta tạo 1 java bean là Account trong package là com.blogspot.sontx.web.helloworld.model.bean như sau: 

```java
package com.blogspot.sontx.web.helloworld.bean;

public class Account {
    private String userName;
    private String fullName;
    private int age;
    private String address;
 
    public String getUserName() {
        return userName;
    }
    public void setUserName(String userName) {
        this.userName = userName;
    }
    public String getFullName() {
        return fullName;
    }
    public void setFullName(String fullName) {
        this.fullName = fullName;
    }
    public int getAge() {
        return age;
    }
    public void setAge(int age) {
        this.age = age;
    }
    public String getAddress() {
        return address;
    }
    public void setAddress(String address) {
        this.address = address;
    }
}
```

Như đã thấy thì java bean chỉ là 1 class java gồm các getters và setters để bao gói dữ liệu và truyền đi khắp mọi nơi trong trang web của chúng ta(nó sẽ xuất hiện ở View, Model và cả Controller).
Thành phần tiếp theo của Model là DAO, chúng ta sẽ tạo 1 class tên ProcessLoginDAO trong package com.blogspot.sontx.web.helloworld.model.dao như sau: 

```java
package com.blogspot.sontx.web.helloworld.model.dao;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

import com.blogspot.sontx.web.helloworld.model.bean.Account;

import net.ucanaccess.jdbc.UcanaccessDriver;

public class ProcessLoginDAO {
    // đường dẩn đến file csdl của bạn
    private String url = UcanaccessDriver.URL_PREFIX + "D:/admin.accdb";
    private String driver = "net.ucanaccess.jdbc.UcanaccessDriver";
    private Connection cnn = null;
    private Statement stm = null;
    
    public boolean checkLogin(String username, String password){
        try {
            ResultSet rs = stm.executeQuery("SELECT username, password FROM admin");
            while(rs.next()){
                if(username.equals(rs.getString("username")) &amp;&amp; password.equals(rs.getString("password"))){
                    rs.close();
                    return true;
                }
            }
            rs.close();
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return false;
    }
    
    public ProcessLoginDAO(){
        try {
            Class.forName(driver);
            // 2 đối số cuối cùng ta truyền chuổi rổng vì csdl của ta
            // không có user và password
            cnn = DriverManager.getConnection(url, "", "");
            stm = cnn.createStatement();
        } catch (ClassNotFoundException | SQLException e) {
            e.printStackTrace();
        }
    }

    public Account getAccount(String username) {
        Account account = null;
        try {
            ResultSet rs = stm.executeQuery("SELECT * FROM info WHERE username = '" + username + "'");
            if(rs.next()){
                account = new Account();
                account.setUserName(rs.getString("username"));
                account.setFullName(rs.getString("fullname"));
                account.setAge(rs.getInt("age"));
                account.setAddress(rs.getString("address"));
            }
            rs.close();
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return account;
    }
}
```

Với class DAO thì nhiệm vụ của nó là giao tiếp trực tiếp với csdl, các thành phần liên quan đến csdl như Connection, Statement, ResultSet...chỉ được xuất hiện ở đây. Đó chính là lí do vì sao ta phải cần đến java bean để chuyển dữ liệu có cấu trúc phức tạp(như nội dung 1 table) đến Controller và từ Controller đến View.
Chú ý rằng đến bước này sẽ gặp lỗi vì eclipse chưa biết UcanaccessDriver là gì vì thế ta phải thực hiện add thư viện ucanaccess vào eclipse như sau:
Đầu tiên giải nén file ucanaccess vừa tải về và ta được 5 files như hình:

![](https://3.bp.blogspot.com/-9QxU6LN-C_E/Va0VlLGIElI/AAAAAAAAM0M/8aLBlZrNPw8/s1600/Capture.PNG)

Tiếp theo ta chọn 5 files và kéo thả vào folder lib trong thư mục WebContent/Web-INF/lib như sau:

![](https://2.bp.blogspot.com/-Wa8Yp0lJHxU/Va0WcGoEjZI/AAAAAAAAM0U/3fOJE8Kv5rE/s1600/Capture.PNG)

Ta xây dựng tiếp class BO là ProcessLoginBO trong package com.blogspot.sontx.web.helloworld.model.bo như sau: 

```java
package com.blogspot.sontx.web.helloworld.model.bo;

import com.blogspot.sontx.web.helloworld.model.bean.Account;
import com.blogspot.sontx.web.helloworld.model.dao.ProcessLoginDAO;

public class ProcessLoginBO {
    private ProcessLoginDAO processLoginDAO;
    
    public boolean checkLogin(String username, String password){
        if(username == null || username.length() &lt; 3)
            return false;
        if(password == null || password.length() &lt; 6)
            return false;
        boolean ret = processLoginDAO.checkLogin(username, password);
            return ret;
    }
    
    public Account getAccount(String username){
        if(username == null || username.length() &lt; 3)
            return null;
        Account account = processLoginDAO.getAccount(username);
        return account;
    }
    
    public ProcessLoginBO(){
        processLoginDAO = new ProcessLoginDAO();
    }
}
```

Nhiệm vụ của class này là xử lý logic trước khi truyền đến cho DAO như độ dài password phải lớn hơn hoặc bằng 6, username phải lớn hơn hoặc bằng 3...
Ok! đã xong phần Model giờ ta tiếp tục bắt tay vào xây dựng phần Controller, trung tâm kết nối của View và Model.
Ta tạo 1 Controller servlet có tên là ProcessLoginServlet như sau: Ctrl + N và chọn Servlet sau đó điền tên cho Servlet này là ProcessLoginServlet trong package com.blogspot.sontx.web.helloworld.controller, khi mới tạo thì eclipse sẽ sinh code mặt định cho chúng ta như sau: 

```java
package com.blogspot.sontx.web.helloworld.controller;

import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * Servlet implementation class ProcessLoginServlet
 */
@WebServlet("/ProcessLoginServlet")
public class ProcessLoginServlet extends HttpServlet {
 private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public ProcessLoginServlet() {
        super();
        // TODO Auto-generated constructor stub
    }

    /**
     * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
     */
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        // TODO Auto-generated method stub
    }
    
    /**
     * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
     */
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        // TODO Auto-generated method stub
    }
}
```

Chúng ta code lại như sau: 

```java
package com.blogspot.sontx.web.helloworld.controller;

import com.blogspot.sontx.web.helloworld.model.bean.Account;
import com.blogspot.sontx.web.helloworld.model.bo.ProcessLoginBO;

import java.io.IOException;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * Servlet implementation class ProcessLoginServlet
 */
@WebServlet("/ProcessLoginServlet")
public class ProcessLoginServlet extends HttpServlet {
 private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public ProcessLoginServlet() {
        super();
        // TODO Auto-generated constructor stub
    }

    /**
     * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
     */
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        doPost(request, response);
    }
    
    /**
     * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
     */
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setCharacterEncoding("UTF-8");
        
        String username = request.getParameter("username");
        String password = request.getParameter("password");
        
        ProcessLoginBO loginProcessBO = new ProcessLoginBO();
        if(loginProcessBO.checkLogin(username, password)){
            Account account = loginProcessBO.getAccount(username);
            request.setAttribute("account", account);
            RequestDispatcher dispatcher = request.getRequestDispatcher("welcome.jsp");
            dispatcher.forward(request, response);
        }else{
            response.sendRedirect("login.jsp");
        }
    }
}
```

Ở đây ta gọi doPost ngay trong hàm doGet để thực hiện check login như nhau cho cả 2 cách thức POST  và GET của form khi submit. Khi nhận submit từ login.jsp thì thông tin request sẽ được gửi tới ProcessLoginServlet(tên được gán cho thuộc tính action của form trong login.jsp), tiếp đó phương thức doPost được gọi. Ở phương thức doPost ta tiến hành lấy giá trị username và password mà người dùng đã nhập vào(các giá trị này chính là giá trị của các input trong form) bằng phương thức getParameter như trong code. Sau khi có được username và password thì ta tiến hành kiểm tra trong csdl xem có đúng không thông qua Model, chú ý là Controller sẽ không gọi trực tiếp DAO mà sẽ phải thông qua BO(vì dữ liệu cần phải được kiểm tra hợp lệ trước khi query đến csdl). Nếu login thành công thì ta tiếp tục lấy thông tin chi tiết của người dùng thông và lưu vào java bean Account, tiếp theo đó ta truyền java bean này cho View để hiển thị bằng phương thức setAttirbute. Cuối cùng Controller sẽ điều hướng đến trang welcome.jsp. Nếu login không thành công thì Controller sẽ chuyển về lại trang login.jsp cho người dùng nhập lại username và password. Ở Controller sẽ có 2 phương thức để chuyển hướng đó là sendRedirect và forward, điểm khác nhau của 2 cách chuyển hướng này là ở chổ sendRedirect sẽ chỉ chuyển hướng đến 1 trang khác bất kỳ(có thể là google.com, sontx.blogspot.com....) còn forward chỉ điều hướng đến 1 trang web của chúng ta ví dụ như forward đến logoin.jsp hoặc welcome.jsp...nhưng chú ý rằng forward sẽ chuyển hướng và có kèm theo các dữ liệu ta đã đẩy vào request HttpServletRequest như ví dụ ở trên là thông tin account của người dùng. Ở ví dụ trên ta sử dụng forward khi chuyển đến welcome.jsp vì ta cần thông tin account để hiển thị và sendRedirect về lại login.jsp khi đăng nhập sai vì đơn giản là chỉ yêu cầu login cho đến khi đúng mới thôi.

Chúng ta tạo thêm 1 servlet nữa có thên là ShowLoginServlet với chức năng đơn giản là chuyển hướng sang login.jsp như sau:

```java
package com.blogspot.sontx.web.helloworld.controller;

import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * Servlet implementation class ShowLoginServlet
 */
@WebServlet("/ShowLoginServlet")
public class ShowLoginServlet extends HttpServlet {
    private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public ShowLoginServlet() {
        super();
        // TODO Auto-generated constructor stub
    }

    /**
     * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
     */
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        doPost(request, response);
    }

    /**
     * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
     */
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.sendRedirect("login.jsp");
    }
}
```

Và thêm dòng <welcome-file>ShowLoginServlet</welcome-file> vào file web.xml như trong hình:

![](https://1.bp.blogspot.com/-ApzlIYi5w58/VbMKKtsZ55I/AAAAAAAAM3Q/aRG_jAjzzC8/s1600/Capture2.PNG)

Đầu tiên ta sử dụng ShowLoginServlet để làm entry cho web của ta, vì mọi điều hướng đều thuộc quyền của Controller nghĩa là muốn hiển thị 1 jsp bất kỳ thì đều phải thông qua sự điều hướng của Controller vì thế ở đây ta không hiển thị trực tiếp login.jsp mà sẽ thông qua ShowLoginSerlvet và nhớ nó để chuyển sang login.jsp. Đến đây chắc hẳn các bạn sẽ đặt ra câu hỏi rằng tại sao không hiển thị trực tiếp login.jsp ngay mà phải thông qua Controller? nếu ta hiển thị trực tiếp thì trang web của ta vẩn chạy bình thường nhưng có trường hợp thế này: trang web của bạn cần kiểm tra xem người dùng trên máy tính đó đã lưu đăng nhập chưa(giống chức năng lưu đang nhập của facebook), nếu đã lưu đăng nhập rồi thì chỉ cần chuyển đến welcome.jsp thay vì bắt người dùng đăng nhập lại ở login.jsp. Như thế nếu ta hiển thị ngay 1 trang jsp(ví dụ như login.jsp) thay vì thông qua Controller thì sẽ không kiểm tra được người dùng trên máy tính đó đã lưu đăng nhập chưa(vì View chỉ có chức năng hiển thị) vì thế ta cần Controller để kiểm tra trước trước khi quyết định chuyển đến 1 trang jsp cụ thể.

Điểm thứ 2 là tại file web.xml, ở file này chứa các mô tả về các file trong web của ta sẽ được chạy đầu tiên nếu ta chỉ nhập đường dẩn đến trang web mà không chỉ rỏ đường dẩn file, ví dụ như ta chỉ rỏ đến trang login.jsp như thế này http://localhost:8080/HelloWorld/login.jsp thì nó sẽ hiển thị trang login.jsp nhưng nếu ta chỉ nhập đường dẩn như thế này http://localhost:8080/HelloWorld thì nó sẽ không biết phải thực thi file nào vì thế nó phải tìm trong file web.xml xem có trong có file nào trong list này tồn tại không, nếu có thì nó sẽ thực thi file đó, đây như là các trang mặt định sẽ được thực thi khi ta trỏ đến http://localhost:8080/HelloWorld. Ta thêm vào ShowLoginServlet trong web.xml để chỉ rỏ nếu chỉ nhập vào http://localhost:8080/HelloWorld thì sẽ thực thi ShowLoginServlet.

Và cuối cùng đây là thành quả của chúng ta, 1 trang web khá đơn giản nhưng ẩn chứa những thứ khá phức tạp:

Trang login được hiển thị khi nhập vào http://localhost:8080/HelloWorld
![](https://4.bp.blogspot.com/-M0Jq9yWBFfU/VbMOGQlRgeI/AAAAAAAAM3c/hF-pchEDl9Y/s1600/Capture.PNG)

Trang welcome được hiển thị khi login thành công
![](https://3.bp.blogspot.com/-6pZ08ao1LeU/VbMOQexrP7I/AAAAAAAAM3k/uoSo3di1viA/s1600/Capture1.PNG)

Đây là source của dự án, các bạn có thể tải ở [đây](http://1drv.ms/1GME4tS).
Ở trong dự án có chứa file csdl là admin.accdb, các bạn phải chỉ rỏ đường dẩn nó trong ProcessLoginDAO như hình để DAO có thể đọc được csdl:

![](https://3.bp.blogspot.com/-CINRvLLz0X4/VbMPpXzjGXI/AAAAAAAAM3w/iigW5xPQCZg/s1600/Capture.PNG)

References
------

1. https://vi.wikipedia.org/wiki/HTML
1. https://vi.wikipedia.org/wiki/JSP
