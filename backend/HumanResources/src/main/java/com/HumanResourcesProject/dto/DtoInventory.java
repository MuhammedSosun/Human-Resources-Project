package com.HumanResourcesProject.dto;


import com.HumanResourcesProject.enums.InventoryStatus;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
public class DtoInventory extends DtoBase{
    private String brand;
    private String model;
    private String serialNumber;
    private InventoryStatus status;
    private LocalDate entryDate;
    private Long typeId;
    private String typeName;
}