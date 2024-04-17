package tn.esprit.backend.Control;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import tn.esprit.backend.Entite.Competences;
import tn.esprit.backend.Entite.Question;
import tn.esprit.backend.Service.Competences.ICompetencesService;
import tn.esprit.backend.Service.Question.IQuestionService;

import java.util.List;

@Tag(name = " Question Management")
@RestController
@RequestMapping("/question")
@RequiredArgsConstructor
public class QuestionControl {
    private final IQuestionService questionService;

    @Operation(description = "Add Question")
    @PostMapping("/add")
    public Question addQuestion(@RequestBody Question c){
        return  questionService.addQuestion(c);
    }
    @Operation(description = "Retrieve all Questions")
    @GetMapping("/all")
    public List<Question> getAllQuestions(){
        return questionService.retrieveAllQuestions();
    }
    @Operation(description = "Update Questions ")
    @PutMapping("/update")
    public Question updateQuestions(@RequestBody Question question){
        return  questionService.updateQuestion(question);
    }
    @Operation(description = "Retrieve Question by Id")
    @GetMapping("/get/{id-Competences}")
    public Question getById(@PathVariable("id-Competences") Long idQuestion){
        return questionService.retrieveQuestion(idQuestion);
    }

    @Operation(description = "Delete Question by Id")
    @DeleteMapping("/delete/{id-Competences}")
    public void deleteById(@PathVariable("id-Competences") Long idQuestion){
        questionService.removeQuestion(idQuestion);
    }
}
