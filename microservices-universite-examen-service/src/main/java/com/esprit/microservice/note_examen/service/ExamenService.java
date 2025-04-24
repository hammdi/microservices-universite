package com.esprit.microservice.note_examen.service;

import com.esprit.microservice.note_examen.entity.Examen;
import com.esprit.microservice.note_examen.repository.ExamenRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ExamenService {
    private final ExamenRepository examenRepository;

    @Autowired // Explicit dependency injection
    public ExamenService(ExamenRepository examenRepository) {
        this.examenRepository = examenRepository;
    }

    public List<Examen> getAllExamens() {
        return examenRepository.findAll();
    }

    public Examen addExamen(Examen examen) {
        return examenRepository.save(examen);
    }

    public Examen updateExamen(int id, Examen updatedExamen) {
        return examenRepository.findById(id)
                .map(examen -> {
                    examen.setType(updatedExamen.getType());
                    examen.setDate(updatedExamen.getDate());
                    examen.setGrade(updatedExamen.getGrade());
                    return examenRepository.save(examen);
                }).orElse(null);
    }

    public void deleteExamen(int id) {
        examenRepository.deleteById(id);
    }

    public Optional<Examen> getExamenById(int id) {
        return examenRepository.findById(id);
    }
}
