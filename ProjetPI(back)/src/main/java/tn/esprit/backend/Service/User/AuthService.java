package tn.esprit.backend.Service.User;

import lombok.AllArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import tn.esprit.backend.Dto.JwtResponse;
import tn.esprit.backend.Dto.RegisterDto;
import tn.esprit.backend.Entite.User;
import tn.esprit.backend.Repository.UserRepo;
import tn.esprit.backend.enumeration.Role;
import tn.esprit.backend.utils.JwtUtil;

@Service
@AllArgsConstructor
public class AuthService implements IAuthService {

    private final UserRepo userRepo;
    private final PasswordEncoder encoder;
    private final JwtUtil jwtUtil;


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

}
