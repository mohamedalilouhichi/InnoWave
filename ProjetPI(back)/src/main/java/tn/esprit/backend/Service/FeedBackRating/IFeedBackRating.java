package tn.esprit.backend.Service.FeedBackRating;

import tn.esprit.backend.Entite.FeedBackRating;

import java.util.List;

public interface IFeedBackRating {
    void save(FeedBackRating rating);
    void remove(FeedBackRating rating);
    List<FeedBackRating> findUserRatings(int idUser);
    List<FeedBackRating> findFeedbackRatings(int idFeedback);
    List<FeedBackRating> findAllRatings();

    void updateRating(FeedBackRating rating);
    void updateRatingForFeedback(int idFeedback);

    void removed(int idUser, int idFeedback);
}
