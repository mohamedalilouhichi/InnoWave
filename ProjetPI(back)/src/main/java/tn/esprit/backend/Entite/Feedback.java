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
    private String Name;
    private String Surname;
    private String email ;


    @Column(columnDefinition = "TEXT")
    private String acontent;

    @Temporal(TemporalType.TIMESTAMP)
    private Date dateSubmitted;
}

