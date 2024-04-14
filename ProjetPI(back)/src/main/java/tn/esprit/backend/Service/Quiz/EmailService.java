package tn.esprit.backend.Service.Quiz;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.apache.pdfbox.pdmodel.common.PDRectangle;
import org.apache.pdfbox.pdmodel.font.PDFont;
import org.apache.pdfbox.pdmodel.graphics.image.PDImageXObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.mail.MailException;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.pdmodel.PDPage;
import org.apache.pdfbox.pdmodel.PDPageContentStream;
import org.apache.pdfbox.pdmodel.font.PDType1Font;

import java.io.ByteArrayOutputStream;
import java.io.IOException;


@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    @Autowired
    private TemplateEngine templateEngine;


    public byte[] generateCertificate(String userName, int score) throws IOException {
        try (PDDocument document = new PDDocument()) {
            PDPage page = new PDPage(PDRectangle.A4);
            document.addPage(page);

            try (PDPageContentStream contentStream = new PDPageContentStream(document, page)) {

                // Title
                PDFont titleFont = PDType1Font.TIMES_BOLD;
                String title = "Certificate of Completion";
                float titleWidth = titleFont.getStringWidth(title) / 1000 * 26;
                float titleX = (page.getMediaBox().getWidth() - titleWidth) / 2;
                contentStream.beginText();
                contentStream.setFont(titleFont, 26);
                contentStream.newLineAtOffset(titleX, 700);
                contentStream.showText(title);
                contentStream.endText();

                // Name
                contentStream.beginText();
                contentStream.setFont(PDType1Font.TIMES_ROMAN, 16);
                contentStream.newLineAtOffset(100, 650);
                contentStream.showText("This certifies that " + userName);
                contentStream.endText();

                // Score
                contentStream.beginText();
                contentStream.setFont(PDType1Font.TIMES_ROMAN, 16);
                contentStream.newLineAtOffset(100, 625);
                contentStream.showText("has successfully completed the quiz with a score of " + score + "%.");
                contentStream.endText();

                // Draw line
                contentStream.moveTo(70, 600);
                contentStream.lineTo(530, 600);
                contentStream.stroke();
            }

            ByteArrayOutputStream out = new ByteArrayOutputStream();
            document.save(out);
            document.close();
            return out.toByteArray();
        }
    }


    public void sendQuizSuccessEmail(String to, String name, int score, byte[] attachment) throws Exception {
        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true);

        helper.setTo(to);
        helper.setSubject("Quiz Success and Your Certificate");
        helper.setText("Hello " + name + ",\n\nCongratulations on passing the quiz! Please find attached your Certificate of Completion.");

        // Add the PDF as an attachment
        helper.addAttachment("Certificate.pdf", new ByteArrayResource(attachment));

        mailSender.send(message);
    }
}
