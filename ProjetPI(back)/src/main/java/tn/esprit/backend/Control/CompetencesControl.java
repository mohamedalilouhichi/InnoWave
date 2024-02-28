package tn.esprit.backend.Control;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tn.esprit.backend.Entite.Competences;
import tn.esprit.backend.Service.Competences.CompetencesService;
import tn.esprit.backend.Service.Competences.ICompetencesService;
import tn.esprit.backend.Service.User.UserService;

import java.util.List;
@CrossOrigin(origins = "http://localhost:4200")
@Tag(name = " Competences Management")
@RestController
@RequestMapping("/competences")
@RequiredArgsConstructor
public class CompetencesControl {
    @Autowired
    private ICompetencesService competencesService;
    @Autowired
    private UserService userService;


    @Operation(description = "Add Competences to a User")
    @PostMapping("/addCompetenceToUser/{idUser}")
    public Competences addCompetenceToUser(@PathVariable("idUser") long idUser, @RequestBody Competences competence) {
        return competencesService.addCompetencesToUser(idUser, competence);
    }

    @Operation(description = "Retrieve all Competences")
    @GetMapping("/all")
    public List<Competences> getAllCompetences(){
        return competencesService.retrieveAllCompetences();
    }
    @Operation(description = "Update Competences")
    @PutMapping("/update/{id-Competences}")
    public ResponseEntity<Competences> updateCompetences(@PathVariable("id-Competences") Long idCompetences, @RequestBody Competences compDetails) {
        Competences updatedComp = competencesService.updateCompetences(idCompetences, compDetails);
        return ResponseEntity.ok(updatedComp);
    }

    @Operation(description = "Retrieve Competences by Id")
    @GetMapping("/get/{id-Competences}")
    public Competences getById(@PathVariable("id-Competences") Long idCompetences){
        return competencesService.retrieveCompetences(idCompetences);
    }

    @Operation(description = "Delete Competences by Id")
    @DeleteMapping("/delete/{id-Competences}")
    public void deleteById(@PathVariable("id-Competences") Long idCompetences){
        competencesService.removeCompetences(idCompetences);
    }
}
