package com.teras.db.dto;

import com.teras.db.entity.Assignment;

import lombok.Data;

@Data
public class AssignmentDto {
	private Long assignNo;
	private String title;
	private String content;
	private String userId;
	private String subjectCode;
	private String createdDate;
	private String deadLine;
	private String uuid;

	public AssignmentDto(Assignment assign) {
		assignNo = assign.getAssignNo();
		title = assign.getTitle();
		content = assign.getContent();
		userId = assign.getUserId().getUserId();
		subjectCode = assign.getSubjectCode().getSubjectCode();
		createdDate = assign.getCreatedDate().toString();
		deadLine = assign.getDeadline().toString();
		if (assign.getUuid() != null)
			uuid = assign.getUuid().getUuid();
	}
}
