package tn.esprit.backend.Config;

import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import com.google.gson.Gson;
import com.google.gson.JsonObject;

public class WebSocketHandler extends TextWebSocketHandler {
    private final Map<Integer, WebSocketSession> sessions = new ConcurrentHashMap<>();

    @Override
    public void handleTextMessage(WebSocketSession session, TextMessage message) {
        // Parse incoming message
        try {
            Gson gson = new Gson();
            JsonObject jsonMessage = gson.fromJson(message.getPayload(), JsonObject.class);
            int senderId = jsonMessage.get("sender").getAsInt();
            int receiverId = jsonMessage.get("receiver").getAsInt();
            String content = jsonMessage.get("content").getAsString();

            // Check if sender and receiver are valid
            if (senderId > 0 && receiverId > 0 && senderId != receiverId) {
                // Get receiver's WebSocket session
                WebSocketSession receiverSession = sessions.get(receiverId);

                if (receiverSession != null && receiverSession.isOpen()) {
                    // Broadcast message to the receiver
                    receiverSession.sendMessage(new TextMessage(content));
                } else {
                    // Handle receiver not found or session closed
                    // You may choose to handle this case differently based on your requirements
                }
            } else {
                // Handle invalid sender or receiver ID
                // You may choose to handle this case differently based on your requirements
            }
        } catch (Exception ex) {
            // Handle parsing exception or other errors
            ex.printStackTrace();
        }
    }

}
