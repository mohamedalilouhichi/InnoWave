package tn.esprit.backend.Service.Question;

import tn.esprit.backend.Entite.Question;


import java.util.List;

public interface IQuestionService {
    List<Question> retrieveAllQuestions();

    Question  addQuestion(Question  question);

    Question updateQuestion(Question question);

    Question retrieveQuestion(Long idQuestion);
    void removeQuestion(Long idQuestion);
}
