package tn.esprit.backend.Repository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import tn.esprit.backend.Entite.Competences;

@Repository
public interface CompetencesRepo extends JpaRepository<Competences, Long>{
}
