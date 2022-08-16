package com.teras.api.controller;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.google.gson.JsonObject;
import com.teras.api.request.OpenviduPostReq;
import com.teras.api.request.OpenviduRegisterPostReq;
import com.teras.api.request.OpenviduRemoveUserReq;
import com.teras.api.response.OpenviduGetRes;
import com.teras.api.response.OpenviduPostRes;
import com.teras.api.service.OpenviduService;
import com.teras.common.auth.SsafyUserDetails;
import com.teras.common.model.response.BaseResponseBody;
import com.teras.db.dto.OpenviduDto;
import com.teras.db.entity.Openvidu;

import io.openvidu.java.client.ConnectionProperties;
import io.openvidu.java.client.ConnectionType;
import io.openvidu.java.client.OpenVidu;
import io.openvidu.java.client.OpenViduException;
import io.openvidu.java.client.OpenViduHttpException;
import io.openvidu.java.client.OpenViduJavaClientException;
import io.openvidu.java.client.OpenViduRole;
import io.openvidu.java.client.Session;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import lombok.var;
import springfox.documentation.annotations.ApiIgnore;

@Api(value = "openvidu처리 API", tags = { "Openvidu." })
@RestController
@RequestMapping("/api/openvidu")
public class OpenviduController {

	// OpenVidu object as entrypoint of the SDK
	private OpenVidu openVidu;

	// Collection to pair session names and OpenVidu Session objects
	private Map<String, Session> mapSessions = new ConcurrentHashMap<>();
	// Collection to pair session names and tokens (the inner Map pairs tokens and
	// role associated)
	private Map<String, Map<String, OpenViduRole>> mapSessionNamesTokens = new ConcurrentHashMap<>();
	// Collection to pair session names and recording objects
	private Map<String, Boolean> sessionRecordings = new ConcurrentHashMap<>();

	// URL where our OpenVidu server is listening
	private String OPENVIDU_URL;
	// Secret shared with our OpenVidu server
	private String SECRET;

	@Autowired
	OpenviduService openviduService;

	@Autowired
	public OpenviduController(@Value("${openvidu.secret}") String secret,
			@Value("${openvidu.url}") String openviduUrl) {
		this.SECRET = secret;
		this.OPENVIDU_URL = openviduUrl;
		this.openVidu = new OpenVidu(OPENVIDU_URL, SECRET);
	}

	@PostMapping
	public ResponseEntity<? extends BaseResponseBody> registerSession(@ApiIgnore Authentication authentication,
			@RequestBody OpenviduRegisterPostReq registerInfo) {
		SsafyUserDetails userDetails = (SsafyUserDetails) authentication.getDetails();
		String userId = userDetails.getUsername();

		Openvidu openvidu = openviduService.createSession(registerInfo, userId);

		return ResponseEntity.status(200).body(BaseResponseBody.of(200, "SUCCESS"));
	}
	
	@GetMapping("/{sessionId}")
	public ResponseEntity<? extends BaseResponseBody> getOpenvidu(@PathVariable(name = "sessionId") String sessionId) {
		
		OpenviduDto openvidu = openviduService.searchOpenvidu(sessionId);
		
		return ResponseEntity.status(200).body(OpenviduGetRes.of(200, "SUCCESS", openvidu));
	}

	@DeleteMapping("/del/{sessionId}")
	public ResponseEntity<? extends BaseResponseBody> deleteOpenvidu(@ApiIgnore Authentication authentication,
			@PathVariable(name = "sessionId") String sessionId) {
		
//		SsafyUserDetails userDetails = (SsafyUserDetails) authentication.getDetails();
//		String userId = userDetails.getUsername();
		//OpenviduDto openvidu = openviduService.searchOpenvidu(sessionId);
		//db업데이트
		openviduService.endInfo(sessionId);
		
		return ResponseEntity.status(200).body(BaseResponseBody.of(200, "SUCCESS"));
	}
//	@ApiOperation(value = "get session 토큰", notes = "세션 id의 정보로 토큰을 가져온다.")
//	@PostMapping("/get-token")
//	public ResponseEntity<OpenviduPostRes> getToken(
//			@RequestBody @ApiParam(value = "getToken", required = true) OpenviduPostReq openviduPostReq) {
//
//		System.out.println("Getting sessionId and token | {sessionName}=" + openviduPostReq.getSessionName());
//		String sessionName = openviduPostReq.getSessionName();
//
//		// The video-call to connect ("TUTORIAL")
//
//		// Role associated to this user
//		OpenViduRole role = OpenViduRole.PUBLISHER;
//
//		// Build connectionProperties object with the serverData and the role
//		ConnectionProperties connectionProperties = new ConnectionProperties.Builder().type(ConnectionType.WEBRTC)
//				.role(role).data("").build();
//
//		// enterRoom
//		// 세션이 있으면 -> 참가자로서 입장
//		if (this.mapSessions.get(sessionName) != null) {
//			// Session already exists
//			System.out.println("Existing session " + sessionName);
//			try {
//
//				// Generate a new token with the recently created connectionProperties
//				String token = this.mapSessions.get(sessionName).createConnection(connectionProperties).getToken();
//
//				// Update our collection storing the new token
//				this.mapSessionNamesTokens.get(sessionName).put(token, role);
//
//				// Prepare the response with the token
//				// Return the response to the client
//				return ResponseEntity.ok(OpenviduPostRes.of(200, "Success", token));
//
//			} catch (OpenViduJavaClientException e1) {
//				// If internal error generate an error message and return it to client
//				return ResponseEntity.status(401).body(OpenviduPostRes.of(401, "Invalid", null));
//			} catch (OpenViduHttpException e2) {
//				if (404 == e2.getStatus()) {
//					// Invalid sessionId (user left unexpectedly). Session object is not valid
//					// anymore. Clean collections and continue as new session
//					this.mapSessions.remove(sessionName);
//					this.mapSessionNamesTokens.remove(sessionName);
//				}
//			}
//		}
//
//		// New session 새로운 방 생성
//		try {
//			// Create a new OpenVidu Session
//			// System.out.println("hello");
//			Session session = this.openVidu.createSession();
//			System.out.println("New session " + sessionName);
//			// Generate a new token with the recently created connectionProperties
//			String token = session.createConnection(connectionProperties).getToken();
//
//			// Store the session and the token in our collections
//			this.mapSessions.put(sessionName, session);
//			this.mapSessionNamesTokens.put(sessionName, new ConcurrentHashMap<>());
//			this.mapSessionNamesTokens.get(sessionName).put(token, role);
//
//			// Prepare the response with the sessionId and the token
//			System.out.println(token);
//			// Return the response to the client
//			return ResponseEntity.ok(OpenviduPostRes.of(200, "Success", token));
//
//		} catch (Exception e) {
//			// If error generate an error message and return it to client
//			return ResponseEntity.status(401).body(OpenviduPostRes.of(401, "Invalid1", null));
//		}
//	}


	
//	@ApiOperation(value = "session 닫기", notes = "해당하는 sessionName의 세션을 지운다.")
//	@RequestMapping(value = "/close-session/{sessionName}", method = RequestMethod.DELETE)
//	public ResponseEntity<? extends BaseResponseBody> closeSession1(@PathVariable  String sessionName) throws Exception {
//
//		System.out.println("Closing session | {sessionName}="+sessionName );
//
//		// Retrieve the param from BODY
//		String session = sessionName;
//
//		// If the session exists
//		if (this.mapSessions.get(session) != null && this.mapSessionNamesTokens.get(session) != null) {
//			Session s = this.mapSessions.get(session);
//			s.close();
//			this.mapSessions.remove(session);
//			this.mapSessionNamesTokens.remove(session);
//			this.sessionRecordings.remove(s.getSessionId());
//			return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success"));
//		} else {
//			// The SESSION does not exist
//			System.out.println("Problems in the app server: the SESSION does not exist");
//			return ResponseEntity.status(500).body(BaseResponseBody.of(500, "Problems in the app server: the SESSION does not exist"));
//		}
//		
//	}

	
	//강제적으로 연결 끊기
	//public ResponseEntity<? extends BaseResponseBody>
	@RequestMapping(value = "/force-disconnect", method = RequestMethod.DELETE)
	public ResponseEntity<? extends BaseResponseBody> forceDisconnect(@RequestBody Map<String, Object> params) {
		try {
			// Retrieve the param from BODY
			String session = (String) params.get("sessionName");
			String sessionId = (String) params.get("sessionId");

			// If the session exists
			if (this.mapSessions.get(session) != null && this.mapSessionNamesTokens.get(session) != null) {
				Session s = this.mapSessions.get(session);
				s.forceDisconnect(sessionId);
				return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success"));
			} else {
				// The SESSION does not exist
				return ResponseEntity.status(500).body(BaseResponseBody.of(500, "Problems in the app server: the SESSION does not exist"));
			}
		} catch (OpenViduJavaClientException | OpenViduHttpException e) {
			e.printStackTrace();
			return getErrorResponse(e);
		}
	}


	private ResponseEntity<? extends BaseResponseBody> getErrorResponse(OpenViduException e) 
	{		
		JsonObject json = new JsonObject();
		json.addProperty("cause", e.getCause().toString());
		json.addProperty("error", e.getMessage());
		json.addProperty("exception", e.getClass().getCanonicalName());
		return ResponseEntity.status(500).body(BaseResponseBody.of(500, "500 error"));
	}
	
	
	
	
	
//	@RequestMapping(value = "/close-session", method = RequestMethod.DELETE)
//	public ResponseEntity<JsonObject> closeSession(@RequestBody Map<String, Object> sessionName) throws Exception {
//		// Retrieve the param from BODY
//		String session = (String) sessionName.get("sessionName");
//		
//		System.out.println("Closing session | {sessionName}=" + session);
//
//		// If the session exists
//		if (this.mapSessions.get(session) != null && this.mapSessionNamesTokens.get(session) != null) {
//			Session s = this.mapSessions.get(session);
//			s.close();
//			this.mapSessions.remove(session);
//			this.mapSessionNamesTokens.remove(session);
//			this.sessionRecordings.remove(s.getSessionId());
////			return new ResponseEntity<>(HttpStatus.OK);
//			return ResponseEntity.status(200).body(BaseResponseBody.of(200, "SUCCESS"));
//		} else {
//			// The SESSION does not exist
//			System.out.println("Problems in the app server: the SESSION does not exist");
////			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
//			return ResponseEntity.status(500).body(BaseResponseBody.of(500, "INTERNAL_SERVER_ERROR"));
//		}
//	}

	
	
	
	//openvidu_classroom 
//	@RequestMapping(value = "/delete/{lessonId}", method = RequestMethod.DELETE)
//	public ResponseEntity<Lesson> deleteLesson(@PathVariable(value = "lessonId") String lessonId) {
//		if (!this.userIsLogged()) { 
//			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
//		}
//
//		long id_lesson = -1;
//		try {
//			id_lesson = Long.parseLong(lessonId);
//		} catch (NumberFormatException e) {
//			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
//		}
//
//		Lesson c = lessonRepository.findById(id_lesson).get();
//
//		checkAuthorization(c, c.getTeacher());
//
//		// Removing the deleted lesson from its attenders
//		Collection<Lesson> lessons = new HashSet<>();
//		lessons.add(c);
//		Collection<User> users = userRepository.findByLessonsIn(lessons);
//		for (User u : users) {
//			u.getLessons().remove(c);
//		}
//		userRepository.saveAll(users);
//		c.getAttenders().clear();
//
//		lessonRepository.delete(c);
//		return new ResponseEntity<>(c, HttpStatus.OK);
//	}
//	
	

}