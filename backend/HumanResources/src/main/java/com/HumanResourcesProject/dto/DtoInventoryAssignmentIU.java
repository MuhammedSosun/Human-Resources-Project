package com.HumanResourcesProject.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
public class DtoInventoryAssignmentIU {

    @NotNull
    private Long personalId;
    @NotNull
    private Long inventoryId;
    @NotNull
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate assignDate;
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate returnDate;

    private String assignBy;
    private String returnedBy;


}
