package com.teras.db.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.teras.db.embeddedId.AssignCommentId;
import com.teras.db.entity.AssignComment;

@Repository
public interface AssignCommentRepository extends JpaRepository<AssignComment, AssignCommentId> {
	@Query(value = "select * from assign_comment where assign_no = :assignNo and user_id = :userId", nativeQuery = true)
	Optional<AssignComment> findByAssignNoAndUserId(@Param("assignNo") long assignNo, @Param("userId") String userId);
}
