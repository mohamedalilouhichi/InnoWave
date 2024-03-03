package tn.esprit.backend.Service.Forum;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import tn.esprit.backend.Entite.Post;
import tn.esprit.backend.Entite.Rating;
import tn.esprit.backend.Repository.PostRepo;
import tn.esprit.backend.Repository.RatingRepo;

import java.util.List;

@Service
@RequiredArgsConstructor
public class RatingService implements IRatingService{

    private final RatingRepo ratingRepository;
    private final PostRepo postRepo;


    @Override
    public void save(Rating rating) {
        Post post1=postRepo.findById((long) rating.getIdPost()).get();
        if (rating.getStatus()==null || rating.getStatus().isEmpty())
        {
            rating.setStatus("Accepted");
        }
        if (ratingRepository.findById(rating.getIdRating()).isPresent())
        {
            updateRating(rating);
            updateRatingForPost((int) post1.getIdPost());
        }else {
            post1.getRatings().add(rating);

            postRepo.save(post1);
            updateRatingForPost((int) post1.getIdPost());
        }
    }



    @Override
    public void remove(Rating rating) {
        Post post1=postRepo.findById((long) rating.getIdPost()).get();

        post1.getRatings().remove(rating);

        postRepo.save(post1);
        updateRatingForPost(rating.getIdPost());
        ratingRepository.delete(rating);
    }

    @Override
    public List<Rating> findUserRatings(int user) {

        return ratingRepository.findByIdUser(user);    }

    @Override
    public List<Rating> findPostRatings(int post) {

        return ratingRepository.findByIdPost(post);
    }

    @Override
    public List<Rating> findAllRatings() {

        return ratingRepository.findAll();
    }

    @Override
    public void updateRating(Rating rating) {
        ratingRepository.save(rating);
    }

    @Override
    public void updateRatingForPost(int post) {
        Post post1=postRepo.findById((long) post).get();
        int size=post1.getRatings().size();
        double somme=post1.getRatings().stream().mapToDouble(Rating::getMoyrating).sum();
        if (size ==0)
        {
            post1.setMoyrating(0);
        }else
        {
            post1.setMoyrating(somme/ (double) size);
        }

        postRepo.save(post1);
    }
    }
