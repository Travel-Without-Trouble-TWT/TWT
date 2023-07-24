package com.BE.TWT.crawling;

import com.BE.TWT.exception.error.MapException;
import com.BE.TWT.exception.message.MapErrorMessage;
import com.BE.TWT.model.dto.AddressResponse;
import com.BE.TWT.model.entity.Stay;
import com.BE.TWT.model.type.PlaceType;
import com.BE.TWT.repository.StayRepository;
import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import lombok.RequiredArgsConstructor;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import org.springframework.stereotype.Service;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLEncoder;

@Service
@RequiredArgsConstructor
public class ScrapStay {
    private final StayRepository stayRepository;


        public void scrapStayData (String url) throws IOException {

        Document document = Jsoup.connect(url).get();
        Elements hotelElements = document.select("[data-testid=\"property-card\"]");

        for (Element element : hotelElements) {
            String name = element.select("[data-testid=\"title\"]").text();
            String imageUrl = element.select("img").attr("src");
            String description = element.select("div.d8eab2cf7f").text();
            int idx = description.lastIndexOf(".");
            description = description.substring(0, idx + 1); // . 뒤에 ~~개의 후기 라는 단어 제거하기 위함

            AddressResponse addressResponse = searchLocation(name);

            Stay stay = Stay.builder()
                    .stayName(name)
                    .stayAddress(addressResponse.getAddress())
                    .latitude(addressResponse.getLatitude())
                    .longitude(addressResponse.getLongitude())
                    .stayDescription(description)
                    .stayImageUrl(imageUrl)
                    .stayCallNumber(addressResponse.getPhone())
                    .placeType(PlaceType.STAY)
                    .stayLocation("대구")
                    .build();
            if (stayRepository.findByStayName(name).isEmpty()) {
                stayRepository.save(stay);
            }
        }
    }

    public AddressResponse searchLocation(String building) throws MapException {
        String kakaoApiKey = "0ad552da7c60e0f4fa43e783b08091a8";

        String reqURL = "https://dapi.kakao.com/v2/local/search/keyword.json";

        try {
            String encodedQuery = URLEncoder.encode(building, "UTF-8");
            String request = "?page=1&size=15&sort=accuracy&category_group_code=AD5" + "&query=" + encodedQuery;
            URL url = new URL(reqURL + request);
            HttpURLConnection conn = (HttpURLConnection) url.openConnection();

            conn.setRequestMethod("GET");
            conn.setDoOutput(true);
            conn.setRequestProperty("Authorization", "KakaoAK " + kakaoApiKey);

            double longitude = 0;
            double latitude = 0;
            String address = "";
            String phone = "";

            //요청을 통해 얻은 JSON타입의 Response 메세지 읽어오기
            BufferedReader br = new BufferedReader(new InputStreamReader(conn.getInputStream()));
            String line = "";
            String result = "";

            while ((line = br.readLine()) != null) {
                result += line;
            }

            //Gson 라이브러리로 JSON파싱
            JsonParser parser = new JsonParser();
            JsonObject jsonObject = parser.parse(result).getAsJsonObject();

            JsonArray documents = jsonObject.getAsJsonArray("documents");
            for (JsonElement docElement : documents) {
                JsonObject docObject = docElement.getAsJsonObject();
                longitude = docObject.getAsJsonObject().get("x").getAsDouble();
                latitude = docObject.getAsJsonObject().get("y").getAsDouble();
                address = docObject.getAsJsonObject().get("road_address_name").getAsString();
                phone = docObject.getAsJsonObject().get("phone").getAsString();
            }
            AddressResponse addressResponse = AddressResponse.builder()
                    .address(address)
                    .latitude(latitude)
                    .longitude(longitude)
                    .phone(phone)
                    .build();

            return addressResponse;

        } catch (IOException e) {
            throw new MapException(MapErrorMessage.INVALID_ADDRESS);
        }
    }
}
