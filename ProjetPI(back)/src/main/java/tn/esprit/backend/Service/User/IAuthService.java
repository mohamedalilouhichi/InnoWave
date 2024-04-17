package tn.esprit.backend.Service.User;

import tn.esprit.backend.Entite.Reclamation;
import tn.esprit.backend.Entite.User;

import java.util.List;

public interface IAuthService {

    List<User> retrieveAllUsers();

    User updateUser(User u);

    boolean removeUser (Long idUser);
}
