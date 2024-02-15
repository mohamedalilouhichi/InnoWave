package tn.esprit.backend.Repository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import tn.esprit.backend.Entite.Documents;

@Repository
public interface DocumentsRepo extends JpaRepository<Documents, Long>{
}
