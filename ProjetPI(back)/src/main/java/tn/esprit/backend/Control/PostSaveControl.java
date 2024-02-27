package tn.esprit.backend.Control;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import tn.esprit.backend.Entite.PostSave;
import tn.esprit.backend.Service.Forum.IPostSaveService;

import java.util.List;

@RestController
@RequestMapping("/api/saves")
public class PostSaveControl {
    private final IPostSaveService postSaveService;
    @Autowired
    public PostSaveControl(IPostSaveService postSaveService) {

        this.postSaveService = postSaveService;
    }

    @PostMapping("/addSave")
    public List<PostSave> addSaveToPostAndUser(@RequestParam("idPost") long idPost, @RequestParam("idUser") long idUser) {
        List<PostSave> postSave = postSaveService.addSaveToPostAndUser(idPost, idUser);
        return postSave ;
    }
}
