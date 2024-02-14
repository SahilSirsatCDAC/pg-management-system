package com.app.service;

import java.util.List;
import java.util.stream.Collectors;

import javax.transaction.Transactional;
import javax.validation.Valid;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.dto.Building;
import com.app.dto.Room;
import com.app.entities.RoomEntity;
import com.app.repository.BuildingRepository;
import com.app.repository.RoomRepository;

@Service
@Transactional
public class RoomServiceImpl implements IRoomService {
	@Autowired
	private ModelMapper mapper;

	@Autowired
	private RoomRepository roomRepo;
	
	@Autowired
	private BuildingRepository buildingRepo;
	
	@Autowired
	private IBedService bedService;
	
	@Override
	public List<Room> getRoomsInBuilding(Long buildingId) {
		return roomRepo.findByBuildingId(buildingId).stream().map(roomEntity -> mapper.map(roomEntity, Room.class)).collect(Collectors.toList());
	}

	@Override
	public Room addRoomToBuilding(Long buildingId, @Valid Room room) {
		room.setBuilding(mapper.map(buildingRepo.getReferenceById(buildingId), Building.class));
		RoomEntity r = mapper.map(room, RoomEntity.class);
		return mapper.map(roomRepo.save(r), Room.class);
	}

	@Override
	public Room deleteRoom(Long roomId) {
		RoomEntity roomEntity = roomRepo.findById(roomId).orElse(null);
		if(roomEntity != null) {
			bedService.deleteBedsOfRoom(roomId);
			roomRepo.delete(roomEntity);
		}
		return mapper.map(roomEntity, Room.class);
	}
}
