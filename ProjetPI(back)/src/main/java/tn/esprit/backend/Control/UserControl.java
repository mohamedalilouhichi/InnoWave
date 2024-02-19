package tn.esprit.backend.Control;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;
import tn.esprit.backend.Entite.User;
import tn.esprit.backend.Service.User.IUserService;

import java.util.List;

@RestController
@AllArgsConstructor
//@RequestMapping("/user")
public class UserControl {
    IUserService userService;

    @GetMapping("/retrieveAllUsers")
    public List<User> retrieveAllEtudiants(){
        return userService.retrieveAllUsers();
    }

    @PostMapping("/addUser")
    public User addUser(@RequestBody User user){
        return userService.addUser(user);
    }

    @PostMapping("/updateUser")
    public User updateUser(@RequestBody User user){
        return userService.updateUser(user);
    }

    @GetMapping("/retrieveUser/{idUser}")
    public User retrieveUser(@PathVariable Long idUser){
        return userService.retrieveUserById(idUser);
    }

    @DeleteMapping("removeUser/{idUser}")
    public void removeUser(@PathVariable Long idUser){
        userService.removeUser(idUser);
    }
}
