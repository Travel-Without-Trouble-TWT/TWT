package com.BE.TWT.controller.function;

import com.BE.TWT.service.function.S3Service;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.v3.oas.annotations.Operation;
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
@Api(tags = "이미지 첨부")
public class S3Controller {
    private final S3Service s3Service;

    @PostMapping("/uploads")
    @ApiOperation(value = "이미지 첨부")
    @Operation(description = "null 은 에러떠용")
    public ResponseEntity<Object> uploadFiles(
            @RequestPart(value = "files") List<MultipartFile> multipartFiles) {

        return ResponseEntity.status(HttpStatus.OK).body(s3Service.uploadFiles(multipartFiles));
    }

    @DeleteMapping("/delete")
    @ApiOperation(value = "이미지 삭제")
    @Operation(description = "쓸 일이 있을까 싶지만")
    public ResponseEntity<Object> deleteFile(
            @RequestParam(value = "uuidFileName") String uuidFileName) {

        return ResponseEntity.status(HttpStatus.OK).body(s3Service.deleteFile(uuidFileName));
    }
}
