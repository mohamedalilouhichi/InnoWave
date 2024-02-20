package tn.esprit.backend.Repository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import tn.esprit.backend.Entite.User;

import java.util.Optional;

@Repository
public interface UserRepo extends JpaRepository<User, Long>{
    Boolean existsByUsername(String username);
    Optional<User> findByEmail(String email);
}
