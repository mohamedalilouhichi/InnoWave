package tn.esprit.backend.Service.Competences;

import tn.esprit.backend.Entite.Competences;
import tn.esprit.backend.Entite.Role;

import java.util.List;
import java.util.Map;
import java.util.Set;

public interface ICompetencesService {
    List<Competences> retrieveAllCompetences();

    Competences  addCompetencesToUser(long idUser,Competences  competence);

    Competences updateCompetences(long idCompetences,Competences course);

    Competences retrieveCompetences(Long idCompetences);
    void removeCompetences (Long idCompetences);
     Set<Competences> getCompetencesByUserRole(Role role);

    Map<String, Double> compareCompetenceContentByRoles(Role role1, Role role2);
     double calculateSimilarityScore(Competences competence1, Competences competence2);
    double calculateImportanceScore(int importanceLevel1, int importanceLevel2);
    double calculateNameScore(String name1, String name2);
}
