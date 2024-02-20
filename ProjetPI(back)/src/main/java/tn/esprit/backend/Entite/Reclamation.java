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
public class Reclamation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long idReclamation;

    @ManyToOne
    private User user;

    private String subject;
    private String description;

    @Temporal(TemporalType.TIMESTAMP)
    private Date createdAt;

    private boolean resolved;

    @OneToOne(mappedBy = "reclamation")
    private Response response;
}
