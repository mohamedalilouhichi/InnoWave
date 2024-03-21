package tn.esprit.backend.Repository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import tn.esprit.backend.Entite.Stage;
import tn.esprit.backend.Entite.User;

@Repository
public interface StageRepo extends JpaRepository<Stage, Long>{
    Stage findByIdStage(long idStage);

}
