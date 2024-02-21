package tn.esprit.backend.Service.Competences;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import tn.esprit.backend.Entite.Competences;
import tn.esprit.backend.Repository.CompetencesRepo;

import java.util.List;

@Service
@AllArgsConstructor
public class CompetencesService implements ICompetencesService {
    private CompetencesRepo CompRepo;

    @Override
    public List<Competences> retrieveAllCompetences() {
        return CompRepo.findAll();
    }

    @Override
    public Competences addCompetences(Competences course) {
        return CompRepo.save(course);
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

}
