package tn.esprit.backend.Service.FeedBackRating;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import tn.esprit.backend.Entite.FeedBackRating;
import tn.esprit.backend.Entite.Feedback;
import tn.esprit.backend.Repository.FeedBackRatingRepo;
import tn.esprit.backend.Repository.FeedbackRepo;

import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class FeedBackRatingService implements IFeedBackRating{
    private final FeedBackRatingRepo ratingRepo ;
    private final FeedbackRepo feedbackRepo;
    @Override
    public void save(FeedBackRating rating) {
        Feedback feedback= feedbackRepo.findById((long) rating.getIdFeedback()).get();
        Optional<FeedBackRating> ratingexist = feedback.getRatings().stream().filter((a)->a.getIdUser() == rating.getIdUser()).findFirst();
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
    public void remove(FeedBackRating rating) {
        Feedback feedback = feedbackRepo.findById((long) rating.getIdFeedback()).get();
        feedback.getRatings().remove(rating);
        feedbackRepo.save(feedback);
        updateRatingForFeedback(rating.getIdFeedback());
        ratingRepo.delete(rating);

    }

    @Override
    public List<FeedBackRating> findUserRatings(int idUser) {
        return ratingRepo.findByIdUser(idUser);
    }

    @Override
    public List<FeedBackRating> findFeedbackRatings(int idFeedback) {
        return ratingRepo.findByIdFeedback(idFeedback);
    }

    @Override
    public List<FeedBackRating> findAllRatings() {
        return ratingRepo.findAll();
    }

    @Override
    public void updateRating(FeedBackRating rating) {
        ratingRepo.save(rating);
    }

    @Override
    public void updateRatingForFeedback(int idFeedback) {
        Feedback feedback=feedbackRepo.findById((long) idFeedback).get();
        int size=feedback.getRatings().size();
        double somme = feedback.getRatings().stream().mapToDouble(FeedBackRating::getMoyrating).sum();
        if (size ==0){
            feedback.setMoyrating(0);
        }else {
            feedback.setMoyrating(somme/ (double) size);
        }
        feedbackRepo.save(feedback);

    }


    @Override
    public void removed(int idUser, int idFeedback){

        FeedBackRating rating=ratingRepo.findRatingByIdFeedbackAndIdUser(idUser,idFeedback);
        ratingRepo.delete(rating);
        updateRatingForFeedback(rating.getIdFeedback());
    }

}
