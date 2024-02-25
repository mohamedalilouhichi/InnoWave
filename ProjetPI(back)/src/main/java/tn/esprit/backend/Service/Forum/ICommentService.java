package tn.esprit.backend.Service.Forum;

import tn.esprit.backend.Entite.Comment;

import java.util.List;

public interface ICommentService {
    public List<Comment> retrieveAllcommentsAffectToidPost(Long idPost);
    public Comment retrievecomment(Long idcomment);
    Comment addCommentToPostAndUser(Comment c, Long idPost, Long idUser);
     void removecomment(long idcomment);
     Comment modifycomment(long idComment , long idPost, long idUser, String commDetails );
}
