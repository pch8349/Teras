package com.teras.api.service;

import java.util.List;

import com.teras.api.request.NoticeRegisterPostReq;
import com.teras.db.dto.NoticeDto;
import com.teras.db.entity.ClassEntity;
import com.teras.db.entity.Notice;

public interface NoticeService {
	Notice createNotice(NoticeRegisterPostReq noticeRegisterInfo, String userId);
	
	List<NoticeDto> getNoticeList(String userId);
}
