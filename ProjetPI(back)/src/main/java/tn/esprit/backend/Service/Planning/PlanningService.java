package tn.esprit.backend.Service.Planning;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import tn.esprit.backend.Entite.Planning;
import tn.esprit.backend.Repository.EvaluationRepo;
import tn.esprit.backend.Repository.PlanningRepo;

import java.util.List;

@Service
@AllArgsConstructor
public class PlanningService implements IPlanningService {
    private PlanningRepo planningRepo;

    @Override
    public List<Planning> retrieveAllPlannings() {
        return planningRepo.findAll();
    }

    @Override
    public Planning addPlanning(Planning planning) {
        return planningRepo.save(planning);
    }

    @Override
    public Planning updatePlanning(Planning planning) {
        return planningRepo.save(planning);
    }

    @Override
    public Planning retrievePlanning(Long idPlanning) {
        return planningRepo.findById(idPlanning).orElse(null);
    }

    @Override
    public void removePlanning(Long idPlanning) {
        planningRepo.deleteById(idPlanning);

    }
}