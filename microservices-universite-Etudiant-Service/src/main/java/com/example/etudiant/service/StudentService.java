package com.example.etudiant.service;

import com.example.etudiant.client.CoursClient;
import com.example.etudiant.dto.CoursDTO;
import com.example.etudiant.entity.Student;
import com.example.etudiant.repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class StudentService {
    private final StudentRepository studentRepository;
    private final CoursClient coursClient;

    @Autowired
    public StudentService(StudentRepository studentRepository, CoursClient coursClient) {
        this.studentRepository = studentRepository;
        this.coursClient = coursClient;
    }

    public List<Student> getAllStudents() {
        return studentRepository.findAll();
    }

    public Student createStudent(Student student) {
        return studentRepository.save(student);
    }

    public Student updateStudent(Long id, Student updatedStudent) {
        return studentRepository.findById(id)
                .map(student -> {
                    student.setFirstName(updatedStudent.getFirstName());
                    student.setLastName(updatedStudent.getLastName());
                    student.setEmail(updatedStudent.getEmail());
                    student.setPhone(updatedStudent.getPhone());
                    student.setAddress(updatedStudent.getAddress());
                    student.setLevel(updatedStudent.getLevel());
                    return studentRepository.save(student);
                })
                .orElseGet(() -> {
                    updatedStudent.setId(id);
                    return studentRepository.save(updatedStudent);
                });
    }

    public Optional<Student> getStudentById(Long id) {
        return studentRepository.findById(id);
    }

    public void deleteStudent(Long id) {
        studentRepository.deleteById(id);
    }

    // Nouvelles méthodes pour les cours favoris
    public List<CoursDTO> getCoursFavoris(Long studentId) {
        Student student = studentRepository.findById(studentId)
                .orElseThrow(() -> new RuntimeException("Étudiant non trouvé"));
        return student.getCoursFavoris().stream()
                .map(coursClient::getCoursById)
                .collect(Collectors.toList());
    }

    public void ajouterCoursFavori(Long studentId, Long coursId) {
        Student student = studentRepository.findById(studentId)
                .orElseThrow(() -> new RuntimeException("Étudiant non trouvé"));
        CoursDTO cours = coursClient.getCoursById(coursId);
        if (cours != null) {
            student.getCoursFavoris().add(coursId);
            studentRepository.save(student);
        }
    }

    public void supprimerCoursFavori(Long studentId, Long coursId) {
        Student student = studentRepository.findById(studentId)
                .orElseThrow(() -> new RuntimeException("Étudiant non trouvé"));
        student.getCoursFavoris().remove(coursId);
        studentRepository.save(student);
    }
}
