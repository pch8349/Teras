package com.teras.api.service;

import java.io.File;
import java.io.IOException;

import org.springframework.web.multipart.MultipartFile;

import com.teras.db.entity.Attachment;

public interface FileService {
	String uploadFile(MultipartFile file) throws IllegalStateException, IOException;
	File downloadFile();
	
	Attachment createFile(String uuid, String fileName, String fileType, String filePath);
}
