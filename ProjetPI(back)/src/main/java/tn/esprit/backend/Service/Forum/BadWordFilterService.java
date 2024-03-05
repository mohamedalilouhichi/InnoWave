package tn.esprit.backend.Service.Forum;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;

@Service
@AllArgsConstructor
@Transactional
public class BadWordFilterService implements IBadWordFilterService {

    private List<String> badWords = new ArrayList<>();

    public BadWordFilterService() {
        loadBadWordsFromFile();
    }

    @Override
    public boolean containsBadWord(String input) {
        input = input.trim();
        for (String badWord : badWords) {
            System.out.println("Comparing: " + input.toLowerCase() + " with " + badWord.toLowerCase());
            if (input.toLowerCase().contains(badWord.toLowerCase())) {
                System.out.println("Match found!");
                return true;
            }
        }
        return false;
    }




    private void loadBadWordsFromFile() {
        try {
            List<String> lines = Files.readAllLines(Paths.get("C:\\Users\\hadil\\OneDrive\\Desktop\\Badwords\\badwords.txt"));
            for (String line : lines) {
                String trimmedLine = line.trim();
                if (!trimmedLine.isEmpty()) {
                    badWords.add(trimmedLine);
                }
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

}