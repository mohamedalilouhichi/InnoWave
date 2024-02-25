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
    public List<Comment> retrieveAllcommentsAffectToidPost(Long idPost) {
        return commentRepo.findAllByPost_IdPost(idPost);
    }

    @Override
    public Comment retrievecomment(Long idComment) {

        return commentRepo.findById(idComment).orElse(null);
    }

    @Override
    public Comment addCommentToPostAndUser(Comment c, Long idPost, Long idUser) {
        Post post = postRepo.findById(idPost).orElse(null);
        User user = userRepo.findById(idUser).orElse(null);
        Set<Comment> myset = new HashSet<>();
        Set<Comment> myset2 = new HashSet<>();

        if (post != null && user != null) {
            c.setPost(post);
            myset = post.getComments();
            myset2 = user.getComments();

            c.setUser(user);

             commentRepo.save(c);
             myset.add(c);
             myset2.add(c);

            post.setComments(myset);
            user.setComments(myset2);

            postRepo.save(post);
            userRepo.save(user);
            return  c ;
        }
        else { return null;
        }
    }


    @Override
    public void removecomment(long idComment) {
        commentRepo.deleteById(idComment);

    }

    @Override
    public Comment modifycomment(long idComment ,long idUser ,long idPost, String commDetails) {

        Post post = postRepo.findById(idPost).orElse(null);
        User user = userRepo.findById(idUser).orElse(null);
        Comment c = commentRepo.findById(idComment).orElse(null);
        Set<Comment> myset = new HashSet<>();
        Set<Comment> myset2 = new HashSet<>();

        if (post != null && user != null) {
            c.setPost(post);
            myset = post.getComments();
            myset2 = user.getComments();

            c.setUser(user);
            c.setDescription(commDetails);

            commentRepo.save(c);
            myset.add(c);
            myset2.add(c);

            post.setComments(myset);
            user.setComments(myset2);

            postRepo.save(post);
            userRepo.save(user);
            return  c ;
        }
        else { return null;
        }
    }
}
