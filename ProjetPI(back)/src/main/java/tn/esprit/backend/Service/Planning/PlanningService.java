package tn.esprit.backend.Service.Planning;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import tn.esprit.backend.Entite.Evaluation;
import tn.esprit.backend.Entite.FavorisPlan;
import tn.esprit.backend.Entite.Planning;
import tn.esprit.backend.Entite.Stage;
import tn.esprit.backend.Repository.EvaluationRepo;
import tn.esprit.backend.Repository.FavorisRepo;
import tn.esprit.backend.Repository.PlanningRepo;
import tn.esprit.backend.Repository.StageRepo;

import java.sql.Date;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class PlanningService implements IPlanningService {
    private PlanningRepo planningRepo;
    private FavorisRepo favorisRepo;


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

    @Override
    public void updatePlanningDates(Long id, LocalDateTime newStartDate, LocalDateTime newEndDate) {
        Optional<Planning> planningOptional = planningRepo.findById(id);

        Planning planning = planningOptional.get();
        ZonedDateTime startZonedDateTime = newStartDate.atZone(ZoneId.systemDefault());
        ZonedDateTime endZonedDateTime = newEndDate.atZone(ZoneId.systemDefault());

        // Convertir ZonedDateTime en java.sql.Date
        Date startDate = Date.valueOf(startZonedDateTime.toLocalDate());
        Date endDate = Date.valueOf(endZonedDateTime.toLocalDate());

        planning.setDateDebut(startDate);
        planning.setDateFin(endDate);
        planningRepo.save(planning);

    }
    @Override
    public List<FavorisPlan> retrieveAllFavorisPlans() {
        return favorisRepo.findAll();
    }

    @Override
    public void addFavorisPlan(Long idUser,Long idPlanning) {
        Optional<FavorisPlan> existingFavoris = favorisRepo.findByIdUserAndIdPlanning(idUser, idPlanning);

        if (existingFavoris.isPresent()) {
            // Le favori existe, nous le supprimons
            favorisRepo.delete(existingFavoris.get());
        } else {
            // Le favori n'existe pas, nous l'ajoutons
            FavorisPlan f = new FavorisPlan();
            f.setIdPlanning(idPlanning);
            f.setIdUser(idUser);
            favorisRepo.save(f);
        }
    }
    @Override
    public void removeFavorisPlan(Long idFavorisPlan) {
        favorisRepo.deleteById(idFavorisPlan);
    }

    @Override
    public boolean existeFav(Long idUser, Long idPlanning) {
        Optional<FavorisPlan> existingFavoris = favorisRepo.findByIdUserAndIdPlanning(idUser, idPlanning);

        if (existingFavoris.isPresent()) {
            return true;
            // Le favori existe, nous le supprimons
        } else {
           return  false;
        }

    }

}