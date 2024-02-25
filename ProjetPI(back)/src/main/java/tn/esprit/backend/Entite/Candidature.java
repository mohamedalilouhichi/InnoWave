package tn.esprit.backend.Entite;

import jakarta.persistence.*;
import lombok.*;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDate;
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
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne
    @JoinColumn(name = "stage_id")
    private Stage stage;




}
