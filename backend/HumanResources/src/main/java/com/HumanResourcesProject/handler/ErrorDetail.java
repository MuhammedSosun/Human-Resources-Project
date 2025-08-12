package com.HumanResourcesProject.handler;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ErrorDetail<E> {
    private String path;

    private LocalDateTime createTime;

    private String host;

    private E message;
}
