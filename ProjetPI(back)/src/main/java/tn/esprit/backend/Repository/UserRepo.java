package tn.esprit.backend.Repository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import tn.esprit.backend.Entite.Competences;
import tn.esprit.backend.Entite.Post;
import tn.esprit.backend.Entite.Role;
import tn.esprit.backend.Entite.User;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepo extends JpaRepository<User, Long>{

    Optional<User> findByUsername(String username);
    User findUserByIdUser(long idUser);
    List<User> findByRole(Role role);
    @Query("SELECT u.competences FROM User u WHERE u.idUser = :userId")
    List<Competences> findCompetencesByUserId(@Param("userId") Long userId);
    List<Post> findAllByPostsAndAndIdUser(Post post, Long idUser );
}
