package com.HumanResourcesProject.repository;

import com.HumanResourcesProject.model.InventoryType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IInventoryTypesRepository extends JpaRepository<InventoryType,Long> {

}
