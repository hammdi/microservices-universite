package tn.esprit.mehdibenattaya4twin9.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import tn.esprit.mehdibenattaya4twin9.entity.UserTest;


@Repository
public interface UserTestRepo extends JpaRepository<UserTest,Long> {
}
