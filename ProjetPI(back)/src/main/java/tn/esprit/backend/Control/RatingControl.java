package tn.esprit.backend.Control;

import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tn.esprit.backend.Entite.Feedback;
import tn.esprit.backend.Entite.Rating;
import tn.esprit.backend.Service.Feedback.FeedbackService;
import tn.esprit.backend.Service.Feedback.RatingService;

import java.util.List;

@RestController
@AllArgsConstructor
public class RatingControl {
    private final RatingService ratingService;
    private final FeedbackService feedbackService;

    @PostMapping("/addRating")
    @ResponseStatus(HttpStatus.CREATED)
    public Feedback addRating(@RequestBody Rating rating )
    {
        ratingService.save(rating);
        return feedbackService.retrieveFeedbackById((long) rating.getIdFeedback());
    }

    @PutMapping("/updateRating")
    @ResponseStatus(HttpStatus.CREATED)
    public void updateRating(@RequestBody Rating rating )
    {
        ratingService.updateRating(rating);
        ratingService.updateRatingForFeedback(rating.getIdFeedback());

    }

    @GetMapping("/AllRating")
    public ResponseEntity<List<Rating>> findAllRatings(){
        return ResponseEntity.ok(ratingService.findAllRatings());
    }


    @GetMapping("/UserRating/{idUser}")
    public ResponseEntity<List<Rating>> findUserRatings(@PathVariable("idUser") int idUser){
        return ResponseEntity.ok(ratingService.findUserRatings(idUser));
    }

    @GetMapping("/FeedbackRating/{idFeedback}")
    public ResponseEntity<List<Rating>> findEventRatings(@PathVariable("idFeedback") int idFeedback){
        return ResponseEntity.ok(ratingService.findFeedbackRatings(idFeedback));
    }
    @DeleteMapping("/removeRating/rating")
    @ResponseStatus(HttpStatus.OK)
    public void remove(@RequestBody Rating rating)
    {
        ratingService.remove(rating);
        ratingService.updateRatingForFeedback(rating.getIdFeedback());

    }

}
