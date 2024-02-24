package tn.esprit.backend.Repository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import tn.esprit.backend.Entite.Comment;

import java.util.List;

@Repository
public interface CommentRepo extends JpaRepository<Comment, Long>{
    List<Comment> findAllByPost_IdPost(Long idPost);

}
