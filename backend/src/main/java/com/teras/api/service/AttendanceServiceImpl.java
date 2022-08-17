package com.teras.api.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.teras.common.util.DateFormatUtil;
import com.teras.db.repository.AttendanceRepository;
import com.teras.db.repository.UserRepository;

@Service
public class AttendanceServiceImpl implements AttendanceService {

	DateFormatUtil dateFormatUtil;
	
	@Autowired
	AttendanceRepository attendanceRepository;
	
	@Autowired
	UserRepository userRepository;
	
}