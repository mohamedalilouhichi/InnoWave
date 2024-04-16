package tn.esprit.backend.Control;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import tn.esprit.backend.Entite.Evaluation;
import tn.esprit.backend.Service.Evaluation.IEvaluationService;

import java.util.List;

@RestController
@RequestMapping("/evaluation")
@RequiredArgsConstructor
public class EvaluationControl {
    private final IEvaluationService evaluationService;
    @PostMapping("/add")
    @Operation(description = "Add evaluation")
    public Evaluation addEvaluation(@RequestBody Evaluation evaluation){
        return  evaluationService.addEvaluation(evaluation);
    }
    @Operation(description = "Retrieve all evaluations")
    @GetMapping("/all")
    public List<Evaluation> getAllEvaluations(){
        return evaluationService.retrieveAllEvaluation();
    }

    @PutMapping("/update")
    @Operation(description = "Update evaluation ")
    public Evaluation updateEvaluation(@RequestBody Evaluation evaluation){
        return  evaluationService.updateEvaluation(evaluation);
    }

    @GetMapping("/get/{id-evaluation}")
    @Operation(description = "Retrieve evaluation by Id")
    public Evaluation getById(@PathVariable("id-evaluation") Long idEvaluation){
        return evaluationService.retrieveEvaluation(idEvaluation);
    }
    @Operation(description = "Delete evaluation by Id")
    @DeleteMapping("/delete/{id-evaluation}")
    public void deleteById(@PathVariable("id-evaluation") Long idEvaluation){
        evaluationService.removeEvaluation(idEvaluation);
    }
    @Operation(description = "gros Mots")
    @PostMapping("/evaluationMot")
    public String evaluer(@RequestBody String texte) {
        if (evaluationService.detecterGrosMot(texte)) {
            return "Your text contains swear words. Please revise it.";
        } else {
            // Traitement normal de l'évaluation
            return "The evaluation has been successfully recorded."





                    ;
        }
    }

}
