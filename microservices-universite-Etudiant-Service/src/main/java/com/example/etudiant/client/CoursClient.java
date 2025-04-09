package com.example.etudiant.client;

import com.example.etudiant.dto.CoursDTO;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;

@FeignClient(name = "COURS", url = "${COURS_SERVICE_URL:http://localhost:8094}")
public interface CoursClient {
    
    @GetMapping("/cours")
    List<CoursDTO> getAllCours();
    
    @GetMapping("/cours/{id}")
    CoursDTO getCoursById(@PathVariable Long id);
}