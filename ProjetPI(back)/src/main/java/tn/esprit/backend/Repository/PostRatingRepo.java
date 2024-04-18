package tn.esprit.backend.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import tn.esprit.backend.Entite.PostRating;

import java.util.List;

public interface PostRatingRepo extends JpaRepository <PostRating,Integer> {
    List<PostRating> findByIdUser(int user);
    PostRating findRatingByIdPostAndIdUser(int post,int user);


    List<PostRating> findByIdPost(int post);
}