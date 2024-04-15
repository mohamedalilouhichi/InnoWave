package tn.esprit.backend.Control;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import tn.esprit.backend.Entite.Evaluation;
import tn.esprit.backend.Entite.FavorisPlan;
import tn.esprit.backend.Entite.Planning;

import tn.esprit.backend.Entite.PlanningDatesUpdateRequest;
import tn.esprit.backend.Service.Evaluation.IEvaluationService;
import tn.esprit.backend.Service.Planning.IPlanningService;

import java.util.List;

@RestController
@RequestMapping("/planning")
@RequiredArgsConstructor
public class PlanningControl {
    private final IPlanningService planningService;

    @PostMapping("/add")
    @Operation(description = "Add planning")
    public Planning addPlanning(@RequestBody Planning planning) {
        return planningService.addPlanning(planning);
    }

    @GetMapping("/all")
    @Operation(description = "Retrieve all plannings")
    public List<Planning> getAllPlannings() {
        return planningService.retrieveAllPlannings();
    }

    @PutMapping("/update")
    @Operation(description = "Update planning ")
    public Planning updatePlanning(@RequestBody Planning planning) {
        return planningService.updatePlanning(planning);
    }

    @GetMapping("/get/{id-planning}")
    @Operation(description = "Retrieve planning by Id")
    public Planning getById(@PathVariable("id-planning") Long idPlanning) {
        return planningService.retrievePlanning(idPlanning);
    }
    @Operation(description = "Delete planning by Id")
    @DeleteMapping("/delete/{id-planning}")
    public void deleteById(@PathVariable("id-planning") Long idPlanning){
  planningService.removePlanning(idPlanning);
    }

    @PutMapping("/update/dates/{id}")
    @Operation(description = "Update planning dates")
    public void updatePlanningDates(@PathVariable("id") Long id, @RequestBody PlanningDatesUpdateRequest request) {
        planningService. updatePlanningDates(id, request.getNewStartDate(), request.getNewEndDate());
    }
    @PostMapping("/addPlan")
    @Operation(description = "Add favoris")
    public FavorisPlan addFavorisPlan(@RequestBody FavorisPlan favorisPlan) {
        return planningService.addFavorisPlan(favorisPlan);
    }

    @GetMapping("/allPlan")
    @Operation(description = "Retrieve all favoris")
    public List<FavorisPlan> getAllFavorisPlans() {
        return planningService.retrieveAllFavorisPlans();
    }
    @Operation(description = "Delete favoris by Id")
    @DeleteMapping("/deletePlan/{id-Favoris}")
    public void deleteByIdFav(@PathVariable("id-favoris") Long idFavoris) {
        planningService.removeFavorisPlan(idFavoris);
    }


}
