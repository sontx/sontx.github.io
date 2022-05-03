---
title: Trích xuất các thành phần của biểu thức từ trái qua phải
layout: post
category: programming
comments: true
tags:
- javascript
- math
---

Gần đây tôi có gặp phải 1 bài toán như sau: *cho/nhập một biểu thức toán học đơn giản (vd: **A1+13-B2*(A1+C5)**), highlight và trigger sự kiện nếu người dùng click vào biến trong biểu thức đã cho*.
Để giải quyết bài toán này tôi có 2 sự lựa chọn:
1. Tìm kiếm thư viện hổ trợ: hổ trợ angular5/javascript
2. Tự viết bằng tay: chia làm nhiều step và sử dụng các lib hổ trợ nếu có trong các step đó.

Sau khi google một thời gian thì tôi chưa tìm thấy được thư viện nào hổ trợ phương án 1. Chuyển sang phương án 2, tôi chia làm các steps nhỏ như sau:
1. Trích xuất biểu thức dạng string sang dạng structured data để có thể phân biệt được đâu là biến mà highlight.
2. Render biểu thức và highlight + handle event cho mỗi biến.

Step 1, tôi tìm thấy thư viện `mathjs` để parse biểu thức của tôi thành các nodes và dùng `isSymbolNode` để phân biệt được node nào là biến tôi cần highlight. Nghe có vẻ thơm rồi.
Step 2, tôi dùng `quilljs` và `quill-mention` để highlight các biến đồng thời handle sự kiện khi click vào từng biến.

Nhìn tổng quan có vẻ trơn tru, nhưng chuyện đíu ai ngờ xảy ra khi combine 2 steps. Mắt xích quan trọng là structured data của mình, format của nó như thế nào. Sau 3s suy nghỉ tôi bịa ra ngay 1 format đơn giản nhất mà ai cũng có thể hiểu được như sau: một mảng lưu các nodes, để lưu các thành phần của biểu thức từ trái qua phải, thành phần của node gồm 4 loại là *biến*, *số*, *phép toán* và *dấu ngoặc*. Với format này thì ở step 2, cứ nhắm mắt mà render từ trái qua phải, gặp biến thì highlight lên :))

Kiểu của node như sau:
```ts
interface FormulaNode {
	text: string;
	type: "variable" | "number" | "operator" | "group";
}
```

Và chuyện đíu ai ngờ ở đây là `mathjs` không parse theo order mà tôi muốn (dạng mảng, từ trái qua phải) mà nó parse theo dạng tree :((. Buồn lắm chứ, nhưng thôi đôi ta không có duyên, tôi quyết định đá `mathjs` và tự tìm cho mình 1 em khác thay thế. Nói miệng thế thôi chứ tôi google cả buổi mà tìm có ra đâu, nhìn vào bàn tay phải chai sạm vì cầm "chuột", tôi quyết định tự xử.

Có 2 hướng tôi có thể đi:
1. Dùng regex.
2. Chơi hardcore.

Sau khi cân nhắc lợi hại của 2 hướng, tôi quyết định chơi hardcore.

Thuật toán tôi bịa ra như sau: duyệt từng ký tự của biểu thức từ trái qua phải, nếu ký tự đó là chữ cái hoặc dấu gạch dưới thì nó thuộc biến, append nó vô biến tạm. Cứ thế loop cho đến hết, cho đến khi nào gặp ký tự không thuộc biến thì chúng ta vừa trích xuất được 1 variable.

Đây là phần cây nhà tự trồng  `extractFormula`:
```ts
interface FormulaNode {
    text: string;
    type: "variable" | "number" | "operator" | "group"
}

const OPERATORS = ["+", "-", "*", "/"];
const GROUPS = ["(", ")"];

function extractFormula(formula: string): FormulaNode[] {
    const preprocessFormula = (formula || "").trim().replace(/ /g, "");
    if (!preprocessFormula) {
        return [];
    }

    const nodes: FormulaNode[] = [];
    let tempVar = "";

    const saveNodeIfNeeded = () => {
        if (tempVar) {
            nodes.push({text: tempVar, type: isFinite(Number(tempVar)) ? "number" : "variable"});
            tempVar = "";
        }
    }

    for (let i = 0; i < preprocessFormula.length; i++) {
        const ch = preprocessFormula.charAt(i);
        const nodeType = OPERATORS.includes(ch)
            ? "operator"
            : (GROUPS.includes(ch) ? "group" : "");

        if (!nodeType) {
            tempVar += ch;
        } else {
            saveNodeIfNeeded();
            nodes.push({text: ch, type: nodeType});
        }
    }

    saveNodeIfNeeded();

    return nodes;
}
```

Đây là kết quả:
![Sample](https://1.bp.blogspot.com/-qACHY_HSknM/X18z3jbK5DI/AAAAAAAAcvA/uRlY6gyvsL4ZlvzeGV7NNKN7QoVtuKH_gCLcBGAsYHQ/s0/Capture.PNG)

Sau khi có danh sách các nodes như thế này thì việc render ra `quill` quá đơn giản rồi :))

Hàm này chỉ hoạt động chính xác với biểu thức valid, để check 1 biểu thức có valid hay không thì có thể dùng `mathjs`.
