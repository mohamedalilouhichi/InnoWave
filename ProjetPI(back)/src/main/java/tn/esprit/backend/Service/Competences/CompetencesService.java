package tn.esprit.backend.Service.Competences;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.apache.commons.text.similarity.JaroWinklerDistance;
import org.springframework.stereotype.Service;
import tn.esprit.backend.Entite.Competences;
import tn.esprit.backend.Entite.Role;
import tn.esprit.backend.Entite.Stage;
import tn.esprit.backend.Entite.User;
import tn.esprit.backend.Repository.CompetencesRepo;
import tn.esprit.backend.Repository.StageRepo;
import tn.esprit.backend.Repository.UserRepo;

import java.util.*;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class CompetencesService implements ICompetencesService {
    private CompetencesRepo CompRepo;
    private StageRepo stageRepo;
    private UserRepo userRepo;
    private static final double SEUIL_DE_SIMILARITE = 0.7;
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
    public List<Competences> retrieveCompetencesByStageId(Long stageId) {
        return stageRepo.findCompetencesByStageId(stageId);
    }

    @Override
    public List<Competences> retrieveCompetencesByUser(Long userId) {
        return userRepo.findCompetencesByUserId(userId);
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
    @Override
    @Transactional
    public Competences addCompetenceToStage(long idStage, Competences competence) {
        // Trouver le stage par son ID
        Stage stage = stageRepo.findByIdStage(idStage);

        // Vérifier si le stage a été trouvé
        if (stage == null) {
            throw new RuntimeException("Stage not found with id: " + idStage);
        }

        // Initialiser l'ensemble des compétences si c'est null pour éviter NullPointerException
        if (stage.getCompetences() == null) {
            stage.setCompetences(new HashSet<>());
        }

        // Vérifier l'existence de la compétence pour éviter les doublons
        boolean competenceExists = stage.getCompetences().stream()
                .anyMatch(existingCompetence -> existingCompetence.equals(competence));

        if (!competenceExists) {
            // Ajouter la nouvelle compétence aux compétences du stage
            stage.getCompetences().add(competence);
            // Sauvegarder le stage mis à jour
            stageRepo.save(stage);
        } else {
            throw new RuntimeException("Competence already exists for the stage.");
        }

        // Retourner la compétence ajoutée
        return competence;
    }



   /* @Override
    public Competences addCompetences(Competences course) {
        return CompRepo.save(course);
    }*/
   @Override
   @Transactional
   public List<Competences> addCompetencesToStage(long idStage, List<Competences> competencesToAdd) {
       // Trouver le stage par son ID
       Stage stage = stageRepo.findByIdStage(idStage);

       // Vérifier si le stage a été trouvé
       if (stage == null) {
           throw new RuntimeException("Stage not found with id: " + idStage);
       }

       // Initialiser l'ensemble des compétences si c'est null pour éviter NullPointerException
       if (stage.getCompetences() == null) {
           stage.setCompetences(new HashSet<>());
       }

       // Préparer une liste pour collecter les compétences ajoutées
       List<Competences> addedCompetences = new ArrayList<>();

       // Itérer sur chaque compétence à ajouter
       for (Competences competenceToAdd : competencesToAdd) {
           // Vérifier l'existence de la compétence pour éviter les doublons
           boolean competenceExists = stage.getCompetences().stream()
                   .anyMatch(existingCompetence -> existingCompetence.equals(competenceToAdd));

           if (!competenceExists) {
               // Ajouter la nouvelle compétence aux compétences du stage
               stage.getCompetences().add(competenceToAdd);
               // Ajouter cette compétence à la liste des compétences ajoutées
               addedCompetences.add(competenceToAdd);
           }
       }

       // Sauvegarder le stage mis à jour s'il y a eu des ajouts
       if (!addedCompetences.isEmpty()) {
           stageRepo.save(stage);
       }

       // Retourner la liste des compétences ajoutées
       return addedCompetences;
   }


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



    public Map<String, Double> compareCompetenceContentByRoles(Role role1, Role role2) {
        Set<Competences> competencesRole1 = getCompetencesByUserRole(role1);
        Set<Competences> competencesRole2 = getCompetencesByUserRole(role2);
        Map<String, Double> similarityScores = new HashMap<>();

        for (Competences competence1 : competencesRole1) {
            for (Competences competence2 : competencesRole2) {
                double score = calculateSimilarityScore(competence1, competence2);
                if (score > 0.5) { // Un seuil de similarité, par exemple, 80%
                    String key = competence1.getName() + " | " + competence2.getName();
                    similarityScores.put(key, score);
                }
            }
        }

        return similarityScores;
    }

    public double calculateSimilarityScore(Competences competence1, Competences competence2) {
        double importanceScore = calculateImportanceScore(competence1.getImportanceLevel(), competence2.getImportanceLevel());
        double nameScore = calculateNameScore(competence1.getName(), competence2.getName());

        // Utilisation d'une moyenne pondérée pour combiner les scores
        final double IMPORTANCE_WEIGHT = 0.6;
        final double NAME_WEIGHT = 0.4;
        double weightedScore = (importanceScore * IMPORTANCE_WEIGHT) + (nameScore * NAME_WEIGHT);

        return Math.max(0.0, Math.min(weightedScore, 1.0)); // Assurez-vous que le score est entre 0 et 1
    }


    public double calculateImportanceScore(int importanceLevel1, int importanceLevel2) {
        // Implémentez votre propre logique pour calculer le score de similarité
        // en fonction de la différence entre les niveaux d'importance.
        // Par exemple, plus la différence est faible, plus le score est élevé.
        // Ici, nous utilisons une échelle linéaire simple.
        int maxDifference = 5; // La différence maximale possible entre les niveaux d'importance
        int difference = Math.abs(importanceLevel1 - importanceLevel2);
        return 1.0 - (double) difference / maxDifference;
    }

    public double calculateNameScore(String name1, String name2) {
        JaroWinklerDistance jaroWinklerDistance = new JaroWinklerDistance();
        return jaroWinklerDistance.apply(name1, name2);
    }

    public List<Map<String, Object>> findMatchingStudentsForStage(Long stageId) {
        Stage stage = stageRepo.findById(stageId).orElse(null);
        if (stage == null) {
            return Collections.emptyList();
        }

        Set<Competences> competencesRequises = stage.getCompetences();
        List<User> allStudents = userRepo.findByRole(Role.STUDENT);
        List<Map<String, Object>> matches = new ArrayList<>();

        for (User student : allStudents) {
            double score = 0;
            for (Competences competence : student.getCompetences()) {
                for (Competences requise : competencesRequises) {
                    score += calculateSimilarityScore(competence, requise);
                }
            }
            score = (score / competencesRequises.size()) * 100; // Convertir le score en pourcentage
            if (score > SEUIL_DE_SIMILARITE) {
                Map<String, Object> match = new HashMap<>();
                match.put("user", student);
                match.put("matchPercentage", score);
                matches.add(match);
            }
        }

        return matches;
    }

}
