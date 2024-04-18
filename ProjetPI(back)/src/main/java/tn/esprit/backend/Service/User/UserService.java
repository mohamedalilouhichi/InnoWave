package tn.esprit.backend.Service.User;

import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tn.esprit.backend.Entite.User;
import tn.esprit.backend.Repository.UserRepo;

import java.util.List;

import tn.esprit.backend.Entite.Role;
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



    public List<User> getUsersByRole(Role role) {
        return userRepo.findByRole(role);
    }
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
