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
public class feedback {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long idFeedback;

    @ManyToOne
    user user;

    @ManyToOne
    entreprise entreprise;

    @Column(columnDefinition = "TEXT")
    private String acontent;

    private int rating;

    @Temporal(TemporalType.TIMESTAMP)
    private Date dateSubmitted;
}

