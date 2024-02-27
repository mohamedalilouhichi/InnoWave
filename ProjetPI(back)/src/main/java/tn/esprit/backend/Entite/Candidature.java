package tn.esprit.backend.Entite;

import com.fasterxml.jackson.annotation.JsonIgnore;
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


    @JsonIgnore
    @ManyToOne
    @JoinColumn( referencedColumnName = "idUser")
    private User user;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(referencedColumnName = "idStage")
    private Stage stage;




}
