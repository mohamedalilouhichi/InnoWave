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
public class Rapport {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long idRapport;
    private String content;

    @OneToOne(mappedBy="rapport")
    private Stage stage;
}
