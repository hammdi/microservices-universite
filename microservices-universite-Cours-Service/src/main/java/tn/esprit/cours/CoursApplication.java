package tn.esprit.cours;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import tn.esprit.cours.entities.Course;
import tn.esprit.cours.repository.CourseRepository;

@SpringBootApplication
public class CoursApplication {

    public static void main(String[] args) {
        SpringApplication.run(CoursApplication.class, args);
    }
    @Autowired
    private CourseRepository repository;

    @Bean
    ApplicationRunner init() {
        return (args) -> {
// save
            repository.save(new Course("course1", "microservice", "desc", 30));
            repository.save(new Course("course2", "dba", "desc1", 15));
            repository.save(new Course("course3", "reseau", "desc2", 20));
            repository.save(new Course("course4", "springboot", "desc3", 10));

// fetch
            repository.findAll().forEach(System.out::println);
        };
    }

}
