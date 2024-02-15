package tn.esprit.backend.repository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import tn.esprit.backend.entite.candidature;

@Repository
public interface candidatureRepo extends JpaRepository<candidature, Long>{
}
