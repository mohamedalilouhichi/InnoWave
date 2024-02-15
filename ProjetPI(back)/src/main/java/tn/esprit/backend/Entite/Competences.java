package tn.esprit.backend.Entite;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
@Setter
public class Competences {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long idCompetences;
    private String name;
    private String description;
    private int importanceLevel;

}
