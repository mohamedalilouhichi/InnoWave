package tn.esprit.backend.Service.Candidature;

import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;
import tn.esprit.backend.Entite.Candidature;

import java.io.IOException;
import java.util.List;

public interface ICandidatureService {

    List<Candidature> retrieveAllCandidatures();

    Candidature addCandidacy(Candidature candidacy,  MultipartFile CV) throws IOException;

    Candidature addCandidatureAndAssignToStudentAndStage(Candidature candidature, Long idUser, Long idStage);

    Candidature updateCandidature(Candidature candidature);

    Candidature retrieveCandidature(Long idCandidature);

    void removeCandidature(Long idCandidature);
}
