package tn.esprit.backend.Service.User;

import tn.esprit.backend.Entite.User;

import java.util.List;

public interface IUserService {
    List<User> retrieveAllUsers();

    User addUser(User user);

    User updateUser(User user);

    User retrieveUserById(Long idUser) ;

    void removeUser(Long idUser);
}
