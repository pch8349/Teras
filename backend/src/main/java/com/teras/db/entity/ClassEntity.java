package com.teras.db.entity;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Entity
@Getter
@Table(name = "class")
public class ClassEntity {
	@Id
	@Column(name = "classCode", nullable = false)
    String classCode;
	
    @OneToMany(mappedBy = "classCode")
    List<User> users = new ArrayList<>();
	
    @ManyToOne
    @JoinColumn(name = "schoolCode", nullable = true)
    School schoolCode;
    
    @Column(name = "userClass", nullable = false)
    String userClass;
    
    @Column(name = "userGrade", nullable = false, length = 13)
    String userGrade;
}
