package tn.esprit.backend.Service.Candidature;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import tn.esprit.backend.Entite.Candidature;
import tn.esprit.backend.Entite.Stage;
import tn.esprit.backend.Entite.User;
import tn.esprit.backend.Repository.CandidatureRepo;
import tn.esprit.backend.Repository.StageRepo;
import tn.esprit.backend.Repository.UserRepo;

import java.io.IOException;
import java.io.InputStream;
import java.time.LocalDate;
import java.util.*;

@Service
@AllArgsConstructor
public class CandidatureService implements ICandidatureService {
    private CandidatureRepo candidatureRepo;
    private UserRepo userRepo;
    private StageRepo stageRepo;
    @Override
    public List<Candidature> retrieveAllCandidatures() {
        return candidatureRepo.findAll();
    }

    @Override
    public Candidature addCandidacy(Candidature  candidature , String Name, String Surname, String Level, MultipartFile CV, Date dateSoumission, String statut) throws IOException {

        candidature.setName(Name);
        candidature.setSurname(Surname);
        candidature.setLevel(Level);
        candidature.setDateSoumission(dateSoumission);
        candidature.setStatut(statut);


        if (CV != null && !CV.isEmpty()) {
            candidature.setCV(CV.getBytes());
        }
        return candidatureRepo.save(candidature);
    }


    @Override
    public Candidature addCandidatureAndAssignToStudentAndStage(Candidature candidature, Long idUser, Long idStage, String Name, String Surname, String Level, MultipartFile CV, Date dateSoumission, String statut) throws IOException {
        candidature.setName(Name);
        candidature.setSurname(Surname);
        candidature.setLevel(Level);
        candidature.setDateSoumission(dateSoumission);
        candidature.setStatut("Pending");

        if (CV != null && !CV.isEmpty()) {
            candidature.setCV(CV.getBytes());
        }
        User student = userRepo.findById(idUser).orElse(null);
        Stage stage = stageRepo.findById(idStage).orElse(null);
        candidature.setUser(student);
        candidature.setStage(stage);

        return candidatureRepo.save(candidature);
    }

    @Override
    public Candidature updateCandidature(Long idCandidature, String Name, String Surname, String Level, MultipartFile CV) throws IOException {
        Candidature candidature = candidatureRepo.findById(idCandidature).orElseThrow(() ->
                new RuntimeException("Candidature not found for this id :: "+ idCandidature));

        //Update candidacy
        candidature.setName(Name);
        candidature.setSurname(Surname);
        candidature.setLevel(Level);
        //update CV if provided
        if(CV != null && !CV.isEmpty()){
            candidature.setCV(CV.getBytes());
        }

        //save update
        return candidatureRepo.save(candidature);
    }


    @Override
    public Candidature retrieveCandidature(Long idCandidature) {
        return candidatureRepo.findById(idCandidature).orElse(null);
    }

    @Override
    public List<Candidature> retrieveCandidacyByIdUser(Long idUser) {
        List<Candidature> candidacy = candidatureRepo.findCandidatureByUser_IdUser(idUser);
        if(candidacy != null && !candidacy.isEmpty()){
            return candidacy;
        } else{
            // If no candidacy are found, you can return an empty list or handle it based on your requirements.
            return Collections.emptyList();
        }
    }

    @Override
    public void removeCandidature(Long idCandidature) {
        candidatureRepo.deleteById(idCandidature);
    }

    @Override
    public Candidature AcceptCandidtature(Long idCandidature) {
        Candidature c=candidatureRepo.findById(idCandidature).orElse(null);
        c.setStatut("Approved");
        candidatureRepo.save(c);
        return c;
    }

    @Override
    public Candidature RefuseCandidature(Long idCandidature) {
        Candidature c=candidatureRepo.findById(idCandidature).orElse(null);
        c.setStatut("Declined");
        candidatureRepo.save(c);
        return c;
    }
}
