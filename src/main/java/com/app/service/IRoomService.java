package com.app.service;

import java.util.List;

import javax.validation.Valid;

import com.app.dto.Room;

public interface IRoomService {

	List<Room> getRoomsInBuilding(Long buildingId);

	Room addRoomToBuilding(Long buildingId, @Valid Room room);

	Room deleteRoom(Long roomId);

}
