package com.esprit.microservice.note_examen.repository;

import com.esprit.microservice.note_examen.entity.Examen;
import com.esprit.microservice.note_examen.entity.Examen_type;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ExamenRepository extends JpaRepository<Examen, Integer> {

    // Find exams by type
    List<Examen> findByType(Examen_type type);
}
