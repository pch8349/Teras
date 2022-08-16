package com.teras.api.service;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.InputStreamResource;
import org.springframework.core.io.Resource;
import org.springframework.http.ContentDisposition;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.teras.db.entity.Attachment;
import com.teras.db.repository.AttachmentRepository;

@Service
public class FileServiceImpl implements FileService {

	@Autowired
	AttachmentRepository attachmentRepository;

	@Override
	public String uploadFile(MultipartFile file) throws IllegalStateException, IOException {
		String uuid = UUID.randomUUID().toString();
		if (!file.isEmpty()) {

			File newFile = new File(uuid + "_" + file.getOriginalFilename());
			file.transferTo(newFile);
		}

		createFile(uuid, file.getOriginalFilename(), file.getContentType(), uuid + "_" + file.getOriginalFilename());

		return uuid;
	}

	@Override
	public ResponseEntity<Object> downloadFile(String uuid) {
		Attachment attach = attachmentRepository.findByUuid(uuid).get();
		String path = "/ubuntu/home/" + attach.getFilePath();

		try {
			Path filePath = Paths.get(path);
			Resource resource = new InputStreamResource(Files.newInputStream(filePath));
			System.out.println("a");

			File file = new File(path);
			System.out.println("a");

			HttpHeaders headers = new HttpHeaders();
			headers.setContentDisposition(ContentDisposition.builder("attachment").filename(file.getName()).build()); //
			System.out.println("a");

			return new ResponseEntity<Object>(resource, headers, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<Object>(null, HttpStatus.CONFLICT);
		}
	}

	@Override
	public Attachment createFile(String uuid, String fileName, String fileType, String filePath) {
		Attachment attachment = Attachment.builder().uuid(uuid).fileName(fileName).fileType(fileType).filePath(filePath)
				.build();
		return attachmentRepository.save(attachment);
	}
	
	@Override
	public String uuidToFileName(String uuid) {
		Attachment attach = attachmentRepository.findByUuid(uuid).get();
		
		String fileName = attach.getFileName();
		return fileName;
	}

}