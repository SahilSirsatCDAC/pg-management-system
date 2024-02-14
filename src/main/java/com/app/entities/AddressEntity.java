package com.app.entities;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name="address")
@Getter
@Setter
@ToString
public class AddressEntity extends BaseEntity{
	
	@Column(length = 50, name = "address_line1")
	private String addrl1;
	
	@Column(length = 50, name = "address_line2")
	private String addrl2;
	
	@Column(length = 20)
	private String city;
	
	@Column(length = 20)
	private String state;
	
	@Column(length = 20)
	private String country;
	
	@Column(length = 6, name = "zip_code")
	private String zipCode;
}
