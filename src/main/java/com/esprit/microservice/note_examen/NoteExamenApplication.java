package com.esprit.microservice.note_examen;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;

@SpringBootApplication
@EnableDiscoveryClient
public class NoteExamenApplication {

    public static void main(String[] args) {
        SpringApplication.run(NoteExamenApplication.class, args);
    }
}
