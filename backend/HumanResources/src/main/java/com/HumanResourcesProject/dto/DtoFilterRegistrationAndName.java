package com.HumanResourcesProject.dto;

import com.HumanResourcesProject.enums.Unit;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class DtoFilterRegistrationAndName {
    private Integer registrationNo;
    private String firstName;
    private String lastName;
    private Unit unit;
}
