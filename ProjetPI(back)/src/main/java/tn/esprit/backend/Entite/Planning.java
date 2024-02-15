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
public class Planning {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long idPlanning;

    private String planDescription;
    private boolean isInternshipRequired;
    private int durationInMonths;
    private boolean isCompleted;

}
