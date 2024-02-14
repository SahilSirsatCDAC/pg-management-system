package com.app.repository;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.app.entities.BookingEntity;

public interface BookingRepository extends JpaRepository<BookingEntity, Long>{

	BookingEntity findByBedId(Long bedId);

	List<BookingEntity> findAllByUserId(Long userId);
	
	List<BookingEntity> findAllByBedId(Long bedId);
	
	@Query("select b from BookingEntity b where (b.startDate between ?1 and ?2 or b.endDate between ?1 and ?2) and b.bed.id=?3")
	List<BookingEntity> findByStartDateBetweenOrEndDateBetween(LocalDate start, LocalDate end, Long bedId);
}
