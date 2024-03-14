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
public class Rating {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int idRating ;
    private int idUser;
    private int idPost;
    private String status;
    private int moyrating;

}