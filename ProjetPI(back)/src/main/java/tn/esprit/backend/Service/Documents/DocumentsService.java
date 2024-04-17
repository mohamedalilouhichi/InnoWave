package tn.esprit.backend.Service.Documents;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import lombok.AllArgsConstructor;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.text.PDFTextStripper;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import tn.esprit.backend.Entite.Candidature;
import tn.esprit.backend.Entite.Documents;
import tn.esprit.backend.Entite.Stage;
import tn.esprit.backend.Entite.User;
import tn.esprit.backend.Repository.DocumentsRepo;
import tn.esprit.backend.Repository.UserRepo;

import javax.swing.text.Document;
import javax.swing.text.html.parser.Parser;
import java.io.ByteArrayInputStream;
import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
@AllArgsConstructor
public class DocumentsService implements IDocumentsService {
    private DocumentsRepo documentsRepo;
    private UserRepo userRepo;
    @PersistenceContext
    private EntityManager entityManager;
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
    public List<Documents> searchDocuments(String query) {
        // Rechercher les documents dont le champ 'cvFile' ou 'rapportFile' contient le texte spécifié dans 'query'
        return documentsRepo.findByCvFileContainingOrRapportFileContaining(query, query);
    }
    public String extractTextFromPdfInDatabase(Long idDocuments, MultipartFile cvFile) throws IOException {
        // Récupérer l'objet Documents correspondant à l'ID donné
        Documents documents = entityManager.find(Documents.class, idDocuments);

        if (documents == null) {
            throw new IllegalArgumentException("No document found for id: " + idDocuments);
        }

        // Vérifier si le fichier est vide
        if (cvFile.isEmpty()) {
            throw new IllegalArgumentException("CV file is empty.");
        }

        // Utiliser PDFBox pour extraire le texte du CV PDF
        try (InputStream stream = cvFile.getInputStream();
             PDDocument pdfDocument = PDDocument.load(stream)) {
            PDFTextStripper stripper = new PDFTextStripper();
            return stripper.getText(pdfDocument);
        }
    }




}
