package tn.esprit.backend.Service.Forum;

import org.springframework.context.ApplicationEvent;
import tn.esprit.backend.Entite.Comment;

public class CommentAddedEvent extends ApplicationEvent {
    private final Comment comment;

    public CommentAddedEvent(Object source, Comment comment) {
        super(source);
        this.comment = comment;
    }

    public Comment getComment() {
        return comment;
    }
}
