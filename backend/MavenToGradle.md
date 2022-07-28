1. maven 빌드가 있는 프로젝트로 이동 후 pom.xml이 있는 경로에서 명령어 실행

   ```
   $ gradle init
   
   Starting a Gradle Daemon (subsequent builds will be faster)
   
   Found a Maven build. Generate a Gradle build from this? (default: yes) [yes, no] 
   ```

   default:yes로 엔터 실행



2.

```
Select build script DSL:
  1: Groovy
  2: Kotlin
Enter selection (default: Groovy) [1..2] 
```

groovy 나 kotlin 선택하여 실행



3.

```
$ gradle build
```

build 명령어로 gradle이 빌드 실행



4.

refresh

```
Package Explorer --- 프로젝트명 우클릭 --- Refresh
gradle 폴더, build.gradle, gradlew, gradlew.bat, settings.gradle 파일 생성된 것을 확인
```

5.

gradle 변환

```
Package Explorer --- 프로젝트명 우클릭 --- Configure... --- Convert to Gradle (STS) Project
```

6.

maven 기능 비활성화

```
Package Explorer --- 프로젝트명 우클릭 --- Maven --- Disable Maven Nature
```

