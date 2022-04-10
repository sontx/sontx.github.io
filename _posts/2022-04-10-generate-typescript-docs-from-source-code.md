---
title: Generate typescript docs from source code
layout: post
comments: true
category: programming
description: Tự động sinh docs từ comment(tsdoc) trong typescript code
---

Gen docs từ source code của typescript thì chắc chẳn(g) xa lạ gì nữa, chỉ cần bỏ ra vài phút search là bạn có thể tìm thấy cả lùm thư viện/tools gen docs cho ts, vừa tiết kiệm thời gian vừa đỡ đau não. Nhưng đơn giản quá thì dể gây nhàm chán, vì thế hôm nay tôi sẽ hướng dẩn bạn tự viết code để gen docs, đúng tiêu chuẩn cây nhà lá vườn, tự viết tự fix tự chưởi thề :))

Lib chính tôi xài hôm nay là **typescript complier**, nó chính là thứ đứng sau câu lệnh **tsc** để compile code ts :)). Ông typescript này sẽ cung cấp các phương thức để tôi có thể check/traverse source code, phân tích cú pháp ba lăng nhăng các kiểu con đà điểu.

Thuật toán (gọi cho sang mồm) xử lý sẽ như sau:
1. collect tất cả các files source cần gen docs.
2. tương ứng với mỗi file source, ta sẽ check xem trong source đó có class hoặc interface nào
3. collect thông tin của class/interface đó (tên, mô tả, blabla)
4. tương ứng với từng class/interface, tôi sẽ collect tất cả info của các members (properties, methods)
5. tất cả collected info sẽ được lưu ra file **docs.ts**

### Implement thuật toán
#### 1. Collect source files

Tôi sẽ sử dụng `glob` để scan và get về tất cả các files .ts trong source code.
Như ví dụ bên dưới, tôi sẽ lấy tất cả files .ts từ folder lib:

```ts
import * as glob from 'glob'
const sourceFiles: string[] = glob.sync('lib/**/*.ts')
```

#### 2. Check class/interface trong từng source file
Đầu tiên tôi sẽ tạo 1 typescript program, input gồm source files và lib mà source files dùng, như vd bên dưới tôi sử dụng es6.

```ts
const program = createProgram(sourceFiles, { lib: ['lib.es6.d.ts'] })
```

`program.getSourceFile(fileName)` sẽ đọc và phân tích source file mà tôi truyền vào, trong source file đã đọc được sẽ chứa các `statements`,  mỗi statement có thể là class, interface, type blabla. Như ví dụ bên dưới tôi sử dụng `SyntaxKind` để check xem statement đó cụ thể là ông nào, class hay interface.

```ts
function visitSourceFile(fileName: string) {
    const sourceFile = program.getSourceFile(fileName)

    if (!sourceFile) {
        throw new Error(`File doesn't exist: ${fileName}.`)
    }

    return sourceFile.statements.reduce((directivesSoFar, statement) => {
        if (statement.kind === SyntaxKind.ClassDeclaration) {
            return directivesSoFar.concat(visitClass(statement))
        } else if (statement.kind === SyntaxKind.InterfaceDeclaration) {
            return directivesSoFar.concat(visitInterface(statement))
        }

        return directivesSoFar
    }, [])
}
```

#### 3. Collect thông tin class/interface
Để có thể phân tích được thông tin chi tiết hơn về class/interface thì tôi cần phải tạo 1 typechecker
```ts
const typeChecker = program.getTypeChecker()
```

Chú ý hàm `visitDeclaration`, nó sẽ lấy thông tin tên class/interface, mô tả và các properties/methods có trong declaration đó. 
Ở đây tôi sử dụng thêm hàm `displayPartsToString` để chuyển object comment doc thành readable string, vì ông `getDocumentationComment` trả về 1 mảng info rất loằng ngoằn(g) :)) Hàm `visitMembers` tôi sẽ giới thiệu ngay bên dưới.

```ts
function visitInterface(interfaceDeclaration) {
    return {
        ...visitDeclaration(interfaceDeclaration),
        type: 'Interface',
    }
}

function visitClass(classDeclaration) {
    return {
        ...visitDeclaration(classDeclaration),
        type: 'Class',
    }
}

function visitDeclaration(declaration) {
    const symbol = typeChecker.getSymbolAtLocation(declaration.name)
    const description = displayPartsToString(symbol.getDocumentationComment(typeChecker))
    const className = declaration.name.text
    return {
        className,
        description,
        ...visitMembers(declaration.members),
    }
}
```

> Một số trường hợp bạn cần kiểm tra xem ông class A có kế thừa từ ông class nào không thì có thể sử dụng `heritageClauses`.

#### 4. Lấy thông tin member (methods/properties)
Typescript đẻ ra khái niệm access modifier nên ta phải check xem ông nào mà private/protected thì ko cần phải gen docs cho nó. Sau khi vược qua được vòng gửi xe, bước tiếp theo tôi sẽ check xem member đó có phải là method/property hay không, vì mỗi ông sẽ có 1 cách collect info riêng. Tôi sẽ xem 1 global field hoặc 1 get accessor là 1 property.

```ts
function visitMembers(members: NodeArray<ClassElement>) {
    const methods = []
    const properties = []

    for (const member of members) {
        const isPrivate = (getCombinedModifierFlags(member) & ModifierFlags.Private) !== 0
        const isProtected = (getCombinedModifierFlags(member) & ModifierFlags.Protected) !== 0

        if (isPrivate || isProtected) {
            continue
        }

        const isMethod = member.kind === SyntaxKind.MethodDeclaration || member.kind === SyntaxKind.MethodSignature
        const isProperty =
            member.kind === SyntaxKind.PropertyDeclaration ||
            member.kind === SyntaxKind.PropertySignature ||
            member.kind === SyntaxKind.GetAccessor

        if (isMethod) {
            methods.push(Object.assign(visitMethod(member)))
        } else if (isProperty) {
            properties.push(Object.assign(visitProperty(member)))
        }
    }

    return { methods, properties }
}

```

Với ông method, tôi sẽ lấy thông tin về tên, mô tả, các đối số và kiểu trả về. Đối số thì tôi sẽ quan tâm tên và kiểu dữ liệu của nó.

```ts
function visitMethod(method) {
    return {
        name: method.name.text,
        description: displayPartsToString(method.symbol.getDocumentationComment(typeChecker)),
        args: method.parameters ? method.parameters.map((prop) => visitArgument(prop)) : [],
        returnType: visitType(method.type),
    }
}

function visitArgument(arg) {
    return { name: arg.name.text, type: visitType(arg) }
}

function visitType(node) {
    if (node && node.type) {
        return node.type.getText()
    }

    return node ? typeChecker.typeToString(typeChecker.getTypeAtLocation(node)) : 'void'
}
```

Với ông property, tôi sẽ lấy tên, mô tả, giá trị mặt định và kiểu của property đó.
```ts
function visitProperty(property) {
    return {
        name: property.name.text,
        defaultValue: property.initializer ? stringifyDefaultValue(property.initializer) : undefined,
        type: visitType(property),
        description: displayPartsToString(property.symbol.getDocumentationComment(typeChecker)),
    }
}

function stringifyDefaultValue(node) {
    if (node.text) {
        return node.text
    } else if (node.kind === SyntaxKind.FalseKeyword) {
        return 'false'
    } else if (node.kind === SyntaxKind.TrueKeyword) {
        return 'true'
    }
}
```

#### 5. Lưu thông tin đã collect vào file docs.ts
Ở bước này thì bạn có thể lưu vào json hoặc ts hoặc txt tùy sở thích, ở bài này tôi thích ts vì để import cho nó đơn giản :))
`sourceFiles` thì ở bước 1 tôi đã lấy bằng cách scan folder bằng `glob`.
```ts
const docs = []
sourceFiles.forEach((file) => {
    docs.push(...visitSourceFile(file))
})
fs.writeFileSync('docs.ts', 'export default ' + JSON.stringify(docs, null, 2), { encoding: 'utf8' })
```

Hình bên dưới là ví dụ file docs.ts mà tôi đã gen ra. Bạn có thể hình dung type của nó sẽ như sau:
```ts
interface DocElement {
  className: string
  description: string
  methods: { name: string; description: string; args: [{ name: string; type: string }], returnType: string }[]
  properties: {name: string; type: string; description: string}[]
  type: 'Class' | 'Interface'
}

type Docs = DocElement[];
```

![docs.ts](/assets/img/posts/tsdocs-sample.PNG)

### Ví dụ sử dụng
Project sample của tôi sẽ có dạng như sau: 

```
│   .prettierrc.json
│   docs.ts  <-- file docs output được tự động gen khi chạy script
│   gennerate-docs.ts  <-- script gen docs
│   index.ts  <-- 1 express app đơn giản để show UI xem kết quả gen docs
│   package-lock.json
│   package.json
│   tsconfig.json
│
└───lib  <-- 1 example đơn giản về source files cần gen docs
        can-install-crack-apps.ts
        can-install-windows.ts
        can-surf-fb.ts
        crush.ts
        index.ts
        person.ts
        simp.ts
```

`generate-docs.ts` là nơi chứa toàn bộ logic gen docs mà tôi đã chém gió bên trên.
File `package.json` tôi sẽ define 3 scripts như sau:
```json
{
  "scripts": {
    "start": "nodemon index.ts",
    "start:lib": "nodemon lib/index.ts",
    "docs:generate": "ts-node gennerate-docs.ts"
  }
}
```
1. start:  start ông express app để show thành quả gen docs lên trình duyệt
2. start:lib: chạy cái lib example, lib xàm xí đú để ví dụ việc gen docs thôi :))
3. docs:generate: call ông này để bắt đầu scan và gen docs mới ra file `docs.ts`

#### 1. Example lib
Lib này tôi sẽ viết 1 số classes/interfaces với 1 tá useless comment, mục đích chỉ là để gen docs từ tụi comment này thôi :))
Tôi sẽ có 3 classes chính là `Person`, `Simp` và `Crush`, 2 ông sau sẽ kế thừa từ ông `Person`.

Person class của tôi như sau.
```ts
/**
 * A person
 */
export abstract class Person {
    /**
     * Person's name
     */
    name: string

    /**
     * Person's age
     */
    age: number

    /**
     * Person's gender
     */
    abstract get gender(): 'male' | 'female'

    /**
     * Person's height
     */
    height: number

    /**
     * Person's weight
     */
    weight: number

    /**
     * Calculates person's body mass index (BMI)
     */
    calculateBMI(): 'Underweight' | 'Normal' | 'Overweight' | 'Obese' {
        const bmi = Math.round(this.weight / Math.pow(this.height, 2)) * 10000
        if (bmi <= 18.5) {
            return 'Underweight'
        } else if (bmi <= 25) {
            return 'Normal'
        } else if (bmi <= 30) {
            return 'Overweight'
        }
        return 'Obese'
    }

    /**
     * Gets person's info
     */
    info(): void {
        const info = Object.keys(this)
            .filter((key) => typeof this[key] !== 'function')
            .map((key) => `${key}: ${this[key]}`)
            .join('\n')
        console.log(info)
    }

    /**
     * Does daily job
     */
    abstract doJob(): void
}
```

Còn đây là `Simp` class
```ts
/**
 * It's you
 */
export class Simp extends Person implements ICanInstallWindows, ICanInstallCrackApps, ICanSurfFb {
    /**
     * Gets gender
     */
    get gender(): 'male' | 'female' {
        return 'male'
    }

    /**
     * Does install crack apps
     */
    installCrackApps(): void {
        console.log("Crack apps: I'm going to spend all day to crack shitty apps for my girl")
    }

    /**
     * Does install Windows (crack)
     */
    installWindows(): void {
        console.log('Install Windows: JD3T2-QH36R-X7W2W-7R3XT-DVRPQ')
    }

    /**
     * Does surf FB
     */
    surfFb(): void {
        console.log('FB: Em ăn cơm chưa')
    }

    /**
     * Whether this poor boy should continue to be a fool or to be an adult
     */
    shouldSimp(crush: Crush): boolean {
        // múi mít is the best
        const isMuiMit = crush.age <= 20
        if (isMuiMit) {
            return true
        }

        // be a smart simp-er
        if (crush.calculateBMI() !== 'Obese') {
            return false
        }

        return crush.age > 20 && crush.age < 30
    }

    /**
     * Does a simp job
     */
    doJob() {
        this.installWindows()
        this.installCrackApps()
        this.surfFb()
    }
}
```

Và cuối cùng là `Crush`
```ts
/**
 * It's your crush
 */
export class Crush extends Person implements ICanSurfFb {
    /**
     * Gets gender
     */
    get gender(): 'male' | 'female' {
        return 'female'
    }

    /**
     * Does surf FB
     */
    surfFb(): void {
        console.log("FB: I'm boring, I'm looking for somebody to love, please tới hốt me.")
    }

    /**
     * Does her job
     */
    doJob() {
        this.surfFb()
    }
}
```

Đây là 1 trong số 3 interfaces của tôi
```ts
/**
 * Be able to install crack apps
 */
export interface ICanInstallCrackApps {
    /**
     * Installs crack apps
     */
    installCrackApps(): void;
}
```
OK, trông comment có vẻ đầy đủ và chi tiết tới mức ko cần thiết :))

Express app để show docs, tôi sẽ chỉ show tên, type và mô tả của các classes hoặc interfaces có trong source files, bạn có thể show thêm các ông khác như properties hay methods tùy ý, file `docs.ts` đã chứa đầy đủ mọi thông tin cần thiết.

```ts
import * as express from 'express'
import docs from './docs'

const app = express()

app.get('/', function (req, res: express.Response) {
    const html = docs.map(
        (doc) => `
<li style='margin-bottom: 10px'>
    <span>
        ${doc.className} 
        <span style='color: ${doc.type === 'Interface' ? 'green' : 'blue'};font-weight: 600'>${doc.type}</span>
    </span>
    <span style='display: block; font-style: italic; font-size: 90%'>
        ${doc.description}
    </span>
</li>`,
    )

    res.send(`
<html lang='en'>
<body>
    <ul>
      ${html.join('\n')}
    </ul>
</body>
</html>
    `)
})

const port = 8080
app.listen(port)
console.log('Server started at http://localhost:' + port)
```

Open [http://localhost:8080/](http://localhost:8080/) thành quả nhé :))

![docs.ts](/assets/img/posts/generate-docs-web-view.PNG)
### Conclusion
Đọc được đến đây thì có lẽ não bạn cũng úng cmnl rồi :)), code bên trên chỉ mang tính chất nguyên cứu tạo bug là chính, mọi hành vi học theo và sau đó rồi gặp bug cho ngu người tôi hoàn toàn ko chịu trách nhiệm :))
Nếu ai cần source code thì liên hệ tôi nhé, hôm nay tôi lười up lên github quá :))

PS: Nếu bạn cảm thấy ngứa mắt vì lỗi sai chính tả thì tôi xin lỗi nhé :))
