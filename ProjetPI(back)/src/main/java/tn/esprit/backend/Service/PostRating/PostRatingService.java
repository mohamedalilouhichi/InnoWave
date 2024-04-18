package tn.esprit.backend.Service.PostRating;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import tn.esprit.backend.Entite.Post;
import tn.esprit.backend.Entite.PostRating;
import tn.esprit.backend.Repository.PostRatingRepo;
import tn.esprit.backend.Repository.PostRepo;

import java.util.List;

@Service
@RequiredArgsConstructor
public class PostRatingService implements IPostRating {
    private final PostRatingRepo postratingRepo;
    private final PostRepo postRepo;

    @Override
    public void save(PostRating rating) {
        Post post1=postRepo.findById((long) rating.getIdPost()).get();
        if (rating.getStatus()==null || rating.getStatus().isEmpty())
        {
            rating.setStatus("Accepted");
        }
        if (postratingRepo.findById(rating.getIdRating()).isPresent())
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
    public void remove(PostRating rating) {
        Post post1=postRepo.findById((long) rating.getIdPost()).get();

        post1.getRatings().remove(rating);

        postRepo.save(post1);
        updateRatingForPost(rating.getIdPost());
        postratingRepo.delete(rating);
    }

    @Override
    public List<PostRating> findUserRatings(int user) {

        return postratingRepo.findByIdUser(user);    }

    @Override
    public List<PostRating> findPostRatings(int post) {

        return postratingRepo.findByIdPost(post);
    }

    @Override
    public List<PostRating> findAllRatings() {

        return postratingRepo.findAll();
    }

    @Override
    public void updateRating(PostRating rating) {
        postratingRepo.save(rating);
        updateRatingForPost(rating.getIdPost());


    }

    @Override
    public void updateRatingForPost(int post) {
        Post post1=postRepo.findById((long) post).get();
        int size=post1.getRatings().size();
        if (size ==0)
        {
            post1.setMoyrating(0);
        }else
        {
            double somme=post1.getRatings().stream().mapToDouble(PostRating::getMoyrating).sum();
            post1.setMoyrating(somme/ (double) size);
        }

        postRepo.save(post1);
    }
    @Override
    public void remove(int post,int idUser){

        PostRating rating=postratingRepo.findRatingByIdPostAndIdUser(post,idUser);
        postratingRepo.delete(rating);
        updateRatingForPost(rating.getIdPost());
    }

}
