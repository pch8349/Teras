package com.teras.api.service;

import java.util.List;

import com.teras.db.entity.School;

public interface SchoolService {
	List<School> searchSchoolBySchoolName(String schoolName);
}
