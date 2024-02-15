package tn.esprit.backend.Repository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import tn.esprit.backend.Entite.Comment;

@Repository
public interface CommentRepo extends JpaRepository<Comment, Long>{
}
