package com.HumanResourcesProject.service.impl;

import com.HumanResourcesProject.dto.DtoNotification;
import com.HumanResourcesProject.enums.OperationType;
import com.HumanResourcesProject.enums.Role;
import com.HumanResourcesProject.exception.BaseException;
import com.HumanResourcesProject.exception.ErrorMessage;
import com.HumanResourcesProject.exception.MessageType;
import com.HumanResourcesProject.mapper.NotificationMapper;
import com.HumanResourcesProject.model.Notification;
import com.HumanResourcesProject.model.User;
import com.HumanResourcesProject.repository.NotificationRepository;
import com.HumanResourcesProject.repository.UserRepository;
import com.HumanResourcesProject.service.INotificationService;
import com.HumanResourcesProject.pageable.PageUtil;
import com.HumanResourcesProject.pageable.PageableEntity;
import com.HumanResourcesProject.pageable.PageableRequest;
import com.HumanResourcesProject.logging.LoggableOperation;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import java.util.List;

@Slf4j
@Service
public class NotificationServiceImpl implements INotificationService {

    private final NotificationRepository notificationRepository;

    private final UserRepository userRepository;
    private final SimpMessagingTemplate messagingTemplate;
    private final NotificationMapper notificationMapper;

    public NotificationServiceImpl(NotificationRepository notificationRepository, UserRepository userRepository, SimpMessagingTemplate messagingTemplate, NotificationMapper notificationMapper) {
        this.notificationRepository = notificationRepository;
        this.userRepository = userRepository;
        this.messagingTemplate = messagingTemplate;
        this.notificationMapper = notificationMapper;
    }

    @LoggableOperation(OperationType.NOTIFICATION_GET_BY_USER)
    @Override
    public PageableEntity<DtoNotification> getDtoByUser(Long userId, PageableRequest request) {
        User user = getUserOrThrow(userId);

        Pageable pageable = PageUtil.toPageable(request);

        Page<Notification> page = notificationRepository.findByUserOrderByCreateTimeDesc(user,pageable);

        List<DtoNotification> dtoNotifications = page.getContent()
                .stream().map(notificationMapper::toDto)
                .toList();
        log.info("Bildirimler yükleniyor. Kullanıcı ID: {}, Page: {}, Size: {}", userId, request.getPageNumber(), request.getPageSize());
        return PageUtil.toPageableResponse(page,dtoNotifications);

    }
    @LoggableOperation(OperationType.NOTIFICATION_LIST_ALL)
    @Override
    public PageableEntity<DtoNotification> getDtoAllForAdmin(PageableRequest request) {

        Pageable pageable = PageUtil.toPageable(request);

        Page<Notification> page = notificationRepository.findAllByOrderByCreateTimeDesc(pageable);
        List<DtoNotification> dtoList = page.getContent()
                .stream()
                .map(notificationMapper::toDto)
                .toList();
        log.info("Admin için tüm bildirimler yükleniyor. Page: {}, Size: {}", request.getPageNumber(), request.getPageSize());
        return PageUtil.toPageableResponse(page, dtoList);
    }

    @Override
    public void sendNotificationToUser(User user,String title, String message) {

        Notification notification = new Notification();
        notification.setUser(user);
        notification.setTitle(title);
        notification.setMessage(message);
        notification.setRead(false);
        notificationRepository.save(notification);

        log.info("Bildirim DB'ye kaydedildi → Kullanıcı: {}, Başlık: {}", user.getUsername(), title);

        DtoNotification dto = notificationMapper.toDto(notification);

        try {
            messagingTemplate.convertAndSendToUser(
                    user.getUsername(),
                    "/queue/notifications",
                    dto
            );
            log.info("📤 WebSocket ile anlık bildirim gönderildi → username: {}, Kanal: {}, Başlık: {}",
                    user.getUsername(), "/queue/notifications", title);
        } catch (Exception e) {
            log.error("Bildirim gönderilemedi! Kullanıcı: {}, Hata: {}", user.getUsername(), e.getMessage(), e);
        }
    }

    @LoggableOperation(OperationType.NOTIFICATION_LIST_ALL)
    @Override
    public void notifyAllAdmins(String title, String message) {
        List<User> admins = userRepository.findByRole(Role.ADMIN);
        log.info("🟡 {} admin bulundu, toplu bildirim gönderiliyor. Başlık: {}", admins.size(), title);

        for (User admin : admins){
            sendNotificationToUser( admin,title, message);
        }

        log.info("Tüm admin kullanıcılarına bildirim gönderimi tamamlandı.");
    }

    @LoggableOperation(OperationType.NOTIFICATION_MARK_AS_READ)
    @Override
    public void markAsRead(Long notificationId) {
        Notification notification = notificationRepository.findById(notificationId)
                .orElseThrow(() -> new BaseException(new ErrorMessage(MessageType.NOTIFICATION_NOT_FOUND,notificationId.toString())));
        notification.setRead(true);
        notificationRepository.save(notification);
        log.info("Bildirim okundu olarak işaretlendi. ID: {}", notificationId);

    }
    @LoggableOperation(OperationType.NOTIFICATON_LIST_UNREAD)
    @Override
    public List<DtoNotification> getUnreadByUser(Long userId) {
        User user = getUserOrThrow(userId);

        List<Notification> unReads= notificationRepository.findByUserAndReadFalseOrderByCreateTimeDesc(user);
        log.info("Kullanıcının okunmamış bildirimleri sorgulanıyor. Kullanıcı ID: {}", userId);
        return unReads.stream()
                .map(notificationMapper::toDto)
                .toList();

    }
    @LoggableOperation(OperationType.NOTIFICATION_DELETE)
    @Override
    public void deleteNotification(Long id) {
        Notification notification = notificationRepository.findById(id)
                .orElseThrow(() -> new BaseException(new ErrorMessage(MessageType.NOTIFICATION_NOT_FOUND,id.toString())));
        notificationRepository.delete(notification);
        log.info("Bildirim siliniyor. ID: {}", id);
    }

    private User getUserOrThrow(Long userId){
        return  userRepository.findById(userId).orElseThrow(
                ()->new BaseException(new ErrorMessage(MessageType.USER_NOT_FOUND,userId.toString()))
        );
    }


}
