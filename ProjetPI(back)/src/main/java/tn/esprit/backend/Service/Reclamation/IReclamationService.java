package tn.esprit.backend.Service.Reclamation;

import tn.esprit.backend.Entite.Reclamation;

import java.util.List;

public interface IReclamationService {
    List<Reclamation> retrieveAllReclamation();

    Reclamation  addReclamations(Reclamation  rec);

    Reclamation updateReclamations(Reclamation rec);

    Reclamation retrieveReclamations(Long idReclamation);
    boolean removeReclamations (Long idReclamation);
}
