package tn.esprit.backend.Service.Feedback;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import tn.esprit.backend.Entite.Feedback;
import tn.esprit.backend.Entite.Rating;
import tn.esprit.backend.Repository.FeedbackRepo;
import tn.esprit.backend.Repository.RatingRepo;

import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class RatingService implements IRatingService{
    private final RatingRepo ratingRepo ;
    private final FeedbackRepo feedbackRepo;
    @Override
    public void save(Rating rating) {
        Feedback feedback= feedbackRepo.findById((long) rating.getIdFeedback()).get();
        Optional<Rating> ratingexist = feedback.getRatings().stream().filter((a)->a.getIdUser() == rating.getIdUser()).findFirst();
        if(!ratingexist.isPresent()) {


            if (rating.getStatus() == null || rating.getStatus().isEmpty()) {
                rating.setStatus("Accepted");
            }
            if (ratingRepo.findById(rating.getIdRating()).isPresent()) {
                updateRating(rating);
                updateRatingForFeedback((int) feedback.getIdFeedback());
            } else {
                feedback.getRatings().add(rating);
                feedbackRepo.save(feedback);
                updateRatingForFeedback((int) feedback.getIdFeedback());
            }
        }
    else{
            System.out.println(ratingexist.get().getIdRating());
            System.out.println(rating.getMoyrating());
            rating.setIdRating(ratingexist.get().getIdRating());
            rating.setStatus(ratingexist.get().getStatus());

            ratingRepo.save(rating);
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


    @Override
    public void removed(int idUser, int idFeedback){

        Rating rating=ratingRepo.findRatingByIdFeedbackAndIdUser(idUser,idFeedback);
        ratingRepo.delete(rating);
        updateRatingForFeedback(rating.getIdFeedback());
    }
}
