package tn.esprit.backend.Service.Forum;

import tn.esprit.backend.Entite.Rating;

import java.util.List;

public interface IRatingService {

     void save(Rating rating);
     void remove(Rating rating);
     void remove(int post,int idUser);

     List<Rating> findUserRatings(int user);
     List<Rating> findPostRatings(int post);
     List<Rating> findAllRatings();

     void updateRating(Rating rating);
     void updateRatingForPost(int post);

}