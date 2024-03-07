package tn.esprit.backend.Config;

import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import com.google.gson.Gson;
import com.google.gson.JsonObject;
import tn.esprit.backend.Entite.Message;

public class WebSocketHandler extends TextWebSocketHandler {
    private final Map<Integer, WebSocketSession> sessions = new ConcurrentHashMap<>();
    private final SimpMessagingTemplate messagingTemplate;

    public WebSocketHandler(SimpMessagingTemplate messagingTemplate) {
        this.messagingTemplate = messagingTemplate;
    }

    @Override
    public void handleTextMessage(WebSocketSession session, TextMessage message) {
        // Parse incoming message
        try {
            Gson gson = new Gson();
            JsonObject jsonMessage = gson.fromJson(message.getPayload(), JsonObject.class);

            // Check if the message contains reaction data
            if (jsonMessage.has("message") && jsonMessage.has("reaction")) {
                // Convert JSON to Message object
                Message messageObj = gson.fromJson(jsonMessage.get("message"), Message.class);
                String reaction = jsonMessage.get("reaction").getAsString();

                // Check if sender and receiver are valid
                if (messageObj.getSender() != null && messageObj.getReceiver() != null && messageObj.getSender().getIdUser() != messageObj.getReceiver().getIdUser()) {
                    // Get receiver's WebSocket session
                    WebSocketSession receiverSession = sessions.get(messageObj.getReceiver().getIdUser());

                    if (receiverSession != null && receiverSession.isOpen()) {
                        // Broadcast message with reaction to the receiver
                        JsonObject updatedMessage = new JsonObject();
                        updatedMessage.add("message", jsonMessage.get("message"));
                        updatedMessage.addProperty("reaction", reaction);
                        receiverSession.sendMessage(new TextMessage(gson.toJson(updatedMessage)));
                    }
                }
            }
        } catch (Exception ex) {
            // Handle parsing exception or other errors
            ex.printStackTrace();
        }
    }

    public void notifyMessageDeleted(Long messageId) {
        messagingTemplate.convertAndSend("/topic/message-deleted", messageId);
    }
}
