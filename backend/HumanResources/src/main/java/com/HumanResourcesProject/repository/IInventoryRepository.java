package com.HumanResourcesProject.repository;

import com.HumanResourcesProject.enums.InventoryStatus;
import com.HumanResourcesProject.model.Inventory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

@Repository
public interface IInventoryRepository extends JpaRepository<Inventory,Long> {
    List<Inventory> findByStatus(InventoryStatus status);
    List<Inventory> findByInventoryTypes_Id(Long typeId);

    @Query("SELECT i FROM Inventory i " +
            "WHERE (:typeId IS NULL OR i.inventoryTypes.id = :typeId) " +
            "AND (:serialNumber IS NULL OR LOWER(i.serialNumber) LIKE :serialNumber) " +
            "AND (:status IS NULL OR i.status = :status)")
    List<Inventory> findWithFilter(
            @Param("typeId") Long typeId,
            @Param("serialNumber") String serialNumber,
            @Param("status") InventoryStatus status
    );

    @Query("SELECT i FROM Inventory i WHERE i.id NOT IN (" +
            "SELECT ia.inventory.id FROM InventoryAssignment ia WHERE ia.returnedDate IS NULL)")
    List<Inventory> findAllUnassignedInventories();
}
