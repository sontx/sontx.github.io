---
title: Chrome extension with webpack and typescript
layout: post
comments: true
category: programming
description: Chrome extension thì không còn xa lạ với người dùng chrome nữa, từ chặn
  quảng cáo, vpn đến torrent đều có thể xài chrome extension. Xài sướng là thế, nhưng
  bạn có bao giờ tự hỏi chrome extension làm việc như thế nào, làm sao để viết ra
  được chúng. Nếu bạn đã tò mò và muốn tìm hiểu thì tôi sẽ đưa đèn chỉ lối cho bạn
  :))
tags:
- programming
- typescript
- webpack
- chrome-extension
- manifestv3
---

Ở các phiên bản trước của chrome, manifest v2 được sử dụng khá rộng rãi cho đến khi ông v3 tòi ra và chrome bắt buộc phải migrate lên v3 nếu không thì sẽ xịt :)) thế nên hôm nay tôi sẽ hướng dẩn các bạn chơi với con v3 này.

### Project structure

Tôi sẽ khởi tạo 1 project đơn giản như bên dưới.

```
|   package.json
|   tsconfig.json
+---dist
|
+---public
|       manifest.json
+---src
|       service-worker.ts
\---webpack
        webpack.config.js
```

1. dist: output directory
2. public: chứa manifest, html, ảnh ọt...
3. src: chứa code typescript chính
4. webpack: chứa config webpack

Cấu trúc của nó chẳng có gì đặt biệt, chỉ là một project npm với webpack bình thường :))

#### Dependencies
```json
{
  "name": "chrome-extension-sample",
  "version": "1.0.0",
  "scripts": {
    "build": "webpack --config webpack/webpack.config.js"
  },
  "author": "sontx",
  "devDependencies": {
    "@types/chrome": "^0.0.183",
    "copy-webpack-plugin": "^10.2.4",
    "ts-loader": "^9.3.0",
    "typescript": "^4.6.4",
    "webpack": "^5.72.0",
    "webpack-cli": "^4.9.2"
  }
}
```

1. `@types/chrome`: type defination cho chrome api
2. `copy-webpack-plugin`: để copy files trong public directory ra dist directory khi build webpack
3. `ts-loader`: như tên, typescript loader :))
4. `typescript`: như tên :))
5. `webpack` + `webpack-cli`: để build webpack chứ gì nữa :))

#### Config webpack

Đây là file `webpack.config.js` của tôi.

```js
const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  mode: "production",
  entry: {
    "service-worker": path.resolve(__dirname, "..", "src", "service-worker.ts"),
  },
  output: {
    path: path.join(__dirname, "../dist"),
    filename: "[name].js",
  },
  resolve: {
    extensions: [".ts", ".js"],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: "ts-loader",
        exclude: /node_module/,
      },
    ],
  },
  plugins: [new CopyPlugin({ patterns: [{ from: ".", to: ".", context: "public" }] })],
};
```

Thường 1 extension sẽ gồm nhiều files js vd như service worker hay content script... vì thế nên entry của webpack cũng sẽ có nhiều ông, mỗi ông sẽ output ra 1 file js.
Phần test của rule sẽ là 1 regex match với mấy file .ts hoặc .tsx (cho react sau này nếu muốn xài).

### Manifest v3
Trước khi đi sâu vào code chính thì tôi sẽ liệt kê một số tính năng/thay đổi nổi bật có trong v3 này:

1. background page bị thay thế bằng [service worker](https://developer.chrome.com/docs/extensions/mv3/intro/mv3-overview/#service-workers)
2. chính sửa network request thông qua api mới là [declarativeNetRequest](https://developer.chrome.com/docs/extensions/reference/declarativeNetRequest/) API
3. Không thể thực thi [remotely hosted code](https://developer.chrome.com/docs/extensions/mv3/intro/mv3-overview/#remotely-hosted-code), một số exntension sẽ load và thực thi code từ một nơi khác hoàn toàn (dĩ nhiên code đó không có trong exntesion), điều này có thể gây nguy hiểm cho người sử dụng vì hacker có thể chạy mã độc trên trình duyệt của bạn mà bạn chẳng hay biết :)). Nói tóm lại là chỉ được chạy code có sẵn trong extension package.
4. Hổ trợ [promise](https://developer.chrome.com/docs/extensions/mv3/intro/mv3-overview/#promises). Xưa thì các api của chrome chỉ chơi với callback, bây giờ thì hổ trợ promise rồi, code viết sẽ clean hơn nhiều, dĩ nhiên là cách cũ vẫn sẽ hoạt động.

Một file manifest đơn giản sẽ như sau, toàn bộ các keys các bạn có thể xem thêm ở [đây](https://developer.chrome.com/docs/extensions/mv3/manifest/)

```json
{
  "name": "Chrome extension sample",
  "description": "A simple chrome extension for demonstration only",
  "version": "1.0",
  "manifest_version": 3,
  "background": {
    "service_worker": "service-worker.js"
  },
  "permissions": []
}
```

1. name: tên của chrome extension
2. manifest_version: phiên bản của manifest, ở đây tôi chơi v3 nên set là 3.
3. background: nơi define service worker, đây là script sẽ chạy ở extension process, độc lập và chỉ có 1 instance.
4. permissions: nếu sử dụng các chrome api đặt biệt cần permission thì phải set vào đây.
5. content_script: nếu bạn cần chạy script trên page cụ thể nào đó thì phải define ông này, chú ý là ông này sẽ execute script ở isolated enviroment, bạn chỉ có thể làm việc với DOM ở page đó thôi :))

Chú ý là ông `background` (service worker) khác với ông `content_script` nhé, 1 ông chạy ở extension process và chỉ có 1 instance được active, ông còn lại chạy ở page context và có n instance được active :))

### Coding
File `service-worker.ts` của tôi chỉ đơn giản như sau:

```ts
console.log("hello")
```

Giờ tôi sẽ build và load extension từ dist directoy vào chrome nhé

1. Build
```bash
npm run build
```

2. Output
![](/assets/img/posts/chrome-extension-sample1.PNG)

3. Load extension to chrome: vào extension page của chrome -> turn on **Developer  mode** -> click vào **Load unpacked** rồi chọn folder dist. Extension được load thành công sẽ hiển thị như hình.
![](/assets/img/posts/chrome-extension-sample2.PNG)

4. Extension đã chạy :))
![](/assets/img/posts/chrome-extension-sample3.PNG)

Giờ tôi sẽ làm 1 example phức tạp hơn như sau: extension của tôi sẽ tải tất cả ảnh có trong facebook page.

Để làm được điều này tôi có 2 cách:
1. chạy script tải file trong page bằng `content_script`
2. Chạy script tải file từ `service_worker` bằng `chrome.tabs.executeScript`.
3. Chạy script tải file từ cũng từ `service_worker` bằng `chrome.debugger.sendCommand`, cách này khó hơn nên tôi sẽ hướng dẩn bạn làm theo cách này :))

Muốn tải ảnh từ fb page thì phải chọt vô được DOM để query `img` tag, muốn chọt vô được DOM thì phải chạy script của tôi ở page context.
Cách 3 khác hoàn toàn với 2 cách đầu vì nó có thể exceute 1 `arbitrary string`, nghĩa là bạn có thể thực thi remotely hosted code :)) vi diệu chưa.
Như ở trên tôi đã trình bày, manifest v3 không cho thực thi mấy loại code này vì vấn đề bảo mật, nhưng bạn hoàn toàn có thể lách luật bằng cách sử dụng debugger api :)) tuy vậy, có 1 điểm si đa đó là khi chạy debug thì trình duyệt sẽ hiển thị 1 panel nho nhỏ trên cùng để thông báo với người dùng rằng có ông đang chạy debug, cẩn thận :))

OK, bắt tay vào việc. Trong `manifest.json` tôi sẽ define thêm 3 permissions như bên dưới:
```json
{
  "permissions": ["debugger", "tabs", "downloads"]
}
```

1. debugger: để sử dụng debugger api, dùng để thực thì 1 đoạn code trên 1 target debuggee (trong trường hợp của tôi thì là tab facebook.com)
2. tabs: dùng để lookup tab facebook, sau khi tìm được tab fb thì tôi có thể exceute script lên tab đó.
3. downloads: để tải ảnh :))

Tôi viết lại file `service-worker.ts` như bên dưới

```ts
(async function () {
  const tabs = await chrome.tabs.query({});
  const matchedTab = tabs.find((tab) => tab.url.includes("facebook.com"));
  if (matchedTab) {
    const target = { tabId: matchedTab.id };
    try {
      await chrome.debugger.attach(target, "1.2");
      const result = await chrome.debugger.sendCommand(target, "Runtime.evaluate", {
        expression: `
        Array.from(document.querySelectorAll('img')).map(img => img.src).filter(Boolean)
        `,
        returnByValue: true
      }) as {exceptionDetails: any, result: {value: any}};
      if ('exceptionDetails' in result) {
        console.log("Error: ", result.exceptionDetails)
      } else {
        const images = result.result.value as string[];
        images.forEach(async (imageUrl, index) => {
          await chrome.downloads.download({url: imageUrl, filename: `facebook-mages/${index}.jpg`})
        })
      }
    } finally {
      await chrome.debugger.detach(target);
    }
  }
})();
```

1. Đầu tiên tôi lấy toàn bộ tabs hiện có bằng `chrome.tabs.query`, sau đó filter ra được tab fb.
2. Kế tiếp tôi cần attach vào tab đó để có thể send command bằng lệnh `chrome.debugger.attach`
3. Sau khi attach, tôi sẽ send script tới tab fb và sau đó detach (tương tự việc bạn mở file -> ghi vào file -> đóng file). Cụ thể về `Runtime.evaluate` bạn có thể xem thêm ở [đây](https://chromedevtools.github.io/devtools-protocol/tot/Runtime/#method-evaluate)
4. Kết quả trả về từ send command có thể thành công hoặc thất bại, ví thế tôi cần check xem có ông `exceptionDetails` trong result không.
5. Khi thành công, tôi móc danh sách url ảnh ra và call api download thôi :))

Và đây là kết quả
![](/assets/img/posts/chrome-extension-sample4.PNG)

Toàn bộ chrome api bạn có thể xem ở [đây](https://developer.chrome.com/docs/extensions/reference/).

Thế là xong phần basic về chrome extension, phần còn lại phụ thuộc vào trí tưởng tượng của bạn để có thể làm ra những extension thú vị :))

Source code ở đây nhé: [https://github.com/sontx/chrome-extension-sample](https://github.com/sontx/chrome-extension-sample)
