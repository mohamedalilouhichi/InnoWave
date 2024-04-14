package tn.esprit.backend.Service.Forum;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.multipart.MultipartFile;
import tn.esprit.backend.Entite.Image;
import tn.esprit.backend.Entite.Post;

import java.io.IOException;
import java.time.LocalDate;
import java.util.List;

public interface IPostService {
    List<Post> retrieveAllPosts();
    Post getPostbyid(Long idPost);
    Post addPostToUser(Post post , Long idUser, String title, String description,   LocalDate creationdate ,MultipartFile file ,String images ) throws IOException;
    void removePost(Long idPost);
    Post modifyPost( Long idPost,String title ,String description, String images, MultipartFile file )throws IOException;
    List<Post> retrievePostByIdUser(Long idUser);
    Post findMostLikedPost();

    List<Post> postuser(long id);

    public void removeImageIdFromPost(int id);
}