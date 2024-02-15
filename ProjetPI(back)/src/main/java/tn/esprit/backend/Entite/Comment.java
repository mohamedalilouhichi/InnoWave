package tn.esprit.backend.Entite;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
@Setter
public class Comment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long idComment;
    private String content;
    private String date;
    private boolean likes;

    @ManyToOne
    Post post;
}

