package com.HumanResourcesProject.dto;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class DtoBase {
    private Long id;

    private LocalDateTime createTime;
}
