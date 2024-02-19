package tn.esprit.backend.Service.Stage;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import tn.esprit.backend.Entite.Stage;
import tn.esprit.backend.Repository.StageRepo;

import java.util.List;

@Service
@AllArgsConstructor
public class StageService implements IStageService {
    StageRepo stageRepo;


    @Override
    public List<Stage> retrieveAllStages() {
        return stageRepo.findAll();
    }

    @Override
    public Stage addStage(Stage stage) {
        return stageRepo.save(stage);
    }

    @Override
    public Stage updateStage(Stage stage) {
        return stageRepo.save(stage);
    }

    @Override
    public Stage retrieveStage(Long idStage) {
        return stageRepo.findById(idStage).orElse(null);
    }

    @Override
    public void removeStage(Long idStage) {
        stageRepo.deleteById(idStage);
    }
}

