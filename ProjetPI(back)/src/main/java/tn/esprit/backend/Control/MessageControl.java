package tn.esprit.backend.Control;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
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
        Message addedMessage = messageService.addMessage(content, senderId, receiverId, file);
        return ResponseEntity.ok(addedMessage);
    } catch (IOException e) {
        // Log the exception for debugging purposes
        logger.error("Error occurred while adding message", e);
        return ResponseEntity.badRequest().build();
    }
}

    @PutMapping("/delete/{idMessage}")
    public ResponseEntity<Void> removeMessage(@PathVariable Long idMessage) {
        messageService.removeMessage(idMessage);
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





}
