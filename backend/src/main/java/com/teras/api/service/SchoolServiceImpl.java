package com.teras.api.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.teras.db.entity.School;
import com.teras.db.repository.SchoolRepository;

@Service
public class SchoolServiceImpl implements SchoolService{
	@Autowired
	SchoolRepository schoolRepository;

	@Override
	public List<School> searchSchoolBySchoolName(String schoolName) {
		List<School> list = schoolRepository.findBySchoolNameContains(schoolName).orElse(null);
		return list;
	}

}
