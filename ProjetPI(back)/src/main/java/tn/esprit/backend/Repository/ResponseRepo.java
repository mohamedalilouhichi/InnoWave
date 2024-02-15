package tn.esprit.backend.Repository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import tn.esprit.backend.Entite.Response;

@Repository
public interface ResponseRepo extends JpaRepository<Response, Long>{
}
