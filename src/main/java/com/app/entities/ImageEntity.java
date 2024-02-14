package com.app.entities;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.Table;

import com.app.dto.ComponentType;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name = "image_mappings")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class ImageEntity extends BaseEntity {

	@Enumerated(EnumType.STRING)
	@Column(length = 10)
	private ComponentType type;;

	private long compid;

	private String imagePath;
}
