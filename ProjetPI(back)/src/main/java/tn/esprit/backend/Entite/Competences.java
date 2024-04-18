package tn.esprit.backend.Entite;

import jakarta.persistence.*;
import lombok.*;

import java.util.Date;

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

    // New attributes
    private int proficiencyLevel; // Numeric scale (1-10) or predefined levels
    private int yearsOfExperience; // Number of years
    private boolean certification; // True if certified
    private Date lastUsed; // Date when last used
    private String industryRelevance; // Industry or sector relevance
}
