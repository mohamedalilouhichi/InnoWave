package tn.esprit.backend.Control;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import tn.esprit.backend.Entite.Post;
import tn.esprit.backend.Entite.PostLike;
import tn.esprit.backend.Entite.PostSave;
import tn.esprit.backend.Repository.PostRepo;
import tn.esprit.backend.Service.Forum.IPostSaveService;
import tn.esprit.backend.Service.Forum.PostService;

import java.util.List;

@RestController
    @RequestMapping("/api/saves")
public class PostSaveControl {
    private final IPostSaveService postSaveService;
    @Autowired
    private PostService postService;
    @Autowired
    public PostSaveControl(IPostSaveService postSaveService) {

        this.postSaveService = postSaveService;
    }


    @PostMapping("/addSave")
    public Post addSaveToPostAndUser(@RequestParam("idPost") long idPost, @RequestParam("idUser") long idUser) {
        List<PostSave> postSave = postSaveService.addSaveToPostAndUser(idPost, idUser);
        return postService.getPostbyid(idPost) ;
    }
    @GetMapping("/saved-posts/{idUser}")
    public List<Post> getSavedPostsForUser(@PathVariable long idUser) {
        return postSaveService.getSavedPostsForUser(idUser);
    }
}
