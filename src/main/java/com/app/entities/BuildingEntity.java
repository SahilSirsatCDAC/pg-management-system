package com.app.entities;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name="buildings")
@Getter
@Setter
@ToString
public class BuildingEntity extends BaseEntity{
	
	@Column(length = 20, nullable = false)
	private String name;
	
	@OneToOne
	@JoinColumn(name = "building_addr", nullable = false, unique = true)   // unique pending for testing
	private AddressEntity buildingAddr;
	
	@OneToOne
	@JoinColumn(name = "owner", nullable = false)
	private UserEntity owner;
}
