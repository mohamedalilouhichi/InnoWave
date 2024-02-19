package tn.esprit.backend.Control;

import com.fasterxml.jackson.databind.ObjectMapper;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import tn.esprit.backend.Entite.Post;
import tn.esprit.backend.Service.Forum.IPostService;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/post")
@RequiredArgsConstructor
public class PostControl {

    private final IPostService postService;

    @Operation(description = "récupérer toutes les Posts de la base de données")
    @GetMapping("/retrieve-all-Posts")
    public List<Post> retrieveAllPosts() {
        return postService.retrieveAllPosts();
    }

    @GetMapping("/retrieve-Post/{idPost}")
    public Post retrievePost(@PathVariable("idPost") Long idPost) {
        return postService.retrievePost(idPost);
    }

    @PostMapping("/add-Post")
    public String addPost(@RequestParam("pictures") MultipartFile pictures,
                          @RequestParam("title") String title,
                          @RequestParam("description") String description,
                          @RequestParam("nbrlike") int nbrlike,
                          @RequestParam("creationdate") LocalDate creationdate,
                          @RequestParam("mostlikedpost") boolean mostlikedpost,
                          @RequestParam("newstpost") boolean newstpost) {
        try {
            return postService.addPost(pictures, title, description, nbrlike, creationdate, mostlikedpost, newstpost);
        } catch (Exception e) {
            return "Error adding post: " + e.getMessage();
        }
    }

    @DeleteMapping("/remove-Post/{Post-id}")
    public void removePost(@PathVariable("Post-id") Long idPost) {
        postService.removePost(idPost);
    }

    @PutMapping("/modify-Post")
    public Post modifyPost(@RequestBody Post p) {
        return postService.modifyPost(p);
    }
}
