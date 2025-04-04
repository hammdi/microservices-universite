package tn.esprit.mehdibenattaya4twin9;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;



@SpringBootApplication
@EnableDiscoveryClient
public class MehdiBenattaya4twin9Application {

    public static void main(String[] args) {
        SpringApplication.run(MehdiBenattaya4twin9Application.class, args);
    }

}
