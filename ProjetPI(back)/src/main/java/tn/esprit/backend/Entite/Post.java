package tn.esprit.backend.Entite;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.*;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;

@Entity
@Data
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

    @Pattern(regexp = "^(http|https)://[a-zA-Z0-9]+(.+[a-zA-Z]{2,})?$", message = "Invalid URL format for pictures")
    private String  pictures;

    @NotNull(message = "Creation date cannot be null")
    private LocalDate creationdate;
    private  boolean  mostlikedpost ;
    private  boolean newstpost ;

    @OneToMany(mappedBy = "post")
    private Set<PostLike> likes = new HashSet<>();

    @OneToMany(cascade = CascadeType.ALL, mappedBy= "post")
    private Set<Comment> Comments;

}
