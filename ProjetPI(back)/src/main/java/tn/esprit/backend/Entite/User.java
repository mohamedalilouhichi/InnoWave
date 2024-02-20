package tn.esprit.backend.Entite;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import tn.esprit.backend.enumeration.Role;

import java.util.Collection;
import java.util.List;
import java.util.Set;

@Entity
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class User implements UserDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long idUser;

    private String name;
    private String surname;
    private String username;
    private String email;
    private String password;
    @Enumerated(EnumType.STRING)
    private Role role;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "user")
    private Set<Message> messages;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "user")
    private Set<Reclamation> reclamations;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "user")
    private Set<Documents> documents;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "user")
    private Set<Feedback> feedbacks;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private Set<Candidature> candidatures;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private Set<PostLike> postLikes;

    @OneToMany(cascade = CascadeType.ALL)
    private Set<Competences> competences;

    @ManyToMany(cascade = CascadeType.ALL)
    private Set<Post> posts;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority(role.toString()));
    }

    @Override
    public String getUsername() {
        return this.username;
    }

    @Override
    public String getPassword() {
        return this.password;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true; // Implement as needed
    }

    @Override
    public boolean isAccountNonLocked() {
        return true; // Implement as needed
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true; // Implement as needed
    }

    @Override
    public boolean isEnabled() {
        return true; // Implement as needed
    }
}