package tn.esprit.backend.Repository;

import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import tn.esprit.backend.Entite.Post;
import tn.esprit.backend.Entite.PostSave;
import tn.esprit.backend.Entite.User;

import java.util.List;

@Repository
public interface PostSaveRepo extends JpaRepository<PostSave, Long> {

    // Recherche une sauvegarde spécifique basée sur le post et l'utilisateur
    PostSave findByPostAndUser(Post post, User user);

    // Recherche toutes les sauvegardes associées à un post
    List<PostSave> findByPost(Post post);

    // Incrémente le nombre de sauvegardes pour une sauvegarde spécifique par son ID
    @Modifying
    @Transactional
    @Query("UPDATE PostSave pl SET pl.nbrSave = pl.nbrSave + 1 WHERE pl.idSave = :idSave")
    void incrementSavesById(@Param("idSave") long idSave);

    // Décrémente le nombre de sauvegardes pour une sauvegarde spécifique par son ID
    @Modifying
    @Transactional
    @Query("UPDATE PostSave pl SET pl.nbrSave = pl.nbrSave - 1 WHERE pl.idSave = :idSave")
    void decrementSavesById(@Param("idSave") long idSave);
    List<PostSave> findSavedPostsByUser(@Param("user") User user);

}
