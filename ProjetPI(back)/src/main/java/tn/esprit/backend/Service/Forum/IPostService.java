package tn.esprit.backend.Service.Forum;

import org.springframework.web.multipart.MultipartFile;
import tn.esprit.backend.Entite.Post;

import java.time.LocalDate;
import java.util.List;

public interface IPostService {
    public List<Post> retrieveAllPosts();
    public Post retrievePost(Long idPost);
    public String addPost(MultipartFile file, String title, String description, int nbrlike,int nbrsave,  LocalDate creationdate, boolean mostlikedpost, boolean newstpost);
    void removePost(Long idPost);
    public Post modifyPost(Long id, MultipartFile file, String title, String description, int nbrlike, LocalDate creationdate, boolean mostlikedpost, boolean newstpost);
}
