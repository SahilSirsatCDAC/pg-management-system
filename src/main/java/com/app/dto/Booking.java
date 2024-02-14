package com.app.dto;

import java.time.LocalDate;

import javax.validation.constraints.Future;
import javax.validation.constraints.NotNull;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonProperty.Access;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.datatype.jsr310.deser.LocalDateDeserializer;
import com.fasterxml.jackson.datatype.jsr310.ser.LocalDateSerializer;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class Booking {
	@JsonProperty(access = Access.READ_ONLY)
	private Long id;
	
	@JsonProperty(access = Access.WRITE_ONLY)
	private User user;
	
	private Bed bed;
	
	@NotNull(message = "Please provide start date in YYYY-mm-DD")
	@JsonDeserialize(using = LocalDateDeserializer.class)
	@JsonSerialize(using = LocalDateSerializer.class)
	private LocalDate startDate;
	
	@Future(message = "End date must be in future")
	@NotNull(message = "Please provide end date in YYYY-mm-DD")
	@JsonDeserialize(using = LocalDateDeserializer.class)
	@JsonSerialize(using = LocalDateSerializer.class)
	private LocalDate endDate;
	
	private double rent;
	
	@NotNull(message = "Please provide transaction date in YYYY-mm-DD")
	@JsonDeserialize(using = LocalDateDeserializer.class)
	@JsonSerialize(using = LocalDateSerializer.class)
	private LocalDate transactionDate;
}
