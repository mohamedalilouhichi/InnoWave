package tn.esprit.backend.Control;
import lombok.AllArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import tn.esprit.backend.Entite.Candidature;
import tn.esprit.backend.Service.Candidature.ICandidatureService;

import java.io.IOException;
import java.io.InputStream;
import java.util.List;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;


@RestController
@AllArgsConstructor
//@RequestMapping("/candidature")
//@CrossOrigin(origins = "http://localhost:4200")
public class CandidatureControl {
    private ICandidatureService candidatureService;

    @GetMapping("/retrieveAllCandidatures")
    public List<Candidature> retrieveAllCandidatures(){
        return candidatureService.retrieveAllCandidatures();
    }

    @PostMapping("/addCandidacy")
    public Candidature addCandidacy(@RequestBody Candidature candidacy, @RequestParam("CV") MultipartFile CV) throws IOException {
        return candidatureService.addCandidacy(candidacy,CV);
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
