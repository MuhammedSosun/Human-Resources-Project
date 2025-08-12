package com.HumanResourcesProject.service;

import com.HumanResourcesProject.dto.DtoInventoryTypes;
import com.HumanResourcesProject.model.InventoryType;
import com.HumanResourcesProject.pageable.PageableEntity;
import com.HumanResourcesProject.pageable.PageableRequest;

public interface IInventoryTypeService {
    DtoInventoryTypes save(InventoryType inventoryType);
    PageableEntity<DtoInventoryTypes> getAll(PageableRequest request);
}

