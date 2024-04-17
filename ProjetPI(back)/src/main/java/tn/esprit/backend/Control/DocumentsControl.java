package tn.esprit.backend.Control;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.text.PDFTextStripper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.http.ResponseEntity;
import org.springframework.web.server.ResponseStatusException;
import tn.esprit.backend.Entite.Documents;
import tn.esprit.backend.Repository.DocumentsRepo;
import tn.esprit.backend.Service.Documents.DocumentsService;
import org.springframework.http.HttpStatus;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import lombok.AllArgsConstructor;

import javax.swing.text.Document;


@RestController
@AllArgsConstructor
@RequestMapping("/documents")
public class DocumentsControl {
    private DocumentsService documentsService;
    private DocumentsRepo documentsRepository;
    public static String UPLOAD_DIRECTORY = "C:/Users/maham/Desktop/aziz/aziz/aziz/ProjetPI(front)/ProjetPI(front)/assets/documents/";

    @GetMapping("/retrieveAllDocuments")
    public List<Documents> retrieveAllDocuments() {
        return documentsService.retrieveAllDocuments();
    }



    @GetMapping("/retrieveDocuments/{idDocuments}")
    public Documents retrieveDocuments(@PathVariable Long idDocuments) {
        return documentsService.retrieveDocuments(idDocuments);
    }

    @DeleteMapping("/removeDocuments/{idDocuments}")
    public void removeDocuments(@PathVariable Long idDocuments) {
        documentsService.removeDocuments(idDocuments);
    }


    private String saveFile(MultipartFile file) throws IOException {
        String currentDate = new SimpleDateFormat("yyyyMMddHHmm").format(new Date());
        String fileName = currentDate + "_" + file.getOriginalFilename();
        byte[] bytes = file.getBytes();
        Path path = Paths.get(UPLOAD_DIRECTORY + fileName);
        Files.write(path, bytes);
        return fileName;
    }

    @PostMapping("/documentsAdd")
    public ResponseEntity<String> addDocument(@RequestParam("category") String category,
                                              @RequestParam("description") String description,
                                              @RequestParam("rapportFile") MultipartFile rapportFile,
                                              @RequestParam("cvFile") MultipartFile cvFile) throws IOException {
        if (rapportFile.isEmpty() || cvFile.isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Rapport file or CV file is empty");
        }

        try {
            // Traitement du fichier de rapport
            String rapportFileName = saveFile(rapportFile);

            // Traitement du fichier de CV
            String cvFileName = saveFile(cvFile);


            Documents document = new Documents();
            document.setCategory(category);
            document.setDescription(description);
            document.setRapportFile(rapportFileName);
            document.setCvFile(cvFileName);

            // Assignation de la date système
            document.setUploadDate(new Date());

            documentsRepository.save(document);

            // Message de succès
            String message = "Document added successfully";
            return ResponseEntity.ok(message);
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to upload file");
        }
    }

    private void deleteFile(String fileName) throws IOException {
        Path path = Paths.get(UPLOAD_DIRECTORY + fileName);
        Files.deleteIfExists(path);
    }


    @PutMapping("/documentsEdit/{id}")
    public ResponseEntity<String> editDocument(@PathVariable("id") Long id,
                                               @RequestParam("category") String category,
                                               @RequestParam("description") String description,
                                               @RequestParam(value = "rapportFile", required = false) MultipartFile rapportFile,
                                               @RequestParam(value = "cvFile", required = false) MultipartFile cvFile) {
        Optional<Documents> optionalDocument = documentsRepository.findById(id);
        if (optionalDocument.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Document not found");
        }

        Documents document = optionalDocument.get();

        try {
            if (rapportFile != null && !rapportFile.isEmpty()) {
                // Supprimer l'ancien fichier de rapport
                deleteFile(document.getRapportFile());
                // Traitement du nouveau fichier de rapport
                String rapportFileName = saveFile(rapportFile);
                document.setRapportFile(rapportFileName);
            }

            if (cvFile != null && !cvFile.isEmpty()) {
                // Supprimer l'ancien fichier CV
                deleteFile(document.getCvFile());
                // Traitement du nouveau fichier CV
                String cvFileName = saveFile(cvFile);
                document.setCvFile(cvFileName);
            }

            // Mettre à jour les autres informations du document
            document.setCategory(category);
            document.setDescription(description);

            // Mettre à jour la date d'upload avec la date système
            document.setUploadDate(new Date());

            // Enregistrer les modifications dans la base de données
            documentsRepository.save(document);

            // Message de succès
            String message = "Document edited successfully";
            return ResponseEntity.ok(message);
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to upload file");
        }
    }
    @GetMapping("/downloadDocument/{fileName:.+}")
    public ResponseEntity<Resource> downloadDocument(@PathVariable String fileName) {
        try {
            // Charger le fichier dans une ressource Spring
            Path filePath = Paths.get(UPLOAD_DIRECTORY, fileName);
            Resource resource = new UrlResource(filePath.toUri());

            // Vérifier si le fichier existe
            if (!resource.exists()) {
                return ResponseEntity.notFound().build();
            }

            // Préparer l'en-tête de réponse
            HttpHeaders headers = new HttpHeaders();
            headers.add(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\""+ resource.getFilename() + "\"");

            // Créer et renvoyer la réponse
            return ResponseEntity.ok()
                    .headers(headers)
                    .contentType(MediaType.APPLICATION_OCTET_STREAM)
                    .body(resource);
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }
    @GetMapping("/search")
    public List<Documents> searchDocuments(@RequestParam("query") String query) {
        return documentsService.searchDocuments(query);
    }
    /******pour extracter le texte d'un pdf********/
    @PostMapping(value = "/extract-text-from-pdf", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<String> extractTextFromPdfC(@RequestPart("pdfFile") MultipartFile pdfFile) {
        try {
            String extractedText = extractTextFromPdf(pdfFile);
            return ResponseEntity.ok(extractedText);
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Une erreur s'est produite lors de l'extraction du texte du PDF.");
        }
    }

    public String extractTextFromPdf(MultipartFile pdfFile) throws IOException {
        try (InputStream stream = pdfFile.getInputStream();
             PDDocument document = PDDocument.load(stream)) {
            PDFTextStripper stripper = new PDFTextStripper();
            return stripper.getText(document);
        }
    }
/************/




}





