package tn.esprit.backend.Repository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import tn.esprit.backend.Entite.Competences;
import tn.esprit.backend.Entite.Stage;
import tn.esprit.backend.Entite.User;

import java.util.List;

import java.util.List;

@Repository
public interface StageRepo extends JpaRepository<Stage, Long>{
    @Query("SELECT s FROM Stage s WHERE s.entreprise.idEntreprise = :idEntreprise")
    List<Stage> findByEntrepriseId(Long idEntreprise);
    Stage findByIdStage(long idStage);
    @Query("SELECT s.competences FROM Stage s WHERE s.idStage = :stageId")
    List<Competences> findCompetencesByStageId(@Param("stageId") Long stageId);
}
