package tn.esprit.backend.repository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import tn.esprit.backend.entite.competences;

@Repository
public interface competencesRepo extends JpaRepository<competences, Long>{
}
