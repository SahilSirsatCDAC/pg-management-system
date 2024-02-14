package com.app;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import com.app.dto.UserRole;
import com.app.entities.Role;
import com.app.repository.RoleRepository;
import com.app.service.IUserService;

@SpringBootApplication
public class Application {

	public static void main(String[] args) {
		SpringApplication.run(Application.class, args);
	}

	// configure model mapper bean , with STRICT mapping instructions
	@Bean
	public ModelMapper mapper() {
		ModelMapper modelMapper = new ModelMapper();
		modelMapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);
		return modelMapper;
	}

	@Bean
	CommandLineRunner run(RoleRepository roleRepo, IUserService userService) {

		List<UserRole> dbRoles = roleRepo.findAll().stream().map(r -> r.getRoleName()).collect(Collectors.toList());
		List<UserRole> allRoles = Arrays.asList(UserRole.values()).stream().filter(myrole -> !dbRoles.contains(myrole))
				.collect(Collectors.toList());
		allRoles.forEach(myrole -> roleRepo.save(new Role(myrole)));
		return null;
	}
}
