package tn.esprit.backend.Service.Forum;

import tn.esprit.backend.Entite.Comment;

import java.util.List;

public interface ICommentService {
    public List<Comment> retrieveAllcommentsAffectToidPost(Long idPost);
    public Comment retrievecomment(Long idcomment);
    Comment addCommentToPostAndUser(Comment c, Long idPost, Long idUser);
    public void removecomment(Long idcomment);
    public Comment modifycomment(Comment c );
}
