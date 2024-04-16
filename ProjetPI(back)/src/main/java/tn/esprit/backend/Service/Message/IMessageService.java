package tn.esprit.backend.Service.Message;

import org.springframework.web.multipart.MultipartFile;
import tn.esprit.backend.Entite.Message;
import tn.esprit.backend.Entite.Stage;

import java.io.IOException;
import java.util.List;

public interface IMessageService {






    Message addMessage(String content, Long senderId, Long receiverId, MultipartFile file) throws IOException;


//    public Message addMessage(String m , Long Sender , Long Receiver);
    public List<Message> retrieveAllMessage ();

    public void removeMessage(Long idMessage);
    public void addReaction(Long messageId, String reaction);

//    List<Message> retrieveMessageByUserID(Long idUser);

}
