package com.app.service;

import java.util.List;
import java.util.stream.Collectors;

import javax.transaction.Transactional;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.dto.Bed;
import com.app.dto.Room;
import com.app.entities.BedEntity;
import com.app.repository.BedRepository;
import com.app.repository.RoomRepository;

@Service
@Transactional
public class BedServiceImpl implements IBedService {
	@Autowired
	private ModelMapper mapper;
	
	@Autowired
	private BedRepository bedRepo;
	
	@Autowired
	private RoomRepository roomRepo;
	
	public List<Bed> getAllBedsInRoom(Long roomId) {
		List<Bed> ls = bedRepo.findByRoomId(roomId).stream().map(bed -> mapper.map(bed, Bed.class)).collect(Collectors.toList());
		ls.stream().forEach(System.out::println);
		return ls;
	}

	@Override
	public Bed addBedInRoom(Long roomId, Bed bed) {
		bed.setRoom(mapper.map(roomRepo.getReferenceById(roomId),Room.class));
		BedEntity b = mapper.map(bed, BedEntity.class);
		return mapper.map(bedRepo.save(b), Bed.class);
	}

	@Override
	public Bed deleteBed(Long bedId) {
		BedEntity bedEntity = bedRepo.findById(bedId).orElse(null);
		if(bedEntity != null)
			bedRepo.delete(bedEntity);
		return mapper.map(bedEntity, Bed.class);
	}

	@Override
	public void deleteBedsOfRoom(Long roomId) {
		bedRepo.deleteAll(bedRepo.findByRoomId(roomId));
	}


}