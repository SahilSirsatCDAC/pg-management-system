package com.app.controller;

import javax.validation.Valid;
import javax.validation.constraints.NotBlank;

import org.hibernate.validator.constraints.Length;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.dto.Address;
import com.app.dto.User;
import com.app.service.IUserService;

import lombok.Getter;
import lombok.Setter;
import lombok.extern.slf4j.Slf4j;
@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/user")
@Slf4j
public class UserController {

	@Autowired
	private IUserService userService;

	@GetMapping("/{userEmail}")
	public ResponseEntity<?> getUserDetails(@PathVariable String userEmail) {
		log.info(this.getClass() + " method getEmpDetails");
		log.info("User id " + userEmail);
		return ResponseEntity.status(HttpStatus.OK).body(userService.getUserByEmail(userEmail));
	}

	@PutMapping("/{userEmail}")
	public ResponseEntity<?> updateUserDetails(@PathVariable String userEmail, @RequestBody @Valid UpdateUserDetails data) {
		log.info(this.getClass() + " method updateEmpDetails");
		log.info("User id " + userEmail);
		User newData = new User(null, null, null, data.getCountryCode(), data.getContactNo(), data.getUserAddr(), null);
		return ResponseEntity.status(HttpStatus.ACCEPTED).body(userService.updateUserByID(userEmail, newData));
	}
	
	@DeleteMapping("/{userId}")
	public ResponseEntity<?> deleteUserDetails(@PathVariable long userId){
		log.info(this.getClass() + " method deleteUserDetails");
		log.info("User id " + userId);
		return ResponseEntity.status(HttpStatus.OK).body(userService.deleteUserByID(userId));
	}
	
	@GetMapping("/users")
	public ResponseEntity<?> getUsers() {
		log.info(this.getClass() + " get all users");
		return ResponseEntity.status(HttpStatus.OK).body(userService.getAllUsers());
	}
}
@Getter
@Setter
class UpdateUserDetails {
	@NotBlank(message = "Country code is required")
	@Length(min = 2, max = 3)
	private String countryCode;
	
	@NotBlank(message= "Contact code is required")
	@Length(min = 10, max = 10)
	private String contactNo;
	
//	@NotNull(message = "Please add address to user")
	private Address userAddr;
}
