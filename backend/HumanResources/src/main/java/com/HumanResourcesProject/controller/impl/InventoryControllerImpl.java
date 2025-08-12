package com.HumanResourcesProject.controller.impl;

import com.HumanResourcesProject.controller.IInventoryController;
import com.HumanResourcesProject.controller.RestBaseController;
import com.HumanResourcesProject.controller.RootEntity;
import com.HumanResourcesProject.dto.DtoInventory;
import com.HumanResourcesProject.dto.DtoInventoryIU;
import com.HumanResourcesProject.enums.InventoryStatus;
import com.HumanResourcesProject.service.IInventoryService;
import com.HumanResourcesProject.pageable.PageableEntity;
import com.HumanResourcesProject.pageable.PageableRequest;
import com.HumanResourcesProject.service.INotificationService;
import com.HumanResourcesProject.service.impl.InventoryTypeServiceImpl;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/rest/api/inventory")
@PreAuthorize("hasAnyRole('ADMIN', 'ENVANTER')")
@EnableMethodSecurity
public class InventoryControllerImpl extends RestBaseController implements IInventoryController {

    private final IInventoryService iInventoryService;
    private final INotificationService notificationService;
    private final InventoryTypeServiceImpl type;

    public InventoryControllerImpl(IInventoryService iInventoryService, INotificationService notificationService, InventoryTypeServiceImpl type) {
        this.iInventoryService = iInventoryService;
        this.notificationService = notificationService;
        this.type = type;
    }
    @PreAuthorize("hasAnyRole('ADMIN', 'ENVANTER')")
    @PostMapping("/save")
    @Override
    public RootEntity<DtoInventory> save(@Valid @RequestBody DtoInventoryIU dto) {
        notificationService.notifyAllAdmins("ENVANTER ÜRÜN EKLEME" ,  " ENVANTER YENİ ÜRÜN EKLENDİ" +
                  dto.getBrand() +" "+ dto.getModel());
        return ok(iInventoryService.save(dto));
    }

    @GetMapping("/list")
    @PreAuthorize("hasAnyRole('ADMIN','ENVANTER')")
    @Override
    public RootEntity<PageableEntity<DtoInventory>> findAll(PageableRequest request) {
        if (request.getPageSize() == 0 || request.getPageSize() < 0){
            request.setPageSize(10);
        }
        else if (request.getPageNumber() < 0 || request.getPageNumber() == 0){
            request.setPageNumber(0);
        }
        return ok(iInventoryService.findAll(request));
    }
    /*
    @PreAuthorize("hasAnyRole('ADMIN', 'IK' , 'ENVANTER')")
    @GetMapping("/filter/{id}")
    @Override
    public RootEntity<List<DtoInventory>> filterByType(@PathVariable(required = false) Long typeId) {
        return ok(iInventoryService.filterByType(typeId));
    }

    @PreAuthorize("hasAnyRole('ADMIN', 'IK' , 'ENVANTER')")
    @GetMapping("/find/{id}")
    @Override
    public RootEntity<DtoInventory> findById(@PathVariable Long id) {
        return ok(iInventoryService.findInventoryById(id));
    }
    @GetMapping("/filter/by/status")
    @PreAuthorize("hasAnyRole('ADMIN', 'IK' , 'ENVANTER')")
    @Override
    public RootEntity<List<DtoInventory>> findStatus(@RequestParam InventoryStatus status) {
        return ok(iInventoryService.findStatus(status));
    }
*/
    @PreAuthorize("hasAnyRole('ADMIN','ENVANTER')")
    @PutMapping("/update/{id}")
    @Override
    public RootEntity<DtoInventory> updateInventory(@PathVariable Long id,@Valid @RequestBody DtoInventoryIU dto) {
        notificationService.notifyAllAdmins("Envanter Güncelleme" , dto.getBrand() +" " + dto.getModel()
        + " ENVANTER ÜRÜNÜ GÜNCELLENDİ");
        return ok(iInventoryService.update(id,dto));
    }
    @PreAuthorize("hasAnyRole('ADMIN','ENVANTER')")
    @DeleteMapping("/delete/{id}")
    @Override
    public RootEntity<String> deleteInventory(@PathVariable Long id) {
        iInventoryService.deleteInventory(id);
        notificationService.notifyAllAdmins("Envanter ürün silindi" , id.toString() + " İlgili Envanter Silindi");
        return ok("Inventory deleted Successfully ");
    }

    @GetMapping("/filter/advanced")
    @PreAuthorize("hasAnyRole('ADMIN','ENVANTER')")
    @Override
    public RootEntity<List<DtoInventory>> filterAdvanced(
            @RequestParam(required = false) Long typeId,
            @RequestParam(required = false) String serialNumber,
            @RequestParam(required = false) InventoryStatus status) {
        return ok(iInventoryService.filterAdvanced(typeId, serialNumber, status));
    }

    @GetMapping("/total")
    @Override
    public ResponseEntity<Long> totalInventory() {
        long count = iInventoryService.totalInventory();
        return ResponseEntity.ok(count);
    }

    @GetMapping("/unassigned-inventories")
    @PreAuthorize("hasAnyRole('ADMIN', 'IK', 'ENVANTER')")
    @Override
    public RootEntity<List<DtoInventory>> getUnassignedInventories() {
        return ok(iInventoryService.getUnassignedInventories());
    }
}
