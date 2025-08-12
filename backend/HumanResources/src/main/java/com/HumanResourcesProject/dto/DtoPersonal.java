package com.HumanResourcesProject.dto;

import com.HumanResourcesProject.enums.Gender;
import com.HumanResourcesProject.enums.Mezuniyet;
import com.HumanResourcesProject.enums.TaskTitle;
import com.HumanResourcesProject.enums.Unit;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
public class DtoPersonal extends DtoBase{

    private String firstName;
    private String lastName;
    private Gender gender;
    private LocalDate birthDate;
    private String maritalStatus;
    private String tckn;
    private Integer registrationNo;
    private Mezuniyet educationLevel;
    private String unit;
    private TaskTitle taskTitle;
    private Boolean working;
    private String profilePhotoPath;
    private LocalDate startDate;
    private String startingPosition;
    private String startingTitle;
    private LocalDate resignationDate;
    private String resignationReason;
    private Boolean isActive;

}
