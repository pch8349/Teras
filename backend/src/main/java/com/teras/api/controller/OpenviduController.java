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
    @ApiOperation(value = "諛⑹쓣 留뚮뱾 �븣 �궗�슜", notes = "<strong>諛� 留뚮뱾湲�</strong>�쓣 �넻�빐 �꽭�뀡怨� �넗�겙�쓣 �깮�꽦 �썑 �넗�겙, 諛⑹씠由�, 寃뚯엫醫낅쪟, �땳�꽕�엫 諛섑솚 => password �뾾�쓣�떆, 鍮덈Ц�옄�뿴 �꽔湲�")
    @ApiResponses({
            @ApiResponse(code = 200, message = "諛� 留뚮뱾湲� �꽦怨�"),
            @ApiResponse(code = 400, message = "input �삤瑜�"),
            @ApiResponse(code = 401, message = "�넗�겙 留뚮즺 or �넗�겙 �뾾�쓬 or �넗�겙 �삤瑜� -> 沅뚰븳 �씤利� �삤瑜�"),
            @ApiResponse(code = 500, message = "�꽌踰� �뿉�윭")
    })
//    @PreAuthorize("hasAnyRole('USER', 'ADMIN')")
    public ResponseEntity<RoomRes> makeRoom(@RequestBody MakeRoomReq makeRoomReq) throws OpenViduJavaClientException, OpenViduHttpException {
        // 諛� 踰덊샇 �궃�닔 �깮�꽦
        String roomId = RandomNumberUtil.getRandomNumber();

        // 諛� 愿�由� map�뿉 ���옣
        this.mapSessions.put(roomId, 1);

        // DB ���옣
        roomService.makeRoom(roomId, makeRoomReq);

        return ResponseEntity.ok(roomService.getRoomRes(roomId, makeRoomReq.getGameType()));
    }

    @PostMapping("/search")
    @ApiOperation(value = "諛⑹쓣 寃��깋�븷 �븣 �궗�슜", notes = "<strong>諛� 寃��깋</strong>�쓣 �넻�빐 寃��깋�븯�뒗 諛⑹씠 議댁옱�븳�떎硫� �넗�겙, 諛⑹씠由�, 寃뚯엫醫낅쪟, �땳�꽕�엫�쓣 諛섑솚 => password �뾾�쓣�떆, 鍮덈Ц�옄�뿴 �꽔湲�")
    @ApiResponses({
            @ApiResponse(code = 200, message = "諛� 寃��깋 �꽦怨�"),
            @ApiResponse(code = 400, message = "input �삤瑜�", response = ErrorResponse.class),
            @ApiResponse(code = 401, message = "�넗�겙 留뚮즺 or �넗�겙 �뾾�쓬 or �넗�겙 �삤瑜� -> 沅뚰븳 �씤利� �삤瑜�", response = ErrorResponse.class),
            @ApiResponse(code = 404, message = "諛� �젙蹂닿� �뾾�뒿�땲�떎.", response = ErrorResponse.class),
            @ApiResponse(code = 409, message = "諛� �젒�냽 遺덇��뒫 �긽�깭(GAME | FULL)", response = ErrorResponse.class),
            @ApiResponse(code = 500, message = "�꽌踰� �뿉�윭", response = ErrorResponse.class)
    })
    @PreAuthorize("hasAnyRole('USER', 'ADMIN')")
    public ResponseEntity<RoomRes> findRoom(@RequestBody FindRoomReq findRoomReq) throws OpenViduJavaClientException, OpenViduHttpException {
        // 寃��깋�븷 諛⑹씠 議댁옱�븯�뒗吏� �솗�씤
        Room room = roomService.findRoom(findRoomReq);
        String roomId = room.getRoomId();
        Integer gameType = room.getGameType();

        // 寃��깋�븯�뒗 諛⑹씠 議댁옱�븯吏� �븡�쓣 寃쎌슦
        if (this.mapSessions.get(roomId) == null) {
            throw new RoomNotFoundException(roomId);
        }
        // �씤�썝珥덇낵�씪 寃쎌슦
        if (this.mapSessions.get(roomId) >= LIMIT) {
            throw new RoomStatusIsNotAvailableException(room.getStatus());
        }

        // 諛� 愿�由� map�뿉 ���옣
        this.mapSessions.put(roomId, this.mapSessions.get(roomId) + 1);

        return ResponseEntity.ok(roomService.getRoomRes(roomId, gameType));
    }

    @PostMapping("/quick")
    @ApiOperation(value = "鍮좊Ⅸ �떆�옉�쓣 �븷 �븣 �궗�슜", notes = "<strong>鍮좊Ⅸ �떆�옉</strong>�쓣 �넻�빐 �꽑�깮�븳 醫낅ぉ�쓽 諛⑹씠 �엳�쑝硫� 諛섑솚�븯怨� �뾾�떎硫� �깉濡� �깮�꽦 �썑 �넗�겙, 諛⑹씠由�, 寃뚯엫醫낅쪟, �땳�꽕�엫 諛섑솚")
    @ApiResponses({
            @ApiResponse(code = 200, message = "鍮좊Ⅸ �떆�옉 �꽦怨�"),
            @ApiResponse(code = 400, message = "input �삤瑜�", response = ErrorResponse.class),
            @ApiResponse(code = 401, message = "�넗�겙 留뚮즺 or �넗�겙 �뾾�쓬 or �넗�겙 �삤瑜� -> 沅뚰븳 �씤利� �삤瑜�", response = ErrorResponse.class),
            @ApiResponse(code = 500, message = "�꽌踰� �뿉�윭", response = ErrorResponse.class)
    })
    @PreAuthorize("hasAnyRole('USER', 'ADMIN')")
    public ResponseEntity<RoomRes> quickRoom(@RequestBody QuickRoomReq quickRoomReq) throws OpenViduJavaClientException, OpenViduHttpException {
        List<String> roomIds = roomService.quickRoom(quickRoomReq);

        /************ 李멸��븷 諛⑹씠 議댁옱�븳�떎硫� ************/
        if (!roomIds.isEmpty()) {
            int min = LIMIT;
            String minConnRoomId = null;

            // �빐�떦 醫낅ぉ�쓽 諛⑸쭏�떎 李멸��븷 �닔 �엳�뒗吏� �솗�씤
            for (String roomId : roomIds) {
                // 寃��깋�븯�뒗 諛⑹씠 議댁옱�븯吏� �븡嫄곕굹 �씤�썝珥덇낵�씪 寃쎌슦
                if (this.mapSessions.get(roomId) == null || this.mapSessions.get(roomId) >= LIMIT) continue;

                if (min > mapSessions.get(roomId)) {
                    min = mapSessions.get(roomId);
                    minConnRoomId = roomId;
                }
            }

            // 李멸��븷 �닔 �엳�떎硫�
            if (minConnRoomId != null) {
                // 諛� 愿�由� map�뿉 ���옣
                this.mapSessions.put(minConnRoomId, this.mapSessions.get(minConnRoomId) + 1);

                return ResponseEntity.ok(roomService.getRoomRes(minConnRoomId, quickRoomReq.getGameType()));
            }
        }
        /************ 李멸��븷 諛⑹씠 議댁옱�븯吏� �븡�떎硫� ************/
        // 諛� 踰덊샇 �궃�닔 �깮�꽦
        String roomId = RandomNumberUtil.getRandomNumber();

        // 諛� 愿�由� map�뿉 ���옣
        this.mapSessions.put(roomId, 1);

        // DB ���옣
        roomService.makeRoom(roomId, quickRoomReq);

        return ResponseEntity.ok(roomService.getRoomRes(roomId, quickRoomReq.getGameType()));
    }

    @PutMapping("")
    @ApiOperation(value = "李멸��옄媛� 諛⑹쓣 �굹媛� 寃쎌슦 �궗�슜", notes = "<strong>諛� �굹媛�湲�</strong>瑜� �넻�빐 諛� �젙蹂� OFF濡� 蹂�寃� 諛� 諛� 愿�由� map�뿉�꽌 �빐�떦 �젙蹂� �궘�젣")
    @ApiResponses({
            @ApiResponse(code = 200, message = "諛� �굹媛�湲� �꽦怨�"),
            @ApiResponse(code = 400, message = "input �삤瑜�", response = ErrorResponse.class),
            @ApiResponse(code = 401, message = "�넗�겙 留뚮즺 or �넗�겙 �뾾�쓬 or �넗�겙 �삤瑜� -> 沅뚰븳 �씤利� �삤瑜�", response = ErrorResponse.class),
            @ApiResponse(code = 404, message = "諛� �젙蹂닿� �뾾�뒿�땲�떎.", response = ErrorResponse.class),
            @ApiResponse(code = 500, message = "�꽌踰� �뿉�윭", response = ErrorResponse.class)
    })
    @PreAuthorize("hasAnyRole('USER', 'ADMIN')")
    public ResponseEntity leaveRoom(@RequestBody LeaveRoomReq leaveRoomReq) {
        String roomId = leaveRoomReq.getRoomId();

        // �굹媛��젮�뒗 諛⑹씠 �뾾�떎硫�
        if (this.mapSessions.get(roomId) == null || this.mapSessions.get(roomId) == null) {
            throw new RoomNotFoundException(roomId);
        }

        int cnt = this.mapSessions.get(roomId);
        
        // 留덉�留� 李멸��옄�씪硫�
        if (cnt == 1) {
            // 諛� 愿�由� map�뿉�꽌 �궘�젣
            this.mapSessions.remove(roomId);
            
            // DB�뿉�꽌 OFF濡� �뾽�뜲�씠�듃
            roomService.updateStatus(roomId);
        } else {
            // 諛� 愿�由� map�뿉�꽌 �씤�썝�닔 媛깆떊
            this.mapSessions.put(roomId, cnt - 1);
        }

        return new ResponseEntity<>(HttpStatus.OK);
    }
}