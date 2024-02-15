package tn.esprit.backend.entite;
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
public class subject {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long idSubject;
    private String description;
    private boolean likes;
    private String pictures;
    private String title;
    private LocalDate creationdate;

    @ManyToMany(mappedBy="subjects", cascade = CascadeType.ALL)
    private Set<user> users;

    @OneToMany(cascade = CascadeType.ALL, mappedBy="subject")
    private Set<comment> comments;

}
