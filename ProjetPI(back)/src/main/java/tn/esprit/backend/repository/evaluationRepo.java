package tn.esprit.backend.repository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import tn.esprit.backend.entite.evaluation;

@Repository
public interface evaluationRepo extends JpaRepository<evaluation, Long> {
}
