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
public class Message {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long idMessage;

    @ManyToOne
    User user;

    private String content;

    @Temporal(TemporalType.TIMESTAMP)
    private Date sentAt;

}
