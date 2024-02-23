package tn.esprit.backend.Service.Documents;

import tn.esprit.backend.Entite.Candidature;
import tn.esprit.backend.Entite.Documents;

import java.util.List;

public interface IDocumentsService {
    List<Documents> retrieveAllDocuments();
    Documents addDocuments(Documents documents);

    Documents retrieveDocuments(Long idDocuments);

    void removeDocuments(Long idDocuments);
}
