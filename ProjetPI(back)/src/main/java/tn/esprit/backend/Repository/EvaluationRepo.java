package tn.esprit.backend.Repository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import tn.esprit.backend.Entite.Evaluation;

import java.util.Optional;

@Repository
public interface EvaluationRepo extends JpaRepository<Evaluation, Long> {
}
