package com.BE.TWT.controller.function;

import com.BE.TWT.service.function.S3Service;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/image")
public class S3Controller {
    private final S3Service s3Service;

    @PostMapping("/uploads")
    public ResponseEntity<Object> uploadFiles(
            @RequestPart(value = "files") List<MultipartFile> multipartFiles) {

        return ResponseEntity.status(HttpStatus.OK).body(s3Service.uploadFiles(multipartFiles));
    }

    @DeleteMapping("/delete")
    public ResponseEntity<Object> deleteFile(
            @RequestParam(value = "uuidFileName") String uuidFileName) {

        return ResponseEntity.status(HttpStatus.OK).body(s3Service.deleteFile(uuidFileName));
    }
}
