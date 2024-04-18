package tn.esprit.backend.Entite;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Table
@Builder
public class FeedBackRating {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int idRating ;
    private int idUser;
    private int idFeedback;
    private String status;
    private int moyrating;

    private int rate;

}