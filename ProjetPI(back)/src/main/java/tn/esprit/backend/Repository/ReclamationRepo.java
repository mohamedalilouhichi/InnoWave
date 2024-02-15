package tn.esprit.backend.Repository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import tn.esprit.backend.Entite.Reclamation;

@Repository
public interface ReclamationRepo extends JpaRepository<Reclamation, Long>{
}
