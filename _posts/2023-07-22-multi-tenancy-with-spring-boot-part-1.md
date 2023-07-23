---
title: Multi-tenancy with spring boot - Part 1
layout: post
comments: true
category: programming
description: |-
  Multi-tenancy là một kiến trúc trong đó nhiều khách hàng (tenants) sẽ được phục vụ chỉ bởi 1 một hệ thống.
  Nó yêu cầu mức độ cô lập cần thiết giữa các khách hàng, sao cho dữ liệu và tài nguyên được sử dụng bởi từng khách hàng được tách riêng biệt với các khách hàng khác.
tags:
- programming
- java
- spring
- multi-tenancy
---

![Multi-tenancy vs Single-tenancy](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgt8sShf1BCOE7fCLK-BpDqq5nPyVWyfhkviN1YQNGPQ-6sAdPlvapYzINzov2T4J3UEPhvCeKPPbjGw6eDb61cAsck0zgYEasrQPIgQhCVp6VNuDRfdqIPRXfjypzOak38rWxH-O_7ZXQsfebFgwA667CXwbiI8-Zw4puCsFC3sBw7OBC8VbBh0iTPdl1J/s1600/multitenancy-vs-single-tanancy-1.png)

Multi-tenancy là một khái niệm quan trọng trong lập trình ứng dụng, đặc biệt là trong các hệ thống phần mềm dịch vụ hoặc hệ thống đám mây. Multi-tenancy có nghĩa là một hệ thống hoạt động và phục vụ nhiều khách hàng khác nhau đồng thời trên cùng một cơ sở hạ tầng. Mỗi khách hàng được gọi là một "tenant" và chia sẻ các tài nguyên, ứng dụng, và cơ sở dữ liệu chung trong hệ thống.

Tuy nhiên, dữ liệu và thông tin của từng khách hàng được cô lập và bảo mật với các khách hàng khác. Điều này cho phép Multi-tenancy tối ưu hóa việc sử dụng tài nguyên và giảm thiểu chi phí vì nó cho phép nhiều khách hàng chia sẻ cơ sở hạ tầng chung. Nó cũng giúp tiết kiệm thời gian triển khai và duy trì hệ thống vì cùng một phiên bản phần mềm và cơ sở hạ tầng có thể phục vụ nhiều khách hàng.

Tuy vậy, để triển khai Multi-tenancy thành công, các nhà phát triển phải đảm bảo tính riêng tư và bảo mật dữ liệu cho mỗi khách hàng. Nó yêu cầu kiến trúc phần mềm linh hoạt và cẩn thận trong thiết kế hệ thống để đảm bảo rằng dữ liệu của từng khách hàng không bị xâm phạm.

Trong bài viết hôm nay tôi sẽ giới thiệu sơ qua về 3 mô hình multi-tenancy được hổ trợ trong springboot với spring data jpa (chi tiết về code sẽ nằm ở các phần sau 😌). 

Bài viết được tham khảo từ [Multitenancy With Spring Data JPA](https://www.baeldung.com/multitenancy-with-spring-data-jpa)

## Các mô hình Multi-Tenancy
Có 3 cách tiếp cận chính cho một hệ thống multi-tenancy, cả 3 cách tiếp cận đều liên quan tới việc isolate database.
1. Separate Database (multi databases)
2. Shared Database and Separate Schema (single database + multi schemas)
3. Shared Database and Shared Schema (single database + single schema)

Mỗi mô hình đều có ưu nhược điểm riêng về isolation, security cũng như performance ngoài ra còn có chi phí về triển khai, bảo trì hệ thống database. Điều quan trọng là hiểu rõ ràng những điểm mạnh và yếu của từng mô hình để có thể lựa chọn phù hợp với nhu cầu cụ thể của dự án.
### Separate Database
Với mô hình này, data của mỗi tenant sẽ được lưu trữ trong các database riêng biệt, không chia sẻ database với các tenants khác.

<p class="center">
<img alt="Database per tenant" src="https://www.baeldung.com/wp-content/uploads/2022/08/database_per_tenant.png">
</p>

#### Ưu điểm
1. Data isolation & security: Khá tốt vì mỗi tenant được lưu trữ ở 1 database riêng biệt.
2. Performance: Mỗi tenant's database có thể được optimized một cách độc lập (bản pro có thể xài db xịn, bản trial xài db ít xịn hơn 1 tí), ngoài ra nhờ sự độc lập về mặt database nên cũng giảm thiểu các vấn đề performance gây ra bởi 1 tenant (một ông có vấn đề thì các ông còn lại vẫn chạy ngon).
3. Compliance: Dể dàng tuân thủ các quy định và yêu cầu về nơi lưu trữ dữ liệu cho các tenant khác nhau (một số khách yêu cầu data phải ở trong nước -> ok, database sẽ được triển khai ở nước đó)
4. Scalability: Scale có thể được config cho từng tenant riêng biệt, đảm bảo sử dụng tài nguyên một cách hiệu quả.

#### Nhược điểm
1. Increased Complexity: Việc quản lý và maintain nhiều databases sẽ khá phức tạp và tốn nhiều tài nguyên.
2.  Resource Consumption: Vì mỗi tenant sẽ được cung cấp 1 database nên việc tiêu thụ tài nguyên hệ thống là khá lớn.
3.  Cost: Vận hành nhiều cơ sở dữ liệu có thể làm tăng chi phí về cơ sở hạ tầng và bảo trì.
4.  Cross-Tenant Queries: Thực hiện truy vấn dữ liệu liên quan tới dữ liệu của nhiều tenants cùng lúc sẽ khá phức tạp.
5.  Backup and Recovery: Quá trình sao lưu và khôi phục trở nên phức tạp hơn với nhiều databases (đây cũng có thể là ưu điểm nếu mỗi tenant có policy backup/recovery khác nhau).
6.  Slower Deployment: Setup 1 tenant mới sẽ khó khăn và tốn thời gian hơn vì cần phải tạo 1 database dộc lập cho tenant mới.

> Lưu ý rằng quyết định chọn kiến trúc này cần xem xét các yếu tố như quy mô của ứng dụng, số lượng khách hàng và yêu cầu cụ thể của dự án. Mặc dù cung cấp những lợi ích về isolation, compliance và performance, nhưng cũng có thể đem lại những khó khăn trong việc bảo trì và quản lý tài nguyên.

### Shared Database and Separate Schema
Trong mô hình này, tất cả các tenants chia sẻ một database chung, nhưng mỗi tenant có một schema riêng biệt trong database đó.

<p class="center">
<img alt="Shared Database and Separate Schema" src="https://www.baeldung.com/wp-content/uploads/2022/08/separate_schema.png">
</p>

#### Ưu điểm
1. Resource Efficiency: Vì tất cả tenants đều sử dụng chung một database giúp giảm thiểu tài nguyên tiêu thụ (so với **Separate Database**)
2. Easier Management: Một database nên sẽ quản lý dể hơn nhiều databases như mô hình đầu tiên.
3. Cost-Effective: Chỉ sử dụng 1 database giúp giảm thiểu chi phí hạ tầng và bảo trì.
4. Easy Updates and Scaling: Các cập nhật và mở rộng chỉ cần áp dụng một lần cho tất cả các tenants.
5. Data Sharing and Analysis: Cho phép chia sẻ và phân tích dữ liệu giữa các tenant.
6. Compliance: Dễ dàng tuân thủ yêu cầu và quy định trên *tất cả* các tenants *một cách tập trung*.
7. Quicker Deployment: Việc triển khai một tenant mới sẽ đơn giản hơn vì không phải setup thêm database độc lập cho tenant đó. Tuy vậy, cần phải setup schema mới cho mỗi tenant.
#### Nhược điểm
1. Data Security Concerns: Mặc dù mỗi khách hàng có schema riêng của mình, nhưng nếu một issue về bảo mật bị khai thác trên database sẽ ảnh hưởng tới toàn bộ tất cả khách hàng.
2. Cross-Tenant Performance Impact: Tốc độ query của tenant này sẽ ảnh hưởng tới tốc độ query của tenant khác vì share chung 1 database.
3. Data Isolation Complexity: Đảm bảo sự cô lập dữ liệu hoàn toàn giữa các tenants với dữ liệu chung có thể đòi hỏi cơ chế phức tạp.
4. Potential Bottlenecks: Khi số lượng tenants tăng, database chung có thể trở thành bottleneck.
5. Customization Limitations: Các tùy chỉnh cho từng tenant có thể bị hạn chế vì tất cả các tenants đều chia sẻ cùng một database.
6. Backup and Recovery Complexity: Các quy trình sao lưu và khôi phục có thể trở nên phức tạp hơn với dữ liệu chung và nhiều schema (đây cũng có thể là ưu điểm nếu dự án không yêu cầu phải có policy backup/recovery riêng cho từng tenant)

> Lựa chọn kiến này nên xem xét cẩn thận các yếu tố như security, isolation và nhu cầu performance. Mặc dù có thể tiết kiệm tài nguyên và chi phí, nhưng cũng có thể đưa ra những thách thức liên quan đến isolation và khả năng xuất hiện bottleneck trong hiệu suất.

### Shared Database and Shared Schema
Đây là cách *all in one*, tất cả tenants đều xài chùng 1 database và cùng 1 schema. Với cách này thì mỗi table sẽ có thêm 1 column *tenant id* để phân biệt dữ liệu của các tenant.

<p class="center">
<img alt="Shared Database and Shared Schema" src="https://www.baeldung.com/wp-content/uploads/2022/08/shareddatabase.png">
</p>

#### Ưu điểm
1. Resource Efficiency: Như mô hình 2 bên trên.
2. Easier Management: Như mô hình 2 bên trên.
3. Cost-Effective: Như mô hình 2 bên trên.
4. Easy Updates and Scaling: Như mô hình 2 bên trên.
5. Data Sharing and Analysis: Như mô hình 2 bên trên.
6. Compliance:  Như mô hình 2 bên trên.
7. Quicker Deployment: Như mô hình 2 bên trên, nhưng với mô hình này chúng ta không cần phải setup schema riêng cho từng tenant vì thế việc deployment là đơn giản nhất trong 3 mô hình.

#### Nhược điểm
1. Data Isolation: Dữ liệu của các tenants khác nhau được lưu trữ trong cùng một cơ sở dữ liệu và schema, điều này có thể làm nảy sinh lo ngại về cô lập dữ liệu và bảo mật. Như mô hình 2, nếu gặp một issue về bảo mật thì tất cả tenants sẽ đều bị ảnh hưởng.
2. Cross-Tenant Performance Impact: Như mô hình 2 bên trên.
3. Data Isolation Complexity: Như mô hình 2 bên trên.
4. Potential Bottlenecks: Như mô hình 2 bên trên.
5. Customization Limitations: Như mô hình 2 bên trên.
6. Backup and Recovery Complexity: Như mô hình 2 bên trên.
7. Dependency on Schema Changes: Những thay đổi về shared schema có thể ảnh hưởng đến tất cả các tenants, khiến việc nâng cấp và thay đổi trở nên phức tạp hơn.
8. Data Security Concerns: Biện pháp bảo mật phải được thiết kế một cách cẩn thận để ngăn chặn truy cập trái phép vào dữ liệu của khách hàng khác.

> Mặt dù kiến trúc này có thể cung cấp những lợi ích về tối ưu tài nguyên và dễ dàng bảo trì, nó cũng đưa ra những thách thức liên quan đến isolation, customization và performance tiềm năng. Việc xem xét cẩn thận yêu cầu của ứng dụng và bản chất dữ liệu của khách hàng là điều quan trọng để xác định kiến trúc phù hợp nhất.

Ngoài 3 mô hình trên bạn có thể sẽ bắt gặp một số mô hình **hybrid**
1. Mix giữa 1 và 2: VD bản pro có thể là **Separate Database** đảm bảo performance và compliance, bản trial sẽ là **Shared Database and Separate Schema** để tiết kiệm chi phí.
2. Mix giữa 2 và 3: VD bản pro sẽ là **Shared Database and Separate Schema** để đảm bảo isolation, bản trial sẽ là **Shared Database and Shared Schema** để dể deploy (?).
