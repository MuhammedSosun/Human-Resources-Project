package com.HumanResourcesProject.config;

import com.HumanResourcesProject.handler.AuthEntryPoint;
import com.HumanResourcesProject.jwt.JwtAuthenticationFilter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
public class SecurityConfig {

    public static final String REGISTER ="/register";
    public static final String AUTHENTICATE = "/authenticate";
    public static final String REFRESH_TOKEN = "/refreshToken";
    public static final String ADMIN_ENDPOINT = "/api/admin/**";
    public static final String PERSONEL_ENDPOINT = "/rest/api/personal/**";
    public static final String ENVANTER_ENDPOINT = "/rest/api/envanter/**";

    public static final String[] SWAGGER_PATHS = {
            "/v3/api-docs/**",
            "/swagger-ui/**",
            "/swagger-ui.html",
            "/swagger-resources/**",
            "/webjars/**"
    };

    private final AuthEntryPoint authEntryPoint;
    private final JwtAuthenticationFilter authenticationFilter;
    //kullanıcı adı şifre doğrulamasını sağlıyor
    private final AuthenticationProvider authenticationProvider;


    public SecurityConfig(AuthEntryPoint authEntryPoint, JwtAuthenticationFilter authenticationFilter, AuthenticationProvider authenticationProvider) {
        this.authEntryPoint = authEntryPoint;
        this.authenticationFilter = authenticationFilter;
        this.authenticationProvider = authenticationProvider;
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http.cors(cors ->cors.configure(http))
                .csrf(csrf-> csrf.disable())
                .authorizeHttpRequests(auth->auth
                        .requestMatchers(SWAGGER_PATHS).permitAll()
                        .requestMatchers(REGISTER,AUTHENTICATE,REFRESH_TOKEN).permitAll()
                        .requestMatchers(ADMIN_ENDPOINT).hasRole("ADMIN")
                        .requestMatchers("/rest/api/personal/me").hasRole("PERSONAL")
                        .requestMatchers("/rest/api/personal/{id}/photo").hasAnyRole("ADMIN", "IK", "PERSONAL")
                        .requestMatchers("/rest/api/notification/delete/{id}").hasAnyRole("ADMIN", "IK", "PERSONAL","ENVANTER")
                        .requestMatchers(PERSONEL_ENDPOINT).hasAnyRole("ADMIN", "IK" , "ENVANTER")
                        .requestMatchers(ENVANTER_ENDPOINT).hasRole("ENVANTER")
                        .requestMatchers("/ws/**").permitAll()
                        .anyRequest().authenticated())
                .exceptionHandling(exception->exception.authenticationEntryPoint(authEntryPoint))
                .sessionManagement(session->session
                        .sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authenticationProvider(authenticationProvider)
                .addFilterBefore(authenticationFilter, UsernamePasswordAuthenticationFilter.class);
        return http.build();
    }
}
