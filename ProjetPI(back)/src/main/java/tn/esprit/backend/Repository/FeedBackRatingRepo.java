package tn.esprit.backend.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import tn.esprit.backend.Entite.FeedBackRating;

import java.util.List;

public interface  FeedBackRatingRepo extends JpaRepository<FeedBackRating, Integer> {
    List<FeedBackRating> findByIdUser(int User);

    FeedBackRating findRatingByIdFeedbackAndIdUser(int idFeedback, int idUser);

    List<FeedBackRating> findByIdFeedback(int idFeedback);
}
