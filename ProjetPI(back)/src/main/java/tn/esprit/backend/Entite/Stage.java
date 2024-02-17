package tn.esprit.backend.Entite;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.util.Set;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
@Setter
public class Stage {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long idStage;

    private String title;
    private String description;
    private String domain;
    private String duration;
    private LocalDate startDate;
    private LocalDate endDate;
    private int numberOfPositions;



    @OneToOne
    private Planning planning;



    @OneToMany(cascade = CascadeType.ALL)
    private Set<Candidature> candidatures;

    @ManyToOne
    Entreprise entreprise;

    @OneToMany(cascade = CascadeType.ALL)
    private Set<Competences> competences;

   @OneToOne
    private Journal journal;

    @OneToOne
    private Rapport rapport;

    @OneToOne
    private Evaluation evaluation;

}
