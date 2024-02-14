package com.app.service;

import java.io.IOException;
import java.util.List;

import org.springframework.web.multipart.MultipartFile;

public interface IImageService {

	String uploadImage(String componentType, long componentId, MultipartFile imgFile)  throws IOException;

//	byte[][] downloadImage(String componentType, long componentId) throws IOException, Exception;

	byte[] downloadImage(long imageId) throws IOException, Exception;

	List<Long> getImagePaths(String componentType, long componentId);
	
}
