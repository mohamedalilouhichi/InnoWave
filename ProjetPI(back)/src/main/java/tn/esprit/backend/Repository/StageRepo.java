package tn.esprit.backend.Repository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import tn.esprit.backend.Entite.Stage;

import java.util.List;

@Repository
public interface StageRepo extends JpaRepository<Stage, Long>{
    @Query("SELECT s FROM Stage s WHERE s.entreprise.idEntreprise = :idEntreprise")
    List<Stage> findByEntrepriseId(Long idEntreprise);

}
