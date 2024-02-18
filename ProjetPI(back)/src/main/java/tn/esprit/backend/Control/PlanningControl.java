package tn.esprit.backend.Control;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import tn.esprit.backend.Entite.Evaluation;
import tn.esprit.backend.Entite.Planning;
import tn.esprit.backend.Service.Evaluation.IEvaluationService;
import tn.esprit.backend.Service.Planning.IPlanningService;

import java.util.List;

@RestController
@RequestMapping("/planning")
@RequiredArgsConstructor
public class PlanningControl {
    private final IPlanningService planningService;

    @PostMapping("/add")
    @Operation(description = "Add evaluation")
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
}
