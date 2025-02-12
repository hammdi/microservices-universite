package tn.esprit.microserv.departementms.Service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import tn.esprit.microserv.departementms.Entity.Departement;
import tn.esprit.microserv.departementms.Repository.DepartementRepository;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class DepartementService {
    private final DepartementRepository departementRepository;

    public List<Departement> getAllDepartements() {
        return departementRepository.findAll();
    }

    public Optional<Departement> getDepartementById(Long id) {
        return departementRepository.findById(id);
    }

    public Departement createDepartement(Departement departement) {
        return departementRepository.save(departement);
    }

    public Departement updateDepartement(Long id, Departement updatedDepartement) {
        return departementRepository.findById(id)
                .map(departement -> {
                    departement.setNom(updatedDepartement.getNom());
                    departement.setDescription(updatedDepartement.getDescription());
                    return departementRepository.save(departement);
                }).orElse(null);
    }

    public void deleteDepartement(Long id) {
        departementRepository.deleteById(id);
    }
}
