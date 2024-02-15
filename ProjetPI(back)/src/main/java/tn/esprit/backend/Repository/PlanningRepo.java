package tn.esprit.backend.Repository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import tn.esprit.backend.Entite.Planning;

@Repository
public interface PlanningRepo extends JpaRepository<Planning, Long>{
}
