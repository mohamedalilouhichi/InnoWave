package tn.esprit.backend.entite;

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
public class stage {
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
    private Set<candidature> candidatures;


    @OneToOne
    private planning planning;



    @ManyToMany(mappedBy="stages", cascade = CascadeType.ALL)
    private Set<user> users;

    @ManyToOne
    candidature candidature;

    @ManyToOne
    entreprise entreprise;

    @OneToMany(cascade = CascadeType.ALL)
    private Set<competences> competences;

   @OneToOne
    private journal journal;

    @OneToOne
    private rapport rapport;

}
