package tn.esprit.backend.Service.Forum;

import tn.esprit.backend.Entite.PostLike;
import tn.esprit.backend.Entite.PostSave;

import java.util.List;

public interface IPostSaveService {
    List<PostSave> addSaveToPostAndUser(long idPost, long idUser);

}
