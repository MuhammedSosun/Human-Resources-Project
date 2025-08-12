package com.HumanResourcesProject.service;

import com.HumanResourcesProject.dto.DtoInventory;
import com.HumanResourcesProject.dto.DtoInventoryIU;
import com.HumanResourcesProject.enums.InventoryStatus;
import com.HumanResourcesProject.pageable.PageableEntity;
import com.HumanResourcesProject.pageable.PageableRequest;

import java.util.List;

public interface IInventoryService {
    DtoInventory save(DtoInventoryIU dtoInventoryIU);
    PageableEntity<DtoInventory> findAll(PageableRequest request);
   // DtoInventory findInventoryById(Long id);
    //List<DtoInventory> filterByType(Long typeId);
   // List<DtoInventory> findStatus(InventoryStatus status);
    DtoInventory update(Long id,DtoInventoryIU dto);
    void deleteInventory(Long id);
    List<DtoInventory> filterAdvanced(Long typeId, String serialNumber, InventoryStatus status);
    long totalInventory();
    List<DtoInventory> getUnassignedInventories();

}
