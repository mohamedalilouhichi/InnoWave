package tn.esprit.backend.Entite;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;
import java.util.Date;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class Message {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long idMessage;

    @ManyToOne
    User user;

    private long sender;

    private long receiver;


    private String content;

    @Temporal(TemporalType.TIMESTAMP)
    private Date date;

    @Temporal(TemporalType.TIMESTAMP)
    private Date readDate;






}
