package tn.esprit.backend.repository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import tn.esprit.backend.entite.reclamation;

@Repository
public interface reclamationRepo extends JpaRepository<reclamation, Long>{
}
