package tn.esprit.backend.Repository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import tn.esprit.backend.Entite.Rapport;

@Repository
public interface RapportRepo extends JpaRepository<Rapport, Long>{
}
