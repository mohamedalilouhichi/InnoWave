package tn.esprit.backend.Control;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tn.esprit.backend.Entite.Competences;
import tn.esprit.backend.Entite.Role;
import tn.esprit.backend.Entite.User;
import tn.esprit.backend.Service.Competences.CompetencesService;
import tn.esprit.backend.Service.Competences.ICompetencesService;
import tn.esprit.backend.Service.User.UserService;

import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.Set;

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

    @Operation(description = "Add a competence to a user")
    @PostMapping("/addCompetenceToUser/{idUser}")
    public ResponseEntity<Competences> addCompetenceToUser(@PathVariable("idUser") long idUser,
                                                           @RequestBody Competences competence) {
        try {
            Competences addedCompetence = competencesService.addCompetenceToUser(idUser, competence);
            return new ResponseEntity<>(addedCompetence, HttpStatus.CREATED);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
    }

    /*  @Operation(description = "Add Competences to a Stage")
    @PostMapping("/addCompetenceToStage/{idStage}")
    public Competences addCompetenceToStage(@PathVariable("idStage") long idStage,
                                           @RequestBody Competences competence) {
        return competencesService.addCompetenceToStage(idStage, competence);
    }*/
    @Operation(description = "Add competences to a stage")
    @PostMapping("/addCompetencesToStage/{idStage}")
    public ResponseEntity<List<Competences>> addCompetencesToStage(@PathVariable("idStage") long idStage,
                                                                   @RequestBody List<Competences> competences) {
        try {
            List<Competences> addedCompetences = competencesService.addCompetencesToStage(idStage, competences);
            if (addedCompetences.isEmpty()) {
                // If no competences were added because they already exist, respond with 204 No Content or similar.
                return ResponseEntity.noContent().build();
            }
            return ResponseEntity.status(HttpStatus.CREATED).body(addedCompetences);
        } catch (RuntimeException e) {
            // Log the exception details here for debugging
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }
    }


    @Operation(description = "Retrieve all Competences")
    @GetMapping("/all")
    public List<Competences> getAllCompetences(){
        return competencesService.retrieveAllCompetences();
    }
    @GetMapping("/filter")
    public ResponseEntity<List<Competences>> getCompetencesByFilter(
            @RequestParam(required = false) Long stageId,
            @RequestParam(required = false) Long idUser) {

        List<Competences> competences;
        if (stageId != null) {
            competences = competencesService.retrieveCompetencesByStageId(stageId);
        } else if (idUser != null) {
            competences = competencesService.retrieveCompetencesByUser(idUser);
        } else {
            // If no filter is provided, return all competences
            competences = competencesService.retrieveAllCompetences();
        }

        if(competences.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(competences, HttpStatus.OK);
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

    @GetMapping("/by-user-role")
    public ResponseEntity<Set<Competences>> getCompetencesByUserRole(@RequestParam Role role) {
        Set<Competences> competences = competencesService.getCompetencesByUserRole(role);
        return ResponseEntity.ok(competences);
    }

  /*  @GetMapping("/compare")
    public ResponseEntity<Map<String, Double>> compareCompetencesByRoles(
            @RequestParam("role1") Role role1,
            @RequestParam("role2") Role role2) {
        Map<String, Double> similarityScores = competencesService.compareCompetenceContentByRoles(role1, role2);

        if (similarityScores.isEmpty()) {
            return ResponseEntity.noContent().build();
        }

        return ResponseEntity.ok(similarityScores);
    }*/
    @GetMapping("/matchingStudentsForStage")
    public ResponseEntity<List<Map<String, Object>>> getMatchingStudentsForStage(@RequestParam("stageId") Long stageId) {
        List<Map<String, Object>> matchingStudents = competencesService.findMatchingStudentsForStage(stageId);

        if (matchingStudents.isEmpty()) {
            return ResponseEntity.ok(Collections.emptyList()); // Retourne une liste vide
        }

        return ResponseEntity.ok(matchingStudents);
    }



    @GetMapping("/getskill/{idUser}")
    public List<Competences> getCompetencesByUserId(@PathVariable Long idUser) {
        return competencesService.retrieveCompetencesByUser(idUser);
    }
}
