package tn.esprit.backend.Repository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import tn.esprit.backend.Entite.Competences;
import tn.esprit.backend.Entite.Role;
import tn.esprit.backend.Entite.User;

import java.util.List;

@Repository
public interface UserRepo extends JpaRepository<User, Long>{
   User findByIdUser(Long idUser); // Make sure to use the correct property name as per your User entity.
   List<User> findByRole(Role role);
////////////////////
@Query("SELECT u FROM User u JOIN FETCH u.competences")
List<User> findAllUsersWithCompetences();

}
