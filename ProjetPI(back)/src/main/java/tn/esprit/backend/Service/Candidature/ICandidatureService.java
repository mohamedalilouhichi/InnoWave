package tn.esprit.backend.Service.Candidature;

import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;
import tn.esprit.backend.Entite.Candidature;

import java.io.IOException;
import java.time.LocalDate;
import java.util.Date;
import java.util.List;

public interface ICandidatureService {

    List<Candidature> retrieveAllCandidatures();

    Candidature addCandidacy(Candidature  candidature , String Name, String Surname, String Level, MultipartFile CV, Date dateSoumission, String statut) throws IOException;

    Candidature addCandidatureAndAssignToStudentAndStage(Candidature candidature, Long idUser, Long idStage, String Name, String Surname, String Level, MultipartFile CV, Date dateSoumission, String statut) throws IOException;

    Candidature updateCandidature(Candidature candidature);

    Candidature retrieveCandidature(Long idCandidature);

    void removeCandidature(Long idCandidature);

    Candidature AcceptCandidtature(Long idCandidature);
    Candidature RefuseCandidature(Long idCandidature);



}
