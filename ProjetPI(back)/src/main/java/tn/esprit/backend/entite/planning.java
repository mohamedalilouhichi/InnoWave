package tn.esprit.backend.entite;

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
public class planning {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long idPlanning;

    private String planDescription;
    private boolean isInternshipRequired;
    private int durationInMonths;
    private boolean isCompleted;

}
