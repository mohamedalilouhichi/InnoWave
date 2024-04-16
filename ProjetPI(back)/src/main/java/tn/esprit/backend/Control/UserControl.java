package tn.esprit.backend.Control;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tn.esprit.backend.Entite.User;
import tn.esprit.backend.Service.User.UserService;

import java.util.Optional;

@RestController
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

}
