# JPA 정리



## FK 정리

### N : 1 관계

**다대일 설정시의 FK는 N쪽에 둡니다.**

#### 단방향

```sql
N(Many)

@Entity
public class A {
	@ManyToOne
	@JoinColumn(name = "b_id")
	private B b;
}

1(One)

@Entity
public class B {
	//필드값 없음
}
```

#### 양방향

```sql
N(Many)

@Entity
public class A {
	@ManyToOne
	@JoinColumn(name = "b_id")
	private B b;
}

1(One)

@Entity
public class B {
	@OneToMany(mappedBy="b")
	private Set<A> a;
}
```



### OneToOne(1:1) 설정

일대일 관계에서는 '주테이블'을 정해야 합니다. 주테이블이라는 것은 단독적으로도 사용가능한 테이블을 뜻합니다. 위에가 주테이블, 아래가 대상테이블입니다.

#### 단방향

```sql
주테이블
@Entity
public class A {
    @OneToOne
    @JoinColumn(name = "b_id")
    private B b;
}

대상테이블
@Entity
public class B {
	//필드값 없음
}
```

#### 양방향

```sql
주테이블
@Entity
public class A {
    @OneToOne
    @JoinColumn(name = "b_id")
    private B b;
}

대상테이블
@Entity
public class B {
	@OneToOne(mappedBy = "b")
	private A a;
}
```



### ManyToMany(M:N) 설정

다대다 관계를 구현시에 매핑테이블이 양쪽 테이블의 FK만을 갖는다면, 굳이 엔티티를 만들 필요가 없다. ManyToMany는 Entity클래스로 만들 필요가 없는 매핑 테이블일 경우에 사용합니다.

#### 단방향

```sql
M(many)

@Entity
public class A {
    . . .
@ManyToMany
@JoinTable(name = "a_b", //매핑(연결) 테이블의 이름
  joinColumns = @JoinColumn(name = "a_id"),
  inverseJoinColumns = @JoinColumn(name = "b_id")
private Set<B> b;
}

N(Many)
@Entity
public class B {


    . . .


 //필드값 없음(방향성 없음)
}
```



#### 양방향

```sql
M(many)

@Entity
public class A {
    . . .
@ManyToMany
@JoinTable(name = "a_b", //매핑(연결) 테이블의 이름
  joinColumns = @JoinColumn(name = "a_id"),
  inverseJoinColumns = @JoinColumn(name = "b_id")
private Set<B> b;
}

N(Many)
@Entity
public class B {

    . . .

 //연관관계의 주인은 A클래스
 @ManyToMany(mappedBy = "b")
 private Set<A> A;
}
```

