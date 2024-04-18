package tn.esprit.backend.Service.PostRating;

import tn.esprit.backend.Entite.PostRating;

import java.util.List;

public interface IPostRating {

    void save(PostRating rating);
    void remove(PostRating rating);
    void remove(int post,int idUser);

    List<PostRating> findUserRatings(int user);
    List<PostRating> findPostRatings(int post);
    List<PostRating> findAllRatings();

    void updateRating(PostRating rating);
    void updateRatingForPost(int post);
}
