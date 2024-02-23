package tn.esprit.backend.Control;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.http.ResponseEntity;
import tn.esprit.backend.Entite.Documents;
import tn.esprit.backend.Service.Documents.DocumentsService;
import org.springframework.http.HttpStatus;
import java.util.List;
import java.util.stream.Collectors;
import lombok.AllArgsConstructor;


@RestController
@AllArgsConstructor
@RequestMapping("/documents")

public class DocumentsControl {
    private DocumentsService documentsService;

    @GetMapping("/retrieveAllDocuments")
    public List<Documents> retrieveAllDocuments(){
        return documentsService.retrieveAllDocuments();
    }

    @PostMapping("/addDocuments")
    public Documents addDocuments(@RequestBody Documents documents) {
        return documentsService.addDocuments(documents);
    }

    @GetMapping("/retrieveDocuments/{idDocuments}")
    public Documents retrieveDocuments(@PathVariable Long idDocuments){
        return documentsService.retrieveDocuments(idDocuments);
    }

    @DeleteMapping("/removeDocuments/{idDocuments}")
    public void removeDocuments(@PathVariable Long idDocuments){
        documentsService.removeDocuments(idDocuments);
    }

}
