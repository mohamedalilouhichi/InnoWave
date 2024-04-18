package tn.esprit.backend.Control;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tn.esprit.backend.Entite.User;
import tn.esprit.backend.Service.User.UserService;

import java.util.Optional;
import tn.esprit.backend.Entite.Role;
import tn.esprit.backend.Entite.User;
import tn.esprit.backend.Service.User.UserService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;
import tn.esprit.backend.Entite.User;
import tn.esprit.backend.Service.User.IUserService;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/user")
public class UserControl {
    @Autowired
    UserService UserService;
    @GetMapping("/{username}")
    public ResponseEntity<Long> getUserIdByUsername(@PathVariable String username) {
        Long userId = UserService.getUserIdByUsername(username);
        if (userId != null) {
            return ResponseEntity.ok(userId);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    @GetMapping("/all")
    public ResponseEntity<Iterable<User>> getAllUsers() {
        return ResponseEntity.ok(UserService.getAllUsers());
    }


    @GetMapping("/by-role")
    public ResponseEntity<List<User>> getUsersByRole(@RequestParam Role role) {
        List<User> users = UserService.getUsersByRole(role);
        return ResponseEntity.ok(users);
    }

    @GetMapping("/retrieveAllUsers")
    public List<User> retrieveAllEtudiants(){
        return UserService.retrieveAllUsers();
    }

    @PostMapping("/addUser")
    public User addUser(@RequestBody User user){
        return UserService.addUser(user);
    }

    @PostMapping("/updateUser")
    public User updateUser(@RequestBody User user){
        return UserService.updateUser(user);
    }

    @GetMapping("/retrieveUser/{idUser}")
    public User retrieveUser(@PathVariable Long idUser){
        return UserService.retrieveUserById(idUser);
    }

    @DeleteMapping("removeUser/{idUser}")
    public void removeUser(@PathVariable Long idUser){
        UserService.removeUser(idUser);
    }
}

