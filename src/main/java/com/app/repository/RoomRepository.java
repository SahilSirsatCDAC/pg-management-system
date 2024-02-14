package com.app.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.app.entities.RoomEntity;

public interface RoomRepository extends JpaRepository<RoomEntity, Long>{
//	List<RoomEntity> findByBuilding(BuildingEntity be);
	List<RoomEntity> findByBuildingId(Long buildingId);
}
