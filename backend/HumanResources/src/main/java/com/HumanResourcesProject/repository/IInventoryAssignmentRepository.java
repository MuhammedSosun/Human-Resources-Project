package com.HumanResourcesProject.repository;

import com.HumanResourcesProject.model.InventoryAssignment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IInventoryAssignmentRepository extends JpaRepository<InventoryAssignment,Long> {
    List<InventoryAssignment> findByPersonal_Id(Long personalId);
    InventoryAssignment findTopByInventory_IdAndReturnedDateIsNull(Long inventoryId);
    List<InventoryAssignment> findByPersonal_IdAndReturnedDateIsNull(Long personalId);



}
