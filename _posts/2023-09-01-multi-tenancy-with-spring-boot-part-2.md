---
title: Multi-tenancy with spring boot (Shared Database and Shared Schema) - Part 2
layout: post
comments: true
category: programming
description: "Khởi đầu với [Multi-tenancy with spring boot - Part 1](/programming/2023/07/22/multi-tenancy-with-spring-boot-part-1)
  tôi đã phun một tràng về lý thuyết cũng như các cách impl multi-tenancy trong spring
  (và tất cả chỉ là nói mồm \U0001F606). Tiếp nối series multi-tenancy, bài viết này
  tôi sẽ giới thiệu cụ thể về cách impl **Shared Database and Shared Schema** với
  spring."
tags:
- programming
- multi-tenancy
- java
- spring
---

Lý thuyết về **Shared Database and Shared Schema** trong multi-tenancy tôi sẽ không nói nữa (nói nữa các bạn lại đấ* tôi vì lắm mồm 🥲). Bài hôm nay tôi sẽ bê từ [How to integrate Hibernates Multitenant feature with Spring Data JPA in a Spring Boot application](https://spring.io/blog/2022/07/31/how-to-integrate-hibernates-multitenant-feature-with-spring-data-jpa-in-a-spring-boot-application), ok, let's start.

### Yêu cầu
Viết 1 spring webapp về quản lý danh sách công ty theo tenant:
1. CRUD company thông qua restful api.
2. Mỗi tenant có thể chứa nhiều companies.
3. BE sẽ xác định request yêu cầu tài nguyên từ tenant nào dựa trên tenant id.

### Thực hiện
#### CRUD company thông qua restful api
Tôi sẽ không đi vào chi tiết của phần này nữa vì nó khá đơn giản rồi 😆

#### Mỗi tenant có thể chứa nhiều companies
Để phân biệt company thuộc tenant nào, tôi thêm 1 column **tenant** vào **Company** table, column này sẽ được dùng trong câu lệnh `... WHERE tenant=tenantId`, ví dụ khi tôi cần lấy danh sách các companies thuộc tenant id `tenant1` thì câu lệnh truy vấn sẽ là `SELECT * FROM company WHERE tenant='tenant1'`. Với mỗi lần truy vấn vào db chúng ta cần append thêm của nợ này vào để filter đúng tenant là được. Đến đây nếu bạn nghỉ rằng game là easy thì chưa chắc đâu, làm thủ công như thế thì code sẽ giống nồi cám lợn, code logic lặp đi lặp lại và bugs sẽ là điều không thể tránh khỏi 🥲

Vấn đề đặt ra là làm sao để việc filter tenant 1 cách tự động và chúng ta chỉ cần focus vào logic nghiệp vụ chính mà không cần quan tâm đến tenant.  May mắn thay, hibernate đã hổ trợ **@TenantId** annotation, nó được dùng để đánh dấu một field của entity là *tenant identifier*.  Việc quản lý field này sẽ được hibernate handle, chỉ cần define xong rồi để yên cho nó ở đó là được 😆

```java
@Getter
@Setter
@Entity
public class Company {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO, generator = "native")
    @GenericGenerator(name = "native")
    private Long id;

    @Column
    private String name;

    @Column
    private String address;

    @TenantId
    private String tenant;
}

```

Thế làm sao để hibernate biết được giá trị *tenant id* cần set vào là gì? Làm sao chúng ta nói cho nó biết rằng request 1 cần access vào *tenant1* và request 2 lại access vào *tenant2*?

Câu trả lời cho vấn đề này chính là `CurrentTenantIdentifierResolver`, nhiệm vụ của nó đơn giản là lấy `tenant id` và đưa cho hibernate khi cần. `HibernatePropertiesCustomizer` sẽ giúp chúng ta đăng ký `CurrentTenantIdentifierResolver` với hibernate .

```java
@Component
public class TenantIdentifierResolver implements CurrentTenantIdentifierResolver, HibernatePropertiesCustomizer {
    private static final String DEFAULT_TENANT = "default";

    @Override
    public String resolveCurrentTenantIdentifier() {
        var tenantId = TenantContextHolder.getTenant();
        return StringUtils.hasText(tenantId) ? tenantId : DEFAULT_TENANT;
    }

    @Override
    public void customize(Map<String, Object> hibernateProperties) {
        hibernateProperties.put(AvailableSettings.MULTI_TENANT_IDENTIFIER_RESOLVER, this);
    }
    .....
}
```

Ở đây bạn sẽ thấy 1 thứ khá thú vị đó là `TenantContextHolder`, nó làm nhiệm vụ lưu trữ `tenant id` của request hiện tại. Như bạn đã biết thì java servlet sẽ handle mỗi  request trong mỗi thread riêng biệt (request per thread), lợi dụng tính chất này chúng ta sẽ dùng một global `ThreadLocal` variable để lưu trữ `tenant id` vì giá trị của biến này sẽ là khác nhau với mỗi thread khác nhau. Vì thế ở bất cứ đâu trong code, bất kể khi nào bạn cần biết request hiện tại là của tenant nào thì chỉ cần call `TenantContextHolder.getTenant()` 😌

```java
public final class TenantContextHolder {
    private static final ThreadLocal<String> CONTEXT = new InheritableThreadLocal<>();

    public static void setTenantId(String tenant) {
        CONTEXT.set(tenant);
    }

    public static String getTenant() {
        return CONTEXT.get();
    }

    .....
}
```

Đến đây bạn lại nghĩ rằng game là easy thì đó là bạn chưa động tới `@Async` bất động bộ hoặc queue, vấn đề hơi chua là làm sao pass được cái `tenant id` này qua thread khác hoặc hệ thống khác, làm sao để có thể transparent được quá trình này. Đây là lúc bạn cần:
1. To tay, nhét vào params/data và truyền qua.
2. Sử dụng *interceptor* (TaskDecorator, kafka consumer/producer interceptor...)
3. Hỏi google hoặc chatgpt 🥲

#### BE sẽ xác định request yêu cầu tài nguyên từ tenant nào dựa trên tenant id
Cái này thì dể, bạn có thể lựa chọn các cách truyền tenant id từ FE lên BE sau:
1. Truyền qua query params: `GET /api/company?tenant=tenant1`
2. Truyền qua path url: `GET /api/tenantId/company` 🥴
3. Truyền qua header: `GET /api/company` và request header `X-Tenant-ID=tenant1`
4. Truyền qua cookie: `GET /api/company` và cookie `tenant_id=tenant1`
5. Truyền qua jwt: nhúng trong payload của jwt (cái này yêu cầu impl thêm authentication)
7. Truyền qua cái gì đó mà tôi chưa nghĩ ra 🥲

Về bảo mật thì *cách 5* vẫn là cách ổn nhất trong đống danh sách bên trên, nhưng trong sample này tôi sẽ sử dụng cách 3 cho dể làm 😆

> Ngoài các cách bên trên thì chúng ta còn hướng tiếp cận khác, đó là `tenant id` sẽ được map thông qua session id/user id ngay phía BE, cách này yêu cầu impl thêm authentication.


Để có thể tự động *móc* được `tenant id` từ request header và set vào `TenantContextHolder` tôi sử dụng một  servlet `Filter`, tất cả requests đều sẽ đi qua filter này, nhiệm vụ của chúng ta là *móc*  `tenant id` ra thôi.

```java
@Component
@Order(Ordered.HIGHEST_PRECEDENCE)
public class TenantFilter implements Filter {
    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
        TenantContextHolder.clear();
        if (request instanceof HttpServletRequest httpServletRequest) {
            var tenantId = httpServletRequest.getHeader("X-Tenant-ID");
            TenantContextHolder.setTenantId(tenantId);
        }
        chain.doFilter(request, response);
    }
}
```

### Kiểm tra
Giả sử tôi có bộ dataset như bên dưới.

| id  | name      | address    | tenant  |
| --- | --------- | ---------- | ------- |
| 1   | Company 1 | Address 1  | tenant1 |
| 2   | Company 2 | Address 2  | tenant1 |
| 3   | Company 3 | Address 3  | tenant2 |
| 4   | Company 4 | Address 4  | tenant2 |


Lấy danh sách companies thuộc *tenant1*.

```http
GET http://localhost:8080/api/company
X-Tenant-ID: tenant1
```

Kết quả trả về.

```json
[
  {
    "id": 1,
    "name": "Company 1",
    "address": "Address 1"
  },
  {
    "id": 2,
    "name": "Company 2",
    "address": "Address 2"
  }
]
```

Nếu xem logs ở terminal thì có thể thấy hibernate đã tự động thêm 1 filter tenant condition vào câu lệnh query:
```sql
select c1_0.id,c1_0.address,c1_0.name,c1_0.tenant from company c1_0 where c1_0.tenant = ? and 1=1 limit ?,?
```

### Kết luận
Để impl multi-tenancy trong springboot+hibernate, bạn chỉ cần `@TenantId`, `CurrentTenantIdentifierResolver` và `HibernatePropertiesCustomizer`. Múa vài dòng code là xong, game chưa bao giờ đơn giản như thế 😌

Nếu bạn muốn code trông nguy hiểm hơn thì có thể thử dùng `aop` (aspectj) và hibernate filter (Filter, FilterDef). Idea là định nghĩa 1 hibernate filter để thêm filter tenant (vd: tenant_id = **:tenantId**) và dùng `aop` để tự động set giá trị cho **tenantId** của hibernate filter đó. Với cách này thì bạn hoàn toàn có thể control được lúc nào thì cần filter với tenant, lúc nào thì ignore tenant 🥴

Source code: [multi-tenancy-shared-schema](https://github.com/sontx/samples/tree/multi-tenancy-shared-schema)
