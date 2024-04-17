package tn.esprit.backend.Service.Forum;
import tn.esprit.backend.Entite.Post;
import tn.esprit.backend.Entite.PostLike;

import java.util.List;


public interface IPostLikeService {

    List<PostLike> addLikeToPostAndUser(long idPost, long idUser);



}
