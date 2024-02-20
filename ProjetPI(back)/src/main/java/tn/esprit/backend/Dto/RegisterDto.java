package tn.esprit.backend.Dto;

import lombok.Data;

@Data
public class RegisterDto {
    private String name;
    private String surname;
    private String username;
    private String email;
    private String password;
}
