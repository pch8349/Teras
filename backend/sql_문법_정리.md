# SQL 문법 정리

## 데이터베이스 생성/삭제

```sql
create database mydata; #데이터베이스 생성
show databases; #데이터베이스 목록 보기
drop database mydata; #데이터베이스 삭제
use mydata; #데이터베이스 사용
```



## 테이블 생성/삭제

```sql
create table myproduct (
   mykey int,
    product_id text,
    title text,
    ori_price int,
    discount_price int,
    discount_percent int,
    deleverty text,
    primary key(mykey)
    );
    
show tables; #테이블 조회
desc myproduct; #myproduct 테이블 조회
drop table myproduct; #테이블 삭제

## 테이블에 새로운 칼럼 추가
alter table customer_db add column model_type varchar(10) not null;
desc customer_db;
ALTER TABLE [테이블명] ADD COLUMN [추가할 컬럼명] [추가할 컬럼 데이터형]

## 테이블의 컬럼 타입 변경
alter table cutomer_db modify column name varchar(20) not null;
desc customer_db;
ALTER TABLE [테이블명] MODIFY COLUMN [변경할 컬럼명] [변경할 컬럼 타입]

## 테이블의 컬럼 이름 변경
alter table customer_db change column name modelname varchar(20) not null;
desc customer_db;
ALTER TABLE [테이블명] CHANGE COLUMN [기존 컬럼 명] [변경할 컬럼 명] [변경할 컬럼 타입]

## 테이블의 컬럼 삭제
alter table customer_db drop column age;
desc customer_db;
ALTER TABLE [테이블명] DROP COLUMN [삭제할 컬럼 명]

```



## 타입별 데이터

#### 숫자형

![숫자형데이터타입](C:\Users\SSAFY\Downloads\숫자형데이터타입.png)



#### 문자형

![문자형데이터타입](C:\Users\SSAFY\Downloads\문자형데이터타입.png)



#### 시간형

![시간형데이터타입](C:\Users\SSAFY\Downloads\시간형데이터타입.png)





## 데이터 CRUD

**CRUD = create, read, update, delete**



### 데이터 쓰기(create)

```sql
Use mydata;
show tables;
desc mytable;

## 테이블의 전체 컬럼에 대응하는 값을 모두 넣는 방법
insert into mytable values (1, 'i7', '7700', 'kaby lake');
select * from mytable;

INSERT INTO 테이블명 VALUES (value1, value2, value3, ... );

## 테이블의 특정 컬럼에 대응하는 값만 넣는 방법
alter table mytable modify column model_type varchar(30) not null;

INSERT INTO mytable (name, model_num, model_type) VALUES('i7', '7700', 'Kaby Lake');
INSERT INTO mytable (name, model_num, model_type) VALUES('i5', '9600K', 'Coffee Lake Refresh');
INSERT INTO mytable (name, model_num, model_type) VALUES('i5', '9400K', 'Coffee Lake Refresh');
INSERT INTO mytable (name, model_num, model_type) VALUES('i7', '9700K', 'Coffee Lake Refresh');
INSERT INTO mytable (name, model_num, model_type) VALUES('I7', '9700K', 'Coffee Lake Refresh');
INSERT INTO mytable (name, model_num, model_type) VALUES('i5', '8500K', 'Coffee Lake Refresh');
SELECT * FROM mytable;

INSERT INTO 테이블명 (컬럼명1, 컬럼명2, 컬럼명3, ... ) VALUES (value1, value2, value3, ... );
```





### 데이터 읽기(read)

```sql
## 데이터 읽기
select * from mytable; # *는 해당 테이블에 존재하는 모든 컬럼을 뜻한다.
SELECT 컬럼명1, 컬럼명2, ... FROM 테이블명;


## 테이블에서 특정 컬럼의 데이터만을 읽어오되, 표시할 컬럼명도 변경하는 방법
SELECT name AS cpu_name, model_num AS cpu_num FROM mytable;
SELECT 컬럼명1 AS 변경할 컬럼명1, 컬럼명2 AS 변경할 컬럼명2, ... FROM 테이블명;


## 테이블의 컬럼 데이털르 정렬해서 읽는 방법
select id, name from mytable order by id desc;
select id, name model_type from mytable order by model_type asc;

SELECT 컬럼명1, 컬럼명2, ... FROM 테이블명 ORDER BY 정렬할 기준 컬럼명 DESC or ASC;
#desc는 내림차순, asc는 오름차순


## 조건에 맞는 컬럼의 데이터만 읽는 방법(where 조건문을 활용)
select * from mytable where id<5;
select * from mytable where id>3 and id<7;

SELECT 컬럼명1, 컬럼명2, ... FROM 테이블명 WHERE 컬럼명 + 조건;


## 조건에 맞는 컬럼의 데이터만 읽는 방법(where 조건문과 like 활용)
select * from mytable where model_type like '%lake%';
select * from mytable where model_type like 'kaby____';

SELECT *(or 컬럼명) FROM 테이블명 WHERE 컬럼명 LIKE 조건;

ex1> Lake로 시작되는 값을 모두 찾는 경우
select * from 테이블명 where 컬럼명 like 'Lake%';

ex2) Lake가 들어간 값을 모두 찾는 경우
SELECT *(or 컬럼명) FROM 테이블명 WHERE 컬럼명 LIKE '%Lake%';

ex3) Lake로 시작되고 뒤에 글자 2개가 붙는 값을 모두 찾는 경우
SELECT *(or 컬럼명) FROM 테이블명 WHERE 컬럼명 LIKE 'Lake__';


## 결과 중 일부의 데이터만을 읽어오는 방법(limit을 활용)
select * from mytable limit 5;
select * from mytable limit 2, 2;

SELECT *(or 컬럼명) FROM 테이블명 LIMIT 결과에서 가져올 데이터 개수;
SELECT *(or 컬럼명) FROM 테이블명 LIMIT 숫자1, 숫자2;

# SELECT *(or 컬럼명) FROM 테이블명 LIMIT 숫자1, 숫자2 코드에서 숫자1은 데이터의 인덱스 번호와 데이터를 가져오는 시작점을 의미하고, 숫자2는 결과에서 가져올 데이터 개수를 뜻한다.
```





### 데이터 수정(update)

```sql
## 테이블에 저장된 데이터를 수정하는 방법
update mytable set name = 'i3' where id = 3;
update mytable set name = 'i3', model_num = '5500K', model_type = 'Kaby Lake';
select * from mytable

UPDATE 테이블명 SET 수정하고 싶은 컬럼명 = '수정하고 싶은 값' WHERE 컬럼명 + 조건;
UPDATE 테이블명 SET 수정하고 싶은 컬럼명1 = '수정하고 싶은 값', 수정하고 싶은 컬럼명2 = '수정하고 싶은 값',
... WHERE 컬럼명 + 조건; 
```





### 데이터 삭제(delete)

```sql
## 테이블에 저장된 데이터를 삭제하는 방법
delete from mytable where id = 1;
select * from mytable;

DELETE FROM 테이블명 WHERE 컬럼명 + 조건;
DELETE FROM 테이블명;
```

