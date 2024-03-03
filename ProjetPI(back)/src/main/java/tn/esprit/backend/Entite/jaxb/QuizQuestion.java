package tn.esprit.backend.Entite.jaxb;

import jakarta.xml.bind.annotation.*;
import lombok.Data;

import java.util.List;
@Data
@XmlAccessorType(XmlAccessType.FIELD)
public class QuizQuestion {
    @XmlAttribute(name = "id")
    private int id;

    @XmlElement(name = "text")
    private String text;

    @XmlElementWrapper(name = "choices")
    @XmlElement(name = "choice")
    private List<Choice> choices;

    @XmlElement(name = "answer")
    private String answer;

    // Getters and setters omitted for brevity
}
