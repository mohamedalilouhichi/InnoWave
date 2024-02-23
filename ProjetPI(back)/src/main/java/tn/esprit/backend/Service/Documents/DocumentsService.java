package tn.esprit.backend.Service.Documents;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import tn.esprit.backend.Entite.Candidature;
import tn.esprit.backend.Entite.Documents;
import tn.esprit.backend.Entite.Stage;
import tn.esprit.backend.Entite.User;
import tn.esprit.backend.Repository.DocumentsRepo;
import tn.esprit.backend.Repository.UserRepo;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
@AllArgsConstructor
public class DocumentsService implements IDocumentsService {
    private DocumentsRepo documentsRepo;
    private UserRepo userRepo;
    @Override
    public List<Documents> retrieveAllDocuments() {
        return documentsRepo.findAll();
    }

    @Override
    public Documents addDocuments(Documents documents) {
        return documentsRepo.save(documents);
    }

    @Override
    public Documents retrieveDocuments(Long idDocuments) {
        return documentsRepo.findById(idDocuments).orElse(null);
    }

    @Override
    public void removeDocuments(Long idDocuments) {
        documentsRepo.deleteById(idDocuments);
    }
}
