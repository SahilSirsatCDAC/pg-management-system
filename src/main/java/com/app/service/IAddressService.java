package com.app.service;

import com.app.dto.Address;

public interface IAddressService {
	Address getAddressById(long id);
	Address addAddress(Address addr);
}
