package tn.esprit.backend.Service.Forum;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;
import tn.esprit.backend.Entite.Post;
import tn.esprit.backend.Entite.PostLike;
import tn.esprit.backend.Entite.User;
import tn.esprit.backend.Repository.PostLikeRepo;
import tn.esprit.backend.Repository.PostRepo;
import tn.esprit.backend.Repository.UserRepo;

import java.io.IOException;
import java.time.LocalDate;
import java.util.Base64;
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


   @Override
    public Post addPostToUser(Post post ,  Long idUser) {
         User user = userRepo.findById(idUser).orElse(null);
               post.setUser(user);
               return postRepo.save(post);


    }



    @Override
    public void removePost(Long idPost) {
        postRepo.deleteById(idPost);
    }

    @Override
    public Post modifyPost(Post post ){
   return postRepo.save(post);
    }


}
