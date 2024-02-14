package com.app.controller;

import java.util.stream.Collectors;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.dto.AuthRequest;
import com.app.dto.AuthResp;
import com.app.dto.UserDTO;
import com.app.jwt_utils.JwtUtils;
import com.app.service.IUserService;

import lombok.extern.slf4j.Slf4j;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/auth")
@Slf4j
public class SignInSignUpController {
//dep : JWT utils : for generating JWT
	@Autowired
	private JwtUtils utils;
	// dep : Auth mgr
	@Autowired
	private AuthenticationManager manager;
	// dep : user service for handling users
	@Autowired
	private IUserService userService;

	@Autowired
	private UserDetailsService userDetailsService;

	// add a method to authenticate user . Incase of success --send back token , o.w
	// send back err mesg

	@PostMapping("/signin")
	public ResponseEntity<?> validateUserCreateToken(@RequestBody @Valid AuthRequest request) {
		// store incoming user details(not yet validated) into Authentication object
		// Authentication i/f ---> implemented by UserNamePasswordAuthToken
		UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(request.getEmail(),
				request.getPassword());
		log.info("auth token " + authToken);
		try {
			// authenticate the credentials
			Authentication authenticatedDetails = manager.authenticate(authToken);
			String[] tokens = utils.generateJwtToken(authenticatedDetails);
			// => auth succcess
			return ResponseEntity.ok(new AuthResp("Auth successful!", tokens[0], tokens[1]));
		} catch (BadCredentialsException e) { // lab work : replace this by a method in global exc handler
			// send back err resp code
			System.out.println("err " + e);
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
		}

	}

	// add request handling method for user registration
	@PostMapping("/signup")
	public ResponseEntity<?> userRegistration(@RequestBody @Valid UserDTO user) {
		System.out.println("in reg user : user " + user + " roles " + user.getRoles());// {....."roles" :
																						// [ROLE_USER,...]}
		// invoke service layer method , for saving : user info + associated roles info
		return ResponseEntity.status(HttpStatus.CREATED).body(userService.registerUser(user));
	}

	@GetMapping("/refreshToken")
	public ResponseEntity<?> refreshToken(HttpServletRequest request, HttpServletResponse response) {
		log.info("in refresh token");
		String header = request.getHeader("Authorization");
		if (header != null && header.startsWith("Bearer ")) {
			String refresh_token = header.substring(7);
			if (utils.validateJwtToken(refresh_token)) {
				String userName = utils.getUserNameFromJwtToken(refresh_token);
				Long userId = utils.getUserIdFromJwtToken(refresh_token);
				UserDetails userDetails = userDetailsService.loadUserByUsername(userName);
				String access_token = utils.generateAccessToken(userName,
						userDetails.getAuthorities().stream().map(a -> a.getAuthority()).collect(Collectors.toList()), userId);
				return ResponseEntity.ok(new AuthResp("Auth successful!", access_token, refresh_token));
			}
		} else
			log.error("Request header DOES NOT contain a Bearer Token");
		return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Refresh token expired, try to login");
	}
}
