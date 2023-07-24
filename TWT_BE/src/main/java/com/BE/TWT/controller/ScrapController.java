package com.BE.TWT.controller;

import com.BE.TWT.crawling.ScrapStay;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import javax.validation.Valid;
import java.io.IOException;

@Controller
@RequiredArgsConstructor
@RequestMapping("/scrap")
public class ScrapController {
    private final ScrapStay scrapStay;
    @PostMapping("/stay")
    public void scrapStay(@RequestParam @Valid String url) throws IOException {
        scrapStay.scrapStayData(url);
    }
}
