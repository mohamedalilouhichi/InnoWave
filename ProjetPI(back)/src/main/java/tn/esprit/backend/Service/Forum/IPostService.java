package tn.esprit.backend.Service.Forum;

import org.springframework.web.multipart.MultipartFile;
import tn.esprit.backend.Entite.Post;

import java.time.LocalDate;
import java.util.List;

public interface IPostService {
    public List<Post> retrieveAllPosts();
    List<Post> retrievePostsByidUser( Long idUser );
    public Post addPostToUser(Post post ,  Long idUser) ;
    void removePost(Long idPost);
    public Post modifyPost(Post post );
}
