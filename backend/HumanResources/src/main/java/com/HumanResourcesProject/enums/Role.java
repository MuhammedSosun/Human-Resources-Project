package com.HumanResourcesProject.enums;

import lombok.Getter;

@Getter
public enum Role {
    ADMIN("YÖNETİCİ"),
    IK("İNSAN KAYNAKLARI"),
    ENVANTER("ENVANTER"),
    PERSONAL("PERSONEL");

    private final String label;

    Role(String label) {
        this.label = label;
    }
}
