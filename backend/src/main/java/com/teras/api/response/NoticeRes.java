package com.teras.api.response;

import java.time.LocalDateTime;

import com.teras.db.entity.Notice;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ApiModel("NoticeResponse")
public class NoticeRes {
	@ApiModelProperty(name = "Notice seq", example = "1")
	private Long noticeId;

	@ApiModelProperty(name = "Notice Title", example = "�젣紐�")
	private String title;

	@ApiModelProperty(name = "Notice Content", example = "�궡�슜")
	private String content;

	@ApiModelProperty(name = "Class Code", example = "諛섏퐫�뱶")
	private String classCode;

	@ApiModelProperty(name = "Notice CreateDate", example = "2022-08-01")
	private LocalDateTime createDate;

	@ApiModelProperty(name = "Notice User Id", example = "minji")
	private String userId;

	@ApiModelProperty(name = "Notice User Name", example = "源�誘쇱�")
	private String name;

	public NoticeRes(Notice entity) {
		this.noticeId = entity.getNoticeNo();
		this.title = entity.getTitle();
		this.content = entity.getContent();
		this.classCode = entity.getClassCode().getClassCode();
		this.createDate = entity.getCreatedDate();
		this.userId = entity.getUserId().getUserId();
		this.name = entity.getUserId().getName();

	}
}
