package tn.esprit.backend.Control;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import tn.esprit.backend.Entite.Test;
import tn.esprit.backend.Service.Test.ITestService;

import java.util.List;

@Tag(name = " Test Management")
@RestController
@RequestMapping("/Test")
@RequiredArgsConstructor
public class TestControl {
    private final ITestService testService;

    @Operation(description = "Add Test")
    @PostMapping("/add")
    public Test addTest(@RequestBody Test t){
        return  testService.addTest(t);
    }
    @Operation(description = "Retrieve all Test")
    @GetMapping("/all")
    public List<Test> getAllTests(){
        return testService.retrieveAllTests();
    }
    @Operation(description = "Update Test ")
    @PutMapping("/update")
    public Test updateTest(@RequestBody Test test){
        return  testService.updateTest(test);
    }
    @Operation(description = "Retrieve Test by Id")
    @GetMapping("/get/{id-Test}")
    public Test getById(@PathVariable("id-Test") Long idTest){
        return testService.retrieveTest(idTest);
    }

    @Operation(description = "Delete Test by Id")
    @DeleteMapping("/delete/{id-Competences}")
    public void deleteById(@PathVariable("id-Competences") Long idTest){
        testService.removeTest(idTest);
    }
}
