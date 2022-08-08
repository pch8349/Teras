package com.teras.api.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.teras.db.dto.TimeTableDto;
import com.teras.db.entity.TimeTable;
import com.teras.db.entity.User;
import com.teras.db.repository.TimeTableRepository;
import com.teras.db.repository.UserRepository;

@Service
public class TimeTableServiceImpl implements TimeTableService {
	@Autowired
	UserRepository userRepository;

	@Autowired
	TimeTableRepository timeTableRepository;

	@Override
	public List<TimeTableDto> getTimeTable(String userId) {
		User user = userRepository.findByUserId(userId).get();

		List<TimeTableDto> list = new ArrayList<>();

		for (TimeTable timeTable : timeTableRepository.findByClassCode(user.getClassCode()).get()) {
			list.add(new TimeTableDto(timeTable));
		}

		return list;
	}

}
