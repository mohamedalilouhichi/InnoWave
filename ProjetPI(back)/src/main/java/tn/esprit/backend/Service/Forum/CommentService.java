package tn.esprit.backend.Service.Forum;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import tn.esprit.backend.Entite.Comment;
import tn.esprit.backend.Entite.Post;
import tn.esprit.backend.Entite.User;
import tn.esprit.backend.Repository.CommentRepo;
import tn.esprit.backend.Repository.PostRepo;
import tn.esprit.backend.Repository.UserRepo;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
@AllArgsConstructor
public class CommentService implements ICommentService {
    CommentRepo commentRepo ;
    PostRepo postRepo ;
    UserRepo userRepo ;
    @Override
    public List<Comment> retrieveAllcomments() {
        return commentRepo.findAll();
    }

    @Override
    public Comment retrievecomment(Long idComment) {

        return commentRepo.findById(idComment).orElse(null);
    }

    @Override
    public Comment addCommentToPostAndUser(Comment c, Long idPost, Long idUser) {
        Post post = postRepo.findById(idPost).orElse(null);
        User user = userRepo.findById(idUser).orElse(null);
        if (post != null && user != null) {
        c.setPost(post);
        c.setUser(user);

        return commentRepo.save(c); }

     else { return null;
    }
    }


    @Override
    public void removecomment(Long idComment) {
        commentRepo.deleteById(idComment);

    }

    @Override
    public Comment modifycomment(Comment c) {
        return commentRepo.save(c);
    }
}
