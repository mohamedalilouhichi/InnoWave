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
    public String addPost(MultipartFile File, String title, String description, int nbrlike, int nbrsave, LocalDate creationdate, boolean mostlikedpost, boolean newstpost) {
        Post post = new Post();
        post.setNbrlike(nbrlike);
        post.setNbrsave(nbrsave);
        post.setTitle(title);
        post.setDescription(description);
        post.setCreationdate(creationdate);
        post.setMostlikedpost(mostlikedpost);
        post.setNewstpost(newstpost);

        if (File != null && !File.isEmpty()) {
            try {
                post.setFile(File.getBytes());
            } catch (IOException e) {
                e.printStackTrace();
                return "Error uploading file: " + e.getMessage();
            }
        }

        postRepo.save(post);
        return "Post added successfully!";
    }





    @Override
    public void removePost(Long idPost) {
        postRepo.deleteById(idPost);
    }

    @Override
    public Post modifyPost(Long id, MultipartFile file, String title, String description, int nbrlike, LocalDate creationdate, boolean mostlikedpost, boolean newstpost) {
        Post existingPost = postRepo.findById(id).orElse(null);

        if (existingPost != null) {
            existingPost.setNbrlike(nbrlike);
            existingPost.setTitle(title);
            existingPost.setDescription(description);
            existingPost.setCreationdate(creationdate);
            existingPost.setMostlikedpost(mostlikedpost);
            existingPost.setNewstpost(newstpost);

            if (file != null && !file.isEmpty()) {
                try {
                    existingPost.setFile(file.getBytes());
                } catch (IOException e) {
                    e.printStackTrace();
                    // Handle the exception as needed
                }
            }

            postRepo.save(existingPost);
            return existingPost;
        } else {
            // Handle the case where the post with the specified ID is not found
            return null;
        }
    }


}
