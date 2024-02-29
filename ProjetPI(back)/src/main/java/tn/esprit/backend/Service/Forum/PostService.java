package tn.esprit.backend.Service.Forum;

import lombok.AllArgsConstructor;
import org.apache.xmlbeans.impl.xb.xsdschema.Public;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import tn.esprit.backend.Entite.Post;
import tn.esprit.backend.Entite.User;
import tn.esprit.backend.Repository.PostLikeRepo;
import tn.esprit.backend.Repository.PostRepo;
import tn.esprit.backend.Repository.UserRepo;

import javax.swing.plaf.PanelUI;
import java.awt.print.Pageable;
import java.io.IOException;
import java.time.LocalDate;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

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

   // retrievpost by idpost pour le telechargement de l'image
    @Override
    public Post getPostbyid(Long idPost) {

        return postRepo.findById(idPost).orElse(null);
    }



   public Post addPostToUser(Post post , Long idUser, String title, String description, LocalDate creationdate ,   MultipartFile file ) throws IOException {
try{
       post.setTitle(title);
       post.setDescription(description);
       post.setCreationdate(creationdate);

       if (file != null && !file.isEmpty()) {
           post.setFile(file.getBytes());
       }
       User user = userRepo.findById(idUser).orElse(null);
       post.setUser(user);
       return postRepo.save(post);
   } catch (IOException e) {
        // Handle IOException (e.g., log the error or throw a custom exception)
        throw new RuntimeException("Error processing file: " + e.getMessage(), e);
    } catch (Exception e) {
        // Handle other exceptions (e.g., database-related issues)
        throw new RuntimeException("Error adding post: " + e.getMessage(), e);
    }
   }



    @Override
    public void removePost(Long idPost) {

       postRepo.deleteById(idPost);
    }


    @Override
    public Post modifyPost(Long idPost, String title , String description, MultipartFile file) throws IOException {
        Post post = postRepo.findById(idPost)
                .orElseThrow(() -> new RuntimeException("Post not found for this id :: " + idPost));

        // Update post fields
        post.setTitle(title);
        post.setDescription(description);
        //post.setCreationdate(creationdate);
        // Update file if provided
        if (file != null && !file.isEmpty()) {
            post.setFile(file.getBytes());
        }
        // Update relationships
      //  post.setPostLikes(postDetails.getPostLikes()); // Update PostLikes (assuming you provide the updated list)
       // post.setComments(postDetails.getComments());   // Update Comments (assuming you provide the updated set)
        // Assurez-vous de mettre à jour les autres champs selon les besoins

        // Save the updated post
        return postRepo.save(post);
    }

    @Override
    public List<Post> retrievePostByIdUser(Long idUser) {
        List<Post> posts = postRepo.findPostsByUser_IdUser(idUser);

        if (posts != null && !posts.isEmpty()) {
            return posts;
        } else {
            // If no posts are found, you can return an empty list or handle it based on your requirements.
            return Collections.emptyList();
        }
    }
    @Override
    public Post findMostLikedPost() {
 //       List<Object[]> result = postRepo.findMostLikedPostWithTotalLikes(PageRequest.of(0, 1));
//
//        if (!result.isEmpty()) {
//            Object[] data = result.get(0);
//            return (Post) data[0];
//        } else {
//            return null; // Handle the case when there are no posts
//        }
        return null;
    }

    @Override
    public List<Post> postuser(long id) {
        List<Post> allPosts = postRepo.findAll();
        return allPosts.stream()
                .filter(post -> post.getUser().getIdUser() == id)
                .collect(Collectors.toList());
    }

}
