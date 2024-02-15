package tn.esprit.backend.entite;

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
public class reclamation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long idReclamation;

    @ManyToOne
    user user;

    private String subject;
    private String description;

    @Temporal(TemporalType.TIMESTAMP)
    private Date createdAt;

    private boolean resolved;

    @OneToOne(mappedBy = "reclamation")
    private response response;
}
