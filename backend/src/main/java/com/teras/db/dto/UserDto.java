package com.teras.db.dto;

import com.teras.db.entity.User;

import lombok.Data;

@Data
public class UserDto {
	String id;

	String name;

	String email;

	String phoneNumber;

	String classCode;
	
	String authority;

	public UserDto(User user) {
		id = user.getUserId();
		name = user.getName();
		email = user.getEmail();
		phoneNumber = user.getPhoneNumber();
		classCode = user.getClassCode().getClassCode();
		authority = user.getAuthority().toString();
	}
	
	
}
