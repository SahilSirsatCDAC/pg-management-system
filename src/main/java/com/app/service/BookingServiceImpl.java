package com.app.service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import javax.transaction.Transactional;
import javax.validation.Valid;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.app.dto.Booking;
import com.app.entities.BedEntity;
import com.app.entities.BookingEntity;
import com.app.entities.UserEntity;
import com.app.repository.BedRepository;
import com.app.repository.BookingRepository;
import com.app.repository.UserRepository;

import lombok.extern.slf4j.Slf4j;

@Service
@Transactional
@Slf4j
public class BookingServiceImpl implements IBookingService {
	@Autowired
	private ModelMapper mapper;

	@Autowired
	private BedRepository bedRepo;

	@Autowired
	private UserRepository userRepo;

	@Autowired
	private BookingRepository bookingRepo;

	@Override
	public Booking bookBedForUser(Long bedId, @Valid Booking booking) {
		log.info(getClass().getName()+" bookBedForUser "+ bedId + " "+ booking);
		BedEntity bedEntity = bedRepo.findById(bedId).orElse(null);
		if (bedEntity == null) {
			log.info(getClass().getName()+" bed not found "+ bedId);
			return null;
		}
		String username = (String) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		Optional<UserEntity> userEntity = userRepo.findByEmail(username);
		if (userEntity.isEmpty()) {
			log.info(getClass().getName()+" user details invalid");
			return null;
		}
		List<BookingEntity> listOfConfilctBookings = bookingRepo.findByStartDateBetweenOrEndDateBetween(booking.getStartDate(), booking.getEndDate(), bedEntity.getId());
		log.info(getClass().getName()+" booking found for given time period "+ listOfConfilctBookings.size());
		if(listOfConfilctBookings.size()>0)
			return null;
		BookingEntity b = mapper.map(booking, BookingEntity.class);
		b.setBed(bedEntity);
		b.setUser(userEntity.get());
		b = bookingRepo.save(b);
		return mapper.map(b, Booking.class);
	}

	@Override
	public Booking removeBookingEntry(Long bookingId) {
		BookingEntity bookingEntity = bookingRepo.getReferenceById(bookingId);
		String username = (String) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		if (bookingEntity == null || !bookingEntity.getUser().getEmail().equalsIgnoreCase(username))
			return null;
		bookingRepo.delete(bookingEntity);
//		bookingEntity.getBed().setBookingStatus(false);
		return mapper.map(bookingEntity, Booking.class);
	}

	@Override
	public List<Booking> getBookingDetailsOfUser(Long userId) {
		return bookingRepo.findAllByUserId(userId).stream().map(b -> mapper.map(b, Booking.class))
				.collect(Collectors.toList());
	}

	@Override
	public List<Booking> getBookingDetailsOfBed(Long bedId) {
		return bookingRepo.findAllByBedId(bedId).stream().map(b -> mapper.map(b, Booking.class))
				.collect(Collectors.toList());
	}
}
