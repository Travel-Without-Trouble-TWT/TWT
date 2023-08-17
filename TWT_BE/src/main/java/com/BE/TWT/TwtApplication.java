package com.BE.TWT;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class TwtApplication {

	public static void main(String[] args) {
		SpringApplication.run(TwtApplication.class, args);
	}
}
