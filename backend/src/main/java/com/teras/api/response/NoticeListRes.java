package com.teras.api.response;

import java.time.LocalDate;

import com.teras.db.entity.Notice;
import com.teras.db.entity.User;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ApiModel("NoticeListResponse")
public class NoticeListRes {
	@ApiModelProperty(name = "Notice seq", example = "1")
	private Long noticeId;
	
	@ApiModelProperty(name = "Notice Title", example = "제목")
	private String title;
	
	@ApiModelProperty(name = "Notice Content", example = "내용")
	private String content;
	
	@ApiModelProperty(name = "Class Code", example = "반코드")
	private String classCode;
	
	@ApiModelProperty(name = "Notice CreateDate", example = "2022-08-01")
	private LocalDate createDate;
	
	@ApiModelProperty(name = "Notice UpdateDate", example = "2022-08-01")
	private LocalDate updateDate;
	
	@ApiModelProperty(name = "Notice UserId", example = "minji")
	private String userId;
	
	@ApiModelProperty(name = "Notice User Name", example = "김민지")
	private String name;
	
	public NoticeListRes(Notice entity) {
		this.noticeId = entity.getNoticeNo();
		this.title = entity.getTitle();
		this.content = entity.getContent();
		this.classCode = entity.getClassCode();
		this.createDate = entity.getCreateDate();
		this.updateDate = entity.getUpdateDate();
		User user = entity.getUser();
		this.userId = user.getUserId();
		this.name = user.getName();
	}
}
