package tn.esprit.backend.Service.User;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import tn.esprit.backend.Entite.User;
import tn.esprit.backend.Repository.UserRepo;

import java.util.List;

@Service
@AllArgsConstructor
public class UserService implements IUserService {
    UserRepo userRepo;
    @Override
    public List<User> retrieveAllUsers() {
        return userRepo.findAll() ;
    }

    @Override
    public User addUser(User user) {
        return userRepo.save(user);
    }

    @Override
    public User updateUser(User user) {
        return userRepo.save(user);
    }

    @Override
    public User retrieveUserById(Long idUser) {
        return userRepo.findById(idUser).orElse(null);
    }

    @Override
    public void removeUser(Long idUser) {
        userRepo.deleteById(idUser);
    }
}
