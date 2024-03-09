package tn.esprit.backend.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import tn.esprit.backend.Entite.Rating;

import java.util.List;

public interface RatingRepo extends JpaRepository<Rating, Integer> {

    List<Rating> findByIdUser(int User);

    Rating findRatingByIdFeedbackAndIdUser(int idFeedback, int idUser);

    List<Rating> findByIdFeedback(int idFeedback);
}
