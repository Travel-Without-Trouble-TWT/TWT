package com.BE.TWT.crawling;


import com.BE.TWT.model.dto.function.AddressResponse;
import com.BE.TWT.model.entity.location.Place;
import com.BE.TWT.model.type.PlaceType;
import com.BE.TWT.repository.location.PlaceRepository;
import lombok.RequiredArgsConstructor;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import org.springframework.stereotype.Service;

import java.io.IOException;


@Service
@RequiredArgsConstructor
public class ScrapStay {
    private final PlaceRepository placeRepository;
    private final KakaoLocationSearch kakaoLocationSearch;


        public void scrapStayData (String url) throws IOException {

        Document document = Jsoup.connect(url).get();
        Elements hotelElements = document.select("[data-testid=\"property-card\"]");

        for (Element element : hotelElements) {
            String name = element.select("[data-testid=\"title\"]").text();
            String imageUrl = element.select("img").attr("src");
            String description = element.select("div.d8eab2cf7f").text();
            int idx = description.lastIndexOf(".");
            description = description.substring(0, idx + 1); // . 뒤에 ~~개의 후기 라는 단어 제거하기 위함

            AddressResponse addressResponse = kakaoLocationSearch.searchLocation(name);

            Place place = Place.builder()
                    .placeName(name)
                    .placeAddress(addressResponse.getAddress())
                    .latitude(addressResponse.getLatitude())
                    .longitude(addressResponse.getLongitude())
                    .placeDescription(description)
                    .placeImageUrl(imageUrl)
                    .placeCallNumber(addressResponse.getPhone())
                    .placeType(PlaceType.STAY)
                    .placeLocation("대구")
                    .build();
            if (placeRepository.findByPlaceName(name).isEmpty()) {
                placeRepository.save(place);
            }
        }
    }

}
