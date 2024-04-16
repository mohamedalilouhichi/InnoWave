package tn.esprit.backend.Service.Entreprise;

import jakarta.persistence.EntityNotFoundException;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tn.esprit.backend.Entite.Entreprise;
import tn.esprit.backend.Repository.EntrepriseRepo;

@Service
@AllArgsConstructor
public class EntrepriseService implements IEntrepriseService {
    @Autowired
    private EntrepriseRepo entrepriseRepo;
    @Override
    public String fetchEntrepriseNameById(Long idEntreprise) {
        Entreprise entreprise = entrepriseRepo.findById(idEntreprise)
                .orElseThrow(() -> new EntityNotFoundException("Enterprise not found with id: " + idEntreprise));
        return entreprise.getName();
    }
}
