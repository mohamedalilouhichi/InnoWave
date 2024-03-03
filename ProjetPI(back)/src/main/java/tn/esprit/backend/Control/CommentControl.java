package tn.esprit.backend.Control;

import io.swagger.v3.oas.annotations.Operation;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
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
    private final SimpMessagingTemplate messagingTemplate;

    @Operation(description = "récupérer toutes les Comments affecter a une poste  de la base de données")
    @GetMapping("/retrieveAllcommentsAffectToidPost/{idPost}")
    public List<Comment> retrieveAllcommentsAffectToidPost (@PathVariable("idPost") Long idPost) {
        return commentService.retrieveAllcommentsAffectToidPost(idPost) ;
    }

    @GetMapping("/retrieve-Comment/{idComment}")
    public Comment retrievecomment(@PathVariable("idComment") Long idComment) {
        return commentService.retrievecomment(idComment) ;
    }

    @PostMapping("/addCommentToPostAndUser/{idPost}/{idUser}")
    public Comment addCommentToPostAndUser(@RequestBody Comment c,
                                           @PathVariable("idPost") Long idPost,
                                           @PathVariable("idUser") Long idUser) {
        return commentService.addCommentToPostAndUser(c, idPost, idUser);
    }

    @DeleteMapping("/remove-Comment/{idComment}")
    public void removecomment(@PathVariable("idComment") Long idComment)
    {

        commentService.removecomment(idComment);
    }


    @PutMapping("/modifyComment/{idComment}/{idUser}/{idPost}")
    public ResponseEntity<Comment> modifycomment(@PathVariable("idComment") Long idComment ,
                                                 @PathVariable("idUser") Long idUser ,
                                                 @PathVariable("idPost") Long idPost,
                                                 @RequestBody  String commDetails) {
        Comment updatedcomm = commentService.modifycomment(idComment,idUser,idPost,commDetails);

        return ResponseEntity.ok(updatedcomm);
    }
    @MessageMapping("/addComment")
    @SendTo("/topic/comments")
    public String addCommentAndNotify(Comment comment) {
        String notification = "New comment added! Comment ID: " + comment.getIdComment();
        // Send notification to /topic/comments
        messagingTemplate.convertAndSend("/topic/comments", notification);

        return notification;
    }

}
