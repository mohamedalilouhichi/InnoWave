package tn.esprit.backend.repository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import tn.esprit.backend.entite.user;

@Repository
public interface userRepo extends JpaRepository<user, Long>{
}
