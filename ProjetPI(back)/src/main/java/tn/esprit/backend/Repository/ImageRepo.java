package tn.esprit.backend.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import tn.esprit.backend.Entite.Image;

import java.util.List;

public interface ImageRepo  extends JpaRepository<Image,Integer> {
    List<Image> findImagesByIdPost(int idPost);
}
