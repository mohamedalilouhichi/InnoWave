package tn.esprit.backend.Control;

import org.apache.poi.sl.usermodel.ObjectMetaData;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import tn.esprit.backend.Entite.Message;
import tn.esprit.backend.Service.Message.IMessageService;
import tn.esprit.backend.Service.Message.MessageService;

import java.io.IOException;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/messages")
public class MessageControl {
    private static final Logger logger = LoggerFactory.getLogger(MessageControl.class);

    private final MessageService messageService;
    private final SimpMessagingTemplate messagingTemplate;

    @Autowired
    public MessageControl(MessageService messageService, SimpMessagingTemplate messagingTemplate) {
        this.messageService = messageService;
        this.messagingTemplate = messagingTemplate;
    }

    @MessageMapping("/chat")
    public void processMessage(@Payload Message message) {
        // Process the received message here
    }

    @GetMapping("/all")
    public List<Message> retrieveAllMessage() {
        return messageService.retrieveAllMessage();
    }

//    @PostMapping("/add/{senderId}/{receiverId}")
//    public ResponseEntity<Message> addMessage(@RequestBody String messageContent, @PathVariable Long senderId, @PathVariable Long receiverId) {
//        Message addedMessage = messageService.addMessage(messageContent, senderId, receiverId);
//        if (addedMessage != null) {
//            // Send a message to the destination user after successfully adding the message
//            messagingTemplate.convertAndSendToUser(receiverId.toString(), "/queue/messages", addedMessage);
//            return ResponseEntity.ok(addedMessage);
//        } else {
//            // Handle case where message addition failed
//            return ResponseEntity.badRequest().build();
//        }
//    }


@PostMapping("/add/{senderId}/{receiverId}")
public ResponseEntity<Message> addMessage(
        @RequestParam(value = "file", required = false) MultipartFile file,
        @RequestParam(value = "content", required = false) String content,
        @PathVariable("senderId") Long senderId,
        @PathVariable("receiverId") Long receiverId) {
    try {
        // Add the message with the provided content, senderId, receiverId, and optional file
        Message addedMessage = messageService.addMessage(content, senderId, receiverId, file);

        // Broadcast the message to the destination user
        messagingTemplate.convertAndSendToUser(receiverId.toString(), "/queue/messages", addedMessage);

        String fileName = null;
        if (file != null && !file.isEmpty()) {
            fileName = file.getOriginalFilename();
        }

        // Add file details to the message
        addedMessage.setFileName(fileName);

        // Return a response entity with the added message
        return ResponseEntity.ok(addedMessage);
    } catch (IOException e) {
        // Log the exception for debugging purposes
        logger.error("Error occurred while adding message", e);
        // Return a bad request response if an IOException occurs
        return ResponseEntity.badRequest().build();
    }
}

    @PutMapping("/delete/{idMessage}")
    public ResponseEntity<Void> removeMessage(@PathVariable Long idMessage) {
        messageService.removeMessage(idMessage);
        messagingTemplate.convertAndSend("/topic/message-deleted", idMessage);
        return ResponseEntity.noContent().build();
    }
    @PostMapping("/add-reaction/{idMessage}")
    public ResponseEntity<Void> addReaction(@PathVariable Long idMessage, @RequestBody String reaction) {
        messageService.addReaction(idMessage, reaction);
        return ResponseEntity.ok().build();
    }
    @DeleteMapping("{idMessage}/reactions")
    public ResponseEntity<Void> deleteAllReactions(@PathVariable Long idMessage) {
        messageService.deleteReactions(idMessage);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/telecharger-pdf/{idMessage}")
    public ResponseEntity<Resource> telechargerPDF(@PathVariable("idMessage") long idMessage) {
        Message message= messageService.retreiveMessageById(idMessage);
        ByteArrayResource resource = new ByteArrayResource(message.getFile());

        HttpHeaders headers = new HttpHeaders();
        headers.add(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=fichier.pdf");

        return ResponseEntity.ok()
                .headers(headers)
                .contentLength(message.getFile().length)
                .contentType(MediaType.APPLICATION_PDF)
                .body(resource);
    }

    @MessageMapping("/send-message")
    @SendTo("/topic/messages")
    public Message sendMessage(Message message) {
        // Process the received message and optionally save it to the database
        // Send a message to the destination user after successfully adding the message
        messagingTemplate.convertAndSendToUser(String.valueOf(message.getReceiver().getIdUser()), "/queue/messages", message);
        return message;
    }

}
