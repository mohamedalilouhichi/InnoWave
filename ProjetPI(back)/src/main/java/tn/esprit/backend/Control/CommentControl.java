package tn.esprit.backend.Control;

import io.swagger.v3.oas.annotations.Operation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import tn.esprit.backend.Entite.Comment;
import tn.esprit.backend.Service.Forum.ICommentService;

import java.util.List;

@RestController
@RequestMapping("/comment")
@CrossOrigin(origins = "http://localhost:4200")

public class CommentControl {
    @Autowired
    ICommentService CommentService ;
    @Operation(description = "récupérer toutes les Comments de la base de données")
    @GetMapping("/retrieve-all-Comments")
    public List<Comment> retrieveAllcomments () {
        return CommentService.retrieveAllcomments() ;
    }

    @GetMapping("/retrieve-Comment/{idComment}")
    public Comment retrievecomment(@PathVariable("idComment") Long idComment) {
        return CommentService.retrievecomment(idComment) ;
    }

    @PostMapping("/add-commentAffToPost/{idPost}")
    public Comment addcommentAffToPost(@RequestBody Comment c,@PathVariable("idPost") Long idPost) {
        return  CommentService.addcommentAffToPost(c,idPost );
    }

    @DeleteMapping("/remove-Comment/{Comment-id}")
    public void removecomment(@PathVariable("Comment-id") Long idComment)
    {
        CommentService.removecomment(idComment);
    }

    @PutMapping("/modify-Comment")
    public Comment modifycomment(@RequestBody Comment c) {
        return CommentService.modifycomment(c);
    }
}
