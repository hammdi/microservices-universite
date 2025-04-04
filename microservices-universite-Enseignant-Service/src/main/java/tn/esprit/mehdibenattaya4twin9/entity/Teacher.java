package tn.esprit.mehdibenattaya4twin9.entity;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor

public class Teacher {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String firstName;
    private String lastName;
    private String email;
    private String phone;
    private String specialty; // Ex: Mathématiques, Informatique, Physique

   /* @ManyToOne
    private Department department;*/

   /* @OneToMany(mappedBy = "teacher")
    private List<Course> courses; // Liste des cours enseignés*/


}
