package tn.esprit.backend.Entite;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.Date;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
@Setter
public class Evaluation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long idEvaluation;
    @Temporal(TemporalType.TIMESTAMP)
    private LocalDateTime evaluationDate;

    private int rating;

    private String comments;

    private EvaluationStatus status;
    public enum EvaluationStatus {
        VERY_GOOD,
        GOOD,
        AVERAGE,
        BAD,
        REJECTED
    }

    @JsonIgnore
    @OneToOne(mappedBy="evaluation")
    private Stage stage;
}
