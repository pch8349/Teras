package com.teras.api.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.teras.api.request.AssignRegisterPostReq;
import com.teras.api.response.AssignSearchGetRes;
import com.teras.api.service.AssignService;
import com.teras.common.auth.SsafyUserDetails;
import com.teras.common.model.response.BaseResponseBody;
import com.teras.db.dto.AssignmentDto;
import com.teras.db.entity.Assignment;

import io.swagger.annotations.Api;
import lombok.AllArgsConstructor;

@Api(value = "과제 API", tags = { "Assign" })
@AllArgsConstructor
@RestController
@RequestMapping("/assign")
public class AssignController {
	
	@Autowired
	AssignService assignService;

	@GetMapping()
	public ResponseEntity<? extends AssignSearchGetRes> searchAssignment(Authentication authentication, @RequestParam String subjectCode) {
		SsafyUserDetails userDetails = (SsafyUserDetails)authentication.getDetails();
		String userId = userDetails.getUsername();
		
		List<AssignmentDto> list = assignService.findAssignByClassCodeAndSubjectCode(userId, subjectCode);
		
		return ResponseEntity.status(200).body(AssignSearchGetRes.of(200, "SUCCESS", list));
	}
	
	@PostMapping
	public ResponseEntity<? extends BaseResponseBody> registerAssignment(Authentication authentication, @RequestBody AssignRegisterPostReq registerInfo) {
		SsafyUserDetails userDetails = (SsafyUserDetails)authentication.getDetails();
		String userId = userDetails.getUsername();
		
		Assignment assign = assignService.createAssign(registerInfo, userId);
		
		return ResponseEntity.status(200).body(BaseResponseBody.of(200, "SUCCESS"));
	}
}
