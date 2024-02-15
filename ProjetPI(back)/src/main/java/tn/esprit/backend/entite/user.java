package tn.esprit.backend.entite;

import jakarta.persistence.*;
import lombok.*;
import org.aspectj.bridge.Message;

import java.util.List;
import java.util.Set;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
@Setter
public class user {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long idUser;
    private String name;
    private String surname;
    private String username;
    private String email;
    private String password;
    private String confirmPassword;


    @Enumerated(EnumType.STRING)
    private role role;

    @OneToMany(cascade = CascadeType.ALL, mappedBy="user")
    private Set<message> messages;

    @OneToMany(cascade = CascadeType.ALL, mappedBy="user")
    private Set<reclamation> reclamations;

    @ManyToOne
    candidature candidature;

    @OneToMany(cascade = CascadeType.ALL, mappedBy="user")
    private Set<documents> documents;

    @OneToMany(cascade = CascadeType.ALL, mappedBy="user")
    private Set<feedback> feedbacks;

    @ManyToMany(cascade = CascadeType.ALL)
    private Set<stage> stages;

    @OneToMany(cascade = CascadeType.ALL)
    private Set<competences> competences;

    @ManyToMany(cascade = CascadeType.ALL)
    private Set<subject> subjects;
}
