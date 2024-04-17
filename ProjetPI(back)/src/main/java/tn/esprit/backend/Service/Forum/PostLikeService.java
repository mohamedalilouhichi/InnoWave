package tn.esprit.backend.Service.Forum;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import tn.esprit.backend.Entite.Post;
import tn.esprit.backend.Entite.PostLike;
import tn.esprit.backend.Entite.User;
import tn.esprit.backend.Repository.PostLikeRepo;
import tn.esprit.backend.Repository.PostRepo;
import tn.esprit.backend.Repository.UserRepo;
import java.util.List;


@Service

public class PostLikeService implements IPostLikeService {
    private  final PostLikeRepo postLikeRepository;
    private   final PostRepo postRepository;
    private  final UserRepo userRepository;


    @Autowired
    public PostLikeService(PostLikeRepo postLikeRepository, PostRepo postRepository, UserRepo userRepository) {
        this.postLikeRepository = postLikeRepository;
        this.postRepository = postRepository;
        this.userRepository = userRepository;
    }
    @Override
    public List<PostLike> addLikeToPostAndUser(long idPost, long idUser) {
        // Récupération du post par son ID
        Post post = postRepository.findById(idPost)
                .orElseThrow(() -> new RuntimeException("Post not found for id: " + idPost));

        // Récupération de l'utilisateur par son ID
        User user = userRepository.findById(idUser)
                .orElseThrow(() -> new RuntimeException("User not found for id: " + idUser));

        // Vérification si l'utilisateur a déjà liké ou disliké le post
        PostLike existingLikes = postLikeRepository.findByPostAndUser(post, user);

        // Création d'un nouvel objet PostLike
        PostLike postlike = new PostLike();

        if (existingLikes == null) {
            // Si l'utilisateur n'a pas encore liké ou disliké le post
            postlike.setUser(user);
            postlike.setPost(post);
            postlike.setNbrlike(postlike.getNbrlike() + 1);  // Incrémentation du nombre de likes
            postlike.setDislike(true);  // Marquage du post comme disliké
            postLikeRepository.save(postlike);
        } else {
            // Si l'utilisateur a déjà liké ou disliké le post
            if (existingLikes.getDislike()) {
                // Si l'utilisateur avait disliké, alors on convertit le dislike en like
                existingLikes.setDislike(false);
                postLikeRepository.delete(existingLikes);  // Suppression de l'ancien dislike
            } else {
                // Si l'utilisateur avait liké, alors on convertit le like en dislike
                existingLikes.setDislike(true);
                postLikeRepository.save(existingLikes);  // Mise à jour de l'objet PostLike
            }
        }

        return null;  // Vous devrez probablement retourner une liste de likes à la place
    }
}
