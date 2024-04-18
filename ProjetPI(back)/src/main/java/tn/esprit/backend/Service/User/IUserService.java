package tn.esprit.backend.Service.User;

import tn.esprit.backend.Entite.Role;
import tn.esprit.backend.Entite.User;

import java.util.List;

public interface IUserService {
    public User getUserById(Long id);
    public List<User> getUsersByRole(Role role);
    List<User> findAllUsersWithCompetences();
}
