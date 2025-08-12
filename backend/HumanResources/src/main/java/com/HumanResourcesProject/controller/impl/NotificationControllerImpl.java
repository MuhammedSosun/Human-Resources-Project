package com.HumanResourcesProject.controller.impl;

import com.HumanResourcesProject.controller.INotificationController;
import com.HumanResourcesProject.controller.RootEntity;
import com.HumanResourcesProject.dto.DtoNotification;
import com.HumanResourcesProject.service.INotificationService;
import com.HumanResourcesProject.pageable.PageableEntity;
import com.HumanResourcesProject.pageable.PageableRequest;
import lombok.extern.slf4j.Slf4j;


import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
@RestController
@RequestMapping("/rest/api/notification")
@Slf4j
public class NotificationControllerImpl extends RootEntity implements INotificationController {

    private final INotificationService notificationService;
    private final SimpMessagingTemplate simpMessagingTemplate;
    //private static final Logger logger = LoggerFactory.getLogger(NotificationControllerImpl.class);

    public NotificationControllerImpl(INotificationService notificationService, SimpMessagingTemplate simpMessagingTemplate) {
        this.notificationService = notificationService;
        this.simpMessagingTemplate = simpMessagingTemplate;
    }


    @Override
    @PostMapping("/user/{userId}")
    public RootEntity<PageableEntity<DtoNotification>> getUserNotifications(@PathVariable Long userId,
                                                                            @RequestBody PageableRequest request) {
        PageableEntity<DtoNotification> data = notificationService.getDtoByUser(userId,request);

        log.info("kullanıcı alındı");
        return ok(data);
    }


    //@PreAuthorize("hasAnyRole('ADMIN')")
    @Override
    @PostMapping("/admin/all")
    public RootEntity<PageableEntity<DtoNotification>> getAllNotificationsForAdmin(@RequestBody PageableRequest request) {
        PageableEntity<DtoNotification> data = notificationService.getDtoAllForAdmin(request);
        log.info("bildirimler admine gönderildi");
        return ok(data);
    }
    @Override
    @GetMapping("/user/{userId}/unread")
    public RootEntity<List<DtoNotification>> getUnreadNotifications(@PathVariable Long userId) {
        List<DtoNotification> unreads =  notificationService.getUnreadByUser(userId);
        log.info("ilgili id'li kullanıcıya bildirim gitti: {}", userId);
        return ok(unreads);
    }

    @Override
    @PutMapping("/{notificationId}/mark-read")
    public RootEntity<String> markNotificationAsRead(@PathVariable Long notificationId) {
        notificationService.markAsRead(notificationId);
        return ok("Successfully");
    }

    @DeleteMapping("delete/{id}")
    @Override
    public RootEntity<String> deleteNotification(@PathVariable Long id) {
        notificationService.deleteNotification(id);
        log.info("bildirim silindi");
        return ok("OK");
    }

}
