package tn.esprit.backend.Service.Stage;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import tn.esprit.backend.Entite.Stage;
import tn.esprit.backend.Repository.StageRepo;

import java.util.List;

@Service
@AllArgsConstructor
public class StageService implements IStageService {
StageRepo stageRepo;


}

