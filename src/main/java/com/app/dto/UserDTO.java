package com.app.dto;

import java.util.HashSet;
import java.util.Set;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Pattern;

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
@ToString(exclude = "roles")
@NoArgsConstructor
@AllArgsConstructor
public class UserDTO {
	@JsonProperty(access = Access.READ_ONLY) // user id will be serialized n sent to clnt BUT it won't be read from clnt
												// n de-serialized
	private Long userId;
	
	@NotBlank(message = "First name cannot be empty")
	@Length(max = 30)
	private String firstName;
	
	@NotBlank(message = "Last name cannot be empty")
	@Length(max = 30)
	private String lastName;
	
	@NotBlank(message = "Email cannot be empty")
	@Length(max = 50)
	@Email(message = "Invalid email format")
	private String email;
	
	@NotBlank(message = "Password cannot be empty")
	@Length(min = 8, max = 20)
	@Pattern(regexp = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,20}$",
			message = "It contains at least 8 characters and at most 20 characters.\n"
					+ "It contains at least one digit.\n"
					+ "It contains at least one upper case alphabet.\n"
					+ "It contains at least one lower case alphabet.\n"
					+ "It contains at least one special character which includes !@#$%&*()-+=^.\n"
					+ "It doesn’t contain any white space.")
	@JsonProperty(access = Access.WRITE_ONLY)
	private String password;
	
	// many-to-many , User *--->* Role
	@NotEmpty(message = "Please select at least one role")
	@JsonProperty(access = Access.WRITE_ONLY)
	private Set<UserRole> roles = new HashSet<>();

}
