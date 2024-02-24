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

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/messages")
public class MessageControl {

    @Autowired
    MessageService messageService;

    @Autowired
    IMessageService iMessageService;

    @Autowired
    SimpMessagingTemplate messagingTemplate;

    @MessageMapping("/chat")
    public void processMessage(@Payload Message message) {
        // Process the received message here
    }

    @GetMapping("/all")
    public List<Message> retrieveAllMessage() {
        return messageService.retrieveAllMessage();
    }

//    @GetMapping("/{idUser}")
//    public List<Message> retrieveMessageByUserID(@PathVariable Long idUser){
//        return messageService.retrieveMessageByUserID(idUser);
//    }

    @PostMapping("/add/{Sender}/{Receiver}")
    public Message addMessage(@RequestBody String message, @PathVariable Long Sender, @PathVariable Long Receiver) {
        return messageService.addMessage(message, Sender, Receiver);
    }

    @DeleteMapping("/delete")
    public void removeMessage(@RequestParam Long idMessage) {
        messageService.removeMessage(idMessage);
    }
}

