package com.app.entities;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name="beds")
@Getter
@Setter
public class BedEntity extends BaseEntity{
	
	@ManyToOne(fetch = FetchType.LAZY) //MANDATORY --o.w will get org.hib.MappingExc
	@JoinColumn(name="room",nullable = false) //optional to specify FK column name n constraints
	private RoomEntity room;
	
	private String description;
	
//	@Column(columnDefinition = "boolean default false")
//    private Boolean bookingStatus;
}
