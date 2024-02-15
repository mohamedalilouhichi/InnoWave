package tn.esprit.backend.entite;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
@Setter
public class comment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long idComment;
    private String content;
    private String date;
    private boolean likes;

    @ManyToOne
    subject subject;
}

