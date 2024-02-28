package tn.esprit.backend.Control;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
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
    @Operation(description = "Update Test")
    @PutMapping("/update/{id-Test}")
    public ResponseEntity<Test> updateTest(@PathVariable("id-Test") Long idTest, @RequestBody Test testDetails) {
        Test updatedTest = testService.updateTest(idTest, testDetails);
        return ResponseEntity.ok(updatedTest);
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
    @Operation(description = "Get Distribution of Tests by Status")
    @GetMapping("/distribution-by-status")
    public ResponseEntity<List<Object[]>> getTestsDistributionByStatus() {
        List<Object[]> distribution = testService.getTestsDistributionByStatus();
        return ResponseEntity.ok(distribution);
    }

    @Operation(description = "Get Average Duration of Tests")
    @GetMapping("/average-duration")
    public ResponseEntity<Double> getAverageTestDuration() {
        Double averageDuration = testService.getAverageTestDuration();
        return ResponseEntity.ok(averageDuration);
    }

}
