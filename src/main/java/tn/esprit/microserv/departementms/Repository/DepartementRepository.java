package tn.esprit.microserv.departementms.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import tn.esprit.microserv.departementms.Entity.Departement;

public interface DepartementRepository extends JpaRepository<Departement, Long> {
}
