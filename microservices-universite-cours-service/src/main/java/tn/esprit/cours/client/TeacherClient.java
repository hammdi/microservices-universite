package tn.esprit.cours.client;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import tn.esprit.cours.DTO.TeacherDTO;

@FeignClient(name = "ENSEIGNANT-SERVICE", url = "${app.enseignant-service.url}")
public interface TeacherClient {
    
    @GetMapping("/api/teachers/{id}")
    TeacherDTO getTeacherById(@PathVariable("id") Long id);
}