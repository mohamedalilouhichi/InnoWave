package tn.esprit.backend.repository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import tn.esprit.backend.entite.stage;

@Repository
public interface stageRepo extends JpaRepository<stage, Long>{
}
