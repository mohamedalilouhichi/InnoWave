package tn.esprit.backend.Control;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;
import tn.esprit.backend.Entite.Feedback;
import tn.esprit.backend.Repository.FeedbackRepo;
import tn.esprit.backend.Service.Feedback.IFeedbackService;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/feedback")
public class FeedbackControl {
    IFeedbackService feedbackService;

    @GetMapping("/retrieveAllFeedbacks")
    public List<Feedback> retrieveAllFeedbacks(){
        return feedbackService.retrieveAllFeedbacks();
    }
    @PostMapping("/addFeedback")
    public Feedback addFeedback(@RequestBody Feedback feedback){
        return feedbackService.addFeedback(feedback);
    }

    @PostMapping("/addFeedbackAndAssignToStudentAndEntreprise/{idUser}/{idEntreprise}")
    public Feedback addFeedbackAndAssignToStudentAndEntreprise(@RequestBody Feedback feedback, @PathVariable Long idUser, @PathVariable Long idEntreprise){
        return feedbackService.addFeedbackAndAssignToStudentAndEntreprise(feedback, idUser,idEntreprise);
    }

    @PostMapping("/updateFeedback")
    public Feedback updateFeedback(@RequestBody Feedback feedback){
        return feedbackService.updateFeedback(feedback);
    }

    @GetMapping("/retrieveFeedbackById/{idFeedback}")
    public Feedback retrieveFeedbackById(@PathVariable Long idFeedback){
        return feedbackService.retrieveFeedbackById(idFeedback);
    }

    @DeleteMapping("/removeFeedback/{idFeedback}")
    public void removeFeedback(@PathVariable Long idFeedback){
        feedbackService.removeFeedback(idFeedback);
    }
}
