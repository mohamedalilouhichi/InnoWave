package tn.esprit.backend.Repository;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import tn.esprit.backend.Entite.Post;
import tn.esprit.backend.Entite.PostLike;
import tn.esprit.backend.Entite.User;

import java.awt.print.Pageable;
import java.util.List;

@Repository
public interface PostLikeRepo extends JpaRepository<PostLike, Long>{
    PostLike findByPostAndUser(Post post, User user);
    List<PostLike> findByPost(Post post);
    @Modifying
    @Transactional
    @Query("UPDATE PostLike pl SET pl.nbrlike = pl.nbrlike + 1 WHERE pl.idLike = :idLike")
    void incrementLikesById(@Param("idLike") long idLike);
    @Modifying
    @Transactional
    @Query("UPDATE PostLike pl SET pl.nbrlike = pl.nbrlike - 1 WHERE pl.idLike = :idLike")
    void decrementLikesById(@Param("idLike") long idLike);



}
