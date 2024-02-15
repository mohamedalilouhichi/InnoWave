package tn.esprit.backend.repository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import tn.esprit.backend.entite.documents;

@Repository
public interface documentsRepo extends JpaRepository<documents, Long>{
}
