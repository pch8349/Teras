package com.teras.api.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.teras.api.request.AssignCommentRegisterPostReq;
import com.teras.api.request.AssignRegisterPostReq;
import com.teras.db.dto.AssignCommentDto;
import com.teras.db.dto.AssignmentDto;
import com.teras.db.embeddedId.AssignCommentId;
import com.teras.db.entity.AssignComment;
import com.teras.db.entity.Assignment;
import com.teras.db.entity.SubjectDetail;
import com.teras.db.entity.User;
import com.teras.db.repository.AssignCommentRepository;
import com.teras.db.repository.AssignmentRepository;
import com.teras.db.repository.AttachmentRepository;
import com.teras.db.repository.ClassEntityRepository;
import com.teras.db.repository.SubjectDetailRepository;
import com.teras.db.repository.UserRepository;

@Service
public class AssignServiceImpl implements AssignService {

	@Autowired
	AssignmentRepository assignmentRepository;

	@Autowired
	AssignCommentRepository assignCommentRepository;

	@Autowired
	ClassEntityRepository classEntityRepository;

	@Autowired
	SubjectDetailRepository subjectDetailRepository;

	@Autowired
	UserRepository userRepository;

	@Autowired
	AttachmentRepository attachmentRepository;

	@Override
	public List<AssignmentDto> findAssignByClassCodeAndSubjectCode(String userId, String subjectCode) {
		User user = userRepository.findByUserId(userId).get();
		SubjectDetail subject = subjectDetailRepository.findBySubjectCode(subjectCode).get();

		List<AssignmentDto> list = new ArrayList<AssignmentDto>();

		for (Assignment assign : assignmentRepository.findByClassCodeAndSubjectCode(user.getClassCode(), subject)
				.get()) {
			list.add(new AssignmentDto(assign));
		}

		return list;
	}

	@Override
	public Assignment createAssign(AssignRegisterPostReq registerInfo, String userId) {
		User user = userRepository.findByUserId(userId).get();

		Assignment assign = Assignment.builder().title(registerInfo.getTitle()).content(registerInfo.getContent())
				.deadline(registerInfo.getDeadLine()).classCode(user.getClassCode()).subjectCode(user.getSubjectCode())
				.userId(user).uuid(attachmentRepository.findByUuid(registerInfo.getUuid()).orElse(null)).build();
		return assignmentRepository.save(assign);
	}

	@Override
	public AssignmentDto getAssignByAssignNo(long assignNo) {
		AssignmentDto assign = new AssignmentDto(assignmentRepository.findByAssignNo(assignNo).get());

		return assign;
	}

	@Override
	public AssignCommentDto getAssignCommentByAssignNoAndUserId(long assignNo, String userId) {
		AssignCommentDto comment = new AssignCommentDto(
				assignCommentRepository.findByAssignNoAndUserId(assignNo, userId).orElse(null));

		return comment;
	}

	@Override
	public AssignComment createAssignComment(AssignCommentRegisterPostReq registerInfo, String userId) {
		User user = userRepository.findByUserId(userId).get();
		Assignment assignment = assignmentRepository.findByAssignNo(registerInfo.getAssignNo()).get();

		AssignCommentId assignCommentId = new AssignCommentId(user, assignment);
		
		AssignComment comment = AssignComment.builder().content(registerInfo.getContent()).assignCommentId(assignCommentId)
				.uuid(attachmentRepository.findByUuid(registerInfo.getUuid()).orElse(null)).build();

		return assignCommentRepository.save(comment);
	}
}
