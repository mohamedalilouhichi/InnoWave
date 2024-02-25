package tn.esprit.backend.Control;
import io.swagger.v3.oas.annotations.Operation;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import tn.esprit.backend.Entite.Post;
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

    @Operation(description = "récupérer toutes les Posts pour un user ")
    @GetMapping("/retrieve-Post/{idUser}")
    public List<Post> retrievePostsByidUser(@PathVariable("idUser") Long idUser) {

        return postService.retrievePostsByidUser(idUser);
    }

    /*@PostMapping("/addPostToUser/{idUser}")
    public Post addPostToUser(@RequestBody Post post ,  @PathVariable Long idUser) {
    return postService.addPostToUser(post,idUser);
    }*/
    ////   LocalDate creationdate , boolean mostlikedpost , boolean newstpost
    @PostMapping("/addPostToUser")
    public ResponseEntity<?> addPostToUser(
                                             @RequestParam ("idUser") Long idUser,
                                             @RequestParam("title")String title,
                                             @RequestParam("description")String description,
                                             @RequestParam("nbrlike")int nbrlike,
                                             @RequestParam("nbrsave")int nbrsave,
                                             @RequestParam("saved")boolean saved,
                                             @RequestParam("creationdate") LocalDate creationdate,
                                             @RequestParam("mostlikedpost")boolean mostlikedpost,
                                             @RequestParam("newstpost")boolean newstpost ,
                                             @RequestParam("file") /*@Size(max = 10 * 1024 * 1024)*/ MultipartFile file) throws IOException {
        Post  post = new   Post ( );
        Post savedPost =  postService.addPostToUser(post,idUser,title,description,nbrlike,nbrsave,saved,file,creationdate,mostlikedpost,newstpost);
        return ResponseEntity.ok(savedPost);
    }


    @DeleteMapping("/remove-Post/{idPost}")
    public void removePost(@PathVariable("idPost") Long idPost) {
        postService.removePost(idPost);
    }

    @Operation(description = "Update Post")
    @PutMapping("/modifyPost/{idPost}")
    public ResponseEntity<Post> modifyPost(
            @PathVariable Long idPost,
            @RequestBody Post post,
            @RequestParam(value = "file", required = false) MultipartFile file) throws IOException {

        Post updatedPost = postService.modifyPost(idPost, post, file);
        return ResponseEntity.ok(updatedPost);
    }



}
