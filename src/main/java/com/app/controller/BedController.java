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

import com.app.dto.Bed;
import com.app.service.IBedService;

import lombok.extern.slf4j.Slf4j;
@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/bed")
@Slf4j
public class BedController {

	@Autowired
	private IBedService bedService;

	@GetMapping("/inroom/{roomId}")
	public ResponseEntity<?> getListOfBedsInRoom(@PathVariable Long roomId) {
		log.info("in getlistof beds in room " + roomId);
		return ResponseEntity.ok(bedService.getAllBedsInRoom(roomId));
	}

	@PostMapping("/inroom/{roomId}")
	public ResponseEntity<?> addBedInRoom(@PathVariable Long roomId, @RequestBody @Valid Bed bed) {
		return ResponseEntity.ok(bedService.addBedInRoom(roomId, bed));
	}

	@DeleteMapping("/{bedId}")
	public ResponseEntity<?> deleteBed(@PathVariable Long bedId) {
		return ResponseEntity.ok(bedService.deleteBed(bedId));
	}
}
