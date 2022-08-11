package com.teras.api.response;

import com.teras.common.model.response.BaseResponseBody;
import com.teras.db.dto.AssignCommentDto;
import com.teras.db.dto.AssignmentDto;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class AssignDetailGetRes extends BaseResponseBody {
	AssignmentDto assign;
	AssignCommentDto comment;

	public static AssignDetailGetRes of(Integer statusCode, String message, AssignmentDto assign, AssignCommentDto comment) {
		AssignDetailGetRes res = new AssignDetailGetRes();
		res.setStatusCode(statusCode);
		res.setMessage(message);
		res.setAssign(assign);
		res.setComment(comment);
		return res;
	}
}
