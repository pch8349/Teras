package com.teras.db.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.teras.db.embeddedId.TimeTableId;
import com.teras.db.entity.ClassEntity;
import com.teras.db.entity.TimeTable;

@Repository
public interface TimeTableRepository extends JpaRepository<TimeTable, TimeTableId> {
	@Query(value = "select * from timetable where class_code = :classCode", nativeQuery = true)
	Optional<List<TimeTable>> findByClassCode(@Param("classCode")ClassEntity classCode);
}
