package tn.esprit.backend.Entite;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.util.Set;

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
    @JsonIgnore
    @OneToOne(mappedBy="planning")
    private Stage stage;



}
