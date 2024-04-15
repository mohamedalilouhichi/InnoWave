package tn.esprit.backend.Entite;



import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
@Setter
public class FavorisPlan {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long idFavoris;
    private long idUser;
    private long idPlanning;
}
