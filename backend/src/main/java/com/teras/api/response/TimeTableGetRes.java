package com.teras.api.response;

import java.util.List;

import com.teras.common.model.response.BaseResponseBody;
import com.teras.db.Dto.TimeTableDto;

import io.swagger.annotations.ApiModel;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@ApiModel("TimeTableGetRes")
public class TimeTableGetRes extends BaseResponseBody{
	List<TimeTableDto> list;
	
	public static TimeTableGetRes of(Integer statusCode, String message, List<TimeTableDto> list) {
		TimeTableGetRes res = new TimeTableGetRes();
		res.setStatusCode(statusCode);
		res.setMessage(message);
		res.setList(list);
		
//		for(TimeTableDto dto : res.getList()) {
//			System.out.println(dto);
//		}
		
		return res;
	}
}
