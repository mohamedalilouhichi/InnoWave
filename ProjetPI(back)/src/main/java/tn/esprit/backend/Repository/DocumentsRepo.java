package tn.esprit.backend.Repository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import tn.esprit.backend.Entite.Documents;

import java.util.List;

@Repository
public interface DocumentsRepo extends JpaRepository<Documents, Long>{
    List<Documents> findByCvFileContainingOrRapportFileContaining(String cvQuery, String rapportQuery);

}
