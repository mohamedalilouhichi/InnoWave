package tn.esprit.backend.Control;

import com.fasterxml.jackson.databind.ObjectMapper;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import tn.esprit.backend.Entite.Post;
import tn.esprit.backend.Repository.PostRepo;
import tn.esprit.backend.Service.Forum.IPostService;

import java.io.IOException;
import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/post")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:4200")
public class PostControl {

    private final IPostService postService;
    PostRepo postRepo ;

    @Operation(description = "récupérer toutes les Posts de la base de données")
    @GetMapping("/retrieve-all-Posts")
    public List<Post> retrieveAllPosts() {
        return postService.retrieveAllPosts();
    }

    @GetMapping("/retrieve-Post/{idPost}")
    public Post retrievePost(@PathVariable("idPost") Long idPost) {
        return postService.retrievePost(idPost);
    }

    @PostMapping("/addPost")
    public String addPost(@RequestParam("file") MultipartFile file,
                          @RequestParam("title") String title,
                          @RequestParam("description") String description,
                          @RequestParam("nbrlike") int nbrlike,
                          @RequestParam("nbrsave") int nbrsave, // Add this line for nbrsave
                          @RequestParam("creationdate") LocalDate creationdate,
                          @RequestParam("mostlikedpost") boolean mostlikedpost,
                          @RequestParam("newstpost") boolean newstpost) {
        try {
            return postService.addPost(file, title, description, nbrlike, nbrsave, creationdate, mostlikedpost, newstpost);
        } catch (Exception e) {
            return "Error adding post: " + e.getMessage();
        }
    }


    @DeleteMapping("/remove-Post/{idPost}")
    public void removePost(@PathVariable("idPost") Long idPost) {
        postService.removePost(idPost);
    }

    @Transactional
    @PutMapping("/modify-Post/{id}")
    public Post modifyPost(@PathVariable("id") Long id,
                           @RequestParam(value = "file", required = false) MultipartFile file,
                           @RequestParam("title") String title,
                           @RequestParam("description") String description,
                           @RequestParam("nbrlike") int nbrlike,
                           @RequestParam("creationdate") LocalDate creationdate,
                           @RequestParam("mostlikedpost") boolean mostlikedpost,
                           @RequestParam("newstpost") boolean newstpost) {
        try {
            return postService.modifyPost(id, file, title, description, nbrlike, creationdate, mostlikedpost, newstpost);
        } catch (Exception e) {
            // Handle the exception as needed
            return null;
        }
    }

}
