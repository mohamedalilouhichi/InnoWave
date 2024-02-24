package tn.esprit.backend.Control;

import io.swagger.v3.oas.annotations.Operation;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tn.esprit.backend.Entite.Comment;
import tn.esprit.backend.Service.Forum.ICommentService;

import java.util.List;
@AllArgsConstructor
@RestController
@RequestMapping("/comment")
@CrossOrigin(origins = "http://localhost:4200")

public class CommentControl {

    ICommentService commentService ;
    @Operation(description = "récupérer toutes les Comments affecter a une poste  de la base de données")
    @GetMapping("/retrieveAllcommentsAffectToidPost/{idPost}")
    public List<Comment> retrieveAllcommentsAffectToidPost (@PathVariable("idPost") Long idPost) {
        return commentService.retrieveAllcommentsAffectToidPost(idPost) ;
    }

    @GetMapping("/retrieve-Comment/{idComment}")
    public Comment retrievecomment(@PathVariable("idComment") Long idComment) {
        return commentService.retrievecomment(idComment) ;
    }

    @PostMapping("/add-comment-to-post-and-user/{idPost}/{idUser}")
    public Comment addCommentToPostAndUser(@RequestBody Comment c, @PathVariable("idPost") Long idPost, @PathVariable("idUser") Long idUser) {
        return commentService.addCommentToPostAndUser(c, idPost, idUser);
    }

    @DeleteMapping("/remove-Comment/{Comment-id}")
    public void removecomment(@PathVariable("Comment-id") Long idComment)
    {
        commentService.removecomment(idComment);
    }

    @PutMapping("/modify-Comment")
    public Comment modifycomment(@RequestBody Comment c) {
        return commentService.modifycomment(c);
    }
}
