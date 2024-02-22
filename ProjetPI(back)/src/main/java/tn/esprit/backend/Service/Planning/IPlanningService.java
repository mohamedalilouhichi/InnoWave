package tn.esprit.backend.Service.Planning;

import tn.esprit.backend.Entite.Evaluation;
import tn.esprit.backend.Entite.Planning;

import java.util.List;

public interface IPlanningService {
    List<Planning> retrieveAllPlannings();

    Planning  addPlanning(Planning  planning);

    Planning updatePlanning(Planning planning);

    Planning retrievePlanning(Long idPlanning);

    void removePlanning(Long idPlanning);

}
