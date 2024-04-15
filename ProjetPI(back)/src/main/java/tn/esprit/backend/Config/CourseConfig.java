package tn.esprit.backend.Config;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Component
@ConfigurationProperties(prefix = "courses")
public class CourseConfig {
    private Map<String, List<String>> courses = new HashMap<>();

    public Map<String, List<String>> getCourses() {
        return courses;
    }

    public void setCourses(Map<String, List<String>> courses) {
        this.courses = courses;
    }
}
