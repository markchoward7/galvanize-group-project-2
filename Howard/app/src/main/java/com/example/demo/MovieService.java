package com.example.demo;

import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.Map;

@Service
public class MovieService {

    private static final RestTemplate restTemplate = new RestTemplate();
    private static String APIKEY = "a97e0e3b";

    public static Map<String, Object> getMovies(String query) {
        return restTemplate.getForObject(
                "http://www.omdbapi.com/?apikey={key}&s={query}",
                Map.class,
                APIKEY,
                query
        );
    }
}
