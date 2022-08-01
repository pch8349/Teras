package com.teras.api.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ApiModel("NoticePostRequest")
public class NoticePostReq {
	@ApiModelProperty(name = "제목", example = "제목입니다.")
	private String title;
	
	@ApiModelProperty(name = "내용", example = "내용입니다.")
	private String content;
	
	@ApiModelProperty(name = "반코드", example = "00반 입니다.")
	private String classCode;
	
	
}
