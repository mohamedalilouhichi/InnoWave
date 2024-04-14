package tn.esprit.backend.Control;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import tn.esprit.backend.Service.Forum.CloudinaryService;
import tn.esprit.backend.Service.Forum.IPostService;
import tn.esprit.backend.Service.Forum.ImageService;
import tn.esprit.backend.Entite.Image;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.IOException;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/Post/cloudinary")
@CrossOrigin(origins = "*")
public class CloudinaryControl {
    @Autowired
    CloudinaryService cloudinaryService ;
    @Autowired
    ImageService imageService ;
    @Autowired
    IPostService postService ;
    @GetMapping("/list")
    public ResponseEntity<List<Image>> list(){
        List<Image> list = imageService.list();
        return new ResponseEntity<>(list, HttpStatus.OK);
    }
    @GetMapping("/list/{post}")
    public ResponseEntity<List<Image>> list(@PathVariable("post") int idPost){
        List<Image> list = imageService.list(idPost);
        return new ResponseEntity<>(list, HttpStatus.OK);
    }

    @PostMapping("/upload")
    @ResponseBody
    public ResponseEntity<Image> upload(@RequestParam MultipartFile multipartFile) throws IOException {
        BufferedImage bi = ImageIO.read(multipartFile.getInputStream());
        if (bi == null) {
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
        Map result = cloudinaryService.upload(multipartFile);
        Image image = new Image((String) result.get("original_filename"),
                (String) result.get("url"),
                (String) result.get("public_id"));
        imageService.save(image);
        return new ResponseEntity<>(image, HttpStatus.OK);
    }
    @PostMapping("/upload/{idPost}")
    @ResponseBody
    public ResponseEntity<Image> uploadForPost(@RequestParam MultipartFile multipartFile,@PathVariable("idPost") int idPost) throws IOException {
        BufferedImage bi = ImageIO.read(multipartFile.getInputStream());
        if (bi == null) {
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
        Map result = cloudinaryService.upload(multipartFile);
        Image image = new Image((String) result.get("original_filename"),
                (String) result.get("url"),
                (String) result.get("public_id"));
        image.setIdPost(image.getIdPost());
        imageService.save(image);
        return new ResponseEntity<>(image, HttpStatus.OK);
    }


    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> delete(@PathVariable("id") int id) {
        postService.removeImageIdFromPost(id);
        Optional<Image> imageOptional = imageService.getOne(id);
        if (imageOptional.isEmpty()) {
            return new ResponseEntity<>("Not Found", HttpStatus.NOT_FOUND);
        }
        Image image = imageOptional.get();
        String cloudinaryImageId = image.getImageId();
        try {
            cloudinaryService.delete(cloudinaryImageId);
        } catch (IOException e) {
            return new ResponseEntity<>("Failed to delete image from Cloudinary", HttpStatus.INTERNAL_SERVER_ERROR);
        }
        imageService.delete(id);
        return new ResponseEntity<>( HttpStatus.OK);
    }

}

