package tn.esprit.backend.repository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import tn.esprit.backend.entite.entreprise;

@Repository
public interface entrepriseRepo extends JpaRepository<entreprise, Long> {
}
