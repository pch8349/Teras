package com.teras.api.service;

import org.springframework.security.core.Authentication;

import com.google.gson.JsonObject;
import com.teras.api.request.OpenviduRegisterPostReq;
import com.teras.db.dto.OpenviduDto;
import com.teras.db.entity.Openvidu;

public interface OpenviduService {
	JsonObject createRoom();
	void deleteRoom();
	void enterRoom();
	void leaveRoom();
	void fetchInfo();
	void fetchAll();
	Openvidu createSession(OpenviduRegisterPostReq registerInfo, String userId);
	OpenviduDto searchOpenvidu(String sessionId);
	Openvidu endInfo(Authentication authentication,String sessionId);
	void deletePost(String sessionId);

	
}
	