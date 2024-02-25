package tn.esprit.backend.Entite;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.*;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name="posts")
public class Post {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long idPost;
             @NotBlank(message = "Title cannot be blank")
             @Size(max = 100, message = "Title cannot exceed 100 characters")
    private String title;

             @NotBlank(message = "Description cannot be blank")
             @Size(max = 500, message = "Description cannot exceed 500 characters")
    private String description;

    private int  nbrlike  ;
    private int  nbrsave  ;
    private boolean saved ;
    @Lob
    @Column(columnDefinition = "BLOB")
    private byte[] file;

              @NotNull(message = "Creation date cannot be null")
    private LocalDate creationdate;
    private  boolean  mostlikedpost ;
    private  boolean newstpost ;

    @OneToMany(mappedBy = "post")
    private List<PostLike> postLikes = new ArrayList<>();

    @OneToMany(cascade = CascadeType.ALL, mappedBy= "post")
    private Set<Comment> Comments;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "user_id", referencedColumnName = "idUser")
    private User user;
}
