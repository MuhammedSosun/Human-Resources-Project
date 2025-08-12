package com.HumanResourcesProject.dto;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
@Getter
@Setter
public class DtoInventoryAssignment extends DtoBase{
    private Long personalId;

    private DtoPersonal personal;
    private DtoInventory inventory;
    private LocalDate assignDate;
    private LocalDate returnDate;
    private String assignBy;
    private String returnedBy;
}
