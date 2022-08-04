package com.teras.api.service;

import java.io.File;
import java.io.IOException;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
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
	public File downloadFile() {
		return null;
	}

	@Override
	public Attachment createFile(String uuid, String fileName, String fileType, String filePath) {
		Attachment attachment = Attachment.builder().uuid(uuid).fileName(fileName).fileType(fileType).filePath(filePath)
				.build();
		return attachmentRepository.save(attachment);
	}

}
