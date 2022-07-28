package com.teras.db.entity;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.teras.common.model.column.TerasAuthority;

import lombok.Getter;
import lombok.Setter;

/**
 * 유저 모델 정의.
 */
@Entity
@Getter
@Setter
@Table(name = "user")
public class User{
	@Id
	@Column(name = "userId", unique = true, nullable = false)
    String userId;

	@Column(name = "password", nullable = false)
    @JsonIgnore
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    String password;
    
    @Column(name = "name", nullable = false)
    String name;
    
    @Column(name = "email", nullable = false)
    String email;
    
    @Column(name = "phoneNumber", nullable = false, length = 13)
    String phoneNumber;
    
    @Column(name = "schoolCode", nullable = false)
    String schoolCode;
    
    @Column(name = "grade", nullable = true)
    String grade;
    
    @Column(name = "class", nullable = true)
    String userClass;
    
    @Enumerated(EnumType.STRING)
    @Column(name = "authority", nullable = false, length = 12)
    TerasAuthority authority;

    @Column(name = "emergencyPhoneNumber", nullable = true, length = 13)
    String emergencyPhoneNumber;
    
    @Column(name = "subjectCode", nullable = true)
    String subjectCode;
}
