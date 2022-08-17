package com.teras.api.response;

import java.util.List;

import com.teras.common.model.response.BaseResponseBody;
import com.teras.db.dto.AssignmentDto;
import com.teras.db.entity.ClassEntity;

import io.swagger.annotations.ApiModel;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ApiModel("AttendanceDayGetRes")
public class AttendanceDayGetRes extends BaseResponseBody{
	int statement;
	
	public static AttendanceDayGetRes of(Integer statusCode, String message, int statement) {
		AttendanceDayGetRes res = new AttendanceDayGetRes();
		res.setStatusCode(statusCode);
		res.setMessage(message);
		res.setStatement(statement);
		return res;
	}
}
