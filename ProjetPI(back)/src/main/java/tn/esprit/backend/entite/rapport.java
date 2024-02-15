package tn.esprit.backend.entite;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
@Setter
public class rapport {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long idRapport;
    private String content;

    @OneToOne(mappedBy="rapport")
    private stage stage;
}
