package tn.esprit.backend.Entite;

import jakarta.persistence.*;
import lombok.*;

import java.util.Set;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
@Setter
public class User {
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
    private Role role;

    @OneToMany(cascade = CascadeType.ALL, mappedBy="user")
    private Set<Message> Messages;

    @OneToMany(cascade = CascadeType.ALL, mappedBy="user")
    private Set<Reclamation> Reclamations;

    @OneToMany(cascade = CascadeType.ALL, mappedBy="user")
    private Set<Documents> documents;

    @OneToMany(cascade = CascadeType.ALL, mappedBy="user")
    private Set<Feedback> Feedbacks;

    @OneToMany(mappedBy="user", cascade = CascadeType.ALL)
    private Set<Candidature> candidatures;

    @OneToMany(mappedBy="user", cascade = CascadeType.ALL)
    private Set<PostLike> postLikes;

    @OneToMany(cascade = CascadeType.ALL)
    private Set<Competences> competences;

    @ManyToMany(cascade = CascadeType.ALL)
    private Set<Post> posts;
}
