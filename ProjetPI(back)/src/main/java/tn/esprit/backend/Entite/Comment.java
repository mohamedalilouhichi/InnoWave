package tn.esprit.backend.Entite;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PastOrPresent;
import jakarta.validation.constraints.Size;
import lombok.*;

import java.util.Date;
import java.util.List;
import java.util.Set;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
@Setter
public class Comment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long idComment ;
        @Size(max = 255, message = "Description cannot exceed 255 characters")
        @NotBlank(message = "Description cannot be blank")
    private String description ;
         @PastOrPresent(message = "Comment date must be in the past or present")
         @NotNull(message = "Comment date cannot be null")
    private Date commdate;



    @JsonIgnore
    @ManyToOne
    private Post post;

    @JsonIgnore
    @ManyToOne
    private User user;



}

