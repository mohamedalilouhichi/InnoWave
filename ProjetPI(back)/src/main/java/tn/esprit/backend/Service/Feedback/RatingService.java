package tn.esprit.backend.Service.Feedback;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import tn.esprit.backend.Entite.Feedback;
import tn.esprit.backend.Entite.Rating;
import tn.esprit.backend.Repository.FeedbackRepo;
import tn.esprit.backend.Repository.RatingRepo;

import java.util.List;
@Service
@AllArgsConstructor
public class RatingService implements IRatingService{
    private final RatingRepo ratingRepo ;
    private final FeedbackRepo feedbackRepo;
    @Override
    public void save(Rating rating) {
        Feedback feedback= feedbackRepo.findById((long) rating.getIdFeedback()).get();
        if (rating.getStatus()==null || rating.getStatus().isEmpty())
        {
            rating.setStatus("Accepted");
        }
        if (ratingRepo.findById(rating.getIdRating()).isPresent())
        {
            updateRating(rating);
            updateRatingForFeedback((int) feedback.getIdFeedback());
        } else {
            feedback.getRatings().add(rating);
            feedbackRepo.save(feedback);
            updateRatingForFeedback((int) feedback.getIdFeedback());
        }

    }

    @Override
    public void remove(Rating rating) {
        Feedback feedback = feedbackRepo.findById((long) rating.getIdFeedback()).get();
        feedback.getRatings().remove(rating);
        feedbackRepo.save(feedback);
        updateRatingForFeedback(rating.getIdFeedback());
        ratingRepo.delete(rating);

    }

    @Override
    public List<Rating> findUserRatings(int idUser) {
        return ratingRepo.findByIdUser(idUser);
    }

    @Override
    public List<Rating> findFeedbackRatings(int idFeedback) {
        return ratingRepo.findByIdFeedback(idFeedback);
    }

    @Override
    public List<Rating> findAllRatings() {
        return ratingRepo.findAll();
    }

    @Override
    public void updateRating(Rating rating) {
        ratingRepo.save(rating);
    }

    @Override
    public void updateRatingForFeedback(int idFeedback) {
        Feedback feedback=feedbackRepo.findById((long) idFeedback).get();
        int size=feedback.getRatings().size();
        double somme = feedback.getRatings().stream().mapToDouble(Rating::getMoyrating).sum();
        if (size ==0){
            feedback.setMoyrating(0);
        }else {
            feedback.setMoyrating(somme/ (double) size);
        }
        feedbackRepo.save(feedback);
    }
}
