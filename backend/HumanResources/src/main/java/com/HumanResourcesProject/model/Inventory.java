package com.HumanResourcesProject.model;

import com.HumanResourcesProject.enums.InventoryStatus;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "Inventory Information")
public class Inventory extends BaseEntity{


    @ManyToOne(optional = false)
    @JoinColumn(name = "type_id")
    public InventoryType inventoryTypes;
    @Column(name = "brand",nullable = false,length = 100)
    public String brand;
    @Column(name = "model",nullable = false,length = 100)
    public String model;
    @Column(name = "serial_number",nullable = false,unique = true,length = 100)
    public String serialNumber;
    @Column(name = "status",nullable = false,length = 50)
    @Enumerated(EnumType.STRING)
    public InventoryStatus status;
    @Column(name = "entry_date",nullable = false)
    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME)
    public LocalDate entryDate;
}
