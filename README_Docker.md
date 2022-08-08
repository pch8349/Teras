# Docker 배포

## 1. Dockerfile 만들기

- **Dockerfile은 최상위 루트 프로젝트 경로에 위치 시킨다. 파일 이름은 Dockerfile이라고 저장해야 한다.**

```docker
FROM openjdk:8-jdk-alpine
CMD ["./mvnw"."clean","package"]
ARG JAR_FILE_PATH=build/libs/*.jar
COPY ${JAR_FILE_PATH} app.jar
ENTRYPOINT ["java", "-jar", "app.jar"]
```

## 2. Dockerfile로 이미지 빌드하기

```docker
$ docker build -t dockerId/dockerHubRepository
$ docker run dockerId/dockerHubRepository
```

- 해당 프로젝트에서 terminal을 실행시켜 build 명령어로 -t 태그 옵션을 줘서 name:tag 줘서 빌드한다.
- local 환경에서 먼저 배포해본다.

## 3. Docker push 하기

```docker
$ docker push dockerHubId/dockerHubRepository
```

- 해당 명령어로 docker에 push 해준다.

## 4. 배포 환경에서 설정

```docker
$ sudo yum install docker
$ sudo systemctl start docker # docker 실행
$ sudo systemctl status docker # docker 상태 확인
```

- 상태를 확인하였을 때, 초록색 글씨로 active(running)이 나오면 Docker 실행 완료

## 5. 배포 환경에서 Docker pull 받기

```docker
$ sudo docker pull dockerHubId/dockerHubRepository
```

- 배포 환경에서 docker image를 pull 받는다.

## 6. 배포 환경에서 Docker 실행

```docker
$ # sudo nohup docker run -p {host 포트}/{container 포트} {docker hub 계정명}/{docker hub repository명}
$ sudo docker run -p 8080:8080 dockerHubId/dockerHubRepository

$ sudo docker ps # 실행 중인 도커 컨테이너 목록 확인
$ sudo docker ps -a # 가지고 있는 모든 도커 컨테이너 목록 확인
```

## 배포 Tip

```java
MySQL과 연결할 때
application.properties 파일의 mySQL 좌표를 변경해주어야 된다.

ex)
spring.datasource.url=jdbc:mysql://i7a706.p.ssafy.io:3306/teras?useUnicode=true&characterEncoding=utf8&serverTimezone=Asia/Seoul&zeroDateTimeBehavior=convertToNull&rewriteBatchedStatements=true&userSSL=false&validationQuery="select 1"

*/ jdbc:mysql://도메인:포트/테이블명 으로 설정해준다. */

```

- 추후 업데이트 예정
