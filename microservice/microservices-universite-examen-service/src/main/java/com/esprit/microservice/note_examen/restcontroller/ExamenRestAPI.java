package com.esprit.microservice.note_examen.restcontroller;

import com.esprit.microservice.note_examen.entity.Examen;
import com.esprit.microservice.note_examen.service.ExamenService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/examens")
public class ExamenRestAPI {

    private final ExamenService examenService;

    @Autowired // Dependency Injection
    public ExamenRestAPI(ExamenService examenService) {
        this.examenService = examenService;
    }

    @GetMapping
    public List<Examen> getAllExamens() {
        return examenService.getAllExamens();
    }

    @GetMapping("/{id}")
    public Optional<Examen> getExamenById(@PathVariable int id) {
        return examenService.getExamenById(id);
    }

    @PostMapping
    public Examen createExamen(@RequestBody Examen examen) {
        return examenService.addExamen(examen);
    }

    @PutMapping("/{id}")
    public Examen updateExamen(@PathVariable int id, @RequestBody Examen examen) {
        return examenService.updateExamen(id, examen);
    }

    @DeleteMapping("/{id}")
    public void deleteExamen(@PathVariable int id) {
        examenService.deleteExamen(id);
    }
}
