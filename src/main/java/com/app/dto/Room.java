package com.app.dto;

import javax.validation.constraints.NotNull;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonProperty.Access;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class Room {
	
	@JsonProperty(access = Access.READ_ONLY)
	private Long id;
	
	@NotNull(message = "Room rent is required")
	private double rentPerDay;
	
	private Building building;
}
