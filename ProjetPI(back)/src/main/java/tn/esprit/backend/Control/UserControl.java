package tn.esprit.backend.Control;

import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.web.bind.annotation.*;
import tn.esprit.backend.Dto.JwtResponse;
import tn.esprit.backend.Dto.LoginDto;
import tn.esprit.backend.Dto.RegisterDto;
import tn.esprit.backend.Entite.Reclamation;
import tn.esprit.backend.Entite.User;
import tn.esprit.backend.Repository.UserRepo;
import tn.esprit.backend.Service.User.AuthService;
import tn.esprit.backend.utils.JwtUtil;

import java.io.IOException;
import java.util.List;
import javax.validation.Valid;
@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequiredArgsConstructor
@RequestMapping("/user")
public class UserControl {

    private final AuthService authService;
    private final UserRepo userRepository;
    private final JwtUtil jwtUtil;
    private final AuthenticationManager authenticationManager;
    public static final String TOKEN_PREFIX = "Bearer ";
    public static final String HEADER_STRING = "Authorization";
    @Autowired
    private AuthService authenticationService;

    @GetMapping("/all")
    public List<User> getAllUsers() {
        return authenticationService.retrieveAllUsers();
    }
    @PutMapping("/update")
    public User updateUser(@RequestBody User u) {
        return authenticationService.updateUser(u);
    }

    @DeleteMapping("/delete/{id-user}")
    public boolean deleteById(@PathVariable("id-user") Long idUser) {
        return authenticationService.removeUser(idUser);
    }
    @PostMapping("/login")
    public ResponseEntity<?> createAuthenticationToken(@Valid @RequestBody LoginDto authenticationRequest, HttpServletResponse response) throws IOException {
        return authenticationService.authenticate(authenticationRequest, response);

    }


    @PostMapping("/admin/signup")
    public ResponseEntity<JwtResponse> adminSignUp(@RequestBody RegisterDto signUpRequest) {

        return ResponseEntity.ok(authService.adminRegister(signUpRequest));

    }

    @PostMapping("/student/signup")
    public ResponseEntity<JwtResponse> studentSignUp(@RequestBody RegisterDto signUpRequest) {
        return ResponseEntity.ok(authService.studentRegister(signUpRequest));
    }

    @PostMapping("/rh/signup")
    public ResponseEntity<JwtResponse> rhSignUp(@RequestBody RegisterDto signUpRequest) {
        return ResponseEntity.ok(authService.rhRegister(signUpRequest));
    }

    @PostMapping("/supervisor/signup")
    public ResponseEntity<JwtResponse> supervisorSignUp(@RequestBody RegisterDto signUpRequest) {
        return ResponseEntity.ok(authService.supervisorRegister(signUpRequest));
    }
    @GetMapping("/retrieve-userbymail/{mail}")
    public User getuser(@PathVariable ("mail") String mail) {
        return authService.retrieveUserbyemail(mail);
    }

}

