package com.HumanResourcesProject.mapper;

import com.HumanResourcesProject.dto.DtoInventory;
import com.HumanResourcesProject.dto.DtoInventoryIU;
import com.HumanResourcesProject.model.Inventory;
import com.HumanResourcesProject.model.InventoryType;

import java.time.LocalDateTime;

public class InventoryMapper {

    public static Inventory toEntity(DtoInventoryIU dto){
        InventoryType inventoryType = new InventoryType();
        inventoryType.setId(dto.getTypeId());

        Inventory inventory = new Inventory();
        inventory.setInventoryTypes(inventoryType);
        inventory.setBrand(dto.getBrand());
        inventory.setModel(dto.getModel());
        inventory.setStatus(dto.getStatus());
        inventory.setEntryDate(dto.getEntryDate());
        inventory.setSerialNumber(dto.getSerialNumber());
        inventory.setCreateTime(LocalDateTime.now());

        return inventory;
    }
    public static void updateInventory(Inventory inventory,DtoInventoryIU dto){
        InventoryType inventoryType = new InventoryType();
        inventoryType.setId(dto.getTypeId());

        inventory.setInventoryTypes(inventoryType);
        inventory.setModel(dto.getModel());
        inventory.setBrand(dto.getBrand());
        inventory.setStatus(dto.getStatus());
        inventory.setEntryDate(dto.getEntryDate());
    }
    public static DtoInventory toDto(Inventory inventory){
        DtoInventory dtoInventory = new DtoInventory();
        dtoInventory.setId(inventory.getId());
        dtoInventory.setBrand(inventory.getBrand());
        dtoInventory.setModel(inventory.getModel());
        dtoInventory.setStatus(inventory.getStatus());
        dtoInventory.setEntryDate(inventory.getEntryDate());
        dtoInventory.setSerialNumber(inventory.getSerialNumber());
        dtoInventory.setTypeId(inventory.getInventoryTypes().getId());
        dtoInventory.setTypeName(inventory.getInventoryTypes().getName());
        dtoInventory.setCreateTime(inventory.getCreateTime());
        return dtoInventory;
    }

}
