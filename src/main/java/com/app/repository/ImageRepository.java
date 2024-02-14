package com.app.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.app.dto.ComponentType;
import com.app.entities.ImageEntity;

public interface ImageRepository extends JpaRepository<ImageEntity, Long>{
	List<ImageEntity> findByTypeAndCompid(ComponentType type, Long compid);
}
