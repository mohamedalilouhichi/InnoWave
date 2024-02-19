package tn.esprit.backend.Control;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;
import tn.esprit.backend.Entite.Candidature;
import tn.esprit.backend.Service.Candidature.ICandidatureService;

import java.util.List;

@RestController
@AllArgsConstructor
//@RequestMapping("/candidature")
public class CandidatureControl {
    private ICandidatureService candidatureService;

    @GetMapping("/retrieveAllCandidatures")
    public List<Candidature> retrieveAllCandidatures(){
        return candidatureService.retrieveAllCandidatures();
    }


    @PostMapping("/addCandidacy")
    public Candidature addCandidacy(@RequestBody Candidature candidacy){
        return candidatureService.addCandidacy(candidacy);
    }




    @PostMapping("/addCandidatureAndAssignToStudentAndStage/{idUser}/{idStage}")
    public Candidature addCandidatureAndAssignToStudentAndStage(@RequestBody Candidature candidature, @PathVariable Long idUser, @PathVariable Long idStage){
        return candidatureService.addCandidatureAndAssignToStudentAndStage(candidature,idUser, idStage);
    }

    @PostMapping("/updateCandidature")
    public Candidature updateCandidature(@RequestBody Candidature candidature){
        return candidatureService.updateCandidature(candidature);
    }

    @GetMapping("/retrieveCandidature/{idCandidature}")
    public Candidature retrieveCandidature(@PathVariable Long idCandidature){
        return candidatureService.retrieveCandidature(idCandidature);
    }

    @DeleteMapping("/removeCandidature/{idCandidature}")
    public void removeCandidature(@PathVariable Long idCandidature){
        candidatureService.removeCandidature(idCandidature);
    }
}
