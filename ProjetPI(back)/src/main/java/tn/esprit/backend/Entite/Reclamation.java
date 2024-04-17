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
    private boolean resolved;
    @Temporal(TemporalType.TIMESTAMP)
    private Date createdAt;
    private String subject;
    private String description;
    @ManyToOne
    private User user;


    @OneToOne(mappedBy = "reclamation")
    private Response response;
}
