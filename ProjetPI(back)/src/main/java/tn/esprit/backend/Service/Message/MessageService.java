package tn.esprit.backend.Service.Message;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import tn.esprit.backend.Entite.Message;
import tn.esprit.backend.Repository.MessageRepo;
import tn.esprit.backend.Repository.UserRepo;

import java.util.Date;
import java.util.List;

@Service
@AllArgsConstructor
public class MessageService implements IMessageService {
    MessageRepo messageRepo;
    UserRepo UserRepo;


    public Message addMessage(String m, Long Sender, Long Receiver) {
        Message message = new Message();
        message.setDate(new Date());
//        message.setSender(se);
//        message.setReceiver(Receiver);
        message.setContent(m);
//        message.setUser(UserRepo.findById(Receiver).orElse(null));
        return messageRepo.save(message);
    }

    @Override
    public List<Message> retrieveAllMessage() {
        return messageRepo.findAll();
    }

    @Override
    public void removeMessage(Long idMessage) {
        Message message = messageRepo.findById(idMessage).orElse(null);
        message.setContent("Message deleted");
        messageRepo.deleteById(idMessage);
    }
}
//    @Override
//    public List<Message> retrieveMessageByUserID(Long idUser) {
//        return messageRepo.findByUserId(idUser);
//
//    }
