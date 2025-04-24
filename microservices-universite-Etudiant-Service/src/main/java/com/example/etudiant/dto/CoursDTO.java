package com.example.etudiant.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CoursDTO {
    private Long id;
    private String nom;
    private String description;
    private int credits;
}