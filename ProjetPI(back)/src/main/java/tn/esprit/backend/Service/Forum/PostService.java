package tn.esprit.backend.Service.Forum;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import tn.esprit.backend.Entite.Post;
import tn.esprit.backend.Entite.User;
import tn.esprit.backend.Repository.PostLikeRepo;
import tn.esprit.backend.Repository.PostRepo;
import tn.esprit.backend.Repository.UserRepo;

import java.io.IOException;
import java.time.LocalDate;
import java.util.Collections;
import java.util.List;

@Service
@AllArgsConstructor
public class PostService implements IPostService {
    PostRepo postRepo;
    UserRepo userRepo ;
    PostLikeRepo postLikeRepo ;

    @Override
    public List<Post> retrieveAllPosts() {
        return postRepo.findAll();
    }
    @Override
    public List<Post> retrievePostsByidUser(Long idUser) {
        List<Post> posts = postRepo.findPostsByUser_IdUser(idUser);

        if (posts != null && !posts.isEmpty()) {
            return posts;
        } else {
            // If no posts are found, you can return an empty list or handle it based on your requirements.
            return Collections.emptyList();
        }
    }


   /*@Override
    public Post addPostToUser(Post post ,  Long idUser) {
         User user = userRepo.findById(idUser).orElse(null);
               post.setUser(user);
               return postRepo.save(post);


    }*/

   @Override
   public Post addPostToUser(Post post , Long idUser, String title, String description, int nbrlike,
                             int nbrsave, boolean saved , MultipartFile file, LocalDate creationdate ,
                             boolean mostlikedpost , boolean newstpost ) throws IOException {

       post.setTitle(title);
       post.setDescription(description);
       post.setNbrlike(nbrlike);
       post.setNbrsave(nbrsave);
       post.setSaved(saved);
       post.setCreationdate(creationdate);
       post.setMostlikedpost(mostlikedpost);
       post.setNewstpost(newstpost);

       if (file != null && !file.isEmpty()) {
           post.setFile(file.getBytes());
       }
       User user = userRepo.findById(idUser).orElse(null);
       post.setUser(user);
       return postRepo.save(post);
   }



    @Override
    public void removePost(Long idPost) {

       postRepo.deleteById(idPost);
    }


    @Override
    public Post modifyPost(Long idPost, Post postDetails, MultipartFile file) throws IOException {
        Post post = postRepo.findById(idPost)
                .orElseThrow(() -> new RuntimeException("Post not found for this id :: " + idPost));

        // Update post fields
        post.setTitle(postDetails.getTitle());
        post.setDescription(postDetails.getDescription());
        post.setNbrlike(postDetails.getNbrlike());
        post.setNbrsave(postDetails.getNbrsave());
        post.setSaved(postDetails.isSaved());
        post.setCreationdate(postDetails.getCreationdate());
        post.setMostlikedpost(postDetails.isMostlikedpost());
        post.setNewstpost(postDetails.isNewstpost());

        // Update file if provided
        if (file != null && !file.isEmpty()) {
            post.setFile(file.getBytes());
        }
        // Update relationships
        post.setPostLikes(postDetails.getPostLikes()); // Update PostLikes (assuming you provide the updated list)
        post.setComments(postDetails.getComments());   // Update Comments (assuming you provide the updated set)
        // Assurez-vous de mettre à jour les autres champs selon les besoins

        // Save the updated post
        return postRepo.save(post);
    }

}
