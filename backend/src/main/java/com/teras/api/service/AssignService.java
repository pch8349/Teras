package com.teras.api.service;

import java.util.List;

import com.teras.api.request.AssignRegisterPostReq;
import com.teras.db.dto.AssignmentDto;
import com.teras.db.entity.Assignment;

public interface AssignService {

	List<AssignmentDto> findAssignByClassCodeAndSubjectCode(String userId, String subjectCode);

	Assignment createAssign(AssignRegisterPostReq registerInfo, String userId);

}
