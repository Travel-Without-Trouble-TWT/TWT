package com.BE.TWT.service.map;

import com.BE.TWT.exception.error.MapException;
import com.BE.TWT.exception.message.MapErrorMessage;
import com.BE.TWT.model.dto.Point;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.URL;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;

import static com.BE.TWT.exception.message.MapErrorMessage.INVALID_ADDRESS;

@Service
public class PointService {
    @Value("${spring.map.key}")
    private String apiKey;
    private final String EPSG = "epsg:4326";

    public Point getMapString (String address) throws MapException {
        StringBuilder sb = new StringBuilder("https://api.vworld.kr/req/address");
        sb.append("?service=address");
        sb.append("&request=getCoord");
        sb.append("&format=json");
        sb.append("&crs=" + EPSG);
        sb.append("&key=" + apiKey);
        sb.append("&address=" + URLEncoder.encode(address, StandardCharsets.UTF_8));

        try{
            URL url = new URL(sb.toString());
            BufferedReader reader = new BufferedReader(new InputStreamReader(url.openStream(), StandardCharsets.UTF_8));

            JsonParser jspa = new JsonParser();
            JsonObject jsob = jspa.parse(reader).getAsJsonObject();
            JsonObject jsrs = jsob.get("response").getAsJsonObject();
            JsonObject jsResult = jsrs.get("result").getAsJsonObject();
            JsonObject jspoitn = jsResult.get("point").getAsJsonObject();

            String jsonLongitude = jspoitn.get("y").getAsString();
            String jsonLatitude = jspoitn.get("x").getAsString();
            return new Point(Double.parseDouble(jsonLongitude),Double.parseDouble(jsonLatitude));
        } catch (IOException e) {
            throw new MapException(INVALID_ADDRESS);
        }
    }
}
