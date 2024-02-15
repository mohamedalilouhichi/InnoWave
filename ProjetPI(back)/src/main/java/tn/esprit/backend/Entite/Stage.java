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
    private int duration;
    private LocalDate startDate;
    private LocalDate endDate;


    @ManyToMany
    private Set<Candidature> Candidatures;


    @OneToOne
    private Planning planning;



    @ManyToMany(mappedBy="stages", cascade = CascadeType.ALL)
    private Set<User> Users;

    @ManyToOne
    Candidature candidature;

    @ManyToOne
    Entreprise entreprise;

    @OneToMany(cascade = CascadeType.ALL)
    private Set<Competences> competences;

   @OneToOne
    private Journal journal;

    @OneToOne
    private Rapport rapport;

}
