package tn.esprit.backend.Service.Forum;

import tn.esprit.backend.Entite.Comment;

import java.util.List;

public interface ICommentService {
    public List<Comment> retrieveAllcomments();
    public Comment retrievecomment(Long idcomment);
    public Comment addcommentAffToPost(Comment c , Long idPost) ;
    public void removecomment(Long idcomment);
    public Comment modifycomment(Comment c );
}
