package com.teras.api.controller;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.mvc.method.annotation.ResponseBodyEmitter;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import com.teras.common.model.response.BaseResponseBody;

import io.openvidu.java.client.ConnectionProperties;
import io.openvidu.java.client.ConnectionType;
import io.openvidu.java.client.OpenVidu;
import io.openvidu.java.client.OpenViduHttpException;
import io.openvidu.java.client.OpenViduJavaClientException;
import io.openvidu.java.client.OpenViduRole;
import io.openvidu.java.client.Session;
import io.openvidu.mvc.java.LoginController;

//void deleteRoom();
//void enterRoom();
//void leaveRoom();
//void fetchInfo();
//void fetchAll();

@RestController("/webRTC")
public class OpenviduController {
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
	
	//방 생성 시 정보
	String sName;
	
	public OpenviduController(@Value("${openvidu.secret}") String secret, @Value("${openvidu.url}") String openviduUrl) {
		this.SECRET = secret;
		this.OPENVIDU_URL = openviduUrl;
		this.openVidu = new OpenVidu(OPENVIDU_URL, SECRET);
	}
	
	//방 생성할 때
	@GetMapping("/enterRoom")
	public ResponseEntity<? extends BaseResponseBody> enterRoom(@RequestParam Map<String,String> sessionName) throws URISyntaxException {
		// 만들 방 정보 받아오기	
		sName = (String) sessionName.get("sessionName");
		System.out.println("sessionName: " + sName);
		
		// Json 형태로 저장
		Gson gson = new Gson();
		JsonObject json = new JsonObject();
		json.addProperty("sessionName", sName);
		System.out.println(json);
		
		// redirect하면서 데이터 전달
		URI uri = new URI("https://i7a706.p.ssafy.io:8080/");
		HttpHeaders httpHeaders = new HttpHeaders();
		httpHeaders.setLocation(uri);
		httpHeaders.add("sessinInfo", sName);

		return ResponseEntity.status(200).body(BaseResponseBody.of(200, "ok"));
	}
	
		
	
	//방 없앨 때
	@DeleteMapping("/deleteRoom")
	public ResponseEntity<? extends BaseResponseBody> deleteRoom(@RequestParam Map<String,String> sessionName) throws Exception {
		// Retrieve the param from BODY
		String session = (String) sessionName.get("sessionName");
			
		System.out.println("Leaving session | {sessionName}=" + session);

		// If the session exists
		if (this.mapSessions.get(session) != null && this.mapSessionNamesTokens.get(session) != null) {
			Session s = this.mapSessions.get(session);
			s.close();
			this.mapSessions.remove(session);
			this.mapSessionNamesTokens.remove(session);
			this.sessionRecordings.remove(s.getSessionId());
			return ResponseEntity.status(200).body(BaseResponseBody.of(200, "ok"));
		} else {
			// The SESSION does not exist
			System.out.println("Problems in the app server: the SESSION does not exist");
			return ResponseEntity.status(500).body(BaseResponseBody.of(500, "server error"));
		}
		
	}
	//fetch-info
	@PostMapping("/fetchInfo")
	public ResponseEntity<? extends BaseResponseBody> fetchInfo(@RequestParam Map<String,Object> sessionName){
		try {
			System.out.println("Fetching session info | {sessionName}=" + sessionName);

			// Retrieve the param from BODY
			String session = (String) sessionName.get("sessionName");

			// If the session exists
			if (this.mapSessions.get(session) != null && this.mapSessionNamesTokens.get(session) != null) {
				Session s = this.mapSessions.get(session);
				boolean changed = s.fetch();
				System.out.println("Any change: " + changed);
				return new ResponseEntity<>(this.sessionToJson(s), HttpStatus.OK);
			} else {
				// The SESSION does not exist
				System.out.println("Problems in the app server: the SESSION does not exist");
				return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
			}
		} catch (OpenViduJavaClientException | OpenViduHttpException e) {
			e.printStackTrace();
			return getErrorResponse(e);
		}
	}
	
	//user login 검사
	private void checkUserLogged(HttpSession httpSession) throws Exception {
		if (httpSession == null || httpSession.getAttribute("loggedUser") == null) {
			throw new Exception("User not logged");
		}
	}	
	@GetMapping("/start")
	public ResponseEntity<? extends BaseResponseBody> openviduStart(@RequestParam String sessionName) {
		
		return ResponseEntity.status(200).body(BaseResponseBody.of(200, "ok"));
	}

}
