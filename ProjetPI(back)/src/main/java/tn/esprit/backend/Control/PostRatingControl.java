package tn.esprit.backend.Control;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tn.esprit.backend.Entite.Post;
import tn.esprit.backend.Entite.PostRating;
import tn.esprit.backend.Service.Forum.PostService;
import tn.esprit.backend.Service.PostRating.PostRatingService;

import java.util.List;

@RestController
@RequestMapping("/api/Post/Rating")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")

public class PostRatingControl {
    private final PostRatingService ratingService ;
    private final PostService postService;


    @PostMapping("/addRating")
    @ResponseStatus(HttpStatus.CREATED)
    public Post addRating(@RequestBody PostRating rating )
    {
        ratingService.save(rating);
        return postService.getPostbyid((long) rating.getIdPost());
    }

    @PutMapping("/updateRating")
    @ResponseStatus(HttpStatus.CREATED)
    public void updateRating(@RequestBody PostRating rating )
    {
        ratingService.updateRating(rating);
        ratingService.updateRatingForPost(rating.getIdPost());

    }

    @GetMapping("/AllRating")
    public ResponseEntity<List<PostRating>> findAllRatings(){

        return ResponseEntity.ok(ratingService.findAllRatings());
    }


    @GetMapping("/UserRating/{user}")
    public ResponseEntity<List<PostRating>> findUserRatings(@PathVariable("user") int user){
        return ResponseEntity.ok(ratingService.findUserRatings(user));
    }

    @GetMapping("/PostRating/{post}")
    public ResponseEntity<List<PostRating>> findEventRatings(@PathVariable("post") int post){
        return ResponseEntity.ok(ratingService.findPostRatings(post));
    }
    @DeleteMapping("/removeRating/rating")
    @ResponseStatus(HttpStatus.OK)
    public void remove(@RequestBody PostRating rating)
    {
        ratingService.remove(rating);
        ratingService.updateRatingForPost(rating.getIdPost());

    }


}