package tn.esprit.backend.Entite;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.sql.Date;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
@Setter
public class Planning {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long idPlanning;

    private String title;
    private String niveau;
    private String description;
    private Date dateDebut;
    private Date dateFin;

    @JsonIgnore
    @OneToOne(mappedBy="planning")
    private Stage stage;



}
