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
public class question {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long idQuestion;

    private String content;

    @Temporal(TemporalType.TIMESTAMP)
    private Date createdAt;

    private boolean isActive;



    private String answer;

    private String explanation;

   @ManyToOne
    private test test;

}
