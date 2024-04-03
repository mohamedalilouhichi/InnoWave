package tn.esprit.backend.Service.Feedback;

import tn.esprit.backend.Entite.Rating;

import java.util.List;

public interface IRatingService {

    void save(Rating rating);
    void remove(Rating rating);
    List<Rating> findUserRatings(int idUser);
    List<Rating> findFeedbackRatings(int idFeedback);
    List<Rating> findAllRatings();

    void updateRating(Rating rating);
    void updateRatingForFeedback(int idFeedback);

    void removed(int idUser, int idFeedback);



}
