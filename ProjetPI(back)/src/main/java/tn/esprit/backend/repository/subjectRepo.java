package tn.esprit.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import tn.esprit.backend.entite.subject;

@Repository
public interface subjectRepo extends JpaRepository<subject, Long> {
}
