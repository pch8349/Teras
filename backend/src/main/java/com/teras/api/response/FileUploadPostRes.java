package com.teras.api.response;

import com.teras.common.model.response.BaseResponseBody;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class FileUploadPostRes extends BaseResponseBody{
	String uuid;
	
	public static FileUploadPostRes of(Integer statusCode, String message, String  uuid) {
		FileUploadPostRes res = new FileUploadPostRes();
		res.setStatusCode(statusCode);
		res.setMessage(message);
		res.setUuid(uuid);
		return res;
	}
}
