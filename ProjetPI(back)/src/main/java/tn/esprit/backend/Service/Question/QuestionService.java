package tn.esprit.backend.Service.Question;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import tn.esprit.backend.Entite.Question;
import tn.esprit.backend.Repository.QuestionRepo;
import tn.esprit.backend.Repository.TestRepo;

import java.util.List;

@Service
@AllArgsConstructor
public class QuestionService implements IQuestionService {
    private QuestionRepo questionRepo;
    @Override
    public List<Question> retrieveAllQuestions() {
        return questionRepo.findAll();
    }

    @Override
    public Question addQuestion(Question question) {
        return questionRepo.save(question);
    }

    @Override
    public Question updateQuestion(Question question) {
        return questionRepo.save(question);
    }

    @Override
    public Question retrieveQuestion(Long idQuestion) {
        return questionRepo.findById(idQuestion).orElse(null);
    }

    @Override
    public void removeQuestion(Long idQuestion) {
        questionRepo.deleteById(idQuestion);
    }
}
