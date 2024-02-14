package com.app.controller;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.dto.Address;
import com.app.service.IAddressService;
@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/address")
public class AddressController {

	@Autowired
	private IAddressService addrService;

	@PostMapping("/add")
	public ResponseEntity<?> addAddressToUser(@RequestBody @Valid Address request) {
		return ResponseEntity.status(HttpStatus.CREATED).body(addrService.addAddress(request));
	}

	@GetMapping("/{addrId}")
	public ResponseEntity<?> getAddressById(@PathVariable long addrId) {
		return ResponseEntity.ok(addrService.getAddressById(addrId));
	}
}