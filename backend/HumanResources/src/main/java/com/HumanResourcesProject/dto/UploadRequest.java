package com.HumanResourcesProject.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UploadRequest {
    private String fileName;
    private String contentType;
    private String base64Content;
    private Long personalId;
    private String description;
}
