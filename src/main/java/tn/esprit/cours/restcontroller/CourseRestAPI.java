package tn.esprit.cours.restcontroller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tn.esprit.cours.entities.Course;
import tn.esprit.cours.services.CourseService;

import java.util.List;

@RestController
public class CourseRestAPI {
    private String title = "Hello, i'm the course Micro-Service";

    @RequestMapping("/hello")
    public String sayHello() {
        System.out.println(title);
        return title;
    }
    @Autowired
    private CourseService courseService;

    @PostMapping(value = "/ajouter", consumes = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.CREATED)
    public ResponseEntity<Course> createCourse(@RequestBody Course course) {
        return new ResponseEntity<>(courseService.addCourse(course), HttpStatus.OK);
    }

    @PutMapping(value = "/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<Course> updateCourse(@PathVariable(value = "id") Long id,
                                                   @RequestBody Course course) {
        return new ResponseEntity<>(courseService.updateCourse(id, course),
                HttpStatus.OK);
    }

    @DeleteMapping(value = "/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<String> deleteCourse(@PathVariable(value = "id") Long id) {
        return new ResponseEntity<>(courseService.deleteCourse(id), HttpStatus.OK);
    }
    @GetMapping(value = "/all", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<List<Course>> getAllCourses() {
        return new ResponseEntity<>(courseService.getAllCourses(), HttpStatus.OK);
    }
}
