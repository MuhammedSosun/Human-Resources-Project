package com.HumanResourcesProject.controller;

import com.HumanResourcesProject.dto.DtoInventoryAssignment;
import com.HumanResourcesProject.dto.DtoInventoryAssignmentIU;
import com.HumanResourcesProject.dto.DtoPersonal;
import com.HumanResourcesProject.pageable.PageableEntity;
import com.HumanResourcesProject.pageable.PageableRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;

import java.util.List;

public interface IInventoryAssignmentController {
    RootEntity<DtoInventoryAssignment> save(DtoInventoryAssignmentIU dto);
    RootEntity<DtoInventoryAssignment> updateReturnInfo(Long id,DtoInventoryAssignmentIU dto);
    RootEntity<PageableEntity<DtoInventoryAssignment>> findAll(PageableRequest request);
    RootEntity<List<DtoInventoryAssignment>> getAllAssignmentsByPersonalId(Long personalId);
    RootEntity<List<DtoInventoryAssignment>> getActiveAssignmentsByPersonalId(Long personalId);
    RootEntity<String> delete(Long id);
    RootEntity<DtoPersonal> findTopByInventory_IdAndReturnedDateIsNull(Long inventoryId);
    ResponseEntity<Long> totalCount();
    RootEntity<List<DtoInventoryAssignment>> getMyAssignments(Authentication authentication);
}
