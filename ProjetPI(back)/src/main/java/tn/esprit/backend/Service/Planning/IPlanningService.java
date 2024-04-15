package tn.esprit.backend.Service.Planning;

import tn.esprit.backend.Entite.Evaluation;
import tn.esprit.backend.Entite.FavorisPlan;
import tn.esprit.backend.Entite.Planning;

import java.time.LocalDateTime;
import java.util.List;

public interface IPlanningService {
    List<Planning> retrieveAllPlannings();

    Planning  addPlanning(Planning  planning);

    Planning updatePlanning(Planning planning);

    Planning retrievePlanning(Long idPlanning);

    void removePlanning(Long idPlanning);
    void updatePlanningDates(Long id, LocalDateTime newStartDate, LocalDateTime newEndDate);


    FavorisPlan addFavorisPlan(FavorisPlan favorisPlan);

    List<FavorisPlan> retrieveAllFavorisPlans();

    void removeFavorisPlan(Long idFavoris);
}
