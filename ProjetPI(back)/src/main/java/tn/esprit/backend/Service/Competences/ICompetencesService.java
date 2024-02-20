package tn.esprit.backend.Service.Competences;

import tn.esprit.backend.Entite.Competences;

import java.util.List;

public interface ICompetencesService {
    List<Competences> retrieveAllCompetences();

    Competences  addCompetences(Competences  course);

    Competences updateCompetences(Competences course);

    Competences retrieveCompetences(Long idCompetences);
    void removeCompetences (Long idCompetences);
}
