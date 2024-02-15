package tn.esprit.backend.repository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import tn.esprit.backend.entite.feedback;

@Repository
public interface feedbackRepo extends JpaRepository<feedback, Long> {
}
