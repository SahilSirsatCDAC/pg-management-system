package com.app.dto;

import javax.validation.constraints.NotEmpty;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonProperty.Access;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
@Getter
@Setter
@ToString
public class Bed {
	
	@JsonProperty(access = Access.READ_ONLY)
	private Long id;
	private Room room;
	@NotEmpty(message = "Please provide description about bed")
	private String description;
//	private boolean bookingStatus;
}

