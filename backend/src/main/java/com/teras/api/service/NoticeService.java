package com.teras.api.service;

import com.teras.api.request.NoticeRegisterPostReq;
import com.teras.db.entity.Notice;

public interface NoticeService {
	Notice createNotice(NoticeRegisterPostReq noticeRegisterInfo);
}
