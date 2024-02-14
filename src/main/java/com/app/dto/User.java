package com.app.dto;



import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;

import org.hibernate.validator.constraints.Length;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonProperty.Access;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class User {
	@JsonProperty(access = Access.READ_ONLY)
	private Long id;
	
	@NotBlank(message = "First name cannot be empty")
	@Length(max = 30)
	private String firstName;
	
	@NotBlank(message = "Last name cannot be empty")
	@Length(max = 30)
	private String lastName;
	
	@NotBlank(message = "Country code is required")
	@Length(min = 2, max = 3)
	private String countryCode;
	
	@NotBlank(message= "Contact code is required")
	@Length(min = 10, max = 10)
	private String contactNo;
	
//	@NotNull(message = "Please add address to user")
	private Address userAddr;
	
	@NotBlank(message = "Email cannot be empty")
	@Length(max = 50)
	@Email(message = "Invalid email format")
	private String email;
}
