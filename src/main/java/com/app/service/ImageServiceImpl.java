package com.app.service;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;
import java.util.stream.Collectors;

import javax.annotation.PostConstruct;
import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.app.dto.ComponentType;
import com.app.entities.ImageEntity;
import com.app.repository.ImageRepository;

import lombok.extern.slf4j.Slf4j;

@Service
@Transactional
@Slf4j
public class ImageServiceImpl implements IImageService {

	static private long counter = 0;

	@Value("${file.upload.location}")
	private String folderLocation;

	@Autowired
	private ImageRepository imgRepo;

	@PostConstruct
	public void anyInit() {
		File folder = new File(folderLocation);
		if (!folder.exists()) {
			folder.mkdirs();
			log.info("folder created....");
		} else
			log.info("folder alrdy exists !");
	}

	@Override
	public String uploadImage(String componentType, long componentId, MultipartFile imgFile) throws IOException {

		ComponentType type = ComponentType.valueOf(componentType);
		String path = folderLocation + File.separator + componentType + componentId + "_" + ++counter
				+ imgFile.getOriginalFilename();
		log.info("path {}", path);
		ImageEntity img = imgRepo.save(new ImageEntity(type, componentId, path));

		Files.copy(imgFile.getInputStream(), Paths.get(path), StandardCopyOption.REPLACE_EXISTING);
		log.info("file copied : {}", img);

		return "File uploaded successfully"+ img.getId();
	}

	public static byte[] restoreImage(String path) {

		try {
			return Files.readAllBytes(Paths.get(path));
		} catch (IOException e) {
			e.printStackTrace();
		}
		return null;
	}

	@Override
	public byte[] downloadImage(long componentId) throws IOException, Exception {
		ImageEntity ls = imgRepo.getReferenceById(componentId);
		if (ls.getImagePath() != null)
			return Files.readAllBytes(Paths.get(ls.getImagePath()));
		return "Image not found".getBytes();
	}

	@Override
	public List<Long> getImagePaths(String componentType, long componentId) {
		ComponentType type = ComponentType.valueOf(componentType);
		return imgRepo.findByTypeAndCompid(type, componentId).stream().map(ie -> ie.getId()).collect(Collectors.toList());
	}
}
