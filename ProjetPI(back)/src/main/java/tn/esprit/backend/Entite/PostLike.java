
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
public class PostLike {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long idLike;



    @Temporal(TemporalType.TIMESTAMP)
    private Date dateAdd;

    private String statut;

    private String disc;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne
    @JoinColumn(name = "post_id")
    private Post post;


}

