package com.teras.db.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.teras.db.entity.Openvidu;

@Repository
public interface OpenviduRepository extends JpaRepository<Openvidu, String> {

}
