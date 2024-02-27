package tn.esprit.backend.Control;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import tn.esprit.backend.Entite.PostLike;
import tn.esprit.backend.Service.Forum.IPostLikeService;

import java.util.List;

@RestController
@RequestMapping("/api/likes")
public class PostLikeControl {
    private final IPostLikeService postLikeService;
    @Autowired
    public PostLikeControl(IPostLikeService postLikeService) {

        this.postLikeService = postLikeService;
    }
    @PostMapping("/addLike")
    public List<PostLike> addLikeToPostAndUser(@RequestParam("idPost") long idPost, @RequestParam("idUser") long idUser) {
        List<PostLike> postLike = postLikeService.addLikeToPostAndUser(idPost, idUser);
        return postLike ;
    }

}
