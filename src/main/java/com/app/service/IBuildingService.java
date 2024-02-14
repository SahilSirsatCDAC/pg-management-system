package com.app.service;

import java.util.List;

import com.app.dto.Building;

public interface IBuildingService {
	List<Building> getAllBuildings();

	Building addBuilding(Building building);

	Building deleteBuilding(Long buildingId);
}
