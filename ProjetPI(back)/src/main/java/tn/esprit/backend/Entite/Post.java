package tn.esprit.backend.Entite;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.util.Set;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
@Setter
public class Post {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long idPost;
    private String description;
    private boolean liked;
    private String pictures;
    private String title;
    private LocalDate creationdate;



    @OneToMany(mappedBy="post", cascade = CascadeType.ALL)
    private Set<PostLike> postLikes;

    @OneToMany(cascade = CascadeType.ALL, mappedBy= "post")
    private Set<Comment> Comments;

}
