package com.HumanResourcesProject.service;

import com.HumanResourcesProject.dto.DtoInventoryAssignment;
import com.HumanResourcesProject.dto.DtoInventoryAssignmentIU;
import com.HumanResourcesProject.dto.DtoPersonal;
import com.HumanResourcesProject.pageable.PageableEntity;
import com.HumanResourcesProject.pageable.PageableRequest;

import java.util.List;

public interface IInventoryAssignmentService {

    DtoInventoryAssignment save(DtoInventoryAssignmentIU dto);
    DtoInventoryAssignment updateReturnInfo(Long id, DtoInventoryAssignmentIU dto);
    PageableEntity<DtoInventoryAssignment> findAll(PageableRequest request);
    List<DtoInventoryAssignment> getAllAssignmentsByPersonalId(Long personalId);
    List<DtoInventoryAssignment> getActiveAssignmentsByPersonalId(Long personalId);
    DtoPersonal findTopByInventory_IdAndReturnedDateIsNull(Long inventoryId);
    String delete(Long id);
    long totalAssignment();
}
