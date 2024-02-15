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
public class Test {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long idTest;

    private String name;

    private String description;

    @Temporal(TemporalType.TIMESTAMP)
    private Date createdAt;

    private int duration;

   @OneToMany(mappedBy = "test")
   private Set<Question> Questions;

    @ManyToOne
    Candidature candidature;

    private String status;
}
