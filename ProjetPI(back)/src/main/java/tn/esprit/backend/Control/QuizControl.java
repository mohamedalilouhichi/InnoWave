package tn.esprit.backend.Control;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tn.esprit.backend.Entite.jaxb.Quiz;
import tn.esprit.backend.Service.Quiz.QuizService;

import java.io.IOException;

@RestController
@RequestMapping("/api/quiz")
public class QuizControl {

    @Autowired
    private QuizService quizService;

    // Endpoint to submit quiz data and marshal to XML
    @PostMapping("/marshal")
    public ResponseEntity<String> marshalQuiz(@RequestBody Quiz quiz) {
        // Adjusted to use a path within the project's resources
        String filePath = "src/main/resources/Quiz.xml";
        try {
            // Ensure the file path is accessible when the application is packaged
            String absolutePath = new ClassPathResource("Quiz.xml").getFile().getAbsolutePath();
            quizService.marshalQuizToFile(quiz, absolutePath);
            return ResponseEntity.ok("Quiz data marshalled to XML successfully.");
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().body("Failed to marshal quiz data.");
        }
    }

    @GetMapping("/unmarshal")
    public ResponseEntity<Quiz> unmarshalQuiz() {
        try {
            String absolutePath = new ClassPathResource("Quiz.xml").getFile().getAbsolutePath();
            Quiz quiz = quizService.unmarshalQuizFromFile(absolutePath);
            if (quiz != null) {
                // Filter the quiz questions to randomly select 15 questions per domain
                quiz = quizService.filterQuizQuestions(quiz, 15);
                return ResponseEntity.ok(quiz);
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.notFound().build();
        }
    }
}

