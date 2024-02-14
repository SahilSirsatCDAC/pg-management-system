package com.app.service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import javax.transaction.Transactional;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.app.dto.Building;
import com.app.dto.Room;
import com.app.entities.AddressEntity;
import com.app.entities.BuildingEntity;
import com.app.entities.UserEntity;
import com.app.repository.AddressRepository;
import com.app.repository.BuildingRepository;
import com.app.repository.UserRepository;

import lombok.extern.slf4j.Slf4j;
@Service
@Transactional
@Slf4j
public class BuildingServiceImpl implements IBuildingService {
	
	@Autowired
	private ModelMapper mapper;
	
	@Autowired
	private AddressRepository addrRepo;
	
	@Autowired
	private BuildingRepository buildRepo;

	@Autowired 
	private UserRepository userRepo;
	
	@Autowired
	private IRoomService roomService;
	
	@Override
	public List<Building> getAllBuildings() {
		log.info(getClass().getName()+" in getAllBuildings");
		return buildRepo.findAll().stream().map(b -> mapper.map(b, Building.class)).collect(Collectors.toList());
	}

	@Override
	public Building addBuilding(Building building) {
		log.info(getClass().getName()+" in addBuilding "+building);
		String username = (String) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		Optional<UserEntity> userEntity = userRepo.findByEmail(username);
		if (userEntity.isEmpty() || userEntity.get().getContactNo() == null || userEntity.get().getUserAddr() == null) {
			log.info(getClass().getName()+" userEntity is empty or user has not updated contact details and address");
			return null;
		}
		AddressEntity a = addrRepo.save(mapper.map(building.getBuildingAddr(), AddressEntity.class));
		BuildingEntity b = mapper.map(building, BuildingEntity.class);
		log.info(getClass().getName()+" got address and building :"+ a +" and "+b);
		b.setOwner(userEntity.get());
		b.setBuildingAddr(a);
		log.info(getClass().getName()+" adding building to database");
		return mapper.map(buildRepo.save(b),Building.class);
	}

	@Override
	public Building deleteBuilding(Long buildingId) {
		log.info(getClass().getName()+" deleteBuilding "+buildingId); 
		BuildingEntity buildingEntity = buildRepo.findById(buildingId).orElse(null);
		if(buildingEntity != null) {
			for(Room r : roomService.getRoomsInBuilding(buildingId)) {
				roomService.deleteRoom(r.getId());
			}
			buildRepo.delete(buildingEntity);
		}
		return mapper.map(buildingEntity, Building.class);
	}
	
}