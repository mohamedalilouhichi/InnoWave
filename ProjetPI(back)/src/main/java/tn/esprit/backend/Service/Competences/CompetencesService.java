package tn.esprit.backend.Service.Competences;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import tn.esprit.backend.Entite.Competences;
import tn.esprit.backend.Entite.User;
import tn.esprit.backend.Repository.CompetencesRepo;
import tn.esprit.backend.Repository.UserRepo;

import java.util.HashSet;
import java.util.List;

@Service
@AllArgsConstructor
public class CompetencesService implements ICompetencesService {
    private CompetencesRepo CompRepo;

    private UserRepo userRepo;

    @Override
    public List<Competences> retrieveAllCompetences() {
        return CompRepo.findAll();
    }


    @Override
    public Competences addCompetencesToUser(long idUser, Competences competence) {
        // Find the user by ID
        User user = userRepo.findUserByIdUser(idUser);

        // Check if the user was found
        if (user == null) {
            // Optionally handle the case where the user is not found, e.g., throw an exception or return null
            throw new RuntimeException("User not found with id: " + idUser);
        }

        // Get the user's current competences. Assuming it's a Set for this example.
        // Initialize it if it's null to avoid NullPointerException
        if (user.getCompetences() == null) {
            user.setCompetences(new HashSet<>());
        }

        // Add the new competence to the user's competences
        user.getCompetences().add(competence);

        // Save the updated user back to the repository
        userRepo.save(user);

        // Return the added competence (or you might return the updated user instead, depending on your use case)
        return competence;
    }


   /* @Override
    public Competences addCompetences(Competences course) {
        return CompRepo.save(course);
    }*/

    @Override
    public Competences updateCompetences(long idCompetences, Competences compDetails) {
        Competences comp = CompRepo.findById(idCompetences)
                .orElseThrow(() -> new RuntimeException("Competence not found for this id :: " + idCompetences));

        comp.setName(compDetails.getName());
        comp.setDescription(compDetails.getDescription());
        comp.setImportanceLevel(compDetails.getImportanceLevel());
        // Assurez-vous de mettre à jour les autres champs selon les besoins

        return CompRepo.save(comp);
    }



    @Override
    public Competences retrieveCompetences(Long idCompetences) {
        return CompRepo.findById(idCompetences).orElse(null);
    }

    @Override
    public void removeCompetences(Long idCompetences) {
        CompRepo.deleteById(idCompetences);
    }

}
