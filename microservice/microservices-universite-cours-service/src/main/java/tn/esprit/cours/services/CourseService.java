package tn.esprit.cours.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tn.esprit.cours.entities.Course;
import tn.esprit.cours.repository.CourseRepository;

import java.util.List;

@Service
public class CourseService {
    @Autowired
    private CourseRepository courseRepository;

    public Course addCourse(Course course) {
        return courseRepository.save(course);
    }
    public Course updateCourse(Long id, Course newCourse) { if (courseRepository.findById(id).isPresent()) {
        Course existingCourse = courseRepository.findById(id).get(); existingCourse.setCourseCode(newCourse.getCourseCode()); existingCourse.setCourseName(newCourse.getCourseName()); existingCourse.setCredits(newCourse.getCredits()); existingCourse.setDescription(newCourse.getDescription());
        return courseRepository.save(existingCourse);
    } else
        return null;
    }
    public String deleteCourse(Long id) {
        if (courseRepository.findById(id).isPresent()) { courseRepository.deleteById(id);
            return "cours supprimé";
        } else
            return "cours non supprimé";
    }
    public List<Course> getAllCourses() {
        return courseRepository.findAll();
    }
}
