package tn.esprit.backend.Service.Reclamation;

import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import tn.esprit.backend.Entite.Reclamation;
import tn.esprit.backend.Repository.ReclamationRepo;

import java.util.List;

@Service
@AllArgsConstructor
public class ReclamationService implements IReclamationService {
    private ReclamationRepo reclamationRepo;

    @Override
    public List<Reclamation> retrieveAllReclamation() {
        return reclamationRepo.findAll();
    }

    @Override
    public Reclamation addReclamations(Reclamation rec) {
        return reclamationRepo.save(rec);
    }

    @Override
    public Reclamation updateReclamations(Reclamation rec) {
        return reclamationRepo.saveAndFlush(rec);
    }

    @Override
    public Reclamation retrieveReclamations(Long idReclamation) {
        return reclamationRepo.findById(idReclamation).orElse(null);
    }

    @Override
    public boolean removeReclamations(Long idReclamation) {
        if (idReclamation == null)
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "idIsNull");
        boolean exist = reclamationRepo.existsById(idReclamation);
        if (exist) {
            reclamationRepo.deleteById(idReclamation);
            return true;
        }
        throw new ResponseStatusException(HttpStatus.NOT_FOUND, "ReclamationNotFound");
    }
}
