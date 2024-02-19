package tn.esprit.backend.Control;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import tn.esprit.backend.Entite.Stage;
import tn.esprit.backend.Service.Stage.IStageService;

import java.util.List;

//@CrossOrigin(origins = "http://localhost:4200")
@RestController
@AllArgsConstructor
//@RequestMapping("/stages")
public class StageControl {
    IStageService stageService;

    @GetMapping("/retrieveAllStages")
    public List<Stage> retrieveAllStages(){
        return stageService.retrieveAllStages();
    }

    @PostMapping("/addStage")
    public Stage addStage(@RequestBody Stage stage){
        return stageService.addStage(stage);
    }

    @PostMapping("/updateStage")
    public Stage updateStage(@RequestBody Stage stage){
        return stageService.updateStage(stage);
    }

    @GetMapping("/retrieveStage/{idStage}")
    public Stage retrieveStage(@PathVariable Long idStage){
        return stageService.retrieveStage(idStage);
    }

    @DeleteMapping("/removeStage/{idStage}")
    public void removeStage(Long idStage){
        stageService.removeStage(idStage);
    }



 }

