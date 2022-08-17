package com.teras.api.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.teras.api.response.AttendanceDayGetRes;
import com.teras.api.service.AttendanceService;
import com.teras.common.auth.SsafyUserDetails;
import com.teras.common.model.response.BaseResponseBody;

import io.swagger.annotations.Api;
import lombok.AllArgsConstructor;
import springfox.documentation.annotations.ApiIgnore;

@Api(value = "출석 API", tags = { "Attendance" })
@AllArgsConstructor
@RestController
@RequestMapping("/attendance")
public class AttendanceController {

	@Autowired
	AttendanceService attendanceService;
	
	@GetMapping
	public ResponseEntity<? extends BaseResponseBody> getAttendance(@ApiIgnore Authentication authentication) {
		SsafyUserDetails userDetails = (SsafyUserDetails) authentication.getDetails();
		String userId = userDetails.getUsername();
		
		
		return ResponseEntity.status(200).body(AttendanceDayGetRes.of(200, "SUCCESS", 0));
	}
}
