package tn.esprit.backend.Service.Stage;

import tn.esprit.backend.Entite.Stage;

import java.util.List;

public interface IStageService {

public Stage addStage(Stage stage);
public List<Stage> retrieveAllStage ();

public Stage updateStage(Stage stage);
    public void removeStage(Long idStage);

}
