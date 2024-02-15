package tn.esprit.backend.repository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import tn.esprit.backend.entite.journal;

@Repository
public interface journalRepo extends JpaRepository<journal, Long>{
}
