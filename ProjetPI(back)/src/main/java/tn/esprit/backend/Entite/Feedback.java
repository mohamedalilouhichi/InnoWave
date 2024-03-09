package tn.esprit.backend.Entite;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.util.Date;
import java.util.Set;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
@Setter
public class Feedback {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long idFeedback;
    private String name;
    private String surname;
    private String email ;


    @Column(columnDefinition = "TEXT")
    private String acontent;

    @Temporal(TemporalType.TIMESTAMP)
    private Date dateSubmitted;

    private double moyrating;

    @JsonIgnore
    @OneToMany(cascade = CascadeType.ALL)
    private Set<Rating> ratings;
}

