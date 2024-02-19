package tn.esprit.backend.Service.Forum;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;
import tn.esprit.backend.Entite.Post;
import tn.esprit.backend.Repository.PostRepo;

import java.io.IOException;
import java.time.LocalDate;
import java.util.Base64;
import java.util.List;

@Service
@AllArgsConstructor
public class PostService implements IPostService {
    PostRepo postRepo;

    @Override
    public List<Post> retrieveAllPosts() {
        return postRepo.findAll();
    }

    @Override
    public Post retrievePost(Long idPost) {
        return postRepo.findById(idPost).orElse(null);
    }

    @Override
    public String addPost(MultipartFile pictures, String title, String description, int nbrlike, LocalDate creationdate, boolean mostlikedpost, boolean newstpost) {
        Post post = new Post();
        String filename = StringUtils.cleanPath(pictures.getOriginalFilename());
        if (filename.contains("..")) {
            System.out.println(("not a valid file"));
        }
        try {
            post.setPictures(Base64.getEncoder().encodeToString(pictures.getBytes()));
        } catch (IOException e) {
            e.printStackTrace();
        }
        post.setNbrlike(nbrlike);
        post.setTitle(title);
        post.setDescription(description);
        post.setCreationdate(creationdate);
        post.setMostlikedpost(mostlikedpost);
        post.setNewstpost(newstpost);
        postRepo.save(post);
        return "Post added successfully!" ;
    }



    @Override
    public void removePost(Long idPost) {
        postRepo.deleteById(idPost);

    }

    @Override
    public Post modifyPost(Post p) {
        return postRepo.save(p);
    }
}
