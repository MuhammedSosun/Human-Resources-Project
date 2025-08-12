package com.HumanResourcesProject.service.impl;

import com.HumanResourcesProject.dto.AuthRequest;
import com.HumanResourcesProject.dto.AuthResponse;
import com.HumanResourcesProject.dto.DtoUser;
import com.HumanResourcesProject.dto.RefreshTokenRequest;
import com.HumanResourcesProject.enums.OperationType;
import com.HumanResourcesProject.enums.Role;
import com.HumanResourcesProject.exception.BaseException;
import com.HumanResourcesProject.exception.ErrorMessage;
import com.HumanResourcesProject.exception.MessageType;
import com.HumanResourcesProject.jwt.JwtService;
import com.HumanResourcesProject.mapper.RefreshTokenMapper;
import com.HumanResourcesProject.mapper.UserMapper;
import com.HumanResourcesProject.model.Personal;
import com.HumanResourcesProject.model.RefreshToken;
import com.HumanResourcesProject.model.User;
import com.HumanResourcesProject.repository.IRefreshTokenRepository;
import com.HumanResourcesProject.repository.PersonalRepository;
import com.HumanResourcesProject.repository.UserRepository;
import com.HumanResourcesProject.service.IAuthenticateService;
import com.HumanResourcesProject.logging.LoggableOperation;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Date;

@Service
public class AuthenticateServiceImpl implements IAuthenticateService {

    private static final Logger logger = LoggerFactory.getLogger(AuthenticateServiceImpl.class);

    private final JwtService jwtService;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;
    private final AuthenticationProvider authenticationProvider;
    private final UserRepository userRepository;
    private final IRefreshTokenRepository refreshTokenRepository;
    private final PersonalRepository personalRepository;
    private final NotificationServiceImpl notificationService;

    public AuthenticateServiceImpl(
            JwtService jwtService,
            BCryptPasswordEncoder bCryptPasswordEncoder,
            AuthenticationProvider authenticationProvider,
            UserRepository userRepository,
            IRefreshTokenRepository refreshTokenRepository,
            PersonalRepository personalRepository, NotificationServiceImpl notificationService
    ) {
        this.jwtService = jwtService;
        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
        this.authenticationProvider = authenticationProvider;
        this.userRepository = userRepository;
        this.refreshTokenRepository = refreshTokenRepository;
        this.personalRepository = personalRepository;
        this.notificationService = notificationService;
    }

    @LoggableOperation(OperationType.AUTHENTICATION_REGISTER)
    @Override
    public DtoUser register(DtoUser dto) {
        logger.info("[REGISTER] Başlatıldı. Username: {}, Role: {}", dto.getUsername(), dto.getRole());

        userRepository.findByUsername(dto.getUsername()).ifPresent(user -> {
            logger.warn("Kayıt başarısız. Kullanıcı zaten mevcut: {}", dto.getUsername());
            throw new BaseException(new ErrorMessage(MessageType.USER_ALREADY_EXIST, dto.getUsername()));
        });

        User user = UserMapper.toEntity(dto, bCryptPasswordEncoder);

        if (dto.getRole() == Role.PERSONAL) {
            if (dto.getRegistrationNo() == null) {
                logger.error("Kayıt başarısız. PERSONAL rolü için registrationNo boş olamaz.");
                throw new BaseException(new ErrorMessage(MessageType.REGISTRATION_NO_IS_MONDATORY, "Please enter registration no"));
            }

            Personal personal = personalRepository.findPersonalByRegistrationNo(dto.getRegistrationNo())
                    .orElseThrow(() -> {
                        logger.error("Kayıt başarısız. registrationNo bulunamadı: {}", dto.getRegistrationNo());
                        return new BaseException(new ErrorMessage(MessageType.REGISTRATION_NO_NOT_FOUND, dto.getRegistrationNo().toString()));
                    });
            logger.info("[REGISTER] Personal bulundu: {}, ID: {}", personal.getFirstName(), personal.getId());

            user.setPersonal(personal);
        }

        user = userRepository.save(user);
        logger.info("[REGISTER] Kayıt tamamlandı. UserID: {}, Username: {}, Role: {}", user.getId(), user.getUsername(), user.getRole());

        return UserMapper.toDto(user);
    }
    @LoggableOperation(OperationType.AUTHENTICATION_LOGIN)
    @Override
    public AuthResponse authenticate(AuthRequest authRequest) {
        logger.info("[AUTH] Giriş denemesi. Username: {}", authRequest.getUsername());
        //notificationService.notifyAllAdmins(
//         "Yeni Giriş", authRequest.getUsername() + " sisteme giriş yaptı.");
        try {
            authenticationProvider.authenticate(
                    new UsernamePasswordAuthenticationToken(authRequest.getUsername(), authRequest.getPassword())
            );
            logger.info("[AUTH] AuthenticationProvider doğrulama başarılı.");

            User user = userRepository.findByUsername(authRequest.getUsername())
                    .orElseThrow(() -> {
                        logger.error("Giriş başarısız. Kullanıcı bulunamadı: {}", authRequest.getUsername());
                        return new BaseException(new ErrorMessage(MessageType.USER_NOT_FOUND, authRequest.getUsername()));
                    });

            String accessToken = jwtService.generateToken(user);
            RefreshToken refreshToken = refreshTokenRepository.save(RefreshTokenMapper.generate(user));

            logger.info("[AUTH] Token üretildi. UserID: {}, Username: {}", user.getId(), user.getUsername());
            return new AuthResponse(accessToken, refreshToken.getRefreshToken());

        } catch (Exception e) {
            logger.warn("Giriş sırasında hata oluştu. Kullanıcı: {}, Hata: {}", authRequest.getUsername(), e.getMessage());
            throw new BaseException(new ErrorMessage(MessageType.USERNAME_OR_PASSWORD_INVALID, e.getMessage()));
        }
    }
    @LoggableOperation(OperationType.AUTHENTICATION_REFRESH_TOKEN)
    @Override
    public AuthResponse refreshToken(RefreshTokenRequest request) {
        logger.info("[REFRESH] Refresh token işlemi başlatıldı.");

        RefreshToken refreshToken = refreshTokenRepository.findByRefreshToken(request.getRefreshToken())
                .orElseThrow(() -> {
                    logger.error("Refresh token bulunamadı: {}", request.getRefreshToken());
                    return new BaseException(new ErrorMessage(MessageType.REFRESH_TOKEN_NOT_FOUND, request.getRefreshToken()));
                });

        if (!isValid(refreshToken.getExpireDate())) {
            logger.warn("Refresh token süresi dolmuş: {}", request.getRefreshToken());
            throw new BaseException(new ErrorMessage(MessageType.REFRESH_TOKEN_IS_EXPIRED, request.getRefreshToken()));
        }

        User user = refreshToken.getUser();
        String accessToken = jwtService.generateToken(user);
        RefreshToken newRefresh = refreshTokenRepository.save(RefreshTokenMapper.generate(user));

        logger.info("[REFRESH] Token yenilendi. UserID: {}, Username: {}", user.getId(), user.getUsername());
        return new AuthResponse(accessToken, newRefresh.getRefreshToken());
    }

    private boolean isValid(Date expireDate) {
        return new Date().before(expireDate);
    }
}
