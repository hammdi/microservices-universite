package tn.esprit.cours.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tn.esprit.cours.DTO.TeacherDTO;
import tn.esprit.cours.client.TeacherClient;
import tn.esprit.cours.entities.Course;
import tn.esprit.cours.repository.CourseRepository;

import java.util.List;

@Service
public class CourseService {
    @Autowired
    private CourseRepository courseRepository;
    
    @Autowired
    private TeacherClient teacherClient;

    public Course addCourse(Course course) {
        // Vérifier si l'enseignant existe
        if (course.getTeacherId() != null) {
            TeacherDTO teacher = teacherClient.getTeacherById(course.getTeacherId());
            if (teacher == null) {
                throw new RuntimeException("L'enseignant spécifié n'existe pas");
            }
        }
        return courseRepository.save(course);
    }

    public Course updateCourse(Long id, Course newCourse) {
        if (courseRepository.findById(id).isPresent()) {
            Course existingCourse = courseRepository.findById(id).get();
            existingCourse.setCourseCode(newCourse.getCourseCode());
            existingCourse.setCourseName(newCourse.getCourseName());
            existingCourse.setCredits(newCourse.getCredits());
            existingCourse.setDescription(newCourse.getDescription());
            
            // Mettre à jour l'enseignant si nécessaire
            if (newCourse.getTeacherId() != null) {
                TeacherDTO teacher = teacherClient.getTeacherById(newCourse.getTeacherId());
                if (teacher == null) {
                    throw new RuntimeException("L'enseignant spécifié n'existe pas");
                }
                existingCourse.setTeacherId(newCourse.getTeacherId());
            }
            
            return courseRepository.save(existingCourse);
        }
        return null;
    }

    public String deleteCourse(Long id) {
        if (courseRepository.findById(id).isPresent()) {
            courseRepository.deleteById(id);
            return "cours supprimé";
        }
        return "cours non supprimé";
    }

    public List<Course> getAllCourses() {
        return courseRepository.findAll();
    }

    public Course getCourseById(Long id) {
        return courseRepository.findById(id).orElse(null);
    }
    
    // Nouvelle méthode pour obtenir les détails de l'enseignant d'un cours
    public TeacherDTO getTeacherForCourse(Long courseId) {
        Course course = getCourseById(courseId);
        if (course != null && course.getTeacherId() != null) {
            return teacherClient.getTeacherById(course.getTeacherId());
        }
        return null;
    }
}
