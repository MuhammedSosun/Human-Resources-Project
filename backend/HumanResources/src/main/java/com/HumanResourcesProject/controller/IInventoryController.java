package com.HumanResourcesProject.controller;

import com.HumanResourcesProject.dto.DtoInventory;
import com.HumanResourcesProject.dto.DtoInventoryIU;
import com.HumanResourcesProject.enums.InventoryStatus;
import com.HumanResourcesProject.pageable.PageableEntity;
import com.HumanResourcesProject.pageable.PageableRequest;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface IInventoryController {
    RootEntity<DtoInventory> save(DtoInventoryIU dto);
    RootEntity<PageableEntity<DtoInventory>> findAll(PageableRequest request);

    //RootEntity<List<DtoInventory>> filterByType(Long typeId);
    //RootEntity<DtoInventory> findById(Long id);
    //RootEntity<List<DtoInventory>> findStatus(InventoryStatus status);
    RootEntity<DtoInventory> updateInventory(Long id,DtoInventoryIU dto);
    RootEntity<String> deleteInventory(Long id);
    RootEntity<List<DtoInventory>> filterAdvanced(Long typeId,String serialNumber,InventoryStatus status);
    ResponseEntity<Long> totalInventory();
    RootEntity<List<DtoInventory>> getUnassignedInventories();

}
