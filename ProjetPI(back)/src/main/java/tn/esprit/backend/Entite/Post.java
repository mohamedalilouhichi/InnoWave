package tn.esprit.backend.Entite;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.*;
import java.time.LocalDate;
import java.util.List;
import java.util.Set;

import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;


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
    private double moyrating;

    @Lob
    @Column(columnDefinition = "LONGBLOB")
    private byte[] file;

    @NotNull(message = "Creation date cannot be null")
    private LocalDate creationdate;
    //----  Cloudinary image ----
    private String imageUrl;
    private String imageIdCloudinary;
    private int imageId;

    @OneToMany(mappedBy = "post", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<PostLike> postLikes;

    @OneToMany(mappedBy = "post", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<PostSave> postSaves;

    @OneToMany(cascade = CascadeType.ALL, mappedBy= "post")
    private Set<Comment> Comments;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "user_id", referencedColumnName = "idUser")
    private User user;

    @OneToMany(cascade = CascadeType.ALL)
    private Set<Rating> ratings;
    @OneToMany(cascade = CascadeType.ALL)
    private Set<Image> images;

}
