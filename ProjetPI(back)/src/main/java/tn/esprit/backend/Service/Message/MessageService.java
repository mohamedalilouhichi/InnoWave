package tn.esprit.backend.Service.Message;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import tn.esprit.backend.Entite.Message;
import tn.esprit.backend.Entite.User;
import tn.esprit.backend.Repository.MessageRepo;
import tn.esprit.backend.Repository.UserRepo;

import java.util.Date;
import java.util.Iterator;
import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class MessageService implements IMessageService {
    MessageRepo messageRepo;
    UserRepo UserRepo;


    public Message addMessage(String m, Long senderId, Long receiverId) {
        Message message = new Message();
        message.setDate(new Date());

        // Set the sender and receiver using their IDs
        User sender = UserRepo.findById(senderId).orElse(null);
        User receiver = UserRepo.findById(receiverId).orElse(null);

        if (sender != null && receiver != null) {
            message.setSender(sender);
            message.setReceiver(receiver);
            message.setContent(m);
            return messageRepo.save(message);
        } else {
            return null;
        }
    }

    @Override
    public List<Message> retrieveAllMessage() {
        return messageRepo.findAll();
    }

    @Override
    public void removeMessage(Long idMessage) {
        Message message = messageRepo.findById(idMessage).orElse(null);
        message.setContent("Message deleted");
        messageRepo.save(message);
    }
    public void addReaction(Long idMessage, String reaction) {
        Message message = messageRepo.findById(idMessage).orElse(null);
        if (message != null) {
            message.getReactions().add(reaction);
            messageRepo.save(message);
        }
    }

    public void deleteReactions(Long idMessage) {
        Message message = messageRepo.findById(idMessage).orElse(null);
        if (message != null) {
            message.getReactions().clear(); // Clear all reactions associated with the message
            messageRepo.save(message);
        }
    }






}
//    @Override
//    public List<Message> retrieveMessageByUserID(Long idUser) {
//        return messageRepo.findByUserId(idUser);
//
//    }
