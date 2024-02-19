package tn.esprit.backend.Service.Candidature;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import tn.esprit.backend.Entite.Candidature;
import tn.esprit.backend.Entite.Stage;
import tn.esprit.backend.Entite.User;
import tn.esprit.backend.Repository.CandidatureRepo;
import tn.esprit.backend.Repository.StageRepo;
import tn.esprit.backend.Repository.UserRepo;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

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
    public Candidature addCandidacy(Candidature candidacy) {
        return candidatureRepo.save(candidacy);
    }

    @Override
    public Candidature addCandidatureAndAssignToStudentAndStage(Candidature candidature, Long idUser, Long idStage) {
        User student = userRepo.findById(idUser).orElse(null);
        Stage stage = stageRepo.findById(idStage).orElse(null);

        Set<Candidature> candidatureSet = new HashSet<>();
        candidatureSet.add(candidature);
        student.setCandidatures(candidatureSet);
        stage.setCandidatures(candidatureSet);

        return candidatureRepo.save(candidature);
    }

    @Override
    public Candidature updateCandidature(Candidature candidature) {
        return candidatureRepo.save(candidature);
    }

    @Override
    public Candidature retrieveCandidature(Long idCandidature) {
        return candidatureRepo.findById(idCandidature).orElse(null);
    }

    @Override
    public void removeCandidature(Long idCandidature) {
        candidatureRepo.deleteById(idCandidature);
    }
}
