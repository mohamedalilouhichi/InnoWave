package tn.esprit.backend.entite;

import jakarta.persistence.*;
import lombok.*;

import java.util.Set;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
@Setter
public class entreprise {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long idEntreprise;

    private String name;
    private String description;
    private String location;
    private String email;
    private String phoneNumber;


    @OneToMany(cascade = CascadeType.ALL, mappedBy="entreprise")
    private Set<feedback> feedbacks;

@OneToMany(cascade = CascadeType.ALL, mappedBy="entreprise")
private Set<stage> stages;




}
