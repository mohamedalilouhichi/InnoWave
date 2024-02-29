package tn.esprit.backend.Entite.jaxb;



import jakarta.xml.bind.annotation.*;
import java.util.List;

@XmlRootElement(name = "quiz")
@XmlAccessorType(XmlAccessType.FIELD)
public class Quiz {
    @XmlElement(name = "domain")
    private List<Domain> domains;

    // Getters et setters
    public List<Domain> getDomains() {
        return domains;
    }

    public void setDomains(List<Domain> domains) {
        this.domains = domains;
    }
}

