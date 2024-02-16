package tn.esprit.backend.Repository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import tn.esprit.backend.Entite.PostLike;

@Repository
public interface PostLikeRepo extends JpaRepository<PostLike, Long>{
}
