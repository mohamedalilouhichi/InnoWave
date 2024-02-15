package tn.esprit.backend.Repository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import tn.esprit.backend.Entite.Entreprise;

@Repository
public interface EntrepriseRepo extends JpaRepository<Entreprise, Long> {
}
