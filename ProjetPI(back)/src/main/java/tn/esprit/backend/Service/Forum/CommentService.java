package tn.esprit.backend.Service.Forum;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import tn.esprit.backend.Entite.Comment;
import tn.esprit.backend.Entite.Post;
import tn.esprit.backend.Repository.CommentRepo;
import tn.esprit.backend.Repository.PostRepo;

import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class CommentService implements ICommentService {
    CommentRepo commentRepo ;
    PostRepo postRepo ;
    @Override
    public List<Comment> retrieveAllcomments() {
        return commentRepo.findAll();
    }

    @Override
    public Comment retrievecomment(Long idComment) {

        return commentRepo.findById(idComment).orElse(null);
    }

    @Override
    public Comment addcommentAffToPost(Comment c , Long idPost) {

         Post post = postRepo.findById(idPost).orElse(null);
         post.getComments().add(c);
        return commentRepo.save(c);
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
