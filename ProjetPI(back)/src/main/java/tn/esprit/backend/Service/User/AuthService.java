package tn.esprit.backend.Service.User;

import jakarta.servlet.http.HttpServletResponse;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import tn.esprit.backend.Dto.JwtResponse;
import tn.esprit.backend.Dto.LoginDto;
import tn.esprit.backend.Dto.RegisterDto;
import tn.esprit.backend.Entite.Reclamation;
import tn.esprit.backend.Entite.User;
import tn.esprit.backend.Repository.UserRepo;
import tn.esprit.backend.enumeration.Role;
import tn.esprit.backend.utils.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.stereotype.Service;

import jakarta.servlet.http.HttpServletResponse;

import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class AuthService implements IAuthService {

    private final UserRepo userRepo;
    private final PasswordEncoder encoder;
    private final JwtUtil jwtUtil;
    UserRepo userRepohh;
    private static final String key = "aziz";
    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserRepo userRepository;
    @Override
    public List<User> retrieveAllUsers() {
        return userRepository.findAll();
    }

    @Override
    public User updateUser(User u) {
        return userRepo.saveAndFlush(u);
    }
    @Override
    public boolean removeUser(Long idUser) {
        if (idUser == null)
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "idIsNull");
        boolean exist = userRepo.existsById(idUser);
        if (exist) {
            userRepo.deleteById(idUser);
            return true;
        }
        throw new ResponseStatusException(HttpStatus.NOT_FOUND, "UserNotFound");
    }

    public JwtResponse adminRegister(RegisterDto signUpRequest) {

        var user = User.builder().email(signUpRequest.getEmail()).password(encoder.encode(signUpRequest.getPassword())).name(signUpRequest.getName()).role(Role.ADMIN).username(signUpRequest.getUsername()).build();
        userRepo.save(user);
        var jwtToken = jwtUtil.generateToken(user);

        return JwtResponse.builder().token(jwtToken).build();
    }
    public JwtResponse studentRegister(RegisterDto signUpRequest) {

        var user = User.builder().email(signUpRequest.getEmail()).password(encoder.encode(signUpRequest.getPassword())).name(signUpRequest.getName()).role(Role.STUDENT).username(signUpRequest.getUsername()).build();
        userRepo.save(user);
        var jwtToken = jwtUtil.generateToken(user);

        return JwtResponse.builder().token(jwtToken).build();
    }
    public JwtResponse rhRegister(RegisterDto signUpRequest) {

        var user = User.builder().email(signUpRequest.getEmail()).password(encoder.encode(signUpRequest.getPassword())).name(signUpRequest.getName()).role(Role.RH).username(signUpRequest.getUsername()).build();
        userRepo.save(user);
        var jwtToken = jwtUtil.generateToken(user);

        return JwtResponse.builder().token(jwtToken).build();
    }
    public JwtResponse supervisorRegister(RegisterDto signUpRequest) {

        var user = User.builder().email(signUpRequest.getEmail()).password(encoder.encode(signUpRequest.getPassword())).name(signUpRequest.getName()).role(Role.SUPERVISOR).username(signUpRequest.getUsername()).build();
        userRepo.save(user);
        var jwtToken = jwtUtil.generateToken(user);

        return JwtResponse.builder().token(jwtToken).build();
    }

    public ResponseEntity<?> authenticate(LoginDto authenticationRequest, HttpServletResponse response) {
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
            String jwtToken = jwtUtil.generateToken(user.get());

            response.setHeader("Access-Control-Expose-Headers", "Authorization");
            response.setHeader("Access-Control-Allow-Headers", "Authorization ,X-PINGOTHER ,Origin," +
                    "X-Requested-With,Content-Type,Accept,X-Custom-header");

            response.setHeader("Authorization", jwtToken);
            return ResponseEntity.ok(new JwtResponse(jwtToken,
                    user.get().getIdUser(),
                    user.get().getEmail(),
                    user.get().getRole()));
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
        }
    }

    // encript the password
    public static String encrypt(String text) {
        StringBuilder encrypted = new StringBuilder();
        int keyIndex = 0;

        for (int i = 0; i < text.length(); i++) {
            char currentChar = text.charAt(i);
            char keyChar = key.charAt(keyIndex);
            int shift = keyChar - 'a';

            if (Character.isUpperCase(currentChar)) {
                char encryptedChar = (char) ('A' + (currentChar - 'A' + shift) % 26);
                encrypted.append(encryptedChar);
            } else if (Character.isLowerCase(currentChar)) {
                char encryptedChar = (char) ('a' + (currentChar - 'a' + shift) % 26);
                encrypted.append(encryptedChar);
            } else {
                // If it's not a letter, just append it as is
                encrypted.append(currentChar);
                continue;
            }

            // Move to the next character in the key
            keyIndex = (keyIndex + 1) % key.length();
        }

        return encrypted.toString();
    }
    //decrypt the password
    public static String decrypt(String encryptedText) {
        StringBuilder decrypted = new StringBuilder();
        int keyIndex = 0;

        for (int i = 0; i < encryptedText.length(); i++) {
            char currentChar = encryptedText.charAt(i);
            char keyChar = key.charAt(keyIndex);
            int shift = keyChar - 'a';

            if (Character.isUpperCase(currentChar)) {
                char decryptedChar = (char) ('A' + (currentChar - 'A' - shift + 26) % 26);
                decrypted.append(decryptedChar);
            } else if (Character.isLowerCase(currentChar)) {
                char decryptedChar = (char) ('a' + (currentChar - 'a' - shift + 26) % 26);
                decrypted.append(decryptedChar);
            } else {
                // If it's not a letter, just append it as is
                decrypted.append(currentChar);
                continue;
            }

            // Move to the next character in the key
            keyIndex = (keyIndex + 1) % key.length();
        }

        return decrypted.toString();
    }

    public User retrieveUserbyemail(String email) {
        return userRepo.getUserByEmail(email);
    }
}
