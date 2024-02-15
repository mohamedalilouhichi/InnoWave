package tn.esprit.backend.Repository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import tn.esprit.backend.Entite.Journal;

@Repository
public interface JournalRepo extends JpaRepository<Journal, Long>{
}
