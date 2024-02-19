
package tn.esprit.backend.Entite;

        import jakarta.persistence.*;
        import lombok.*;
        import java.util.Date;
        import java.util.Set;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
@Setter
public class PostLike {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long idLike;
    private boolean dislike;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne
    @JoinColumn(name = "post_id")
    private Post post;

}

