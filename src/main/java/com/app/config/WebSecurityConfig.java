package com.app.config;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.app.filters.JWTRequestFilter;

@EnableWebSecurity // mandatory
@Configuration // mandatory
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class WebSecurityConfig {

	@Autowired
	private JWTRequestFilter filter;

	// configure BCryptPassword encode bean
	@Bean
	public PasswordEncoder encoder() {
		return new BCryptPasswordEncoder();
	}

	@Bean
	public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
		http.cors().and().csrf().disable().
		exceptionHandling().
		authenticationEntryPoint((request, response, ex) -> {
			response.sendError(HttpServletResponse.SC_UNAUTHORIZED, ex.getMessage());
		}).
		and().
		authorizeRequests()
		.antMatchers(HttpMethod.DELETE, "/booking/**", "/user/**").hasRole("USER")
		.antMatchers(HttpMethod.DELETE, "/building/**", "/room/**", "/bed/**").hasAnyRole("OWNER", "ADMIN")
		
		.antMatchers(HttpMethod.POST, "/image/user/**").hasRole("USER")
		.antMatchers(HttpMethod.POST, "/image/building/**", "/image/room/**").hasRole("OWNER")
		.antMatchers(HttpMethod.POST, "/address/add/**").hasAnyRole("USER", "OWNER")
		.antMatchers(HttpMethod.POST, "/building/**", "/room/inbuilding/**", "/bed/inroom/**").hasRole("OWNER")
		.antMatchers(HttpMethod.POST, "/booking/bed/**").hasAnyRole("ADMIN", "USER", "OWNER")

		.antMatchers(HttpMethod.PUT, "/user/**").hasRole("USER")
		
		.antMatchers(HttpMethod.GET, "/address/**", "/user/users").hasRole("ADMIN")
		.antMatchers(HttpMethod.GET, "/booking/userBookings/**", "/image/user/**").hasRole("USER")
		.antMatchers(HttpMethod.GET, "/booking/bedBookings/**").hasRole("OWNER")
//		.antMatchers(HttpMethod.GET, "/user/**").permitAll()
		.antMatchers(HttpMethod.GET, "/building/**", "/room/inbuilding/**", "/bed/inroom/**",  "/image/building/**", "/image/room/**", "/image/id/**").permitAll()
		
		.antMatchers("/auth/**", "/swagger*/**", "/v*/api-docs/**").permitAll()
		.antMatchers(HttpMethod.OPTIONS).permitAll().
		anyRequest().authenticated().
		and().
		sessionManagement()
		.sessionCreationPolicy(SessionCreationPolicy.STATELESS).
		and()
		.addFilterBefore(filter, UsernamePasswordAuthenticationFilter.class);

		return http.build();
	}

	@Bean
	public AuthenticationManager authenticatonMgr(AuthenticationConfiguration config) throws Exception {
		return config.getAuthenticationManager();
	}

}
