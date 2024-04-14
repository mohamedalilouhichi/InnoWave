package tn.esprit.backend.Control;

import jakarta.mail.MessagingException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tn.esprit.backend.Entite.User;
import tn.esprit.backend.Entite.jaxb.Quiz;
import tn.esprit.backend.Service.Quiz.EmailService;
import tn.esprit.backend.Service.Quiz.QuizService;

import java.io.IOException;
@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/quiz")
public class QuizControl {

    @Autowired
    private QuizService quizService;
    @Autowired
    private EmailService emailService;
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

   /* @GetMapping("/unmarshal")
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
    }*/
   @GetMapping("/unmarshal")
    public ResponseEntity<Quiz> unmarshalQuiz(@RequestParam String domain) {
        try {
            String absolutePath = new ClassPathResource("Quiz.xml").getFile().getAbsolutePath();
            Quiz quiz = quizService.unmarshalQuizFromFile(absolutePath);
            if (quiz != null) {
                // Filter the quiz questions to select questions for the provided domain
                quiz = quizService.filterQuizQuestionsByDomain(quiz, domain, 15); // Assuming this method is adjusted to filter by domain
                return ResponseEntity.ok(quiz);
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.notFound().build();
        }
    }
/*    public ResponseEntity<?> submitQuiz(@RequestBody Quiz quiz) {
        try {
            boolean isPassed = quizService.checkQuizSuccess(quiz);

            if (isPassed) {
                User user = quiz.getUser();
                String userEmail = user.getEmail();
                String userName = user.getName();
                int score = quiz.getScore(); // Ensure this getter exists and returns the quiz's score

                // Generate certificate
                byte[] pdfCertificate = emailService.generateCertificate(userName, score);

                // Send email with certificate
                emailService.sendQuizSuccessEmail(userEmail, userName, score, pdfCertificate);

                return ResponseEntity.ok("Congratulations! You have passed the quiz and an email has been sent with your certificate.");
            } else {
                return ResponseEntity.ok("Sorry, you did not pass the quiz. Try again!");
            }
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().body("An error occurred while submitting the quiz.");
        }
    }


*/
@PostMapping("/sendCertificate")
public ResponseEntity<?> sendCertificate(@RequestParam String email, @RequestParam String name, @RequestParam int score) {
    try {
        byte[] certificate = emailService.generateCertificate(name, score);
        emailService.sendQuizSuccessEmail(email, name, score, certificate);
        return ResponseEntity.ok("Certificate sent successfully!");
    } catch (Exception e) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to send certificate: " + e.getMessage());
    }
}


}

