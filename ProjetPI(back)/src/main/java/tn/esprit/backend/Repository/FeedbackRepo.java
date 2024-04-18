package tn.esprit.backend.Repository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import tn.esprit.backend.Entite.Feedback;

import java.util.List;

@Repository
public interface FeedbackRepo extends JpaRepository<Feedback, Long> {

}
