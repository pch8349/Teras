package com.teras.db.entity;

import java.time.LocalDate;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name = "notice")
public class Notice {
	
	@Id
	@Column(name = "noticeNo", unique = true, nullable = false)
	private Long noticeNo;
	
	@Column(name = "tilte", nullable = false, length = 100)
	private String title;
	
	@Column(name = "content", nullable = false, length = 500)
	private String content;
	
	@Column(name = "classCode", nullable = false)
	private String classCode;
	
	@CreatedDate
	@Column(name = "createDate", updatable = false)
	private LocalDate createDate;
	
	@LastModifiedDate
	@Column(name = "updateDate", updatable = true)
	private LocalDate updateDate;
	
	@ManyToOne
	@JoinColumn(name = "userId", nullable = false)
	private User user;
	
	@Builder
	public Notice(String title, String content, String classCode, LocalDate createDate, LocalDate updateDate, User user) {
		this.title = title;
		this.content = content;
		this.classCode = classCode;
		this.createDate = createDate;
		this.updateDate = updateDate;
		this.user = user;
	}
	
}
