package tn.esprit.backend.Service.Feedback;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import tn.esprit.backend.Entite.Entreprise;
import tn.esprit.backend.Entite.Feedback;
import tn.esprit.backend.Entite.User;
import tn.esprit.backend.Repository.EntrepriseRepo;
import tn.esprit.backend.Repository.FeedbackRepo;
import tn.esprit.backend.Repository.UserRepo;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
@AllArgsConstructor
public class FeedbackService implements IFeedbackService {
    FeedbackRepo feedbackRepo;
    UserRepo userRepo ;
    EntrepriseRepo entrepriseRepo;
    @Override
    public List<Feedback> retrieveAllFeedbacks() {
        return feedbackRepo.findAll();
    }

    @Override
    public Feedback addFeedback(Feedback feedback) {
        return feedbackRepo.save(feedback);
    }

    @Override
    public Feedback addFeedbackAndAssignToStudentAndEntreprise(Feedback feedback, Long idUser, Long idEntreprise) {
        User student = userRepo.findById(idUser).orElse(null);
        Entreprise entreprise = entrepriseRepo.findById(idEntreprise).orElse(null);
        student.getFeedbacks().add(feedback);
        entreprise.getFeedbacks().add(feedback);

        return feedbackRepo.save(feedback);
    }

    @Override
    public Feedback updateFeedback(Feedback feedback) {
        return feedbackRepo.save(feedback);
    }

    @Override
    public Feedback retrieveFeedbackById(Long idFeedback) {
        return feedbackRepo.findById(idFeedback).orElse(null);
    }

    @Override
    public void removeFeedback(Long idFeedback) {
        feedbackRepo.deleteById(idFeedback);
    }
}
