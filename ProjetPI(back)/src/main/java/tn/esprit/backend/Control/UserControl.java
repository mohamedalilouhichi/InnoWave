package tn.esprit.backend.Control;

import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.json.JSONException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.*;
import tn.esprit.backend.Dto.JwtResponse;
import tn.esprit.backend.Dto.LoginDto;
import tn.esprit.backend.Dto.RegisterDto;
import tn.esprit.backend.Entite.User;
import tn.esprit.backend.Repository.UserRepo;
import tn.esprit.backend.Service.User.AuthService;
import tn.esprit.backend.utils.JwtUtil;

import java.io.IOException;
import java.util.Optional;
import javax.validation.Valid;

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

    @PostMapping("/login")
    public ResponseEntity<?> createAuthenticationToken(@Valid @RequestBody LoginDto authenticationRequest, HttpServletResponse response) throws IOException, JSONException {
        try {

            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            authenticationRequest.getEmail(),
                            authenticationRequest.getPassword()
                    )
            );

        } catch (BadCredentialsException e) {
            throw new BadCredentialsException("Username or password incorrect" + e.getMessage());
        }

        Optional<User> user = userRepository.findByEmail(authenticationRequest.getEmail());

        if (user.isPresent()) {
            var jwtToken = jwtUtil.generateToken(user.get());

            response.addHeader("Access-Control-Expose-Headers", "Authorization");
            response.addHeader("Access-Control-Allow-Headers", "Authorization ,X-PINGOTHER ,Origin," +
                    "X-Requested-With,Content-Type,Accept,X-Custom-header");

            response.addHeader(HEADER_STRING, TOKEN_PREFIX + jwtToken);
            return ResponseEntity.ok(new JwtResponse(jwtToken,
                    user.get().getIdUser(),
                    user.get().getEmail(),
                    user.get().getRole()));
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
        }
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
}

