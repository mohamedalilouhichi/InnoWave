package tn.esprit.backend.repository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import tn.esprit.backend.entite.question;

@Repository
public interface questionRepo extends JpaRepository<question, Long> {
}
