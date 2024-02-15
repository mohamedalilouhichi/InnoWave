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
public class journal {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long idJournal;
    private String activities;
    private String challenges;
    private String skillsDeveloped;

   @OneToOne(mappedBy="journal")
    private stage stage;
}
