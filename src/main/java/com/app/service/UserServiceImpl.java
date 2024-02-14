package com.app.service;

import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

import javax.transaction.Transactional;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.app.dto.User;
import com.app.dto.UserDTO;
import com.app.dto.UserRegResponse;
import com.app.dto.UserRole;
import com.app.entities.AddressEntity;
import com.app.entities.Role;
import com.app.entities.UserEntity;
import com.app.repository.AddressRepository;
import com.app.repository.RoleRepository;
import com.app.repository.UserRepository;

import lombok.extern.slf4j.Slf4j;

@Service
@Transactional
@Slf4j
public class UserServiceImpl implements IUserService {

	@Autowired
	private UserRepository userRepo;

	@Autowired
	private RoleRepository roleRepo;

	@Autowired
	private AddressRepository addrRepo;
	
	@Autowired
	private ModelMapper mapper;

	@Autowired
	private PasswordEncoder encoder;

	@Override
	public UserRegResponse registerUser(UserDTO user) {
		// Objective : 1 rec inserted in users table n insert n recs in link table
		// user_roles
		// 1. Map dto --> entity
		UserEntity userEntity = mapper.map(user, UserEntity.class);
		// 2. Map Set<UserRole : enum> ---> Set<Role :entity> n assign it to the
		// transient user entity
		userEntity.setUserRoles(roleRepo.findByRoleNameIn(user.getRoles()));
		// 3. encode pwd
		userEntity.setPassword(encoder.encode(user.getPassword()));
		// 4 : Save user details
		UserEntity persistentUser = userRepo.save(userEntity);
		return new UserRegResponse("User registered successfully with ID " + persistentUser.getId());
	}

	@Override
	public User getUser(String email, String password) {
		Optional<UserEntity> userEntity = userRepo.findByEmailAndPassword(email, password);
		if(userEntity.isPresent())
			return mapper.map(userEntity.get(), User.class);
		return null;
	}

	@Override
	public User getUserByEmail(String userEmail) {
		return mapper.map(userRepo.findByEmail(userEmail),User.class);
	}
	
	@Override
	public Set<Role> getUserRolesByEmail(String userEmail) {
		UserEntity ue = userRepo.findByEmail(userEmail).orElse(null);
		return ue.getUserRoles();
	}

	@Override
	public User updateUserByID(String userEmail, User newData) {
		UserEntity userEntity = userRepo.findByEmail(userEmail).orElse(null);
		log.info("before user entity null check");
		if(userEntity != null) {
			log.info("inside userenity before setting "+userEntity.getEmail());
			userEntity.setContactNo(newData.getContactNo());
			userEntity.setCountryCode(newData.getCountryCode());
			if(userEntity.getUserAddr() == null)
				userEntity.setUserAddr(addrRepo.save(mapper.map(newData.getUserAddr(), AddressEntity.class)));
			else {
				AddressEntity  ae = userEntity.getUserAddr();
				ae.setAddrl1(newData.getUserAddr().getAddrl1());
				ae.setAddrl2(newData.getUserAddr().getAddrl2());
				ae.setCity(newData.getUserAddr().getCity());
				ae.setState(newData.getUserAddr().getState());
				ae.setCountry(newData.getUserAddr().getCountry());
				ae.setZipCode(newData.getUserAddr().getZipCode());
			}
		}
		log.info("after setting");
		return mapper.map(userRepo.save(userEntity),User.class);
	}

	@Override
	public User deleteUserByID(long userId) {
		UserEntity userEntity = userRepo.findById(userId).orElse(null);
		if(userEntity != null) {
			userRepo.delete(userEntity);
		}
		return mapper.map(userEntity, User.class);
	}

	@Override
	public List<User> getAllUsers() {
		List<User> users = userRepo.findAll().stream().filter(ue -> !ue.getUserRoles().contains(new Role(UserRole.ROLE_ADMIN)))
		.map(ue -> mapper.map(ue, User.class)).collect(Collectors.toList());
		return users;
	}
}
