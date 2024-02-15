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
public class Journal {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long idJournal;
    private String activities;
    private String challenges;
    private String skillsDeveloped;

   @OneToOne(mappedBy="journal")
    private Stage stage;
}
