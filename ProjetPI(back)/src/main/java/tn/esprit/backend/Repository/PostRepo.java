package tn.esprit.backend.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import tn.esprit.backend.Entite.Post;

@Repository
public interface PostRepo extends JpaRepository<Post, Long> {
}
