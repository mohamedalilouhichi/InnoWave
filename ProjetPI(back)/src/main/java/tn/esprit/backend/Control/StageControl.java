package tn.esprit.backend.Control;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tn.esprit.backend.Entite.Stage;
import tn.esprit.backend.Service.Stage.IStageService;

import java.util.List;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/stages")
public class StageControl {
      @Autowired
        IStageService stageService;

        @GetMapping("/all")
     public List<Stage> retrieveAllStage(){
        return stageService.retrieveAllStage();
    }
    @PostMapping("/add/{idEntreprise}")
    public ResponseEntity<Stage> addStage(@RequestBody Stage stage, @PathVariable Long idEntreprise) {
        Stage addedStage = stageService.addStage(stage, idEntreprise);
        return new ResponseEntity<>(addedStage, HttpStatus.CREATED);
    }

    @PutMapping("/update")
        public Stage updateStage(@RequestBody Stage stage){
            return stageService.updateStage(stage);
        }
    @DeleteMapping("/delete")
    public void removeStage(@RequestBody Stage stage) {
    stageService.removeStage(stage.getIdStage());
    }

    @GetMapping("/{idEntreprise}")
    public List<Stage> retrieveStageByEntrepriseID(@PathVariable Long idEntreprise){
        return this.stageService.retrieveStageByEntrepriseID(idEntreprise);
    }


 }

