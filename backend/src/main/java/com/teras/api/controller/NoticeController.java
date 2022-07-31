package com.teras.api.controller;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.teras.api.service.UserService;
import com.teras.common.auth.SsafyUserDetails;
import com.teras.db.entity.Notice;
import com.teras.db.entity.User;
import com.teras.db.repository.NoticeRepository;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import lombok.AllArgsConstructor;
import springfox.documentation.annotations.ApiIgnore;

@Api(value = "공지사항 API", tags = {"Notice"})
@AllArgsConstructor
@RestController
@RequestMapping("/{classCode}/notice")
public class NoticeController {
	
	@Autowired
	UserService userService;
	
	@Autowired
	NoticeRepository noticeRepository;
	
	@ApiOperation(value = "공지사항 작성", notes = "사용자가 공지사항을 작성한다.")
	@ApiResponses({
			@ApiResponse(code = 200, message = "작성 성공"),
			@ApiResponse(code = 401, message = "인증 실패"),
			@ApiResponse(code = 500, message = "서버 오류")
	})
	@PostMapping()
	public ResponseEntity post(@ApiIgnore Authentication authentication, @RequestBody @ApiParam(value = "공지사항 내용", required = true)NoticePostReq noticePostReq) {
		SsafyUserDetails userDetails = (SsafyUserDetails) authentication.getDetails();
		String userId = userDetails.getUsername();
		User user = userService.getUserByUserId(userId);
		noticeRepository.save(Notice.builder()
				.title(noticePostReq.getTitle())
				.content(noticePostReq.getContent())
				.createDate(LocalDate.now())
				.updateDate(LocalDate.now())
				.user(user)
				.build());
		return new ResponseEntity(HttpStatus.OK);
	}
	
	@ApiOperation(value = "공지사항 전체 조회", notes = "모든 공지사항을 조회한다.")
	@ApiResponses({
		@ApiResponse(code = 200, message = "조회 성공"),
		@ApiResponse(code = 500, message = "서버 오류")
	})
	
	@GetMapping()
	public ResponseEntity getList() {
		List<Notice> list = noticeRepository.findAllByClssCode();
		List<NoticeListRes> noticeList = new ArrayList<>();
		
		Collections.reverse(list);
		
		for (Notice entity : list) {
			noticeList.add(new NoticeListRes(entity));
		}
		return new ResponseEntity<>(noticeList, HttpStatus.OK);
	}
	
	@ApiOperation(value = "특정 게시글 조회", notes = "특정 게시글을 조회한다.")
	@ApiResponses({
		@ApiResponse(code = 200, message = "조회 성공"),
		@ApiResponse(code = 404, message = "게시글 없음"),
		@ApiResponse(code = 500, message = "서버 오류")
	})
	@ApiImplicitParam(name = "noticeId", value = "notice seq", required = true, dateType = "Long")
	@GetMapping("/{noticeId}")

	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
}
