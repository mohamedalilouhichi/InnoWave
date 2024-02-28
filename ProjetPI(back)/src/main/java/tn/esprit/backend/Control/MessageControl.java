package tn.esprit.backend.Control;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.*;
import tn.esprit.backend.Entite.Message;
import tn.esprit.backend.Service.Message.IMessageService;
import tn.esprit.backend.Service.Message.MessageService;

import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/messages")
public class MessageControl {

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

    @PostMapping("/add/{senderId}/{receiverId}")
    public ResponseEntity<Message> addMessage(@RequestBody String messageContent, @PathVariable Long senderId, @PathVariable Long receiverId) {
        Message addedMessage = messageService.addMessage(messageContent, senderId, receiverId);
        if (addedMessage != null) {
            // Send a message to the destination user after successfully adding the message
            messagingTemplate.convertAndSendToUser(receiverId.toString(), "/queue/messages", addedMessage);
            return ResponseEntity.ok(addedMessage);
        } else {
            // Handle case where message addition failed
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
