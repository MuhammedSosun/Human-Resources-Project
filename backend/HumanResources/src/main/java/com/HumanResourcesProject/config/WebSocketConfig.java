package com.HumanResourcesProject.config;

import com.HumanResourcesProject.jwt.JwtService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.Message;
import org.springframework.messaging.MessageChannel;
import org.springframework.messaging.simp.config.ChannelRegistration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.messaging.simp.stomp.StompCommand;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.messaging.support.ChannelInterceptor;
import org.springframework.messaging.support.MessageHeaderAccessor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

@Slf4j
@Configuration
@EnableWebSocketMessageBroker
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {
    private final JwtService jwtService;
    private final UserDetailsService userDetailsService;

    public WebSocketConfig(JwtService jwtService, UserDetailsService userDetailsService) {
        this.jwtService = jwtService;
        this.userDetailsService = userDetailsService;
    }

    @Override
    public void configureMessageBroker(MessageBrokerRegistry config) {
        config.enableSimpleBroker("/topic","/queue");
        config.setUserDestinationPrefix("/user");
        config.setApplicationDestinationPrefixes("/app");
        log.info("connected configureMessageBroker successfully");
    }
    //bu method ta izinleri sağlıyoruz tüm herkes erişebiliri "*"
    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        registry.addEndpoint("/ws")
                .setAllowedOriginPatterns("*");
        log.info("registerStompEndpoints successfully");
    }
  //bu güvenlik için token bilgilerine göre websocket işlemine tanınmıs özel method
    //bu yorumu düzelt tam açık değil!!
    @Override
    public void configureClientInboundChannel(ChannelRegistration registration) {
        registration.interceptors(new ChannelInterceptor() {
            @Override
            public Message<?> preSend(Message<?> message, MessageChannel channel) {
                StompHeaderAccessor accessor =
                        MessageHeaderAccessor.getAccessor(message, StompHeaderAccessor.class);

                if (StompCommand.CONNECT.equals(accessor != null ? accessor.getCommand() : null)) {
                    String authHeader = accessor.getFirstNativeHeader("Authorization");

                    if (authHeader == null || !authHeader.startsWith("Bearer ")) {
                        log.warn("STOMP bağlantısı → Authorization header eksik veya geçersiz.");
                        return message;
                    }

                    String jwt = authHeader.substring(7);
                    String username = jwtService.getUsernameByToken(jwt);
                    log.info("STOMP Token alındı → Kullanıcı adı (token içinden): {}", username);

                    if (username == null) {
                        log.warn("STOMP bağlantısı → Token'dan kullanıcı adı çözülemedi.");
                        return message;
                    }

                    UserDetails userDetails = userDetailsService.loadUserByUsername(username);

                    if (!jwtService.isTokenValid(jwt, userDetails)) {
                        log.warn("STOMP bağlantısı → Token geçersiz. Kullanıcı: {}", username);
                        return message;
                    }

                    Authentication auth = new UsernamePasswordAuthenticationToken(
                            userDetails, null, userDetails.getAuthorities());
                    accessor.setUser(auth);

                    log.info("STOMP bağlantısı doğrulandı → username: {}", userDetails.getUsername());
                    log.info(" accessor.setUser(auth) ile Principal set edildi: {}", auth.getName());

                }

                return message;
            }
        });
    }



}
