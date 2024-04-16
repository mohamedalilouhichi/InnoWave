package tn.esprit.backend.Service.User;

import tn.esprit.backend.Entite.User;

import java.util.List;

public interface IUserService {

    Long getUserIdByUsername(String username);

    List<User> getAllUsers();
}
