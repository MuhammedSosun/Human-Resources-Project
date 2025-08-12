package com.HumanResourcesProject.dto;

import com.HumanResourcesProject.enums.InventoryStatus;
import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
public class DtoInventoryIU {
        @NotNull
        private Long typeId;
        @NotEmpty
        private String brand;
        @NotEmpty
        private String model;
        @NotEmpty
        private String serialNumber;
        @NotNull
        private InventoryStatus status;
        @NotNull
        @JsonFormat(pattern = "yyyy-MM-dd")
        private LocalDate entryDate;


}
