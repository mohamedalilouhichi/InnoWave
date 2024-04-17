package tn.esprit.backend.Entite;

import jakarta.persistence.*;
import lombok.*;


import java.io.File;
import java.util.Date;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
@Setter
public class Documents {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long idDocuments;

    @ManyToOne
    User user;

    private String category;
    private String description;
    private String rapportFile;
    private String cvFile;

    @Temporal(TemporalType.TIMESTAMP)
    private Date uploadDate;

}