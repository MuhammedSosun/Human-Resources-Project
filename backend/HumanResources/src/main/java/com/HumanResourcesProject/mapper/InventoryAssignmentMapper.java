package com.HumanResourcesProject.mapper;

import com.HumanResourcesProject.dto.DtoInventoryAssignment;
import com.HumanResourcesProject.dto.DtoInventoryAssignmentIU;
import com.HumanResourcesProject.dto.DtoInventoryTypes;
import com.HumanResourcesProject.model.Inventory;
import com.HumanResourcesProject.model.InventoryAssignment;
import com.HumanResourcesProject.model.InventoryType;
import com.HumanResourcesProject.model.Personal;
import org.springframework.beans.BeanUtils;

import java.time.LocalDateTime;
public class InventoryAssignmentMapper {

    public static InventoryAssignment toEntity(DtoInventoryAssignmentIU dto,Inventory inventory,Personal personal){
        InventoryAssignment inventoryAssignment = new InventoryAssignment();
        updateInventory(inventoryAssignment, dto);
        inventoryAssignment.setCreateTime(LocalDateTime.now());

        inventoryAssignment.setPersonal(personal);
        inventoryAssignment.setInventory(inventory);

        return inventoryAssignment;
    }
    public static void updateInventory(InventoryAssignment inventoryAssignment,DtoInventoryAssignmentIU dto){
        inventoryAssignment.setAssignedBy(dto.getAssignBy());
        inventoryAssignment.setReturnedBy(dto.getReturnedBy());
        inventoryAssignment.setAssignDate(dto.getAssignDate());
        inventoryAssignment.setReturnedDate(dto.getReturnDate());
    }

    public static DtoInventoryAssignment toDto(InventoryAssignment inventoryAssignment){
        DtoInventoryAssignment dto  = new DtoInventoryAssignment();
        dto.setId(inventoryAssignment.getId());
        dto.setPersonalId(inventoryAssignment.getPersonal().getId());
        dto.setCreateTime(inventoryAssignment.getCreateTime());
        dto.setAssignBy(inventoryAssignment.getAssignedBy());
        dto.setReturnedBy(inventoryAssignment.getReturnedBy());
        dto.setAssignDate(inventoryAssignment.getAssignDate());
        dto.setReturnDate(inventoryAssignment.getReturnedDate());
        DtoInventoryTypes dtoInventoryTypes = new DtoInventoryTypes();
        dtoInventoryTypes.setId(inventoryAssignment.getInventory().inventoryTypes.getId());
        dtoInventoryTypes.setName(inventoryAssignment.getInventory().inventoryTypes.getName());
        dtoInventoryTypes.setCreateTime(inventoryAssignment.getInventory().inventoryTypes.getCreateTime());
        dto.setPersonal(PersonalMapper.toDto(inventoryAssignment.getPersonal()));
        dto.setInventory(InventoryMapper.toDto(inventoryAssignment.getInventory()));
        dto.getInventory().setTypeId(dtoInventoryTypes.getId());
        dto.getInventory().setTypeName(dtoInventoryTypes.getName());
        dto.getInventory().setCreateTime(dtoInventoryTypes.getCreateTime());

        return dto;

    }
}
