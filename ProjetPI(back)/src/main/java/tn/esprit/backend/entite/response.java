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
public class response {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long idResponse;
    private String content;
    @Temporal(TemporalType.TIMESTAMP)
    private Date createdAt;

    @Temporal(TemporalType.TIMESTAMP)
    private Date updatedAt;

    private boolean isRead;
    private boolean isArchived;



    @OneToOne
    private reclamation reclamation;


}
