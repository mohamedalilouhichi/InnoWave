package tn.esprit.backend.Service.Stage;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import tn.esprit.backend.Entite.Entreprise;
import tn.esprit.backend.Entite.Stage;
import tn.esprit.backend.Repository.EntrepriseRepo;
import tn.esprit.backend.Repository.StageRepo;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

@Service
@AllArgsConstructor
public class StageService implements IStageService {
StageRepo stageRepo;
EntrepriseRepo EntrepriseRepo;
    @Override
    public Stage addStage(Stage stage, Long idEntreprise) {
        // Get the enterprise by its ID
        Optional<Entreprise> entrepriseOptional = EntrepriseRepo.findById(idEntreprise);

        // Check if the enterprise exists
        if (entrepriseOptional.isPresent()) {
            // Associate the stage with the enterprise
            stage.setEntreprise(entrepriseOptional.get());

            // Save the stage
            return stageRepo.save(stage);
        } else {
            // Handle the case where the enterprise with the given ID is not found
            throw new NoSuchElementException("Entreprise with ID " + idEntreprise + " not found");
        }

    }

    @Override
    public List<Stage> retrieveAllStage() {
        return stageRepo.findAll();
    }





    @Override
    public Stage addStage(Stage stage) {
        return stageRepo.save(stage);
    }

    @Override
    public Stage updateStage(Stage stage) {
        return stageRepo.save(stage);
    }

    @Override
    public Stage retrieveStage(Long idStage) {
        return stageRepo.findById(idStage).orElse(null);
    }

    @Override
    public void removeStage(Long idStage) {
        stageRepo.deleteById(idStage);
    }


    @Override
    public List<Stage> retrieveStageByEntrepriseID(Long idEntreprise) {
        return stageRepo.findByEntrepriseId(idEntreprise);
    }

}


