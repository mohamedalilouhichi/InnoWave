package tn.esprit.backend.repository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import tn.esprit.backend.entite.rapport;

@Repository
public interface rapportRepo extends JpaRepository<rapport, Long>{
}
