package com.app.controller;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.dto.Room;
import com.app.service.IRoomService;

import lombok.extern.slf4j.Slf4j;
@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/room")
@Slf4j
public class RoomController {
	
	@Autowired
	private IRoomService roomService;

	@GetMapping("/inbuilding/{buildingId}")
	public ResponseEntity<?> getListOfRoomsInBuilding(@PathVariable Long buildingId) {
		return ResponseEntity.ok(roomService.getRoomsInBuilding(buildingId));
	}
	
	@PostMapping("/inbuilding/{buildingId}")
	public ResponseEntity<?> addRoomInBuilding(@PathVariable Long buildingId, @RequestBody @Valid Room room){
		log.info("building id is "+buildingId);
		log.info("Room is "+room);
		return ResponseEntity.ok(roomService.addRoomToBuilding(buildingId,room));
	}
	
	@DeleteMapping("/{roomId}")
	public ResponseEntity<?> deleteRoom(@PathVariable Long roomId){
		return ResponseEntity.ok(roomService.deleteRoom(roomId));
	}
}
