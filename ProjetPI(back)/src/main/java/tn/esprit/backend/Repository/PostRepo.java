package tn.esprit.backend.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import tn.esprit.backend.Entite.Post;
import tn.esprit.backend.Entite.User;

import java.util.List;

@Repository
public interface PostRepo extends JpaRepository<Post, Long> {

    List<Post> findPostsByUser_IdUser(Long idUser );

}
