package com.teras.api.service;

import com.google.gson.JsonObject;

public interface OpenviduService {
	JsonObject createRoom();
	void deleteRoom();
	void enterRoom();
	void leaveRoom();
	void fetchInfo();
	void fetchAll();
	
}
