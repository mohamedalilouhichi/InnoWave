package tn.esprit.backend.Entite.jaxb;



import jakarta.xml.bind.annotation.*;
import java.util.List;

@XmlAccessorType(XmlAccessType.FIELD)
public class QuizQuestion {
    @XmlAttribute(name = "id")
    private int id;
    private String text;
    @XmlElementWrapper(name = "choices")
    @XmlElement(name = "choice")
    private List<Choice> choices;
    private String answer;

    // Getters et setters
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public List<Choice> getChoices() {
        return choices;
    }

    public void setChoices(List<Choice> choices) {
        this.choices = choices;
    }

    public String getAnswer() {
        return answer;
    }

    public void setAnswer(String answer) {
        this.answer = answer;
    }
}

