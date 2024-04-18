package tn.esprit.backend.Service.User;

import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tn.esprit.backend.Entite.Role;
import tn.esprit.backend.Entite.User;
import tn.esprit.backend.Repository.UserRepo;

import java.util.List;

@Service
@AllArgsConstructor
public class UserService implements IUserService {

    @Autowired
    private UserRepo userRepo;

    public User getUserById(Long id) {
        return userRepo.findByIdUser(id);
    }

    public List<User> getUsersByRole(Role role) {
        return userRepo.findByRole(role);
    }
//////////////////
public List<User> findAllUsersWithCompetences() {
    return userRepo.findAllUsersWithCompetences();
}

}
