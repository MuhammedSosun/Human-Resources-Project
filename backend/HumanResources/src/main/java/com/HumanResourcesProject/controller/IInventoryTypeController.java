package com.HumanResourcesProject.controller;

import com.HumanResourcesProject.dto.DtoInventoryTypes;
import com.HumanResourcesProject.model.InventoryType;
import com.HumanResourcesProject.pageable.PageableEntity;
import com.HumanResourcesProject.pageable.PageableRequest;

public interface IInventoryTypeController {
    RootEntity<DtoInventoryTypes> save(InventoryType inventoryType);
    RootEntity<PageableEntity<DtoInventoryTypes>> getAll(PageableRequest request);
}
