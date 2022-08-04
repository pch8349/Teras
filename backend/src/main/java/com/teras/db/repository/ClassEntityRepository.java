package com.teras.db.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.teras.db.entity.ClassEntity;

@Repository
public interface ClassEntityRepository extends JpaRepository<ClassEntity, String>{
	Optional<ClassEntity> findByClassCode(String ClassCode);

}
