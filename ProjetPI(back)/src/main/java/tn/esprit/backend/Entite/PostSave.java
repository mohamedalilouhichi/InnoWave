package tn.esprit.backend.Entite;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
@Setter
public class PostSave {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long idSave;
    private boolean disSave;
    private int  nbrSave=0  ;
    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "post_id")
    private Post post;

    public boolean getdisSave() {

        return disSave ;
    }
}
