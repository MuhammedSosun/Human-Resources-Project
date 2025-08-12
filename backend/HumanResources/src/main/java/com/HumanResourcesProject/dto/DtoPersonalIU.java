package com.HumanResourcesProject.dto;

import com.HumanResourcesProject.enums.Gender;
import com.HumanResourcesProject.enums.Mezuniyet;
import com.HumanResourcesProject.enums.TaskTitle;
import com.HumanResourcesProject.enums.Unit;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
public class DtoPersonalIU {

    @NotEmpty(message = "First name is mandatory")
    @Size(max = 50)
    private String firstName;

    @NotEmpty(message = "Last name is mandatory")
    @Size(max = 50)
    private String lastName;

    @NotNull(message = "Gender is mandatory")
    private Gender gender;

    @NotNull(message = "Birth date is mandatory")
    private LocalDate birthDate;

    @NotEmpty(message = "Marital status is mandatory")
    private String maritalStatus;

    @NotEmpty(message = "TCKN is mandatory")
    private String tckn;

    private Mezuniyet educationLevel;

    @NotNull(message = "Unit is mandatory")
    private Unit unit;

    @NotNull(message = "Task title is mandatory")
    private TaskTitle taskTitle;

    @NotNull(message = "Working status is mandatory")
    private Boolean working;

    private LocalDate startDate;
    private String startingPosition;
    private String startingTitle;
    private LocalDate resignationDate;
    private String resignationReason;
}
