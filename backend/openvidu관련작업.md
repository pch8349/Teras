## openvidu 보안 작업

애플리케이션 서버가 Java 또는 Node인 경우 OpenVidu Java Client 또는 OpenVidu Node Client SDK를 사용할 수 있습니다.

아래 스니펫에서 **OPENVIDU_URL** 및 **OPENVIDU_SECRET** 매개변수 를 적절한 것으로 변경하면 됩니다.

1. openvidu 서버에서 세션 초기화

   ```
   OpenVidu openvidu = new OpenVidu(OPENVIDU_URL, OPENVIDU_SECRET);
   SessionProperties properties = new SessionProperties.Builder().build();
   Session session = openVidu.createSession(properties);
   ```

   

2. 토큰 생성

```
OpenVidu openvidu = new OpenVidu(OPENVIDU_URL, OPENVIDU_SECRET);
SessionProperties properties = new SessionProperties.Builder().build();
Session session = openVidu.createSession(properties);
```

