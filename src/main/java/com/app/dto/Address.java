package com.app.dto;

import javax.validation.constraints.NotBlank;

import org.hibernate.validator.constraints.Length;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonProperty.Access;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class Address {
	
	@JsonProperty(access = Access.READ_ONLY)
	private Long id;
	
	@NotBlank(message = "Address Line 1 is required")
	@Length(max = 50)
	private String addrl1;
	
	@NotBlank(message = "Address Line 2 is required")
	@Length(max = 50)
	private String addrl2;
	
	@NotBlank(message = "City is required")
	@Length(max = 20)
	private String city;
	
	@NotBlank(message = "State is required")
	@Length(max = 20)
	private String state;
	
	@NotBlank(message = "Country is required")
	@Length(max = 20)
	private String country;
	
	@NotBlank(message = "ZipCode is required")
	@Length(max = 6,min = 6)
	private String zipCode;
}
