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
public class message {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long idMessage;

    @ManyToOne
    user user;

    private String content;

    @Temporal(TemporalType.TIMESTAMP)
    private Date sentAt;

}
