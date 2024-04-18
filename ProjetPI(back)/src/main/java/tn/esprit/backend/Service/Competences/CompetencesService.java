package tn.esprit.backend.Service.Competences;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.apache.commons.text.similarity.JaroWinklerDistance;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tn.esprit.backend.Entite.Competences;
import tn.esprit.backend.Entite.Role;
import tn.esprit.backend.Entite.Stage;
import tn.esprit.backend.Entite.User;
import tn.esprit.backend.Repository.CompetencesRepo;
import tn.esprit.backend.Repository.FeedbackRepo;
import tn.esprit.backend.Repository.StageRepo;
import tn.esprit.backend.Repository.UserRepo;

import java.io.IOException;
import java.util.*;
import java.util.stream.Collectors;


@Service
@AllArgsConstructor
public class CompetencesService implements ICompetencesService {
    private CompetencesRepo CompRepo;
    private StageRepo stageRepo;
    private UserRepo userRepo;
    @Autowired
    private FeedbackRepo feedbackRepository;
    private final ObjectMapper objectMapper = new ObjectMapper();
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
    public List<Competences> retrieveCompetencesByUser(Long idUser) {
        User user = userRepo.findByIdUser(idUser);
        if (user == null) {
            throw new RuntimeException("User not found");
        }
        return new ArrayList<>(user.getCompetences());
    }


    @Override
    @Transactional
    public Competences addCompetenceToUser(long idUser, Competences competence) {
        // Find the user by ID
        User user = userRepo.findById(idUser)
                .orElseThrow(() -> new RuntimeException("User not found with id: " + idUser));

        // Initialize the set of competences if null to avoid NullPointerException
        if (user.getCompetences() == null) {
            user.setCompetences(new HashSet<>());
        }

        // Check for the existence of the competence to avoid duplicates
        boolean competenceExists = user.getCompetences().stream()
                .anyMatch(existingCompetence -> existingCompetence.equals(competence));

        if (!competenceExists) {
            // Add the new competence to the user's competences
            user.getCompetences().add(competence);
            // Save the updated user
            userRepo.save(user);
        } else {
            throw new RuntimeException("Competence already exists for the user.");
        }

        // Return the added competence
        return competence;
    }

    @Override
    @Transactional
    public Competences addCompetenceToStage(long idStage, Competences competence) {
        // Find the stage by its ID
        Stage stage = stageRepo.findById(idStage)
                .orElseThrow(() -> new RuntimeException("Stage not found with id: " + idStage));

        // Initialize the set of competences if null to avoid NullPointerException
        if (stage.getCompetences() == null) {
            stage.setCompetences(new HashSet<>());
        }

        // Check for the existence of the competence to avoid duplicates
        boolean competenceExists = stage.getCompetences().stream()
                .anyMatch(existingCompetence -> existingCompetence.equals(competence));

        if (!competenceExists) {
            // Add the new competence to the stage's competences
            stage.getCompetences().add(competence);
            // Save the updated stage
            stageRepo.save(stage);
        } else {
            throw new RuntimeException("Competence already exists for the stage.");
        }

        // Return the added competence
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



  /*  public Map<String, Double> compareCompetenceContentByRoles(Role role1, Role role2) {
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
*/
  public double calculateExperienceScore(int experience1, int experience2) {
      int maxDifference = 30; // Définissez un maximum de différence considéré (ajustez selon le contexte)
      int difference = Math.abs(experience1 - experience2);

      // Calculez le score en soustrayant la proportion de la différence au maximum possible de 1
      // Cela donne un score où 0 représente la plus grande différence, et 1 une correspondance parfaite
      return 1.0 - (double) difference / maxDifference;
  }

    public double calculateSimilarityScore(Competences competence1, Competences competence2,
                                         double importanceWeight, double nameWeight,
                                         double experienceWeight, double proficiencyWeight,
                                         double certificationWeight, double lastUsedWeight,
                                         double industryWeight) {
      double importanceScore = calculateImportanceScore(competence1.getImportanceLevel(), competence2.getImportanceLevel());
      double nameScore = calculateNameScore(competence1.getName(), competence2.getName());
      double experienceScore = calculateExperienceScore(competence1.getYearsOfExperience(), competence2.getYearsOfExperience());
      double proficiencyScore = calculateProficiencyScore(competence1.getProficiencyLevel(), competence2.getProficiencyLevel());
      double certificationScore = calculateCertificationScore(competence1.isCertification(), competence2.isCertification());
      double lastUsedScore = calculateLastUsedScore(competence1.getLastUsed(), competence2.getLastUsed());
      double industryScore = calculateIndustryRelevanceScore(competence1.getIndustryRelevance(), competence2.getIndustryRelevance());

      // Calcul du score pondéré
      double weightedScore = (importanceScore * importanceWeight) +
              (nameScore * nameWeight) +
              (experienceScore * experienceWeight) +
              (proficiencyScore * proficiencyWeight) +
              (certificationScore * certificationWeight) +
              (lastUsedScore * lastUsedWeight) +
              (industryScore * industryWeight);

      return Math.max(0.0, Math.min(weightedScore, 1.0)); // Assurez-vous que le score est entre 0 et 1
  }
    public double calculateProficiencyScore(int proficiency1, int proficiency2) {
        int maxDifference = 10;
        int difference = Math.abs(proficiency1 - proficiency2);
        return 1.0 - (double) difference / maxDifference;
    }

    public double calculateCertificationScore(boolean cert1, boolean cert2) {
        return cert1 == cert2 ? 1.0 : 0.0;
    }

    public double calculateLastUsedScore(Date lastUsed1, Date lastUsed2) {
        long diff = Math.abs(lastUsed1.getTime() - lastUsed2.getTime());
        long maxDiff = 1000L * 60 * 60 * 24 * 365 * 10; // 10 years in milliseconds
        return 1.0 - (double) diff / maxDiff;
    }

    public double calculateIndustryRelevanceScore(String industry1, String industry2) {
        return industry1.equalsIgnoreCase(industry2) ? 1.0 : 0.0;
    }




    public double calculateImportanceScore(int importanceLevel1, int importanceLevel2) {
        int maxDifference = 5; // Adaptez cette valeur si nécessaire
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
            System.out.println("No stage found with ID: " + stageId);
            return Collections.emptyList();
        }

        System.out.println("Required competences for the stage: " + stage.getCompetences());
        Set<Competences> requiredCompetences = new HashSet<>(stage.getCompetences());
        List<User> allStudents = userRepo.findByRole(Role.STUDENT);
        List<Map<String, Object>> matches = new ArrayList<>();

        for (User student : allStudents) {
            double score = 0;
            int matchingSkills = 0;
            for (Competences studentCompetence : student.getCompetences()) {
                for (Competences requiredCompetence : requiredCompetences) {
                    double nameSimilarity = calculateNameScore(studentCompetence.getName(), requiredCompetence.getName());
                    if (nameSimilarity > 0.8) {  // Assuming 0.8 is an acceptable similarity threshold
                        double totalSimilarityScore = calculateSimilarityScore(studentCompetence, requiredCompetence, 0.2, 0.2, 0.2, 0.1, 0.1, 0.1, 0.1);
                        score += totalSimilarityScore;
                        matchingSkills++;
                    }
                }
            }
            if (matchingSkills > 0) {
                score = (score / matchingSkills) * 100;  // Normalize score to a percentage
            }
            System.out.println("Student: " + student.getName() + ", Matching Score: " + score);
            if (score > SEUIL_DE_SIMILARITE) {  // Threshold for similarity
                Map<String, Object> match = new HashMap<>();
                match.put("user", student);
                match.put("matchPercentage", score);
                matches.add(match);
            }
        }

        if (matches.isEmpty()) {
            System.out.println("No students match the criteria for stage ID: " + stageId);
        }
        return matches;
    }






}
