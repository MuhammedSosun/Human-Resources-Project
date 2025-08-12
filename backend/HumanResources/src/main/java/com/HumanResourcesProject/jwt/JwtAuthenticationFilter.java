package com.HumanResourcesProject.jwt;

import com.HumanResourcesProject.exception.BaseException;
import com.HumanResourcesProject.exception.ErrorMessage;
import com.HumanResourcesProject.exception.MessageType;
import io.jsonwebtoken.ExpiredJwtException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.slf4j.MDC;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;


//gelen tokeni filtreler ve analiz eder
@Component                                    //bir kere çağır
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JwtService jwtService;
    private final UserDetailsService userDetailsService;
    private static final Logger logger = LoggerFactory.getLogger(JwtAuthenticationFilter.class);

    public JwtAuthenticationFilter(JwtService jwtService, UserDetailsService userDetailsService) {
        this.jwtService = jwtService;
        this.userDetailsService = userDetailsService;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain)
            throws ServletException, IOException {

        String header = request.getHeader("Authorization");
        if (header == null || !header.startsWith("Bearer ")) {
            filterChain.doFilter(request, response);
            return;
        }

        String token = header.substring(7);
        String username ;

        try {
            username = jwtService.getUsernameByToken(token);
            MDC.put("username",username);
            logger.info("TOKEN BAŞARIYLA ÇÖZÜLDÜ. Kullanıcı: {}" , username );
        } catch (ExpiredJwtException e) {
            logger.warn("Token süresi dolmuş. Hata: {}", e.getMessage());
            throw new BaseException(new ErrorMessage(MessageType.TOKEN_IS_EXPIRED, e.getMessage()));
        } catch (Exception e) {
            logger.error("❌ Token çözümlemesi sırasında genel hata oluştu: {}", e.getMessage());
            throw new BaseException(new ErrorMessage(MessageType.GENERAL_EXCEPTION, e.getMessage()));
        }

        if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {
            UserDetails userDetails = userDetailsService.loadUserByUsername(username);
            boolean isTokenValid = jwtService.isTokenValid(token, userDetails);
            if (isTokenValid) {
                MDC.put("role",userDetails.getAuthorities().toString());
                UsernamePasswordAuthenticationToken auth =
                        new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
                SecurityContextHolder.getContext().setAuthentication(auth);
                logger.info("🔐 Kullanıcı doğrulandı ve SecurityContext'e eklendi.");
            } else {
                logger.warn("🚫 Token geçersiz. Kullanıcı: {}", username);
            }
        }

        filterChain.doFilter(request, response);
        MDC.clear();
    }
}
