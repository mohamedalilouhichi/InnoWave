package tn.esprit.backend.Service.Evaluation;

import tn.esprit.backend.Entite.Evaluation;

import java.util.List;

public interface IEvaluationService {
    List<Evaluation> retrieveAllEvaluation();

    Evaluation  addEvaluation(Evaluation  evaluation);

    Evaluation updateEvaluation(Evaluation evaluation);

    Evaluation retrieveEvaluation(Long numCourse);

    void removeEvaluation(Long idEvaluation);
}
