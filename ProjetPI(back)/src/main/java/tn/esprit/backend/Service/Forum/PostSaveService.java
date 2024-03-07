package tn.esprit.backend.Service.Forum;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tn.esprit.backend.Entite.Post;
import tn.esprit.backend.Entite.PostSave;
import tn.esprit.backend.Entite.User;
import tn.esprit.backend.Repository.PostRepo;
import tn.esprit.backend.Repository.PostSaveRepo;
import tn.esprit.backend.Repository.UserRepo;

import java.util.List;
import java.util.stream.Collectors;

@Service

public class PostSaveService implements IPostSaveService {
    private  final PostSaveRepo postSaveRepository;
    private   final PostRepo postRepository;
    private  final UserRepo userRepository;


    @Autowired
    public PostSaveService(PostSaveRepo postSaveRepository, PostRepo postRepository, UserRepo userRepository) {
        this.postSaveRepository = postSaveRepository;
        this.postRepository = postRepository;
        this.userRepository = userRepository;
    }


    @Override
    public List<PostSave> addSaveToPostAndUser(long idPost, long idUser) {
        // Récupération du post par son ID
        Post post = postRepository.findById(idPost)
                .orElseThrow(() -> new RuntimeException("Post not found for id: " + idPost));

        // Récupération de l'utilisateur par son ID
        User user = userRepository.findById(idUser)
                .orElseThrow(() -> new RuntimeException("User not found for id: " + idUser));

        // Vérification si l'utilisateur a déjà sauvegardé le post
        PostSave existingSaves = postSaveRepository.findByPostAndUser(post, user);

        // Création d'un nouvel objet PostSave
        PostSave postsave = new PostSave();

        if (existingSaves == null) {
            // Si l'utilisateur n'a pas encore sauvegardé le post
            postsave.setUser(user);
            postsave.setPost(post);
            postsave.setNbrSave(postsave.getNbrSave() + 1);  // Incrémentation du nombre de sauvegardes
            postsave.setDisSave(true);  // Marquage du post comme sauvegardé
            postSaveRepository.save(postsave);
        } else {
            // Si l'utilisateur a déjà sauvegardé le post
            if (existingSaves.getdisSave()) {
                // Si l'utilisateur avait déjà sauvegardé, alors on convertit la sauvegarde en non-sauvegarde
                existingSaves.setDisSave(false);
                postSaveRepository.delete(existingSaves);  // Suppression de l'ancienne sauvegarde
            } else {
                // Si l'utilisateur avait annulé la sauvegarde, alors on convertit la non-sauvegarde en sauvegarde
                existingSaves.setDisSave(true);
                postSaveRepository.save(existingSaves);  // Mise à jour de l'objet PostSave
            }
        }

        return null;
    }

    @Override
    public List<Post> getSavedPostsForUser(long idUser) {
        // Retrieve saved posts for the user from the repository
        User user = userRepository.findById(idUser)
                .orElseThrow(() -> new RuntimeException("User not found for id: " + idUser));

        List<PostSave> savedPosts = postSaveRepository.findSavedPostsByUser(user);

        // Extract the posts from the PostSave entities
        return savedPosts.stream()
                .map(PostSave::getPost)
                .collect(Collectors.toList());
    }
}