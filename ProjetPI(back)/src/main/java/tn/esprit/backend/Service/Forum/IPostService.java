package tn.esprit.backend.Service.Forum;

import org.springframework.web.multipart.MultipartFile;
import tn.esprit.backend.Entite.Post;

import java.io.IOException;
import java.time.LocalDate;
import java.util.List;

public interface IPostService {
     List<Post> retrieveAllPosts();
    List<Post> retrievePostsByidUser( Long idUser );
    public Post addPostToUser(Post post , Long idUser, String title, String description, int nbrlike, int nbrsave, boolean saved , MultipartFile file, LocalDate creationdate , boolean mostlikedpost , boolean newstpost ) throws IOException;
    void removePost(Long idPost);
    Post modifyPost( Long idPost, Post postDetails, MultipartFile file )throws IOException;
}
