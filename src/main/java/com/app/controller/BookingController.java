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

import com.app.dto.Booking;
import com.app.service.IBookingService;

import lombok.extern.slf4j.Slf4j;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/booking")
@Slf4j
public class BookingController {

	@Autowired
	private IBookingService bookingService;

	@PostMapping("bed/{bedId}")
	public ResponseEntity<?> bookBedForUser(@PathVariable Long bedId, @RequestBody @Valid Booking booking) {
		/*
		 * body will be { private LocalDate start_date; private LocalDate end_date;
		 * private double rent_paid; private LocalDate transaction_date; }
		 */
		log.info(getClass().getName()+" bookBedForUser "+ bedId+" "+ booking);
		Booking b = bookingService.bookBedForUser(bedId, booking);
		if (b != null) {
			log.info(getClass().getName()+" bed booking successful "+ bedId);
			return ResponseEntity.ok(b);
		}
		log.info(getClass().getName()+" bed booking failed "+ bedId);
		return ResponseEntity.badRequest().body("Booking Failed");
	}
	
	@DeleteMapping("{bookingId}")
	public ResponseEntity<?> removeBookingEntry(@PathVariable Long bookingId){
		Booking b = bookingService.removeBookingEntry(bookingId);
		if (b != null)
			return ResponseEntity.ok(b);
		return ResponseEntity.badRequest().body("Delete Booking Failed");
	}
	
	@GetMapping("/userBookings/{userId}")
	public ResponseEntity<?> userBookingDetails(@PathVariable Long userId){
		return ResponseEntity.ok(bookingService.getBookingDetailsOfUser(userId));
	}
	
	@GetMapping("/bedBookings/{bedId}")
	public ResponseEntity<?> bedBookingDetails(@PathVariable Long bedId){
		return ResponseEntity.ok(bookingService.getBookingDetailsOfBed(bedId));
	}

}
