package tn.esprit.backend.Control;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import tn.esprit.backend.Config.CourseConfig;

import java.net.URLDecoder;
import java.nio.charset.StandardCharsets;
import java.util.List;
import java.net.URLDecoder;
import java.nio.charset.StandardCharsets;
@RestController
@RequestMapping("/api/courses")
public class CourseControl {
    @Autowired
    private CourseConfig courseConfig;



    @GetMapping("/{domain}")
    public ResponseEntity<List<String>> getCourses(@PathVariable String domain) {
        // Décode le domaine au cas où il est encodé dans l'URL
        String decodedDomain = URLDecoder.decode(domain, StandardCharsets.UTF_8);
        List<String> courses = courseConfig.getCourses().get(decodedDomain);
        if (courses == null || courses.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(courses);
    }

}
