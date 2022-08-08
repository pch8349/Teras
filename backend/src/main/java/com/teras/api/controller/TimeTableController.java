package com.teras.api.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.teras.api.response.TimeTableGetRes;
import com.teras.api.service.TimeTableService;
import com.teras.common.auth.SsafyUserDetails;
import com.teras.db.dto.TimeTableDto;

import io.swagger.annotations.Api;
import springfox.documentation.annotations.ApiIgnore;

/**
 * 유저 관련 API 요청 처리를 위한 컨트롤러 정의.
 */
@Api(value = "유저 API", tags = {"User"})
@RestController
@RequestMapping("/timetable")
public class TimeTableController {
	@Autowired
	TimeTableService timeTableService;
	
	@GetMapping()
	public ResponseEntity<? extends TimeTableGetRes> getTimeTable(@ApiIgnore Authentication authentication) {
		SsafyUserDetails userDetails = (SsafyUserDetails)authentication.getDetails();
		String userId = userDetails.getUsername();
		
		List<TimeTableDto> list = timeTableService.getTimeTable(userId);
//		for(TimeTableDto dto : list) {
//			System.out.println(dto);
//		}
		
		ResponseEntity<TimeTableGetRes> response = ResponseEntity.status(200).body(TimeTableGetRes.of(200, "aaaaa", list));
		
		for(TimeTableDto dto : response.getBody().getList()) {
			System.out.println(dto);
		}
		
		return response;
//		return ResponseEntity.status(200).body(TimeTableGetRes.of(200, "SUCCESS", list));
		
	}
}
