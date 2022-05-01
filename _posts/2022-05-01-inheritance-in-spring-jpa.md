---
title: Inheritance in spring jpa
layout: post
comments: true
category: programming
description: Tính thừa kế là 1 trong những key concepts của java và dĩ nhiên là bạn
  có thể sử dụng nó trong các data models của mình, nhưng nếu bạn muốn map models
  xuống relational db thì khả năng cao là bạn sẽ gặp bug ngập mồm vì bản chất của
  mấy ông relational db này không có khái niệm về kế thừa :)) Thế nhưng các cao nhân
  vẫn chế ra cách để ông inheriance models map được với ông relational db qua cái
  cầu jpa hibernate.
---

Trong jpa hibernate thì có 4 cách chính để kế thừa domain models, mỗi cách có ưu nhược điểm riêng. Tôi sẽ giới thiệu ngay bên dưới kèm theo bài toán như sau:

> Tôi có 1 db lưu 1 danh sách các owners và các pets của mấy ông đó, pet của tôi có 2 loại là fish và bird. Vì fish và bird đều là pet nên tôi nghỉ ngay đến cho 2 ông này kế thừa từ class pet, và thế là ta sẽ có bài toán inheritance models ngay bên dưới.

### Mapped superclass
Đây là cách đơn giản nhất vì nó map mỗi subclass thành 1 table riêng biệt.

Owner
```java
@Entity
@Getter
@Setter
public class Owner {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private String firstName;

    @Column
    private String lastName;

    @OneToMany(mappedBy = "owner")
    private Set<Fish> fish;

    @OneToMany(mappedBy = "owner")
    private Set<Bird> birds;
}
```

Pet
```java
@MappedSuperclass
@Getter
@Setter
public abstract class Pet {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column
    private String name;

    @Column
    private int age;

    @Column
    private float weight;

    @ManyToOne
    private Owner owner;
}

```

> Nhớ set annotation `@MappedSuperclass` cho base class nhé không có nó hibernate nó ignore hết mapping info của base class đấy :))

Bird
```java
@Entity
@Getter
@Setter
public class Bird extends Pet {
    @Column
    private String featherColor;
}
```

Fish
```java
@Entity
@Getter
@Setter
public class Fish extends Pet {
    @Column
    private boolean isSaltwaterFish;
}
```

Như hình bên dưới, chỉ có 3 tables được tạo ra, mọi thứ có vẻ khá mượt. Nhưng nó có 1 nhược điểm khá lớn đó là base class của tôi không phải là 1 entity vì thế thôi không thể query để get tất các pets của 1 owner nào đó (trừ khi tôi get từng field birds và fish) hoặc các loại query tương tự :)) -> none polymorphic queries.
Ngoài ra bạn có thể thấy entity `Owner` phải define 2 ông birds và fish riêng biệt mà không gom lại pets được, nói toẹt ra là cách này không chơi với bi-directional relationship, muốn bi-directional thì phải tách ra làm 2 như bên trên :))
![](/assets/img/posts/inherirance1.PNG)

Nếu bạn chỉ muốn state và mapping info giữa các entities thì cách này khá tốt, nhưng nếu muốn xài bi-directional relationship thì cách này khá đuối :))

Giờ tôi sẽ thực hiện 1 câu truy vấn đơn giản lấy tất cả birds có trong db.

```java
List<Bird> birds = em.createQuery("select b from Bird b", Bird.class).getResultList();
```

Và đây là câu truy vấn được hibernate gen ra, tất cả các fields được map tới base khá đầy đủ.
```sql
select bird0_.id as id1_0_, bird0_.age as age2_0_, bird0_.name as name3_0_, bird0_.owner_id as owner_id6_0_, bird0_.weight as weight4_0_, bird0_.feather_color as feather_5_0_ from bird bird0_
```

### Table per class
Nghe có vẻ giống cách bên trên, mỗi class 1 table, nhưng cách này sẽ cover được 1 số nhược điểm mà cách bên trên gặp phải. Với cách này thì ông base class sẽ được coi như 1 entity và mỗi subclass kế thừa từ base cũng sẽ có 1 table riêng cho nó.

Owner
```java
@Entity
@Getter
@Setter
public class Owner {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private String firstName;

    @Column
    private String lastName;

    @OneToMany(mappedBy = "owner")
    private Set<Pet> pets;
}
```

Giờ tôi có thể gom fish và birds lại làm 1 là pets rồi.

Pet
```java
@Entity
@Inheritance(strategy = InheritanceType.TABLE_PER_CLASS)
@Getter
@Setter
public abstract class Pet {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column
    private String name;

    @Column
    private int age;

    @Column
    private float weight;

    @ManyToOne
    private Owner owner;
}
```

> Ở Pet entity chúng ta sẽ remove `@MappedSuperclass` và thay thế bằng `@Inheritance(strategy = InheritanceType.TABLE_PER_CLASS)`, các entity Bird và Fish sẽ không cần đổi.

Về mặt db thì nó có vẻ chả khác gì với cách 1, vẫn tạo ra 2 tables riêng cho 2 ông Bird và Fish, nhưng chú ý 1 tí thì ta sẽ thấy `GeneratedValue` strategy của `id` field phải là `AUTO` hoặc `TABLE`, id của cả 2 tables fish và bird đều phải unique chứ không phải là chỉ cần unique trong từng table là xong :)) Nếu lookup 1 ông pet thì jpa sẽ phải lookup trong cả 2 tables chứ không phải 1. Nói chung cách này xài sướng, nhưng mà code sql gen ra thì nhìn sẽ khá tỡm vì nó phải map và lookup tùm lum.

Giờ tôi sẽ lấy tất cả tên pet của 1 ông author có id là 1 như sau:

```java
Owner owner = em.createQuery("select owner from Owner owner where owner.id = 1", Owner.class).getSingleResult();
for (Pet pet : owner.getPets()) {
	if (pet instanceof Bird) {
		System.out.println("Bird: " + pet.getName());
	} else if (pet instanceof Fish) {
		System.out.println("Fish: " + pet.getName());
	}
}
```

Khá clear, tôi sẽ không quan tâm đó là bird hay là fish, tất cả đều là pet cả.

Còn đây là câu lệnh truy vấn mà hibernate gen ra:

```sql
select owner0_.id as id1_2_, owner0_.first_name as first_na2_2_, owner0_.last_name as last_nam3_2_ from owner owner0_ where owner0_.id=1
select pets0_.owner_id as owner_id5_3_0_, pets0_.id as id1_3_0_, pets0_.id as id1_3_1_, pets0_.age as age2_3_1_, pets0_.name as name3_3_1_, pets0_.owner_id as owner_id5_3_1_, pets0_.weight as weight4_3_1_, pets0_.feather_color as feather_1_0_1_, pets0_.is_saltwater_fish as is_saltw1_1_1_, pets0_.clazz_ as clazz_1_ from ( select id, age, name, weight, owner_id, feather_color, null as is_saltwater_fish, 1 as clazz_ from bird union all select id, age, name, weight, owner_id, null as feather_color, is_saltwater_fish, 2 as clazz_ from fish ) pets0_ where pets0_.owner_id=?
```

Nhìn đã không muốn đọc rồi :)) Vì nó phải join tùm lum nên sẽ có vấn đề về perfomance nếu tables có nhiều records hoặc có nhiều subclasses. Xài sướng thôi chưa đủ, sướng nhưng phải nhanh hoặc ít nhất là cân bằng được 2 yếu tố đó, vì thế nên ta tiếp tục nguyên cứu cách tiếp theo :))

### Single table
Với cách này thì chỉ có 1 table for all, trong trường hợp các subclasses có các fields khác nhau thì nó sẽ gom lại hết, ông nào không xài thì null :))

2 entities Bird và Fish sẽ có các subsets của các fields như hình bên dưới, trong đó A và C là các subsets chỉ có trong 2 entities, còn B là subset chung, với cách này thì số columns của table = A + B + C.

![](/assets/img/posts/inherirance3.1.PNG)


Vì chung 1 table nên vấn đề perfomance ở cách 2 sẽ được giải quyết, và cũng vì chung table nên nó lại tòi ra vấn đề :))
1. Tất cả các fields của các entities đều map chung vào 1 table, nhưng mỗi entity chỉ dùng 1 subset của các columns trong table đó thôi, phần còn lại sẽ null.
2. Vì phần còn lại null nên ta sẽ gặp vấn đề về là không thể dùng `not null` constraints trên mấy columns đó. Như hình trên thì A và C phải nullable.

Khi lưu hoặc truy vấn các entities trong cùng 1 table thì hibernate phải có cách nào đó để phân biệt được record đó sẽ map với entity nào, vì thế mỗi record trong table sẽ có thêm 1 cell để lưu thông tin phân biệt ông đó là ông nào nữa.

Pet
```java
@Entity
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
@DiscriminatorColumn(name = "type")
@Getter
@Setter
public abstract class Pet {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column
    private String name;

    @Column
    private int age;

    @Column
    private float weight;

    @ManyToOne
    private Owner owner;
}
```

> 1. `InheritanceType.TABLE_PER_CLASS` chuyển thành `InheritanceType.SINGLE_TABLE`.
> 2. `@DiscriminatorColumn(name = "type")` để định nghĩa column chứa thông tin để phân biệt các ông entities, `name` sẽ là column name trong table. Mặt định thì column type sẽ là string, hiện tại jpa cung cấp 3 sự lựa chọn là `STRING` `CHAR` và `INTEGER`.

Ngoài ra tôi sẽ nhét thêm `@DiscriminatorValue` vào các subclass entity để define value trong `DiscriminatorColumn` của table. Nếu không define ông `DiscriminatorValue` thì hibernate sẽ bốc mặt định tên của entity.

Bird
```java
@Entity
@DiscriminatorValue("Bird")
@Getter
@Setter
public class Bird extends Pet {
    @Column
    private String featherColor;
}
```

Fish
```java
@Entity
@DiscriminatorValue("Fish")
@Getter
@Setter
public class Fish extends Pet {
    @Column
    private Boolean isSaltwaterFish;
}
```

Nếu follow settings như bên trên thì khi column `type` trong table chứa value là **Bird** thì ông đó là trym, còn ngược lại nếu là **Fish** thì là cá :))

Nhìn hình dưới thì chúng ta chỉ cần 2 tables để lưu thay vì 3 như 2 ông trên :))
![](/assets/img/posts/inherirance3.2.PNG)

OK, giờ tôi sẽ lấy tất cả trym ra, code y cách 1, nhưng sql được gen ra sẽ hơi khác, sẽ có 1 where condition được thêm vào để check `type` column có phải **Bird** không.
```sql
select bird0_.id as id2_1_, bird0_.age as age3_1_, bird0_.name as name4_1_, bird0_.owner_id as owner_id8_1_, bird0_.weight as weight5_1_, bird0_.feather_color as feather_6_1_ from pet bird0_ where bird0_.type='Bird'
```

Nếu tôi lấy tất cả tên pet của 1 ông author có id là 1 như cách 2 bên trên thì câu lệnh sql được gen ra sẽ như sau:
```sql
select owner0_.id as id1_0_, owner0_.first_name as first_na2_0_, owner0_.last_name as last_nam3_0_ from owner owner0_ where owner0_.id=1
select pets0_.owner_id as owner_id8_1_0_, pets0_.id as id2_1_0_, pets0_.id as id2_1_1_, pets0_.age as age3_1_1_, pets0_.name as name4_1_1_, pets0_.owner_id as owner_id8_1_1_, pets0_.weight as weight5_1_1_, pets0_.feather_color as feather_6_1_1_, pets0_.is_saltwater_fish as is_saltw7_1_1_, pets0_.type as type1_1_1_ from pet pets0_ where pets0_.owner_id=?
```
No more join :))

> Nếu muốn lấy discriminator column thì cứ define thêm 1 column cùng tên với  discriminator column trong entity như thường, jpa sẽ tự map vào cho.

### Joined
Hết mỗi ông 1 table đến nhét chung tất cả vào 1 table, bây giờ chúng ta sẽ có cách mới đó là nữa tách nữa không, nên tôi hay gọi cách này là lẩu thập cẩm :)) Với cách này thì mỗi ông 1 table theo nghĩa đen, nghĩa là kể cả ông base entity cũng được cấp cho 1 table nốt :)) Như thế chúng ta sẽ có tới 4 tables (owner, pet, fish và bird).
Table của mỗi subclass sẽ nhỏ hơn nếu so với cách 2 (table per class), vì mỗi superclass chỉ chứa id và các columns riêng của nó, mấy ông chung sẽ nằm hết vào table base (pet).

Pet
```java
@Entity
@Inheritance(strategy = InheritanceType.JOINED)
@Getter
@Setter
public abstract class Pet {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column
    private String name;

    @Column
    private int age;

    @Column
    private float weight;

    @ManyToOne
    private Owner owner;
}
```

> Remove `DiscriminatorColumn` và set `InheritanceType` là  `JOIN`, với cách này thì ta không cần care `DiscriminatorValue` nữa, remove luôn.

Tables được tạo ra như hình bên dưới, số tables nhiều hơn nhưng có vẻ clear hơn :))
![](/assets/img/posts/inherirance4.PNG)

Vì tách ra như thế này nên mỗi query trên subclass thì jpa phải join với ông base table (pet) vì thế nó làm tăng độ phức tạp của câu truy vấn nhưng lợi cái là `not null` constraints lại có thể xài thỏa mái, cái này cách 3 không làm được :))

OK, giờ thử truy vấn xem sao nhé. Lấy tất cả trym ra như cách 1 và 3
```sql
select bird0_.id as id1_3_, bird0_1_.age as age2_3_, bird0_1_.name as name3_3_, bird0_1_.owner_id as owner_id5_3_, bird0_1_.weight as weight4_3_, bird0_.feather_color as feather_1_0_ from bird bird0_ inner join pet bird0_1_ on bird0_.id=bird0_1_.id
```
Câu truy vấn có vẻ dài hơn vì nó phải join 2 ông bird và pet với nhau -> perfomance sẽ không bằng cách 3.
Lấy tất cả tên pet của 1 ông author có id là 1 như cách 2 và 3 bên trên:
```sql
select owner0_.id as id1_2_, owner0_.first_name as first_na2_2_, owner0_.last_name as last_nam3_2_ from owner owner0_ where owner0_.id=1
select pets0_.owner_id as owner_id5_3_0_, pets0_.id as id1_3_0_, pets0_.id as id1_3_1_, pets0_.age as age2_3_1_, pets0_.name as name3_3_1_, pets0_.owner_id as owner_id5_3_1_, pets0_.weight as weight4_3_1_, pets0_1_.feather_color as feather_1_0_1_, pets0_2_.is_saltwater_fish as is_saltw1_1_1_, case when pets0_1_.id is not null then 1 when pets0_2_.id is not null then 2 when pets0_.id is not null then 0 end as clazz_1_ from pet pets0_ left outer join bird pets0_1_ on pets0_.id=pets0_1_.id left outer join fish pets0_2_ on pets0_.id=pets0_2_.id where pets0_.owner_id=?
```
Cũng hơi kinh vì phải join pet với tất cả các subclasses, dù sao thì cũng đỡ hơn cách 2 :))

## Conclusion
Như tôi chém gió bên trên, mỗi cách đều có ưu nhược điểm riêng, có ông best perfomance nhưng lại gặp các vấn đề về mở rộng cũng như data integrity, ông lại bad perfomance nhưng lại dể hiểu dể dùng :))

Chốt lại thì thế này:
1. Mapped superclass: đơn giản, chỉ là kế thừa mapping information, nhưng gặp vấn đề với bi-directional relationship cũng như polymorphic queries.
2. Table per class: chậm nhưng dể dùng.
3. Single table: nhanh nhưng gặp vấn đề về data integrity (not null constraints)
4. Joined: tốc độ hơn 2 nhưng thua 3, giải quyết được data integrity.
