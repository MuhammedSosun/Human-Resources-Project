package com.HumanResourcesProject.mapper;

import com.HumanResourcesProject.dto.DtoNotification;
import com.HumanResourcesProject.dto.DtoUser;
import com.HumanResourcesProject.model.Notification;
import org.springframework.stereotype.Component;


@Component
public class NotificationMapper {

    public  DtoNotification toDto(Notification n) {
        DtoNotification dto = new DtoNotification();
        dto.setId(n.getId());
        dto.setCreateTime(n.getCreateTime());
        dto.setRead(n.getRead());
        dto.setTitle(n.getTitle());
        dto.setMessage(n.getMessage());

        DtoUser dtoUser = new DtoUser();
        dtoUser.setId(n.getUser().getId());
        dtoUser.setUsername(n.getUser().getUsername());
        dto.setUser(dtoUser);

        return dto;
    }

    }