package com.teras.api.response;

import com.teras.common.model.response.BaseResponseBody;
import com.teras.db.Dto.NoticeDto;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ApiModel("NoticeGetRes")
public class NoticeGetRes extends BaseResponseBody {
	@ApiModelProperty(name = "공지사항 상세정보")
	NoticeDto notice;
	
	public static NoticeGetRes of(Integer statusCode, String message, NoticeDto notice) {
		NoticeGetRes res = new NoticeGetRes();
		res.setStatusCode(statusCode);
		res.setMessage(message);
		res.setNotice(notice);
		return res;
	}
	
}
