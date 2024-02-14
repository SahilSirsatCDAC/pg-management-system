package com.app.service;

import java.util.List;
import java.util.Set;

import com.app.dto.User;
import com.app.dto.UserDTO;
import com.app.dto.UserRegResponse;
import com.app.entities.Role;

public interface IUserService {

	UserRegResponse registerUser(UserDTO user);
	User getUser(String email, String password);
	User getUserByEmail(String userEmail);
	User updateUserByID(String userId, User newData);
	User deleteUserByID(long userId);
	Set<Role> getUserRolesByEmail(String userEmail);
	List<User> getAllUsers();
}
