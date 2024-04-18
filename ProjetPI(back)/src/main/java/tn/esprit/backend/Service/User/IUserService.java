package tn.esprit.backend.Service.User;

import tn.esprit.backend.Entite.User;

import java.util.List;

public interface IUserService {

    Long getUserIdByUsername(String username);

    List<User> getAllUsers();
    List<User> retrieveAllUsers();

    User addUser(User user);

    User updateUser(User user);

    User retrieveUserById(Long idUser) ;

    void removeUser(Long idUser);
}
