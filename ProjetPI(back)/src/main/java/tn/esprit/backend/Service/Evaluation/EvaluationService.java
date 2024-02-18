package tn.esprit.backend.Service.Evaluation;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import tn.esprit.backend.Entite.Evaluation;
import tn.esprit.backend.Repository.EvaluationRepo;

import java.util.List;

@Service
@AllArgsConstructor
public class EvaluationService implements IEvaluationService {
    private EvaluationRepo evaluationRepo;

    @Override
    public List<Evaluation> retrieveAllEvaluation() {
        return evaluationRepo.findAll();
    }


    @Override
    public Evaluation addEvaluation(Evaluation evaluation) {
        return evaluationRepo.save(evaluation);
    }

    @Override
    public Evaluation updateEvaluation(Evaluation evaluation) {
        return evaluationRepo.save(evaluation);
    }

    @Override
    public Evaluation retrieveEvaluation(Long idEvaluation) {
        return evaluationRepo.findById(idEvaluation).orElse(null);
    }

    @Override
    public void removeEvaluation(Long idEvaluation) {
        evaluationRepo.deleteById(idEvaluation);
    }
}
