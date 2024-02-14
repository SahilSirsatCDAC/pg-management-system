package com.app.controller;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.http.MediaType;
import com.app.service.IImageService;

import lombok.extern.slf4j.Slf4j;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/image")
@Slf4j
public class ImageController {

	@Autowired
	private IImageService imageService;

	@PostMapping("/{componentType}/{componentId}")
	public ResponseEntity<?> uploadImage(@PathVariable String componentType, @PathVariable long componentId,
			@RequestParam MultipartFile imgFile) throws IOException {
		log.info("componentType" + componentType);
		log.info("componentId" + componentId);
		log.info("uploaded file name :  " + imgFile.getOriginalFilename() + " size " + imgFile.getSize());
		return ResponseEntity.ok(imageService.uploadImage(componentType, componentId, imgFile));
	}

	@GetMapping(value = "/{componentType}/{componentId}")
	public ResponseEntity<?> getImagePaths(@PathVariable String componentType, @PathVariable long componentId) {
		log.info("in img download");
		log.info("componentType" + componentType);
		log.info("componentId" + componentId);
		return ResponseEntity.ok(imageService.getImagePaths(componentType, componentId));
	}
	
	@GetMapping(value = "/id/{imageId}", produces = { MediaType.IMAGE_GIF_VALUE,
			MediaType.IMAGE_JPEG_VALUE, MediaType.IMAGE_PNG_VALUE })
	public ResponseEntity<?> downloadImage(@PathVariable long imageId)
			throws Exception {
		log.info("in img download" + imageId);
		return ResponseEntity.ok(imageService.downloadImage(imageId));
	}
}
