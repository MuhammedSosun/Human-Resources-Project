package com.HumanResourcesProject.controller.impl;

import com.HumanResourcesProject.controller.IAuthenticateController;
import com.HumanResourcesProject.controller.RestBaseController;
import com.HumanResourcesProject.controller.RootEntity;
import com.HumanResourcesProject.dto.AuthRequest;
import com.HumanResourcesProject.dto.AuthResponse;
import com.HumanResourcesProject.dto.DtoUser;
import com.HumanResourcesProject.dto.RefreshTokenRequest;
import com.HumanResourcesProject.exception.BaseException;
import com.HumanResourcesProject.exception.ErrorMessage;
import com.HumanResourcesProject.exception.MessageType;
import com.HumanResourcesProject.model.User;
import com.HumanResourcesProject.repository.UserRepository;
import com.HumanResourcesProject.service.IAuthenticateService;
import com.HumanResourcesProject.service.INotificationService;
import jakarta.validation.Valid;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.slf4j.MDC;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class RestAuthenticateControllerImpl extends RestBaseController implements IAuthenticateController {

    private final IAuthenticateService authenticateService;
    private static final Logger logger = LoggerFactory.getLogger(RestAuthenticateControllerImpl.class);
    private final INotificationService notificationService;
    private final UserRepository userRepository;

    public RestAuthenticateControllerImpl(IAuthenticateService authenticateService, INotificationService notificationService, UserRepository userRepository) {
        this.authenticateService = authenticateService;
        this.notificationService = notificationService;
        this.userRepository = userRepository;
    }
    @PreAuthorize("hasAnyRole('IK', 'ADMIN')")
    @PostMapping("/register")
    @Override
    public RootEntity<DtoUser> register(@Valid @RequestBody DtoUser dto) {
        MDC.put("operation","REGISTER");
        MDC.put("username",dto.getUsername());

        logger.info("Yeni kullanıcı kayıt isteği alındı",dto.getUsername());
        RootEntity<DtoUser> response = ok(authenticateService.register(dto));
        logger.info("Kayıt işlemi başarılı: {}",dto.getUsername());

        MDC.clear();
        return response;
    }
    @PostMapping("/authenticate")
    @Override
    public RootEntity<AuthResponse> authenticate(@Valid @RequestBody AuthRequest request) {
        MDC.put("OPERATION", "AUTHENTICATE");
        MDC.put("username", request.getUsername());
        MDC.put("role", "ROLE_ANONYMOUS");
        MDC.put("ip", "0:0:0:0:0:0:0:1"); // Geliştirme ortamı için sabit, gerçek ortamda dynamic alınmalı
        MDC.put("requestId", java.util.UUID.randomUUID().toString());

        logger.info("Kullanıcı giriş isteği alındı: {}", request.getUsername());

        User user = userRepository.findByUsername(request.getUsername())
                .orElseThrow(() -> new BaseException(
                        new ErrorMessage(MessageType.USER_NOT_FOUND, request.getUsername())));

        logger.info("Kullanıcı bulundu: {} / DB username: {}", request.getUsername(), user.getUsername());

        RootEntity<AuthResponse> response = ok(authenticateService.authenticate(request));

        logger.info("Giriş başarılı: {}", request.getUsername());

        notificationService.sendNotificationToUser(user,
                "Giriş Yapıldı",
                "Sisteme başarılı şekilde giriş yaptınız."
        );

        MDC.clear();
        return response;
    }

    @PostMapping("/refreshToken")
    @Override
    public RootEntity<AuthResponse> refreshToken(@Valid @RequestBody RefreshTokenRequest request) {
        MDC.put("OPERATION","REFRES TOKEN");
        MDC.put("username",request.getRefreshToken());
        logger.info("REFRESH TOKEN İSTEĞİ ALINDI");
        RootEntity<AuthResponse> response = ok(authenticateService.refreshToken(request));
        logger.info("REFRESH TOKEN BAŞARIYLA YENİLENDİ");

        return response;
    }
}
