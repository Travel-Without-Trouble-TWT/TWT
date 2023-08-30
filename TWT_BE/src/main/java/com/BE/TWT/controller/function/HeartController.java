package com.BE.TWT.controller.function;

import com.BE.TWT.model.dto.function.HeartDto;
import com.BE.TWT.model.entity.function.Heart;
import com.BE.TWT.model.entity.location.Place;
import com.BE.TWT.service.function.HeartService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/heart")
@Api(tags = "좋아요 API")
public class HeartController {
    private final HeartService heartService;

    @ApiOperation(value = "좋아요 버튼")
    @Operation(description = "좋아요를 이미 눌렀었던 유저 & 게시글은 좋아요 취소가 됩니다.")
    @PostMapping("/express")
    public ResponseEntity<?> likeIt(HttpServletRequest request, @RequestBody @Valid HeartDto heartDto) {
        return ResponseEntity.ok(heartService.likeIt(request, heartDto));
    }

    @ApiOperation(value = "좋아요 누른 장소들")
    @Operation(description = "유저가 좋아요를 누른 장소들을 불러옵니다.")
    @GetMapping("/history")
    public ResponseEntity<List<Place>> searchAllHeartByMember(HttpServletRequest request) {
        return ResponseEntity.ok(heartService.searchAllHeartByMember(request));
    }
}
