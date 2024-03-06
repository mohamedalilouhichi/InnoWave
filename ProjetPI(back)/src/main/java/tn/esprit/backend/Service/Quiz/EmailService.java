package tn.esprit.backend.Service.Quiz;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;



@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    @Autowired
    private TemplateEngine templateEngine;

    public void sendQuizSuccessEmail(String to, String name, int score) throws MessagingException {
        Context context = new Context();
        context.setVariable("name", name);
        context.setVariable("score", score);

        String process = templateEngine.process("quizSuccessTemplate", context);
        MimeMessage mimeMessage = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, true);

        helper.setTo(to);
        helper.setSubject("Quiz Success");
        helper.setText(process, true); // Set to true to indicate the content is HTML

        mailSender.send(mimeMessage);
    }
}
