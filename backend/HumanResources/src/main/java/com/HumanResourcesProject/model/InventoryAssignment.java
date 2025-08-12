package com.HumanResourcesProject.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
    //envanteri personele bağlayacagımız zaman sadece boşta olan herhangi bir personele zimmetlenmemiş herhang, personelee verilmemiş envanteri
    //getirecek sorgunum yazılması gerekiyor
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "inventory_assignment",uniqueConstraints = {@UniqueConstraint(columnNames = {"personal_id","inventory_id"},
        name = "uq_inventory_assignment")})
public class InventoryAssignment extends BaseEntity{
    @ManyToOne(optional = false) //<----- optional false ilişkisel veritabanında null olmayı engeller
    @JoinColumn(name = "personal_id")
    private Personal personal;

    @ManyToOne(optional = false)
    @JoinColumn(name = "inventory_id")
    private Inventory inventory;

    @Column(name = "assign_date", nullable = false)
    private LocalDate assignDate;

    @Column(name = "returned_date")
    private LocalDate returnedDate;

    @Column(name = "assigned_by")
    private String assignedBy;

    @Column(name = "returned_by")
    private String returnedBy;

}
