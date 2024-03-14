package tn.esprit.backend.Service.Competences;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.apache.commons.text.similarity.JaroWinklerDistance;
import org.springframework.stereotype.Service;
import tn.esprit.backend.Entite.Competences;
import tn.esprit.backend.Entite.Role;
import tn.esprit.backend.Entite.User;
import tn.esprit.backend.Repository.CompetencesRepo;
import tn.esprit.backend.Repository.UserRepo;

import java.util.*;

@Service
@AllArgsConstructor
public class CompetencesService implements ICompetencesService {
    private CompetencesRepo CompRepo;

    private UserRepo userRepo;
    public Set<Competences> getCompetencesByUserRole(Role role) {
        List<User> users = userRepo.findByRole(role);

        Set<Competences> competences = new HashSet<>();

        for (User user : users) {
            competences.addAll(user.getCompetences());
        }

        return competences;
    }
    @Override
    public List<Competences> retrieveAllCompetences() {
        return CompRepo.findAll();
    }


    @Override
    @Transactional
    public Competences addCompetencesToUser(long idUser, Competences competence) {
        // Trouver l'utilisateur par ID
        User user = userRepo.findUserByIdUser(idUser);

        // Vérifier si l'utilisateur a été trouvé
        if (user == null) {
            throw new RuntimeException("User not found with id: " + idUser);
        }

        // Initialiser l'ensemble des compétences si c'est null pour éviter NullPointerException
        if (user.getCompetences() == null) {
            user.setCompetences(new HashSet<>());
        }

        // Vérifier l'existence de la compétence pour éviter les doublons
        boolean competenceExists = user.getCompetences().stream()
                .anyMatch(existingCompetence -> existingCompetence.equals(competence));

        if (!competenceExists) {
            // Ajouter la nouvelle compétence aux compétences de l'utilisateur
            user.getCompetences().add(competence);
            // Sauvegarder l'utilisateur mis à jour
            userRepo.save(user);
        } else {
            throw new RuntimeException("Competence already exists for the user.");
        }

        // Retourner la compétence ajoutée
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

    public Set<String> getCompetenceDescriptionsByRole(Role role) {
        List<User> users = userRepo.findByRole(role);
        Set<String> descriptions = new HashSet<>();

        for (User user : users) {
            user.getCompetences().forEach(competence -> {
                descriptions.add(competence.getDescription().toLowerCase());
            });
        }

        return descriptions;
    }
    public Map<String, Double> compareCompetenceContentByRoles(Role role1, Role role2) {
        Set<String> descriptionsRole1 = getCompetenceDescriptionsByRole(role1);
        Set<String> descriptionsRole2 = getCompetenceDescriptionsByRole(role2);

        JaroWinklerDistance jaroWinklerDistance = new JaroWinklerDistance();
        Map<String, Double> similarityScores = new HashMap<>();

        for (String description1 : descriptionsRole1) {
            for (String description2 : descriptionsRole2) {
                double score = jaroWinklerDistance.apply(description1, description2);
                if (score > 0.8) { // Un seuil de similarité, par exemple, 80%
                    similarityScores.put(description1 + " | " + description2, score);
                }
            }
        }

        return similarityScores;
    }

}
