package com.teras.api.controller;

import java.io.File;
import java.io.IOException;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.teras.api.service.FileService;
import com.teras.common.model.response.BaseResponseBody;

@RestController
@RequestMapping("/file")
public class FileController {
	@Autowired
	FileService fileSerivce;

	DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyMMdd");

	@PostMapping("/upload")
	public ResponseEntity<BaseResponseBody> upload(@RequestParam MultipartFile[] uploadFile)
			throws IllegalStateException, IOException {
		String[] uuid = new String[uploadFile.length];
		int index = 0;
		for (MultipartFile file : uploadFile) {
			if (!file.isEmpty()) {

				File newFile = new File("/" + LocalDate.now().format(formatter) + "/" + UUID.randomUUID().toString()
						+ "_" + file.getOriginalFilename());
				file.transferTo(newFile);
			}
		}

		return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success"));
	}
}
