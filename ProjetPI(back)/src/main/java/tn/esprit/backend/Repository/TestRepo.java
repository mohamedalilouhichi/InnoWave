package tn.esprit.backend.Repository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import tn.esprit.backend.Entite.Test;

import java.util.List;

@Repository
public interface TestRepo extends JpaRepository<Test, Long>{
    @Query("SELECT t.status, COUNT(t) FROM Test t GROUP BY t.status")
    List<Object[]> countTestsByStatus();

    @Query("SELECT AVG(t.duration) FROM Test t")
    Double findAverageDuration();
}
