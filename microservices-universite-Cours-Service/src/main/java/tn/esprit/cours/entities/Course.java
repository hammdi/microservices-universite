package tn.esprit.cours.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;

@Entity
@Setter
@Getter
@AllArgsConstructor
public class Course implements Serializable {
    private static final long serialVersionUID = 6;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String courseCode;
    private String courseName;
    private String description;
    private int credits;
    
    private Long teacherId; // ID de l'enseignant responsable du cours

    public Course() {super();}

    public Course(String courseCode, String courseName, String description, int credits, Long teacherId) {
        super();
        this.courseCode = courseCode;
        this.courseName = courseName;
        this.description = description;
        this.credits = credits;
        this.teacherId = teacherId;
    }
}
