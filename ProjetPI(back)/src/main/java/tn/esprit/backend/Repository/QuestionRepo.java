package tn.esprit.backend.Repository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import tn.esprit.backend.Entite.Question;

@Repository
public interface QuestionRepo extends JpaRepository<Question, Long> {
}
