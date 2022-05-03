---
title: Xây dựng các lớp stream đơn giản để thao tác với file trong c++
layout: post
description: Thao tác với file là 1 trong những công việc thường gặp trong lập trình,
  bất kể ngôn ngử nào, từ các assembly cho đến c/c++ và c#, java...bất kể lập trình
  ứng dụng hay lập trình game đều ít nhiều động đến việc xử lý file(như lưu các thiết
  đặt, dữ liệu người dùng, lưu điểm...). Để việc thao tác với file trở nên đơn giản,
  người ta đã xây dựng các lớp file [stream](http://stackoverflow.com/questions/1216380/what-is-a-stream)
  cung cấp các phương thức đọc ghi, kiểm soát lỗi...Ngoài ra còn có các lớp trung
  gian làm nhiệm vụ như những lớp tiện ích, nó cung cấp các phương thức thao tác với
  từng loại dữ liệu cụ thể của file. Để hiểu rỏ hơn ta sẽ đi xây dựng lại các lớp
  stream này trong c++.
tags:
- c++
comments: true
category: programming
---

Bước đầu tiên ta xây dựng 1 lớp abstract Stream để cung cấp 1 giao diện tổng quan về stream như sau:

```cpp
class Stream: OBJECT_BASE {
protected:
    uint length;
    bool can_read;
    bool can_write;
    Stream();
public:
    bool canRead() const;
    bool canWrite() const;
    uint getLength() const;
    virtual int read(byte* buff, uint offset, uint length) = 0;
    virtual int readByte() = 0;
    virtual void write(const byte* buff, uint offset, uint length) = 0;
    virtual void writeByte(byte value) = 0;
    virtual bool endOfStream() const = 0;
    virtual void close() = 0;
    virtual ~Stream() {}
};
```

Đối với 1 stream sẽ luông có các phương thức như đọc, nghi, kiểm tra kết thúc stream, đóng stream...Các phương thức này cần phải được thực thi lại ở các lớp stream cụ thể cho từng loại stream(như file stream, memory stream, stream socket...). Chi tiết về các phương thức như sau:
* canRead()/canWrite() kiểm tra xem stream hiện tại có thể đọc/ghi hay không.
* getLength() sẽ trả về chiều dài hiện tại của stream(tổng số bytes có trong stream).
* read(...) sẽ đọc 1 khối dữ liệu trong stream(nếu canRead() false thì 1 ngoại lệ sẽ được ném ra), hàm trả về tổng số bytes đã đọc, dữ liệu đọc được từ stream sẽ được lưu trong mảng buff bắt đầu tại vị trí offset với tổng bytes lớn nhất cần đọc là length.
* readByte() sẽ đọc 1 byte duy nhất từ stream(nếu canRead() false thì 1 ngoại lệ sẽ được ném ra) và trả về byte đọc được, nếu giá trị âm hoặc 1 ngoại lệ được ném ra nghĩa là quá trình đọc dữ liệu từ stream thất bại.
* write(...) ghi 1 khối dữ liệu vào stream(nếu canWrite() false thì 1 ngoại lệ sẽ được ném ra), hàm sẽ ghi khối bytes từ mảng buff kể từ vị trí offset với tổng số bytes là length vào stream. Nếu việc ghi dữ liệu thất bại thì 1 ngoại lệ sẽ được ném ra.
* writeByte(...) ghi 1 byte vào stream(nếu canWrite() false thì 1 ngoại lệ sẽ được ném ra), nếu việc ghi dữ liệu thất bại thì 1 ngoại lệ sẽ được ném ra.
* endOfStream() sẽ trả về true nếu đã đọc đến cuối stream. Chú ý rằng nếu stream có thể ghi(canWrite() trả về true) thì endOfStream() luông trả về false.
* close() đóng stream và giải phóng tài nguyên.

Oke! ta đã định nghĩa xong 1 lớp tổng quan về stream giờ thì ta sẽ định nghĩa lớp file stream từ lớp stream cơ bản đó. Bên dưới là định nghĩa lớp file stream của chúng ta:

```cpp
class FileStream: public Stream {
private:
    std::string file_name;// duong dan den file hien tai
    FILE* p_file;// con tro den file hien tai dang dc mo
    const std::string mode;// che do mo file hien tai
    uint get_file_length() const;// lay kich thuoc file don vi bytes
    bool check_file_exists() const;// kiem tra xem 1 file co ton tai ko
    void create_file() const;// tao file bat ke file co ton tai hay ko
    void check_read() const;
    void check_write() const;
public:
    static const std::string MODE_READ;// che do chi doc
    static const std::string MODE_WRITE;// che do chi ghi(ghi moi file)
    static const std::string MODE_READWRITE;// che do vua doc vua ghi(ghi moi file)
    static const std::string MODE_APPEND;// che do chi ghi va ghi vao cuoi file

    virtual int read(byte* buff, uint offset, uint length);// doc 1 mang bytes tu file va luu vao buffer
    virtual int readByte();
    virtual void write(const byte* buff, uint offset, uint length);// ghi 1 mang bytes tu buffer vao file
    virtual void writeByte(byte value);
    virtual bool endOfStream() const;// kiem tra xem da ket thuc file chua
    virtual void close();// dong  file hien tai va giai phong tai nguyen
    bool opened() const;// kiem tra xem file hien tai co dang dc mo hay ko
    std::string getFileName() const;// lay duong dan toi file hien tai
    std::string getMode() const;// lay che do mo file hien tai
    FileStream(const std::string& file_name,
               const std::string& mode = FileStream::MODE_READWRITE,
               bool overwrite = true);
    virtual ~FileStream();
};
```

Ngoài việc thực thi các phương thức từ lớp Stream ta còn định nghĩa thêm 1 số phương thức giành riêng cho file stream và các phương thức phụ trợ khác. Cụ thể như sau:
* opened() kiểm tra xem file đang được mở hay không, thường thì nó sẽ trả về true trừ khi ta close file stream.
* getFileName() trả về đường dẩn đến file hiện tại.
* getMode() trả về mode hiện tại đang thao tác với file. Hiện tại file stream của chúng ta hổ trợ 4 mode là read, write, readwrite và append, các mode này được định nghĩa thông qua các hằng số MODE_READ, MODE_WRITE, MODE_READWRITE và MODE_APPEDN. Với mode read thì file chỉ được đọc, mode write thì file chỉ được ghi, với mode readwrite thì file vừa được đọc và ghi và mode append thì file chỉ được ghi nhưng nội dung trước đó của file sẽ không bị mất(nghĩa là ghi thêm vào file).
* FileStream(...) hàm khởi tạo của file stream, hàm cần đường dẩn đến file, chế độ thao tác với file và nếu đối số overwrite true thì sẽ tự động ghi đè file nếu file đó đã tồn tại(chỉ có tác dụng với mode MODE_WRITE).
* get_file_length() hàm này sẽ trả về tổng kích thước của file.
* check_file_exists() hàm này kiểm tra xem file có tồn tại không.
* create_file() hàm này sẽ tạo file mới, nếu file đã tồn tại thì nó sẽ ghi đè lên file đó.
* check_read() kiểm tra chế độ hiện tại có được đọc không, nếu không thì sẽ ném ra ngoại lệ.
* check_write() kiểm tra chế độ hiện tại có được viết không, nếu không thì sẽ ném ra ngoại lệ.

Bây giờ ta sẽ khảo sát 1 số hàm chính trong này là read, readByte, write và writeByte.

Hàm `int read(byte* buff, uint offset, uint length)` đọc 1 khối bytes từ file được thực thi như sau:

```cpp
int FileStream::read(byte* buff, uint offset, uint length) {
    check_read();
    if(length == 0)
        throw ArgumentException("'length' param must greater zero!");

    size_t ret = fread(buff, sizeof(byte), length, p_file);

    if(ret != length && !feof(p_file))
        return -1;
    return ret;
}
```

Đầu tiên hàm sẽ thực hiện kiểm tra 1 số thông tin trước khi đọc dữ liệu từ file như mode hiện tại có hổ trợ đọc file hay không, đối số có đúng không....Tiếp theo hàm sẽ đọc dữ liệu từ file thông qua hàm fread(...), cuối cùng kiểm tra xem quá trình đọc có thành công không thông qua tổng số bytes đã đọc(lưu trong biến ret), hàm đọc thất bại khi tổng bytes đã đọc nhỏ hơn tổng bytes yêu cầu(length) trong khi vẩn chưa đọc hết file.

Hàm `int readByte()` đọc 1 byte từ file được thực thi như sau:

```cpp
int FileStream::readByte(){
    check_read();
    byte* buff = new byte;
    int result = -1;
    size_t ret = fread(buff, sizeof(byte), 1, p_file);
    if(ret == 1)
        result = *buff;
    delete buff;
    return result;
}
```

Hàm sẽ kiểm tra xem stream hiện tại có hổ trợ việc đọc không, tiếp theo đó hàm sẽ khởi tạo 1 vùng nhớ để lưu tạm giá trị trả về từ hàm fread. Sau khi đọc dữ liệu thành công hàm sẽ kiểm tra tổng số bytes đã đọc xem có bằng 1 không, vì hàm của chúng ta yêu cầu đọc 1 byte vì thế nên nếu bằng 1 thì đọc thành công, hàm trả về -1 nếu thất bại.

Hàm `void write(const byte* buff, uint offset, uint length)` ghi 1 khối bytes vô file được thực thi như sau:

```cpp
void FileStream::write(const byte* buff, uint offset, uint length) {
    check_write();
    if(length == 0)
        return;

    size_t ret = fwrite(buff + offset, sizeof(byte), length, p_file);

    if(ret != length)
        throw FileIOException("Can not write to file!");
    this->length += ret;
}
```

Hàm sẽ kiểm tra xem stream hiện tại có hổ trợ ghi không. Nếu đối số length bằng 0 thì hàm sẽ không làm gì cả. Bước tiếp theo hàm sẽ sử dụng fwrite để ghi khối bytes từ mảng buff vô file. Cuối cùng hàm kiểm tra tổng bytes đã ghi(lưu trong biến ret) có bằng length không, nếu không bằng nghĩa là việc ghi file đã thất bại. Sau khi ghi vào file thành công hàm sẽ tăng chiều dài của stream lên.

Hàm `void writeByte(byte value)` ghi 1 byte vào file được thực thi như sau:

```cpp
void FileStream::writeByte(byte value){
    check_write();
    byte* buff = &value;
    size_t ret = fwrite(buff, sizeof(byte), 1, p_file);
    if(ret != 1)
        throw FileIOException("Can not write to file!");
    this->length++;
}
```

Đầu tiên hàm kiểm tra xem stream hiện tại có hổ trợ ghi file không. Tiếp theo hàm sẽ ghi giá trị từ biến value vào file thông qua hàm fwrite, nếu hàm trả về 1 nghĩa là thành công. Sau khi ghi file thì chiều dài stream sẽ được tăng lên 1.

Oke! thế là xong FileStream, giờ ta có thể thao tác với file đơn giản như sau:

```
FileStream fs("filename.txt");// mở filename.txt
int total = fs.read(obuff, 0, 100);// đọc 100 bytes từ filename.txt, lưu vô obuff
fs.write(ibuff, 0, 100);// ghi 100 bytes từ ibuff vô filename.txt
fs.close();// đóng stream
```

Tiếp theo ta sẽ xây dựng các lớp tiện ích để làm việc với FileStream đơn giản hơn nữa, ở đây ta xây dựng lớp StreamReader và StreamWriter nhằm đọc và ghi dữ liệu dạng text.

Lớp đầu tiên là StreamReader dùng để đọc dữ liệu từ file hoặc từ 1 stream bất kỳ dưới dạng text. Ta xây dựng như sau:

```cpp
class StreamReader: OBJECT_BASE{
private:
    Stream* p_stream;
    void check_state() const;
    void check_result(int ret) const;
public:
    void close();
    std::string read(uint chars);
    std::string readLine();
    std::string readAll();
    StreamReader(Stream& stream);
    StreamReader(const std::string& file_name);
    virtual ~StreamReader();
};
```

StreamReader của chúng ta cần đầu vào là 1 stream bất kỳ có hổ trợ đọc dữ liệu(canRread() trả về true) hoặc đường dẩn đến file. Ta khảo sát các phương thức trong StreamReader:
* read(uint chars) đọc số lượng ký tự nhất định trong stream.
* readLine() đọc 1 dòng trong stream.
* readAll() đọc toàn bộ nội dung của stream.

Hàm `read(uint chars)` được thực thi như sau:

```cpp
std::string StreamReader::read(uint chars) {
    check_state();
    byte* buff = new byte[chars + 1];
    int ret = p_stream->read(buff, 0, chars);
    check_result(ret);
    buff[ret] = '\0';
    std::string result((char *)buff);
    delete[] buff;
    return result;
}
```

Đầu tiên hàm kiểm tra tình trạng của stream hiện tại, sau đó khởi tạo 1 bộ đệm để lưu tạm dữ liệu đọc được từ stream dưới dạng bytes. Sau khi đọc xong dữ liệu thì thêm \0 vào cuối mảng bộ đệm để đánh dấu kết thúc xâu. Cuối cùng khởi tạo 1 biến kết quả và chuyển dữ liệu trong bộ đệm sang string để trả về.

Hàm `readLine()` được thực thi như sau:

```cpp
std::string StreamReader::readLine() {
    std::vector<byte> vec;
    int ret;
    do {
        ret = p_stream->readByte();
        if(ret == -1) {
            if(p_stream->endOfStream())
                break;
            else
                check_result(ret);
        }
        if(ret == '\n' || ret == '\0')
            break;
        vec.push_back(ret);
    } while(true);
    vec.push_back('\0');
    return std::string((char*)&vec[0]);
}
```

Hàm sử dụng 1 vector để làm bộ đệm dữ liệu và đọc từng bytes trong stream cho đến khi kết thúc stream hoặc gặp ký tự xuống dòng.

Hàm `readAll()` được thực thi như sau:

```cpp
std::string StreamReader::readAll() {
    std::vector<byte> vec;
    int ret;
    do {
        ret = p_stream->readByte();
        if(ret == -1) {
            if(p_stream->endOfStream())
                break;
            else
                check_result(ret);
        }
        vec.push_back(ret);
    } while(true);
    vec.push_back('\0');
    return std::string((char*)&vec[0]);
}
```

Hàm này chỉ đơn giản là đọc toàn bộ dữ liệu cho đến khi kết thúc stream.

Oke! code thì dài quá, nhưng khi sử dụng thì rất sướng chỉ đơn giản như thế này:

```cpp
StreamReader reader("filename.txt");//mở filename.txt để đọc
std::string line = reader.readLine();// đọc 1 dòng trong filename.txt, lưu vô biến line
reader.close();// đóng stream
```

Giờ đến StreamWriter, lớp tiện ích để ghi dữ liệu dạng text xuống file. Ta định nghĩa như sau:

```cpp
class StreamWriter: OBJECT_BASE{
private:
    Stream* p_stream;
    void check_state() const;
public:
    void close();
    void write(const std::string& st);
    void writeLine(const std::string& st);
    StreamWriter(Stream& stream);
    StreamWriter(const std::string& file_name);
    virtual ~StreamWriter();
};
```

Giờ ta khảo sát các phương thức của StreamWriter:
* write(...) hàm dùng để nghi 1 đoạn text vô file.
* writeLine(...) hàm dùng để ghi 1 dòng vô file(như hàm write nhưng có xuống dòng).

Lớp này khá đơn giản, chỉ gồm 2 phương thức chính là write và writeLine, 2 hàm này được thực thi như sau.
Hàm `write(const std::string& st)`

```cpp
void StreamWriter::write(const std::string& st){
    check_state();
    p_stream->write((const byte *)st.c_str(), 0, st.size());
}
```

Đầu tiên kiểm tra tình trạng của stream hiện tại sau đó ghi mảng bytes trong xâu st ra file.

Hàm `writeLine(const std::string& st)`

```cpp
void StreamWriter::writeLine(const std::string& st){
    write(st);
    p_stream->writeByte('\n');
}
```

Hàm này gọi lại hàm write để ghi đoạn text vô file và ghi thêm \n để xuống dòng.

Oke! lớp này khá đơn giản, về sử dụng thì tương tự như StreamReader

```cpp
StreamWriter writer("filename.txt");// mở file để ghi
writer.writeLine("this is a text in a line");// ghi 1 đoạn text lên 1 dòng
writer.close();// đóng stream
```

Với 3 class FileStream, StreamReader và StreamWriter ta đã có thể thao tác với file dể dàng hơn nhiều. FileStream sẽ thao tác đọc ghi file ở mức bytes, StreamReader và StreamWriter sẽ hổ trợ đọc ghi ở mức text. Dưới đây là 1 đoạn demo về sử dụng 3 lớp này:

```cpp
FileStream fs("filename.txt", FileStream::MODE_WRITE);
char buff[] = "hello world";
fs.write((byte *)buff, 0, sizeof(buff));// ghi mảng buff vào filename.txt
fs.close();
StreamReader reader("filename.txt");
std::string line = reader.readLine();// đọc 1 dòng trong filename.txt vào line
reader.close();
line += ", i'm dev";
StreamWriter writer("filename.txt");
writer.writeLine(line);// ghi 1 dòng vào filename.txt
writer.close();
```

Đoạn demo sẽ tạo filename.txt và ghi vào dòng "hello world", sau đó sử dụng StreamReader để đọc ra chuổi "hello world" đó rồi nối vào với chuổi ", i'm dev" và cuối cùng sử dụng StreamWriter để ghi mới chuổi "hello world, i'm dev" vào filename.txt.

Bên trên ta đã xây dựng cơ bản lớp file stream để thao tác với file và 2 lớp tiện ích để hổ trợ đọc ghi file dưới dạng text. Ngoài việc sử dụng stream để thao tác với file lưu trên đĩa ra ta còn có thể thao tác với dữ liệu lưu trong bộ nhớ, điểm khác biệt ở đây chỉ là dữ liệu nằm ở đâu(trên đĩa hay trong bộ nhớ) còn giao diện đọc ghi dữ liệu thì như nhau(đều sử dụng read, readBytes, write, writeByte). Ví dụ ở đây là 1 memory stream dùng để thao tác với 1 luồng dữ liệu đã lưu trong bộ nhớ được định nghĩa như sau:

```cpp
class MemoryStream: public Stream {
private:
    std::vector<byte> mem;
    Stream* p_stream = NULL;
    int capacity;
    int cursor = -1;
    bool closed = false;
    void check_read();
    void check_write(uint n_bytes) const;
    void check_capacity(int capacity) const;
public:
    virtual int read(byte* buff, uint offset, uint length);
    virtual int readByte();
    virtual void write(const byte* buff, uint offset, uint length);
    virtual void writeByte(byte value);
    virtual bool endOfStream() const;
    virtual void close();

    uint getCapacity() const;
    void setCapacity(int capacity);
    uint retrieveBytes(pbyte* out_buff) const;

    MemoryStream(int capacity = -1);
    MemoryStream(const byte* buff, uint offset, uint length, int capacity = -1);
    MemoryStream(const std::vector<byte>& buff, int capacity = -1);
    MemoryStream(Stream& p_stream, int capacity = -1);
    virtual ~MemoryStream();
};
```

Khác với FileStream dữ liệu được ghi trong file thì ở lớp MemoryStream dữ liệu sẽ được ghi trong 1 vector trong bộ nhớ, các phương thức đọc ghi trên stream vẩn hoạt động tương tự nhau ở cả 2 loại stream. Ngoài ra mỗi loại stream còn hổ trợ 1 số phương thức khác đặt trưng riêng cho từng loại như ở FileStream ta định nghĩa hàm opened() để kiểm tra tình trạng của file có đang được mở hay không thì ở MemoryStream lại không có...2 lớp tiện ích là StreamReader và StreamWriter cũng có thể sử dụng với MemoryStream như sau:

```cpp
char buff[] = "this is a text";
MemoryStream ms((byte *)buff, 0, sizeof(buff));
StreamReader reader(ms);
std::string text = reader.readAll();// đọc toàn bộ text trong stream
```

Vì 2 lớp FileStream và MemoryStream đều kế thừa từ abstract Stream nên ta có thể dể dàng sử dụng nó với 2 lớp tiện ích StreamReader và StreamWriter.

Để tăng tốc độ thao tác với file người ta còn sử dụng bộ đệm trong file stream, nói nôm na là người ta sẽ đọc 1 khối bytes rồi lưu trong bộ đệm trong bộ nhớ, sau đó khi có yêu cầu đọc file thực sự thì chỉ cần đọc từ bộ đệm đó ra thôi vì thế nên tốc độ sẽ nhanh hơn. Khi khối bytes trong bộ đệm hết thì chỉ cần đổ tiếp dữ liệu từ file vô bộ đệm. Do sử dụng bộ đệm nên dữ liệu sẽ đi theo đường file <-> buffer <-> program, ở đây mũi tên 2 chiều biểu thị cho việc dữ liệu được đọc hoặc ghi file đều thông qua bộ đệm trung gian. Mình chỉ sơ lượt về bộ đệm như thế, nếu có thời gian thì mình sẽ viết tiếp 1 bài về sử dụng bộ đệm để thao tác với file.

Đây là toàn bộ mã nguồn của bài này(project được viết bằng CodeBlocks), bạn nào quan tâm có thể tải về để nguyên cứu: http://1drv.ms/1QVAgSt
