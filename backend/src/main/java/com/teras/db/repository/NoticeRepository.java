package com.teras.db.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.teras.db.entity.Notice;

@Repository
public interface NoticeRepository extends JpaRepository<Notice, Long>{

	List<Notice> findAllByClssCode();

}
