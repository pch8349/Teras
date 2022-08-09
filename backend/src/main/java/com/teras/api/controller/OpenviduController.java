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
import org.springframework.security.core.Authentication;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.mvc.method.annotation.ResponseBodyEmitter;

import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import com.teras.api.request.NoticeRegisterPostReq;
import com.teras.api.request.UserRegisterPostReq;
import com.teras.common.model.response.BaseResponseBody;


import io.openvidu.java.client.ConnectionProperties;
import io.openvidu.java.client.ConnectionType;
import io.openvidu.java.client.OpenVidu;
import io.openvidu.java.client.OpenViduHttpException;
import io.openvidu.java.client.OpenViduJavaClientException;
import io.openvidu.java.client.OpenViduRole;
import io.openvidu.java.client.Session;
import io.swagger.annotations.ApiOperation;
//import io.openvidu.java.LoginController;
import io.swagger.annotations.ApiParam;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import springfox.documentation.annotations.ApiIgnore;

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

	// URL where our OpenVidu server is listening
	private String OPENVIDU_URL;
	// Secret shared with our OpenVidu server
	private String SECRET;
	
	
	public OpenviduController(@Value("${openvidu.secret}") String secret, @Value("${openvidu.url}") String openviduUrl) {
		this.SECRET = secret;
		this.OPENVIDU_URL = openviduUrl;
		this.openVidu = new OpenVidu(OPENVIDU_URL, SECRET);
	}
	
	@PostMapping("")
    @ApiOperation(value = "방을 만들 때 사용", notes = "<strong>방 만들기</strong>을 통해 세션과 토큰을 생성 후 토큰, 방이름, 게임종류, 닉네임 반환 => password 없을시, 빈문자열 넣기")
    @ApiResponses({
            @ApiResponse(code = 200, message = "방 만들기 성공"),
            @ApiResponse(code = 400, message = "input 오류"),
            @ApiResponse(code = 401, message = "토큰 만료 or 토큰 없음 or 토큰 오류 -> 권한 인증 오류"),
            @ApiResponse(code = 500, message = "서버 에러")
    })
//    @PreAuthorize("hasAnyRole('USER', 'ADMIN')")
    public ResponseEntity<RoomRes> makeRoom(@RequestBody MakeRoomReq makeRoomReq) throws OpenViduJavaClientException, OpenViduHttpException {
        // 방 번호 난수 생성
        String roomId = RandomNumberUtil.getRandomNumber();

        // 방 관리 map에 저장
        this.mapSessions.put(roomId, 1);

        // DB 저장
        roomService.makeRoom(roomId, makeRoomReq);

        return ResponseEntity.ok(roomService.getRoomRes(roomId, makeRoomReq.getGameType()));
    }

    @PostMapping("/search")
    @ApiOperation(value = "방을 검색할 때 사용", notes = "<strong>방 검색</strong>을 통해 검색하는 방이 존재한다면 토큰, 방이름, 게임종류, 닉네임을 반환 => password 없을시, 빈문자열 넣기")
    @ApiResponses({
            @ApiResponse(code = 200, message = "방 검색 성공"),
            @ApiResponse(code = 400, message = "input 오류", response = ErrorResponse.class),
            @ApiResponse(code = 401, message = "토큰 만료 or 토큰 없음 or 토큰 오류 -> 권한 인증 오류", response = ErrorResponse.class),
            @ApiResponse(code = 404, message = "방 정보가 없습니다.", response = ErrorResponse.class),
            @ApiResponse(code = 409, message = "방 접속 불가능 상태(GAME | FULL)", response = ErrorResponse.class),
            @ApiResponse(code = 500, message = "서버 에러", response = ErrorResponse.class)
    })
    @PreAuthorize("hasAnyRole('USER', 'ADMIN')")
    public ResponseEntity<RoomRes> findRoom(@RequestBody FindRoomReq findRoomReq) throws OpenViduJavaClientException, OpenViduHttpException {
        // 검색할 방이 존재하는지 확인
        Room room = roomService.findRoom(findRoomReq);
        String roomId = room.getRoomId();
        Integer gameType = room.getGameType();

        // 검색하는 방이 존재하지 않을 경우
        if (this.mapSessions.get(roomId) == null) {
            throw new RoomNotFoundException(roomId);
        }
        // 인원초과일 경우
        if (this.mapSessions.get(roomId) >= LIMIT) {
            throw new RoomStatusIsNotAvailableException(room.getStatus());
        }

        // 방 관리 map에 저장
        this.mapSessions.put(roomId, this.mapSessions.get(roomId) + 1);

        return ResponseEntity.ok(roomService.getRoomRes(roomId, gameType));
    }

    @PostMapping("/quick")
    @ApiOperation(value = "빠른 시작을 할 때 사용", notes = "<strong>빠른 시작</strong>을 통해 선택한 종목의 방이 있으면 반환하고 없다면 새로 생성 후 토큰, 방이름, 게임종류, 닉네임 반환")
    @ApiResponses({
            @ApiResponse(code = 200, message = "빠른 시작 성공"),
            @ApiResponse(code = 400, message = "input 오류", response = ErrorResponse.class),
            @ApiResponse(code = 401, message = "토큰 만료 or 토큰 없음 or 토큰 오류 -> 권한 인증 오류", response = ErrorResponse.class),
            @ApiResponse(code = 500, message = "서버 에러", response = ErrorResponse.class)
    })
    @PreAuthorize("hasAnyRole('USER', 'ADMIN')")
    public ResponseEntity<RoomRes> quickRoom(@RequestBody QuickRoomReq quickRoomReq) throws OpenViduJavaClientException, OpenViduHttpException {
        List<String> roomIds = roomService.quickRoom(quickRoomReq);

        /************ 참가할 방이 존재한다면 ************/
        if (!roomIds.isEmpty()) {
            int min = LIMIT;
            String minConnRoomId = null;

            // 해당 종목의 방마다 참가할 수 있는지 확인
            for (String roomId : roomIds) {
                // 검색하는 방이 존재하지 않거나 인원초과일 경우
                if (this.mapSessions.get(roomId) == null || this.mapSessions.get(roomId) >= LIMIT) continue;

                if (min > mapSessions.get(roomId)) {
                    min = mapSessions.get(roomId);
                    minConnRoomId = roomId;
                }
            }

            // 참가할 수 있다면
            if (minConnRoomId != null) {
                // 방 관리 map에 저장
                this.mapSessions.put(minConnRoomId, this.mapSessions.get(minConnRoomId) + 1);

                return ResponseEntity.ok(roomService.getRoomRes(minConnRoomId, quickRoomReq.getGameType()));
            }
        }
        /************ 참가할 방이 존재하지 않다면 ************/
        // 방 번호 난수 생성
        String roomId = RandomNumberUtil.getRandomNumber();

        // 방 관리 map에 저장
        this.mapSessions.put(roomId, 1);

        // DB 저장
        roomService.makeRoom(roomId, quickRoomReq);

        return ResponseEntity.ok(roomService.getRoomRes(roomId, quickRoomReq.getGameType()));
    }

    @PutMapping("")
    @ApiOperation(value = "참가자가 방을 나갈 경우 사용", notes = "<strong>방 나가기</strong>를 통해 방 정보 OFF로 변경 및 방 관리 map에서 해당 정보 삭제")
    @ApiResponses({
            @ApiResponse(code = 200, message = "방 나가기 성공"),
            @ApiResponse(code = 400, message = "input 오류", response = ErrorResponse.class),
            @ApiResponse(code = 401, message = "토큰 만료 or 토큰 없음 or 토큰 오류 -> 권한 인증 오류", response = ErrorResponse.class),
            @ApiResponse(code = 404, message = "방 정보가 없습니다.", response = ErrorResponse.class),
            @ApiResponse(code = 500, message = "서버 에러", response = ErrorResponse.class)
    })
    @PreAuthorize("hasAnyRole('USER', 'ADMIN')")
    public ResponseEntity leaveRoom(@RequestBody LeaveRoomReq leaveRoomReq) {
        String roomId = leaveRoomReq.getRoomId();

        // 나가려는 방이 없다면
        if (this.mapSessions.get(roomId) == null || this.mapSessions.get(roomId) == null) {
            throw new RoomNotFoundException(roomId);
        }

        int cnt = this.mapSessions.get(roomId);
        
        // 마지막 참가자라면
        if (cnt == 1) {
            // 방 관리 map에서 삭제
            this.mapSessions.remove(roomId);
            
            // DB에서 OFF로 업데이트
            roomService.updateStatus(roomId);
        } else {
            // 방 관리 map에서 인원수 갱신
            this.mapSessions.put(roomId, cnt - 1);
        }

        return new ResponseEntity<>(HttpStatus.OK);
    }
}