package com.HumanResourcesProject.controller.impl;

import com.HumanResourcesProject.controller.IInventoryTypeController;
import com.HumanResourcesProject.controller.RestBaseController;
import com.HumanResourcesProject.controller.RootEntity;
import com.HumanResourcesProject.dto.DtoInventoryTypes;
import com.HumanResourcesProject.model.InventoryType;
import com.HumanResourcesProject.service.IInventoryTypeService;
import com.HumanResourcesProject.pageable.PageableEntity;
import com.HumanResourcesProject.pageable.PageableRequest;
import com.HumanResourcesProject.service.INotificationService;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/rest/api/inventoryType")
@PreAuthorize("hasAnyRole('ADMIN','ENVANTER')")
public class InventoryTypeControllerImpl extends RestBaseController implements IInventoryTypeController {

    private final IInventoryTypeService inventoryTypeService;
    private final INotificationService notificationService;

    public InventoryTypeControllerImpl (IInventoryTypeService inventoryTypeService, INotificationService notificationService){
        this.inventoryTypeService = inventoryTypeService;
        this.notificationService = notificationService;
    }

    @PostMapping("/save")
    @PreAuthorize("hasAnyRole('ADMIN','ENVANTER')")
    @Override
    public RootEntity<DtoInventoryTypes> save(@RequestBody InventoryType inventoryType) {
        notificationService.notifyAllAdmins("YENİ ENVANTER TİP ",inventoryType.getName() + " İSİMLİ ENVANTER " +
                "TİPİ SİSTEME EKLENDİ");
        return ok(inventoryTypeService.save(inventoryType));
    }

    @GetMapping("/list")
    @PreAuthorize("hasAnyRole('ADMIN','ENVANTER')")
    @Override
    public RootEntity<PageableEntity<DtoInventoryTypes>> getAll(PageableRequest request) {
        if (request.getPageSize()<=0){
            request.setPageSize(10);
        }
        if (request.getPageNumber() <= 0){
            request.setPageNumber(0);
        }
        return ok(inventoryTypeService.getAll(request));
    }
}
