package com.HumanResourcesProject.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.SuperBuilder;

@Getter
@Setter
public class DtoNotification extends DtoBase{

    private String title;

    private String message;

    private DtoUser user;

    private boolean read;
}
