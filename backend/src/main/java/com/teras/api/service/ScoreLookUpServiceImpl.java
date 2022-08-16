package com.teras.api.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.teras.db.dto.ScoreDto;
import com.teras.db.entity.ScoreLookUp;
import com.teras.db.entity.User;
import com.teras.db.repository.ScoreLookUpRepository;
import com.teras.db.repository.UserRepository;

@Service
public class ScoreLookUpServiceImpl implements ScoreLookUpService {

	@Autowired
	ScoreLookUpRepository scoreRepository;
	
	@Autowired
	UserRepository userRepository;
	
	@Override
	public List<ScoreDto> getScoreList(User user){
		
		List<ScoreDto> list = new ArrayList<>();
		
		for (ScoreLookUp score : scoreRepository.findByScoreIdUserId(user).get()) {
			list.add(new ScoreDto(score));
		}

		return list;
	}
	
}
