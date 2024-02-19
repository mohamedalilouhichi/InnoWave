package tn.esprit.backend.Service.Candidature;

import tn.esprit.backend.Entite.Candidature;

import java.util.List;

public interface ICandidatureService {

    List<Candidature> retrieveAllCandidatures();

    Candidature addCandidacy(Candidature candidacy);

    Candidature addCandidatureAndAssignToStudentAndStage(Candidature candidature, Long idUser, Long idStage);

    Candidature updateCandidature(Candidature candidature);

    Candidature retrieveCandidature(Long idCandidature);

    void removeCandidature(Long idCandidature);
}
