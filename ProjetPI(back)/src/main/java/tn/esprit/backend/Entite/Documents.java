package tn.esprit.backend.Entite;

import jakarta.persistence.*;
import lombok.*;


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
    private String title;
    private String description;

    @Temporal(TemporalType.TIMESTAMP)
    private Date uploadDate;

    @Temporal(TemporalType.TIMESTAMP)
    private Date startDate;

    @Temporal(TemporalType.TIMESTAMP)
    private Date endDate;

    private String filePath;
    private boolean expired;
}
