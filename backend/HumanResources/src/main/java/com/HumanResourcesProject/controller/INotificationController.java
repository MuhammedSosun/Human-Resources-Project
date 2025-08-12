package com.HumanResourcesProject.controller;

import com.HumanResourcesProject.dto.DtoNotification;
import com.HumanResourcesProject.pageable.PageableEntity;
import com.HumanResourcesProject.pageable.PageableRequest;

import java.util.List;

public interface INotificationController {
    RootEntity<PageableEntity<DtoNotification>> getUserNotifications(Long userId, PageableRequest request);
    RootEntity<PageableEntity<DtoNotification>> getAllNotificationsForAdmin(PageableRequest request);
    RootEntity<List<DtoNotification>> getUnreadNotifications(Long userId);
    RootEntity<String> markNotificationAsRead( Long notificationId);
    RootEntity<String> deleteNotification(Long id);

}
