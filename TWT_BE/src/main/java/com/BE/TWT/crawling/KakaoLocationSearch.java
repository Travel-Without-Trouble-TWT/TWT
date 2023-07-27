package com.BE.TWT.crawling;

import com.BE.TWT.exception.error.MapException;
import com.BE.TWT.exception.message.MapErrorMessage;
import com.BE.TWT.model.dto.AddressResponse;
import com.BE.TWT.model.type.BuildType;
import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLEncoder;

@Component
@RequiredArgsConstructor
public class KakaoLocationSearch {
    @Value("${kakao.api.key}")
    private String kakaoApiKey;
    private String[] code = {"AD5", "FD6", "CE7", "AT4"}; // 숙박, 식당, 카페, 관광명소 request category_group_code= +

    public AddressResponse searchLocation(String building) throws MapException {

        String reqURL = "https://dapi.kakao.com/v2/local/search/keyword.json";
        String buildType = code[1];
        BuildType type = null;
        if (buildType.equals(code[1])) {
            type = BuildType.RESTAURANT;
        }
        if (buildType.equals(code[2])) {
            type = BuildType.CAFE;
        }
        if (buildType.equals(code[3])) {
            type = BuildType.PLACE;
        }

        try {
            String encodedQuery = URLEncoder.encode(building, "UTF-8");
            String request = "?page=1&size=15&sort=accuracy&category_group_code=" + buildType + "&query=" + encodedQuery;
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
                    .buildType(type)
                    .build();

            return addressResponse;

        } catch (IOException e) {
            throw new MapException(MapErrorMessage.INVALID_ADDRESS);
        }
    }
}
