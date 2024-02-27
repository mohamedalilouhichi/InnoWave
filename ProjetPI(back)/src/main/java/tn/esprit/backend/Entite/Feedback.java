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
public class Feedback {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long idFeedback;
    private String name;
    private String surname;
    private String email ;


    @Column(columnDefinition = "TEXT")
    private String acontent;

    @Temporal(TemporalType.TIMESTAMP)
    private Date dateSubmitted;
}

