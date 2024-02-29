package tn.esprit.backend.Entite.jaxb;



import jakarta.xml.bind.annotation.*;
import java.util.List;

@XmlAccessorType(XmlAccessType.FIELD)
public class Domain {
    @XmlAttribute(name = "name")
    private String name;
    @XmlElement(name = "question")
    private List<QuizQuestion> questions;

    // Getters et setters
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public List<QuizQuestion> getQuestions() {
        return questions;
    }

    public void setQuestions(List<QuizQuestion> questions) {
        this.questions = questions;
    }
}

