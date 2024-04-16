package tn.esprit.backend.Service.User;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import tn.esprit.backend.Entite.User;
import tn.esprit.backend.Repository.UserRepo;

import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class UserService implements IUserService {
UserRepo userRepo;

    public List<User> getAllUsers() {
        return userRepo.findAll();
    }
    public Long getUserIdByUsername(String username) {
        Optional<User> userOptional = userRepo.findByUsername(username);
        return userOptional.map(User::getIdUser).orElse(null);
    }

}
