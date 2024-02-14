package com.app.service;

import java.util.List;

import javax.validation.Valid;

import com.app.dto.Booking;

public interface IBookingService {

	Booking bookBedForUser(Long bedId, @Valid Booking booking);

	Booking removeBookingEntry(Long bookingId);

	List<Booking> getBookingDetailsOfUser(Long userId);

	List<Booking> getBookingDetailsOfBed(Long bedId);

}
