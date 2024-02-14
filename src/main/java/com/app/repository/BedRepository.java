package com.app.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.app.entities.BedEntity;

public interface BedRepository extends JpaRepository<BedEntity, Long>{

	List<BedEntity> findByRoomId(Long roomId);
}
