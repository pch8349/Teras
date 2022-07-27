package com.teras.db.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;

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
public class User extends BaseEntity{
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
    
    @Column(name = "classCode")
    String classCode;
    
    @Enumerated(EnumType.STRING)
    @Column(name = "authority", nullable = false, length = 12)
    TerasAuthority authority;

    @Column(name = "emergencyPhoneNumber", nullable = true, length = 13)
    String emergencyPhoneNumber;
    
    @Column(name = "subjectCode", nullable = true)
    String subjectCode;
}
