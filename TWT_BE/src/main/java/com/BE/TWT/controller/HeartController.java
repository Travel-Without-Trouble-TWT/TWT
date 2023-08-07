package com.BE.TWT.controller;

import com.BE.TWT.model.dto.HeartDto;
import com.BE.TWT.model.entity.function.Heart;
import com.BE.TWT.service.review.HeartService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

@RestController
@RequiredArgsConstructor
@RequestMapping("/heart")
public class HeartController {
    private final HeartService heartService;

    public ResponseEntity<Heart> likeIt(@RequestBody @Valid HeartDto heartDto) {
        return ResponseEntity.ok(heartService.likeIt(heartDto));
    }
}
