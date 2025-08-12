package com.HumanResourcesProject.service;

import com.HumanResourcesProject.dto.DtoNotification;
import com.HumanResourcesProject.model.User;
import com.HumanResourcesProject.pageable.PageableEntity;
import com.HumanResourcesProject.pageable.PageableRequest;

import java.util.List;

public interface INotificationService {
    // tek bir kullanıcıya bildirim gidecek
    PageableEntity<DtoNotification> getDtoByUser(Long userId, PageableRequest pageableRequest);

    //admin için tüm sistemdeki bildirimler
    PageableEntity<DtoNotification> getDtoAllForAdmin(PageableRequest pageableRequest);

    void sendNotificationToUser(User user,String title,String message);

    void notifyAllAdmins(String title,String message);

    void markAsRead(Long notificationId);

    List<DtoNotification> getUnreadByUser(Long userId);

    void deleteNotification(Long id);



}
