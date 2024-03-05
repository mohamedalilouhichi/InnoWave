package tn.esprit.backend.Service.Forum;

import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import tn.esprit.backend.Entite.Comment;
import tn.esprit.backend.Entite.Post;
import tn.esprit.backend.Entite.User;
import tn.esprit.backend.Repository.CommentRepo;
import tn.esprit.backend.Repository.PostRepo;
import tn.esprit.backend.Repository.UserRepo;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
@AllArgsConstructor
@Transactional
public class CommentService implements ICommentService {
    private final CommentRepo commentRepo;
    private final PostRepo postRepo;
    private final UserRepo userRepo;
    private final ApplicationEventPublisher eventPublisher;
    private final SimpMessagingTemplate messagingTemplate;  // Inject SimpMessagingTemplate
    BadWordFilterService badWordFilterService ;

    @Override
    public List<Comment> retrieveAllcommentsAffectToidPost(Long idPost) {
        return commentRepo.findAllByPost_IdPost(idPost);
    }

    @Override
    public Comment retrievecomment(Long idComment) {
        return commentRepo.findById(idComment).orElse(null);
    }

    @Override
    public Comment addCommentToPostAndUser(Comment comment, Long postId, Long userId) {
        Post post = postRepo.findById(postId).orElse(null);
        User user = userRepo.findById(userId).orElse(null);

        if (post != null && user != null) {
            if (badWordFilterService.containsBadWord(comment.getDescription())) {
                throw new IllegalArgumentException("Comment contain inappropriate content or contains a subject that should not be posted here. Please review your post before submitting.");
            }

            comment.setPost(post);
            comment.setUser(user);

            try {
                Comment savedComment = commentRepo.save(comment);
                post.getComments().add(savedComment);
                user.getComments().add(savedComment);

                // Publish CommentAddedEvent after saving the comment
                eventPublisher.publishEvent(new CommentAddedEvent(this, savedComment));

                // Send WebSocket notification to /topic/comments
                String destination = "/topic/comments";
                messagingTemplate.convertAndSend(destination, "New comment added to Post " + postId);

                return savedComment;
            } catch (Exception e) {
                // Handle the exception (log, throw custom exception, etc.)
                return null;
            }
        } else {
            return null;
        }
    }

    @Override
    public void removecomment(long idComment) {
        commentRepo.deleteById(idComment);
    }

    @Override
    public Comment modifycomment(long idComment, long idUser, long idPost, String commDetails) {
        Post post = postRepo.findById(idPost).orElse(null);
        User user = userRepo.findById(idUser).orElse(null);
        Comment c = commentRepo.findById(idComment).orElse(null);
        Set<Comment> myset = new HashSet<>();
        Set<Comment> myset2 = new HashSet<>();

        if (post != null && user != null && c != null) {
            c.setPost(post);
            myset = post.getComments();
            myset2 = user.getComments();

            c.setUser(user);
            c.setDescription(commDetails);

            try {
                commentRepo.save(c);
                myset.add(c);
                myset2.add(c);

                post.setComments(myset);
                user.setComments(myset2);

                postRepo.save(post);
                userRepo.save(user);

                return c;
            } catch (Exception e) {
                // Handle the exception (log, throw custom exception, etc.)
                return null;
            }
        } else {
            return null;
        }
    }
    }
