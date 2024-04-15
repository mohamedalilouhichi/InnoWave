package tn.esprit.backend.Entite;

import jakarta.persistence.Table;
import lombok.*;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Table
@Builder
public class Comments {
    private int level;
    private Comment comment;
    private List<Comments> list;
    private boolean replying;
}
