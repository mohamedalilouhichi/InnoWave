package tn.esprit.backend.Control;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import tn.esprit.backend.Entite.Reclamation;
import tn.esprit.backend.Service.Reclamation.IReclamationService;

import java.util.List;
@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/reclamation")
@RequiredArgsConstructor
public class ReclamationControl {

    private final IReclamationService iReclamationService;

    @PostMapping("/add")
    public Reclamation addReclamations(@RequestBody Reclamation r) {
        return iReclamationService.addReclamations(r);
    }

    @GetMapping("/all")
    public List<Reclamation> getAllReclamations() {
        return iReclamationService.retrieveAllReclamation();
    }

    @PutMapping("/update")
    public Reclamation updateReclamations(@RequestBody Reclamation rec) {
        return iReclamationService.updateReclamations(rec);
    }

    @DeleteMapping("/delete/{id-Reclamation}")
    public boolean deleteById(@PathVariable("id-Reclamation") Long idReclamation) {
        return iReclamationService.removeReclamations(idReclamation);
    }

}
