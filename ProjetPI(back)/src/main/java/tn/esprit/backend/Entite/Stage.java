package tn.esprit.backend.Entite;

import com.fasterxml.jackson.annotation.JsonIgnore;
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

    @JsonIgnore
    @OneToOne
    private Planning planning;


    @JsonIgnore
    @OneToMany(cascade = CascadeType.ALL)
    private Set<Candidature> candidatures;
    @JsonIgnore
    @ManyToOne
    Entreprise entreprise;
    @JsonIgnore
    @OneToMany(cascade = CascadeType.ALL)
    private Set<Competences> competences;
    @JsonIgnore
   @OneToOne
    private Journal journal;
    @JsonIgnore
    @OneToOne
    private Rapport rapport;
    @OneToOne
    private Evaluation evaluation;

}
