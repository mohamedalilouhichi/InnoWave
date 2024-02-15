package tn.esprit.backend.Control;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import tn.esprit.backend.Service.Stage.IStageService;

@RestController
@RequestMapping("/stage")
public class StageControl {
    @Autowired
    IStageService stageService;


 }

