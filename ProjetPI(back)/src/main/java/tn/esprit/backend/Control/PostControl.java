package tn.esprit.backend.Control;

import com.fasterxml.jackson.databind.ObjectMapper;
import io.swagger.v3.oas.annotations.Operation;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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
@AllArgsConstructor
@RequestMapping("/post")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:4200")
public class PostControl {
@Autowired
    private  IPostService postService;



    @Operation(description = "récupérer toutes les Posts de la base de données")
    @GetMapping("/retrieve-all-Posts")
    public List<Post> retrieveAllPosts() {
        return postService.retrieveAllPosts();
    }

   @GetMapping("/retrievePostsByidUser/{idUser}")
    public List<Post> retrievePostsByUserId(@PathVariable("idUser") Long idUser) {
      return postService.retrievePostsByidUser(idUser);
    }
    @PostMapping("/addPostToUser/{idUser}")
    public Post addPostToUser(@RequestBody Post post ,  @PathVariable Long idUser) {
    return postService.addPostToUser(post,idUser);
    }


    @DeleteMapping("/remove-Post/{idPost}")
    public void removePost(@PathVariable("idPost") Long idPost) {
        postService.removePost(idPost);
    }

    @PutMapping("/modify-Post")
    public Post modifyPost(@RequestBody Post post  ) {
     return postService.modifyPost(post );
    }

}
