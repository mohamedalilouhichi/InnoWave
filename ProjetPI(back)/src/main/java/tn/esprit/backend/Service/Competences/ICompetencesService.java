package tn.esprit.backend.Service.Competences;

import tn.esprit.backend.Entite.Competences;
import tn.esprit.backend.Entite.Role;
import tn.esprit.backend.Entite.User;

import java.io.IOException;
import java.util.List;
import java.util.Map;
import java.util.Set;

public interface ICompetencesService {
    List<Competences> retrieveAllCompetences();
    List<Competences> retrieveCompetencesByStageId(Long stageId);
    List<Competences> retrieveCompetencesByUser(Long userId);
    Competences  addCompetencesToUser(long idUser,Competences  competence);
    Competences addCompetenceToStage(long idStage, Competences competence);
    List<Competences> addCompetencesToStage(long idStage, List<Competences> competencesToAdd);
    Competences updateCompetences(long idCompetences,Competences course);

    Competences retrieveCompetences(Long idCompetences);
    void removeCompetences (Long idCompetences);
     Set<Competences> getCompetencesByUserRole(Role role);
   List<Map<String, Object>> findMatchingStudentsForStage(Long StageId);

  //  Map<String, Double> compareCompetenceContentByRoles(Role role1, Role role2);
    double calculateSimilarityScore(Competences competence1, Competences competence2, double importanceWeight, double nameWeight);
    double calculateImportanceScore(int importanceLevel1, int importanceLevel2);
    double calculateNameScore(String name1, String name2);
}
