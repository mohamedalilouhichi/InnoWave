package tn.esprit.backend.Control;
import io.swagger.v3.oas.annotations.Operation;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.apache.poi.xwpf.usermodel.XWPFDocument;
import org.apache.poi.xwpf.usermodel.XWPFParagraph;

import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import tn.esprit.backend.Entite.Post;
import tn.esprit.backend.Service.Forum.BadWordFilterService;
import tn.esprit.backend.Service.Forum.IPostService;

import org.springframework.http.MediaType;
import java.io.ByteArrayOutputStream;
import java.io.InputStream;
import org.springframework.http.HttpHeaders;
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
@Autowired
    BadWordFilterService badWordFilterService ;
    @Operation(description = "récupérer toutes les Posts de la base de données")
    @GetMapping("/retrieve-all-Posts")
    public List<Post> retrieveAllPosts() {

        return postService.retrieveAllPosts();
    }

    @Operation(description = "récupérer toutes les Posts pour un user ")
    @GetMapping("/retrieve-Post/{idUser}")
    public List<Post> retrievePostByIdUser(@PathVariable("idUser") Long idUser) {

        return postService.retrievePostByIdUser(idUser);
    }

    @GetMapping("/{idPost}")
    public Post getPostbyid(@PathVariable("idPost") long idPost) {
        return postService.getPostbyid(idPost);
    }
    @PostMapping("/addPostToUser")
    public ResponseEntity<?> addPostToUser(
            @RequestParam("idUser") Long idUser,
            @RequestParam("title") String title,
            @RequestParam("description") String description,
            @RequestParam("creationdate") LocalDate creationdate,
            @RequestParam("file") MultipartFile file) throws IOException {

        try {
            validateInputParameters(idUser, title, description, creationdate, file);

            Post post = new Post();
            Post savedPost = postService.addPostToUser(post, idUser, title, description, creationdate, file);

            if (savedPost != null) {
                return ResponseEntity.ok(savedPost);
            } else {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to add post.");
            }
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (IOException e) {
            // Log the exception and return an appropriate response
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error processing file: " + e.getMessage());
        } catch (Exception e) {
            // Log the exception and return an appropriate response
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error adding post: " + e.getMessage());
        }
    }

    private void validateInputParameters(Long idUser, String title, String description, LocalDate creationdate, MultipartFile file) {
        // Add validation logic here
        if (idUser == null || title == null || description == null || creationdate == null) {
            throw new IllegalArgumentException("Invalid input parameters.");
        }
        // Add more specific validation if needed
    }



    @DeleteMapping("/remove-Post/{idPost}")
    public void removePost(@PathVariable("idPost") Long idPost) {



        postService.removePost(idPost);
    }

    @Operation(description = "Update Post")
    @PutMapping("/modifyPostAffecttoUser")
    public ResponseEntity<Post> modifyPost(
            @RequestParam("idPost") Long idPost,
            @RequestParam("title") String title,
            @RequestParam("description") String description,
            //      @RequestParam("creationdate") LocalDate creationdate,
            @RequestParam(value = "file", required = false) MultipartFile file) throws IOException {

        Post updatedPost = postService.modifyPost(idPost, title , description,  file);
        return ResponseEntity.ok(updatedPost);
    }



    @GetMapping("/telecharger-pdf/{idPost}")
    public ResponseEntity<Resource> telechargerPDF(@PathVariable("idPost") long idPost) {
        // Récupérer le tableau de bytes depuis votre entité et stockez-le dans une variable byte[]
        Post post= postService.getPostbyid(idPost);
        ByteArrayResource resource = new ByteArrayResource(post.getFile());

        HttpHeaders headers = new HttpHeaders();
        headers.add(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=fichier.pdf");

        return ResponseEntity.ok()
                .headers(headers)
                .contentLength(post.getFile().length)
                .contentType(MediaType.APPLICATION_PDF)
                .body(resource);
    }

//    @GetMapping("/most-liked")
//    public ResponseEntity<Post> getMostLikedPost() {
//        Post mostLikedPost = postService.findMostLikedPost();
//
//        if (mostLikedPost != null) {
//            return new ResponseEntity<>(mostLikedPost, HttpStatus.OK);
//        } else {
//            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
//        }
//    }
}
