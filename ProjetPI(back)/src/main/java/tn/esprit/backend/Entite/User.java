package tn.esprit.backend.Entite;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jdk.jshell.Snippet;
import lombok.*;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
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
    @OneToMany(mappedBy = "sender")
    @JsonIgnore
    private List<Message> sentMessages;

    @OneToMany(mappedBy = "receiver")
    @JsonIgnore
    private List<Message> receivedMessages;

    @OneToMany(cascade = CascadeType.ALL, mappedBy="user")
    private Set<Reclamation> Reclamations;

    @OneToMany(cascade = CascadeType.ALL, mappedBy="user")
    private Set<Documents> documents;

    @OneToMany(cascade = CascadeType.ALL)
    private Set<Feedback> Feedbacks;

    @ManyToMany(cascade = CascadeType.ALL)
    private Set<Test> tests;

    @OneToMany(cascade = CascadeType.ALL)
    private Set<Candidature> candidatures;

    @OneToMany(cascade = CascadeType.ALL)
    private Set<Competences> competences;

    @OneToMany(mappedBy = "user")
    private Set<Post> posts;

    @OneToMany(mappedBy = "user")
    private List<PostLike> postLikes = new ArrayList<>();

    @OneToMany(mappedBy = "user")
    private List<PostSave> postSaves = new ArrayList<>();

    @OneToMany(cascade = CascadeType.ALL, mappedBy="user")
    private Set<Comment> Comments;

}
