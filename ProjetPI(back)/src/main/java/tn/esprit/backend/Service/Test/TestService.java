package tn.esprit.backend.Service.Test;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import tn.esprit.backend.Entite.Test;
import tn.esprit.backend.Repository.TestRepo;

import java.util.List;

@Service
@AllArgsConstructor
public class TestService implements ITestService {
    private TestRepo testRepo;
    @Override
    public List<Test> retrieveAllTests() {
        return testRepo.findAll();
    }

    @Override
    public Test addTest(Test test) {
        return testRepo.save(test);
    }

    @Override
    public Test updateTest(long idTest, Test testDetails) {
        Test test = testRepo.findById(idTest)
                .orElseThrow(() -> new RuntimeException("Test not found for this id :: " + idTest));


        test.setName(testDetails.getName());
        test.setDescription(testDetails.getDescription());
        test.setStatus(testDetails.getStatus());

        test.setDuration(testDetails.getDuration());



        return testRepo.save(test);
    }



    @Override
    public Test retrieveTest(Long idTest) {
        return testRepo.findById(idTest).orElse(null);
    }

    @Override
    public void removeTest(Long idTest) {
        testRepo.deleteById(idTest);
    }
    public List<Object[]> getTestsDistributionByStatus() {
        return testRepo.countTestsByStatus();
    }

    public Double getAverageTestDuration() {
        return testRepo.findAverageDuration();
    }
}
