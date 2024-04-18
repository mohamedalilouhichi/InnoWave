package tn.esprit.backend.Repository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import tn.esprit.backend.Entite.Candidature;

import java.util.List;

@Repository
public interface CandidatureRepo extends JpaRepository<Candidature, Long> {

    List<Candidature> findCandidatureByUser_IdUser(Long idUser);
}
