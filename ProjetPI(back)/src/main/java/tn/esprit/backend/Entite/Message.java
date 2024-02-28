package tn.esprit.backend.Entite;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class Message {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long idMessage;

    @ManyToOne
    private User sender;

    @ManyToOne
    private User receiver;




    private String content;

    @ElementCollection
    private List<String> reactions = new ArrayList<>();

    @Temporal(TemporalType.TIMESTAMP)
    private Date date;

    @Temporal(TemporalType.TIMESTAMP)
    private Date readDate;
    @Lob
    private byte [] file;

    public void setFileData(byte[] fileData) {
        this.file = fileData;
    }

    public byte[] getFileData() {
        return file;
    }


}
