package com.app.entities;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name="rooms")
@Getter
@Setter
public class RoomEntity extends BaseEntity{
	
	@Column(name="rent")
	private double rentPerDay;
	
	@ManyToOne(fetch = FetchType.LAZY) //MANDATORY --o.w will get org.hib.MappingExc
	@JoinColumn(name="building",nullable = false) //optional to specify FK column name n constraints
	private BuildingEntity building;
	
}