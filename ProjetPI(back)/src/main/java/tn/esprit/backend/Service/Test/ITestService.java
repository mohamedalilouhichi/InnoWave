package tn.esprit.backend.Service.Test;

import tn.esprit.backend.Entite.Test;

import java.util.List;

public interface ITestService {
    List<Test> retrieveAllTests();

    Test  addTest(Test  test);

    Test updateTest(long idTest,Test test);

    Test retrieveTest(Long idTest);
    void removeTest (Long idTest);
}
