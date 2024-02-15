package tn.esprit.backend.Entite;

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
public class Candidature {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long idCandidature;



    @Temporal(TemporalType.TIMESTAMP)
    private Date dateSoumission;

    private String statut;

    private String commentaires;

    @OneToMany(cascade = CascadeType.ALL, mappedBy="candidature")
    private Set<User> Users;

    @OneToMany(cascade = CascadeType.ALL, mappedBy="candidature")
    private Set<Stage> Stages;

    @OneToMany(cascade = CascadeType.ALL, mappedBy="candidature")
    private Set<Test> Tests;

    @OneToOne
    private Evaluation evaluation;
}
