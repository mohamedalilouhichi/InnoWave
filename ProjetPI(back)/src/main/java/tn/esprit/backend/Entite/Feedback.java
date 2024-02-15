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

    @ManyToOne
    User user;

    @ManyToOne
    Entreprise entreprise;

    @Column(columnDefinition = "TEXT")
    private String acontent;

    private int rating;

    @Temporal(TemporalType.TIMESTAMP)
    private Date dateSubmitted;
}

