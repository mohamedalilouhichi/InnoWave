package tn.esprit.backend.Service.Feedback;

import tn.esprit.backend.Entite.Feedback;

import java.util.List;

public interface IFeedbackService {
    List<Feedback> retrieveAllFeedbacks();

    Feedback addFeedback(Feedback feedback);

    Feedback addFeedbackAndAssignToStudentAndEntreprise(Feedback feedback, Long idUser, Long idEntreprise);

    Feedback updateFeedback(Feedback feedback);

    Feedback retrieveFeedbackById(Long idFeedback);

    void removeFeedback(Long idFeedback);
}
