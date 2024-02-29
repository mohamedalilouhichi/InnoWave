package tn.esprit.backend.Repository;

import org.hibernate.query.Page;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import tn.esprit.backend.Entite.Post;
import tn.esprit.backend.Entite.User;

import java.awt.print.Pageable;
import java.util.List;

@Repository
public interface PostRepo extends JpaRepository<Post, Long> {

    List<Post> findPostsByUser_IdUser(Long idUser );


    @Query("SELECT p, SUM(pl.nbrlike) AS totalLikes FROM Post p LEFT JOIN p.postLikes pl GROUP BY p ORDER BY totalLikes DESC")
    List<Object[]> findMostLikedPostWithTotalLikes(Pageable pageable);

}
