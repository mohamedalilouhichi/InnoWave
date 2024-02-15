package tn.esprit.backend.repository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import tn.esprit.backend.entite.message;

@Repository
public interface messageRepo extends JpaRepository<message, Long>{
}
