---
title: Gửi thư phong cách developer ¯\_(ツ)_/¯
layout: post
description: Notepad tự động mở, tiếng gỏ phát ra từ bàn phím dẫu cho cô ấy không
  hề động tới nó. Trong màng đêm tĩnh mịch chỉ có tiếng lạch cạch và từng dòng chữ
  cứ thế xuất hiện trên màng hình laptop.
comments: true
category: programming
tags:
- c++
---

Chiều rảnh rổi ngồi code vu vơ vài dòng thế là ra được cái chương trình tán gái phong cách developer 😊
Chương trình này sẽ tự động mở notepad và tự động “viết vu vơ” vài dòng tâm trạng gửi tới người thương,
Để tăng phần ảo diệu thì chương trình còn giả lập tiếng gỏ phím tạch tạch tạch nữa 😊

Kịch bản sẽ như sau
------

Crush nhận được tin nhắn, nội dung tin nhắn là 1 file chương trình với dòng tin nhắn với tiêu đề “Thư tỏ tình”, 
tò mò tải thử, miệng lẫm bẩm “bố thèn hâm, chắc lại là mấy cái chương trình tán gái mà nó hay gửi mình chứ gì, 
để xem lần này có gì hay ho không :|, bà mà dính phải virus thì bà cắttttttttt”. Sau khi tải về, 
crush click vào file thực thi, một cửa sổ màu đen hiện lên(like a hacker) rồi sau đó vụt tắt, 
ít giây sau cửa sổ notepad tự động mở ra(crush hoản hồn nghỉ “đm, bố dính virus rồi hay sao ấy”). 
Chưa kịp bình tâm thì trên nên trắng của notepad tự động xuất hiện chữ cùng âm thanh gỏ phím như có người đang viết lên nó vậy. 
Crush xanh mày tái mặt, tưởng như máy tính bị ma nhập. Hít 1 hơi thật sâu, đối diện với “con ma” trên màng hình, 
từng dòng chữ vẫn được “ai đó” gõ lên cùng tiếng lạch cạch từ bàn phím vô hình nào đó. Crush trợn mắt, 
đọc kỹ từng dòng mà “ai đó” đang gỏ thì hóa ra là thư tỏ tình đầy chất sến sẩm của hắn. Sau khi “ai đó” gõ hết nội 
dung bức thư tình mùi mẫm ấy vào notepad thì đột nhiên âm thanh biến mất, trước mặt crush giờ chỉ còn cửa sổ trắng 
toét vô hồn cùng những dòng thư sến sẩm đầy lỗi chính tả của hắn ta.

Đầu kia, hắn ta đang ngồi rung đùi “hi vọng nó chạy ngon không bị crash nữa chừng, 
mà không biết có bị dĩnh lỗi chính ta nào không ta :|”, 10 phút, 15 phút rồi 20 phút hắn không thấy hồi âm, 
hắn thầm nghỉ “có khi nào em nó ngủ quên ta”, 2 giờ sáng, 3, rồi 4 giờ sáng gà gáy, vẫng không một tin nhắn hồi âm. 
Cặp mắt kiểu “phê thuốc” của hắn ta đã không còn mở ra được nữa, hắn nằm dài trên bàn làm việc, nước miến chảy ước cả tay áo...
hắn ngủ gục trên bàn lúc nào không hay. 8 giờ sáng, điện thoại kêu, hắn giật mình tỉnh dậy, tưởng crush vừa rep tin nhắn. 
Oh sh*t, chỉ là báo thức thôi, haizz... lại phải đi làm rồi, hắn lại lê cái thân tàn ma dại lên công ty. 
Tối về, hắng lấy hết cam đảm inbox cho crush để kiểm tra tình hình chiến sự. Mở tab chat, tim như muốn nhảy ra khỏi lồng ngực, 
nhắn viết dòng đầu tiên “Này, hôm qua chạy cái đó có bị crash gì không”, nhấn enter, chưa được 1s sau thì có phản hồi 
“Tài khoản liên lạc hiện không khả dụng”...

Hắn tựa vào ghế, mặt ngước lên, suy nghỉ mông lung, rồi bổng nói vu vơ như người vô hồn “trời sắp mưa”... 
đúng là trời mưa thật, những giọt “nước mưa” đắng chát rơi trên mặt hắn cuốn trôi hết tất cả kỹ niệm và tình yêu mà hắn trao cho crush
Và từ đấy hắn sống hạnh phúc với cái laptop cả đời 😊 

Kỹ thuật
------

Chương trình được viết bằng C, sử dụng các hàm winapi để tương tác với hệ thống bên dưới như khởi chạy notepad, send key cho notepad, play audio...

Khi chạy, chương trình tự động khởi tạo 1 process cho notepad và lấy về thông tin của process đó bằng hàm CreateProcess. Nhưng để điều khiển cửa sổ của notepad như auto focus, tự động typing và change title thì cần phải có handle của cửa sổ. Chương trình sử dụng EnumWindows để check từng cửa sổ 1 xem có cái nào là của notepad vừa được mở ra không. Sau khi lấy được handle của cửa sổ notepad thì việc tiếp theo là thay đổi tiêu đề của nó bằng hàm SetWindowText. Để play audio thì chỉ cần sử dụng hàm mciSendString(hàm này cần thư viện libwinmm.a vì thế nếu sử dụng mấy IDE như codeblocks để compile thì nhớ thêm linker vô thư viện này nhé).

Để tự động gỏ từng chử vào notepad y như thiệt thì khá đơn giản: send từng key và delay. Cho chuổi message vào 1 vòng lặp và send từng ký tự 1, sau khi send thì delay random từ 100-500ms. Trong lúc từng ký tự được hiển thị ra thì âm thanh gỏ phím được phát từ hàm mciSendString sẽ làm người xem tưởng như có người đang gỏ từng dòng 1 lên notepad vậy 😊 

Để send key thì có thể sử dụng hàm SendInput kết hợp với VkKeyScan. Hàm VkKeyScan sẽ chuyển đổi ký tự thành mã virtual-key-code để pass vào cho SendInput. Giá trị trả về chứa 2 thông tin ta cần quan tâm đó là virtual-key-code(of course) và có nhấn shift hay không. Ví dụ khi muốn notepad hiển thị chữ A hoa thì cần send shift kết hợp chữ a thường. Đấy là mấu chốt 😊 

Ơ, thế dùng thế nào?
----------

Đơn giản là tải source code về và build ra thôi, chúng ta là developers vì thế việc chạy 1 file .cpp chỉ là muỗi ;) Code [đây](https://gist.github.com/sontx/674a75326dd5b9d32e78b52fb89189db)

<div data-gist-id="674a75326dd5b9d32e78b52fb89189db" data-gist-line="26-36"></div>

Nếu muốn file âm thanh gỏ phím thì [đây](https://drive.google.com/file/d/0ByMQfqYoGjfUUHUtT0NNM1NzdVE/view)

Hiện tại chương trình có 2 mode là load từ file và load từ code. Nếu load từ file thì sản phẩm phải chứa 1 file thực thi(of course), 1 file text chứa nội dung thông điệp và 1 file âm thanh mp3. Nếu load từ code thì chỉ cần sửa lại 2 dòng define trong code là SWEET_TITLE và SWEET_MESSAGE sau đó build lại thôi, sản phẩm sẽ là 1 file thực thi và 1 file mp3. Sau đó thì nén lại rồi gửi cho crush nữa là xong ;)

Nếu muốn mọi thứ tự động hơn thì có thể dùng thêm winrar để nén tất cả ra 1 file thực thi luôn rồi setting cho nó tự động chạy file thực thi của mình ngay sau khi giải nén ;)

Demo
----
<div class="video-wrapper">
  <iframe src="https://www.youtube.com/embed/0LNC_hboO98" frameborder="0" allowfullscreen></iframe>
</div>
