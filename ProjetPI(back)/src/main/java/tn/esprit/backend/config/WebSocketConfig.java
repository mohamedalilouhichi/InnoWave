package tn.esprit.backend.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

@Configuration
//indique que l'application agira comme un serveur WebSocke
@EnableWebSocketMessageBroker
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {
// configurartion de la gestionnaire et l'intercepteur websocket

    @Override
    public void configureMessageBroker(MessageBrokerRegistry config) {
       // le serveur utilisera un courtier de messages simple pour gérer les messages destinés aux destinations préfixées par "/topic"
        config.enableSimpleBroker("/topic");
       // filtrer les destinations auxquelles les messages peuvent être envoyés depuis le client.
        config.setApplicationDestinationPrefixes("/app");
    }
    //enregistre les points de terminaison STOMP auprès du serveur.
    // endpoint : URL auxquelles les clients peuvent se connecter pour établir une connexion WebSocket
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        //autorisées à se connecter à ce point de terminaison
        //Active le support de SockJS, qui permet de recourir à des alternatives à WebSocket si nécessaire.
        registry.addEndpoint("/ws").setAllowedOrigins("http://localhost:4200").withSockJS();
    }
}