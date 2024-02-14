package com.app.service;

import java.util.Optional;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.app.dto.Address;
import com.app.entities.AddressEntity;
import com.app.entities.UserEntity;
import com.app.repository.AddressRepository;
import com.app.repository.UserRepository;

import lombok.extern.slf4j.Slf4j;

@Service
@Transactional
@Slf4j
public class AddressServiceImpl implements IAddressService {

	@Autowired
	private AddressRepository addrRepo;

	@Autowired
	private ModelMapper mapper;
	
	@Autowired
	private UserRepository userRepo;

	@Override
	public Address getAddressById(long id) {
		Optional<AddressEntity> addr = addrRepo.findById(id);
		if (addr.isPresent())
			return mapper.map(addr.get(), Address.class);
		return null;
	}

	@Override
	public Address addAddress(Address addr) {
		AddressEntity ae = addrRepo.save(mapper.map(addr, AddressEntity.class));
		String username = (String) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		Optional<UserEntity> userEntity = userRepo.findByEmail(username);
		if (userEntity.isEmpty()) {
			log.info(getClass().getName()+" user details invalid");
			return null;
		}
		if(userEntity.get().getUserAddr() != null)
			addrRepo.deleteById(userEntity.get().getUserAddr().getId());
		userEntity.get().setUserAddr(ae);
		return mapper.map(ae, Address.class);
	}
}
