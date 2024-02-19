package tn.esprit.backend.Service.Stage;

import tn.esprit.backend.Entite.Stage;

import java.util.List;

public interface IStageService {
    List<Stage> retrieveAllStages();

    Stage addStage(Stage stage);

    Stage updateStage(Stage stage);

    Stage retrieveStage(Long idStage);

    void removeStage(Long idStage);


}
