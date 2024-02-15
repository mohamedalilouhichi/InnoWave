package tn.esprit.backend.entite;

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
public class candidature {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long idCandidature;



    @Temporal(TemporalType.TIMESTAMP)
    private Date dateSoumission;

    private String statut;

    private String commentaires;

    @OneToMany(cascade = CascadeType.ALL, mappedBy="candidature")
    private Set<user> users;

    @OneToMany(cascade = CascadeType.ALL, mappedBy="candidature")
    private Set<stage> stages;

    @OneToMany(cascade = CascadeType.ALL, mappedBy="candidature")
    private Set<test> tests;

    @OneToOne
    private evaluation evaluation;
}
