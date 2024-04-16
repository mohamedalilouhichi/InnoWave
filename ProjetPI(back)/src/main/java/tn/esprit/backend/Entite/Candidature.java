package tn.esprit.backend.Entite;

import jakarta.persistence.*;
import lombok.*;
import java.util.Date;
import java.util.Set;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
@Setter
public class Candidature {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long idCandidature;
    private String Name ;
    private String Surname ;
    private String Level;
    @Lob
    @Column(columnDefinition = "BLOB")
    private byte[] CV ;
    private Date dateSoumission;
    private String statut;



    @ManyToOne
    @JoinColumn(name = "idUser")
    private User user;

    @ManyToOne
    @JoinColumn(name = "idStage")
    private Stage stage;




}
