package com.BE.TWT.controller.function;

import com.BE.TWT.crawling.Data_Go_Kr;
import com.BE.TWT.crawling.ScrapRestaurant;
import com.BE.TWT.crawling.ScrapStay;
import com.BE.TWT.exception.error.MapException;
import io.swagger.annotations.Api;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;
import java.io.IOException;

@Api(tags = "DB 노가다 API")
@RestController
@RequiredArgsConstructor
@RequestMapping("/scrap")
public class ScrapController {
    private final ScrapStay scrapStay;
    private final ScrapRestaurant scrapRestaurant;
    private final Data_Go_Kr dataGoKr;

    /**
     * 나중에 DB 에 없는 맛집 / 명소 검색해서
     * 일정 추가하기 위해서 명칭 바꿔주기
     */
    @GetMapping("/stay")
    public void scrapStay(@RequestParam @Valid String url) throws IOException {
        scrapStay.scrapStayData(url);
    }

    @GetMapping("/restaurant")
    public void scrapRestaurant(@RequestParam @Valid String keyword) throws MapException {
       scrapRestaurant.getRestaurant(keyword);
    }

    @GetMapping("/place")
    public void scrapPlace(@RequestParam @Valid String keyword) {
        dataGoKr.saveHotPlaceByKeyword(keyword);
    }
}
