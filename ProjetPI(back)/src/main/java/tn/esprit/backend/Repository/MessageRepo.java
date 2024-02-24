package tn.esprit.backend.Repository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import tn.esprit.backend.Entite.Message;
import tn.esprit.backend.Entite.Stage;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Repository
public interface MessageRepo extends JpaRepository<Message, Long>{



    @Query("SELECT m FROM Message m WHERE m.user.idUser = :idUser")
    List<Message> findByUserId(Long idUser);
}
