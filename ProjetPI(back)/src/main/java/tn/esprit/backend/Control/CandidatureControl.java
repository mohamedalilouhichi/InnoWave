package tn.esprit.backend.Control;

import lombok.AllArgsConstructor;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.Resource;
import org.springframework.format.annotation.DateTimeFormat;

import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import tn.esprit.backend.Entite.Candidature;
import tn.esprit.backend.Service.Candidature.ICandidatureService;
import java.time.LocalDate;

import java.io.IOException;
import java.io.InputStream;
import java.util.Date;
import java.util.List;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;





@RestController
@AllArgsConstructor
//@RequestMapping("/candidature")
@CrossOrigin(origins = "http://localhost:4200")
public class CandidatureControl {
    @Autowired
    private ICandidatureService candidatureService;

    @GetMapping("/retrieveAllCandidatures")
    public List<Candidature> retrieveAllCandidatures(){
        return candidatureService.retrieveAllCandidatures();
    }

    @PostMapping("/addCandidacy")
    public ResponseEntity<?> addCandidacy(
                                      @RequestParam ("Name") String Name,
                                      @RequestParam ("Surname") String Surname,
                                      @RequestParam ("Level") String Level,
                                      @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) @RequestParam("dateSoumission") Date dateSoumission,
                                      @RequestParam ("statut") String statut,

                                      @RequestParam("CV") MultipartFile CV) throws IOException {
        Candidature candidature= new Candidature();
        Candidature savedCandidature =  candidatureService.addCandidacy(candidature,Name,Surname,Level,CV,dateSoumission,statut);
        return ResponseEntity.ok(savedCandidature);
    }



    @PostMapping("/addCandidatureAndAssignToStudentAndStage/{idUser}/{idStage}")
    public Candidature addCandidatureAndAssignToStudentAndStage(
            @RequestParam("idCandidature") Long idCandidature,
            @RequestParam("idUser") Long idUser,
            @RequestParam("idStage") Long idStage,
            @RequestParam ("Name") String Name,
            @RequestParam ("Surname") String Surname,
            @RequestParam ("Level") String Level,
            @RequestParam ("statut") String statut,

            @RequestParam("CV") MultipartFile CV
    ) throws IOException {
        Candidature candidature= new Candidature();
        candidature.setIdCandidature(idCandidature);
        Candidature savedCandidature =  candidatureService.addCandidatureAndAssignToStudentAndStage(candidature, idUser,idStage,Name,Surname,Level,CV,new Date(),statut);
        return savedCandidature;
        }

    @PutMapping("/updateCandidature")
    public ResponseEntity<Candidature> updateCandidature(
            @RequestParam("idCandidature") Long idCandidature,
            @RequestParam("Name") String Name,
            @RequestParam("Surname") String Surname,
            @RequestParam("Level") String Level,
            @RequestParam(value="CV", required = false ) MultipartFile CV) throws IOException {

        Candidature updatedCandidacy = candidatureService.updateCandidature(idCandidature,Name,Surname,Level,CV);
        return ResponseEntity.ok(updatedCandidacy);

    }


    @GetMapping("/retrieveCandidature/{idCandidature}")
    public Candidature retrieveCandidature(@PathVariable Long idCandidature){
        return candidatureService.retrieveCandidature(idCandidature);
    }

    @DeleteMapping("/removeCandidature/{idCandidature}")
    public void removeCandidature(@PathVariable Long idCandidature){
        candidatureService.removeCandidature(idCandidature);
    }

    @GetMapping("/retrieveCandidacyByIdUser/{idUser}")
    public List<Candidature> retrieveCandidacyByIdUser(@PathVariable("idUser") Long idUser){
        return candidatureService.retrieveCandidacyByIdUser(idUser);

    }



    @GetMapping("/AcceptCandidtature/{idCandidature}")
    public Candidature AcceptCandidtature(@PathVariable Long idCandidature){
        return candidatureService.AcceptCandidtature(idCandidature);
    }

    @GetMapping("/RefuseCandidature/{idCandidature}")
    public Candidature RefuseCandidature(@PathVariable Long idCandidature){
        return candidatureService.RefuseCandidature(idCandidature);
    }



   @GetMapping("/{idCandidature}")
    public Candidature getCandidaturebyid(@PathVariable("getCandidaturebyid")long idCandidature) {
        return candidatureService.getCandidaturebyid(idCandidature);
    }



    @GetMapping("/telecharger-pdf/{idCandidature}")
    public ResponseEntity<Resource> telechargerPDF(@PathVariable("idCandidature") long idCandidature) {
        // Récupérer le tableau de bytes depuis votre entité et stockez-le dans une variable byte[]
        Candidature candidature= candidatureService.getCandidaturebyid(idCandidature);
        ByteArrayResource resource = new ByteArrayResource(candidature.getCV());

        HttpHeaders headers = new HttpHeaders();
        headers.add(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=fichier.pdf");

        return ResponseEntity.ok()
                .headers(headers).contentLength(candidature.getCV().length)
                .contentType(MediaType.APPLICATION_PDF)
                .body(resource);

    }

}
