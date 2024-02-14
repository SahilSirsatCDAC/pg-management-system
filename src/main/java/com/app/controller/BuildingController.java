package com.app.controller;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.dto.Building;
import com.app.service.IBuildingService;

import lombok.extern.slf4j.Slf4j;
@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/building")
@Slf4j
public class BuildingController {

	@Autowired
	private IBuildingService buildingService;

	@GetMapping
	public ResponseEntity<?> getListOfBuildings() {
		log.info(getClass().getName()+" in getListOfBuildings");
		return ResponseEntity.ok(buildingService.getAllBuildings());
	}
	
	@PostMapping
	public ResponseEntity<?> addBuilding(@RequestBody @Valid Building building) {
		log.info(getClass().getName()+" in addBuilding" + building);
		Building b = buildingService.addBuilding(building);
		if(b == null)
			return ResponseEntity.status(HttpStatus.CONFLICT).body("Check weather user contact details and address updated or not");
		return ResponseEntity.ok(b);
	}
	
	@DeleteMapping("/{buildingId}")
	public ResponseEntity<?> deleteBuilding(@PathVariable Long buildingId){
		log.info(getClass().getName()+" in deleteBuilding" + buildingId);
		return ResponseEntity.ok(buildingService.deleteBuilding(buildingId));
	}
}
