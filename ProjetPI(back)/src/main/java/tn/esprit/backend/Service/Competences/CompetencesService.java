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
        User user = userRepo.findUserByIdUser(idUser);

        if (user == null) {
            throw new RuntimeException("User not found with id: " + idUser);
        }

        if (user.getCompetences() == null) {
            user.setCompetences(new HashSet<>());
        }

        boolean competenceExists = user.getCompetences().contains(competence);

        if (!competenceExists) {
            user.getCompetences().add(competence);
            userRepo.save(user);
        } else {
            throw new RuntimeException("Competence already exists for the user.");
        }

        return competence;
    }

    @Override
    @Transactional
    public Competences addCompetenceToStage(long idStage, Competences competence) {
        Stage stage = stageRepo.findByIdStage(idStage);

        if (stage == null) {
            throw new RuntimeException("Stage not found with id: " + idStage);
        }

        if (stage.getCompetences() == null) {
            stage.setCompetences(new HashSet<>());
        }

        boolean competenceExists = stage.getCompetences().contains(competence);

        if (!competenceExists) {
            stage.getCompetences().add(competence);
            stageRepo.save(stage);
        } else {
            throw new RuntimeException("Competence already exists for the stage.");
        }

        return competence;
    }

    @Override
    @Transactional
    public List<Competences> addCompetencesToStage(long idStage, List<Competences> competencesToAdd) {
        Stage stage = stageRepo.findByIdStage(idStage);

        if (stage == null) {
            throw new RuntimeException("Stage not found with id: " + idStage);
        }

        if (stage.getCompetences() == null) {
            stage.setCompetences(new HashSet<>());
        }

        List<Competences> addedCompetences = new ArrayList<>();

        for (Competences competenceToAdd : competencesToAdd) {
            boolean competenceExists = stage.getCompetences().contains(competenceToAdd);

            if (!competenceExists) {
                stage.getCompetences().add(competenceToAdd);
                addedCompetences.add(competenceToAdd);
            }
        }

        if (!addedCompetences.isEmpty()) {
            stageRepo.save(stage);
        }

        return addedCompetences;
    }

    @Override
    public Competences updateCompetences(long idCompetences, Competences compDetails) {
        Competences comp = CompRepo.findById(idCompetences)
                .orElseThrow(() -> new RuntimeException("Competence not found for this id :: " + idCompetences));

        comp.setName(compDetails.getName());
        comp.setDescription(compDetails.getDescription());
        comp.setImportanceLevel(compDetails.getImportanceLevel());

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
                if (score > 0.8) {
                    String key = competence1.getName() + " | " + competence2.getName();
                    similarityScores.put(key, score);
                }
            }
        }

        return similarityScores;
    }

    public double calculateSimilarityScore(Competences competence1, Competences competence2) {
        int importanceLevel1 = competence1.getImportanceLevel();
        int importanceLevel2 = competence2.getImportanceLevel();

        String name1 = competence1.getName().toLowerCase();
        String name2 = competence2.getName().toLowerCase();

        double importanceScore = calculateImportanceScore(importanceLevel1, importanceLevel2);
        double nameScore = calculateNameScore(name1, name2);

        final double IMPORTANCE_WEIGHT = 0.6;
        final double NAME_WEIGHT = 0.4;
        double weightedScore = (importanceScore * IMPORTANCE_WEIGHT) + (nameScore * NAME_WEIGHT);

        return Math.max(0.0, Math.min(weightedScore, 1.0));
    }

    public double calculateImportanceScore(int importanceLevel1, int importanceLevel2) {
        int maxDifference = 5;
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
            score = (score / competencesRequises.size()) * 100;
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
