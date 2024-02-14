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
public class Building{
	
	@JsonProperty(access = Access.READ_ONLY)
	private Long id;
	
	@NotEmpty(message = "Name of building is required")
	private String name;
	
	private Address buildingAddr;
	
	private User owner;
}
