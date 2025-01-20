package com.did.MyShop;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;

@SpringBootApplication(exclude = {SecurityAutoConfiguration.class})
public class MyShopApplication {

	public static void main(String[] args) {
		SpringApplication.run(MyShopApplication.class, args);
	}

}
