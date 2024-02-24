package tn.esprit.backend.Repository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import tn.esprit.backend.Entite.Message;

import java.util.List;

@Repository
public interface MessageRepo extends JpaRepository<Message, Long>{
}
