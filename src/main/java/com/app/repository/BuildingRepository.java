package com.app.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.app.entities.BuildingEntity;

public interface BuildingRepository extends JpaRepository<BuildingEntity, Long>{

}
