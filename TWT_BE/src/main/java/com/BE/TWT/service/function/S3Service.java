package com.BE.TWT.service.function;

import com.BE.TWT.config.JwtTokenProvider;
import com.BE.TWT.model.entity.function.ReviewImage;
import com.BE.TWT.repository.function.ReviewImageRepository;
import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;
import java.util.*;

@Component
@RequiredArgsConstructor
@Slf4j
@Transactional
public class S3Service {
    private final AmazonS3Client amazonS3Client;
    private final ReviewImageRepository reviewImageRepository;

    @Value("${cloud.aws.s3.bucket}")
    private String bucket;

    private final String directoryName = "images";

    /**
     * S3로 파일 업로드
     */
    public List<ReviewImage> uploadFiles(List<MultipartFile> multipartFiles) {

        List<ReviewImage> s3files = new ArrayList<>();


        for (MultipartFile multipartFile : multipartFiles) {

            String originalFileName = multipartFile.getOriginalFilename();
            String uploadFileName = getUuidFileName(originalFileName);
            String uploadFileUrl = "";
            String imagePath = directoryName + "/" + uploadFileName;

            ObjectMetadata objectMetadata = new ObjectMetadata();
            objectMetadata.setContentLength(multipartFile.getSize());
            objectMetadata.setContentType(multipartFile.getContentType());

            try (InputStream inputStream = multipartFile.getInputStream()) {

                // S3에 폴더 및 파일 업로드
                amazonS3Client.putObject(
                        new PutObjectRequest(bucket, imagePath, inputStream, objectMetadata));

                // S3에 업로드한 폴더 및 파일 URL
                uploadFileUrl = amazonS3Client.getUrl(bucket, imagePath).toString();

            } catch (IOException e) {
                e.printStackTrace();
                log.error("Filed upload failed", e);
            }

            ReviewImage reviewImage = ReviewImage.builder()
                                    .originalFileName(originalFileName)
                                    .uploadFileName(uploadFileName)
                                    .uploadFileUrl(uploadFileUrl)
                                    .build();
            reviewImageRepository.save(reviewImage);
            s3files.add(reviewImage);
        }

        return s3files;
    }

    /**
     * S3에 업로드된 파일 삭제
     */
    public String deleteFile(String uuidFileName) {

        String result = "success";

        try {
            String keyName = directoryName + "/" + uuidFileName;
            boolean isObjectExist = amazonS3Client.doesObjectExist(bucket, keyName);
            if (isObjectExist) {
                amazonS3Client.deleteObject(bucket, keyName);
            } else {
                result = "file not found";
            }
        } catch (Exception e) {
            log.debug("Delete File failed", e);
        }

        return result;
    }

    /**
     * UUID 파일명 반환
     */
    public String getUuidFileName(String fileName) {
        String ext = fileName.substring(fileName.indexOf(".") + 1);
        return UUID.randomUUID().toString() + "." + ext;
    }
}
