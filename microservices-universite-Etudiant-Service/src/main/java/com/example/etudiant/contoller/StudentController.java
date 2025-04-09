package com.example.etudiant.contoller;

import com.example.etudiant.dto.CoursDTO;
import com.example.etudiant.entity.Student;
import com.example.etudiant.service.StudentService;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;

@RestController
@RequestMapping("/students")
public class StudentController {

    private final StudentService studentService;

    @Autowired 
    public StudentController(StudentService studentService) {
        this.studentService = studentService;
    }

    @GetMapping
    public List<Student> getAllStudents() {
        return studentService.getAllStudents();
    }

    @GetMapping("/{id}")
    public Optional<Student> getStudentById(@PathVariable Long id) {
        return studentService.getStudentById(id);
    }

    @PostMapping
    public Student createStudent(@RequestBody Student student) {
        return studentService.createStudent(student);
    }

    @PutMapping("/{id}")
    public Student updateStudent(@PathVariable Long id, @RequestBody Student student) {
        return studentService.updateStudent(id, student);
    }

    @DeleteMapping("/{id}")
    public void deleteStudent(@PathVariable Long id) {
        studentService.deleteStudent(id);
    }

    // Nouveaux endpoints pour les cours favoris
    @GetMapping("/{id}/cours-favoris")
    public List<CoursDTO> getCoursFavoris(@PathVariable Long id) {
        return studentService.getCoursFavoris(id);
    }

    @PostMapping("/{id}/cours-favoris/{coursId}")
    public ResponseEntity<String> ajouterCoursFavori(
            @PathVariable Long id,
            @PathVariable Long coursId) {
        studentService.ajouterCoursFavori(id, coursId);
        return ResponseEntity.ok("Cours ajouté aux favoris avec succès");
    }

    @DeleteMapping("/{id}/cours-favoris/{coursId}")
    public ResponseEntity<String> supprimerCoursFavori(
            @PathVariable Long id,
            @PathVariable Long coursId) {
        studentService.supprimerCoursFavori(id, coursId);
        return ResponseEntity.ok("Cours supprimé des favoris avec succès");
    }
}
