package com.teras.api.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.teras.api.request.NoticeRegisterPostReq;
import com.teras.db.entity.Notice;
import com.teras.db.repository.AttachmentRepository;
import com.teras.db.repository.ClassEntityRepository;
import com.teras.db.repository.NoticeRepository;
import com.teras.db.repository.UserRepository;

@Service
public class NoticeServiceImpl implements NoticeService {

	@Autowired
	UserRepository userRepository;

	@Autowired
	NoticeRepository noticeRepository;

	@Autowired
	ClassEntityRepository classEntityRepository;

	@Autowired
	AttachmentRepository attachmentRepository;

	@Override
	public Notice createNotice(NoticeRegisterPostReq noticeRegisterInfo) {
		Notice notice = Notice.builder().title(noticeRegisterInfo.getTitle()).content(noticeRegisterInfo.getContent())
				.userId(userRepository.findByUserId(noticeRegisterInfo.getUserId()).get())
				.classCode(classEntityRepository.findByClassCode(noticeRegisterInfo.getClassCode()).get())
				.uuid(attachmentRepository.findByUuid(noticeRegisterInfo.getUuid()).orElse(null)).build();

		return noticeRepository.save(notice);
	}

}
