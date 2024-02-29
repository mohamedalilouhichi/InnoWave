package tn.esprit.backend.Service.Quiz;

import jakarta.xml.bind.JAXBContext;
import jakarta.xml.bind.JAXBException;
import jakarta.xml.bind.Marshaller;
import jakarta.xml.bind.Unmarshaller;
import org.springframework.stereotype.Service;
import tn.esprit.backend.Entite.jaxb.Domain;
import tn.esprit.backend.Entite.jaxb.Quiz;
import tn.esprit.backend.Entite.jaxb.QuizQuestion;

import java.io.File;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class QuizService {

    public void marshalQuizToFile(Quiz quiz, String filePath) {
        try {
            JAXBContext jaxbContext = JAXBContext.newInstance(Quiz.class);
            Marshaller marshaller = jaxbContext.createMarshaller();
            marshaller.setProperty(Marshaller.JAXB_FORMATTED_OUTPUT, Boolean.TRUE);
            marshaller.marshal(quiz, new File(filePath));
        } catch (JAXBException e) {
            e.printStackTrace();
        }
    }

    public Quiz unmarshalQuizFromFile(String filePath) {
        try {
            JAXBContext jaxbContext = JAXBContext.newInstance(Quiz.class);
            Unmarshaller unmarshaller = jaxbContext.createUnmarshaller();
            return (Quiz) unmarshaller.unmarshal(new File(filePath));
        } catch (JAXBException e) {
            e.printStackTrace();
            return null;
        }
    }

    public Quiz filterQuizQuestions(Quiz quiz, int maxQuestionsPerDomain) {
        if (quiz != null && quiz.getDomains() != null) {
            for (Domain domain : quiz.getDomains()) {
                if (domain.getQuestions() != null) { // Check if the questions list is not null
                    List<QuizQuestion> allQuestions = domain.getQuestions();
                    Collections.shuffle(allQuestions); // Randomly shuffle the questions
                    List<QuizQuestion> filteredQuestions = allQuestions.stream()
                            .limit(maxQuestionsPerDomain)
                            .collect(Collectors.toList());
                    domain.setQuestions(filteredQuestions); // Set the domain questions to the filtered list
                }
            }
        }
        return quiz;
    }
}

