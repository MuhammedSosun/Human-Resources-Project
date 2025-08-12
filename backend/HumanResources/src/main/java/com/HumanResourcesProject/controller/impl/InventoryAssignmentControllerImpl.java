package com.HumanResourcesProject.controller.impl;

import com.HumanResourcesProject.controller.IInventoryAssignmentController;
import com.HumanResourcesProject.controller.RestBaseController;
import com.HumanResourcesProject.controller.RootEntity;
import com.HumanResourcesProject.dto.DtoInventoryAssignment;
import com.HumanResourcesProject.dto.DtoInventoryAssignmentIU;
import com.HumanResourcesProject.dto.DtoPersonal;
import com.HumanResourcesProject.exception.BaseException;
import com.HumanResourcesProject.exception.ErrorMessage;
import com.HumanResourcesProject.exception.MessageType;
import com.HumanResourcesProject.model.User;
import com.HumanResourcesProject.service.IInventoryAssignmentService;
import com.HumanResourcesProject.pageable.PageableEntity;
import com.HumanResourcesProject.pageable.PageableRequest;
import com.HumanResourcesProject.service.INotificationService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/rest/api/inventory-assignment")
@EnableMethodSecurity
public class InventoryAssignmentControllerImpl extends RestBaseController implements IInventoryAssignmentController {

    private final IInventoryAssignmentService iInventoryAssignmentService;
    private final INotificationService notificationService;

    public InventoryAssignmentControllerImpl(IInventoryAssignmentService iInventoryAssignmentService, INotificationService notificationService) {
        this.iInventoryAssignmentService = iInventoryAssignmentService;
        this.notificationService = notificationService;
    }
    @PreAuthorize("hasAnyRole('ADMIN','IK', 'ENVANTER')")
    @PostMapping("/save")
    @Override
    public RootEntity<DtoInventoryAssignment> save(@Valid @RequestBody DtoInventoryAssignmentIU dto) {
        notificationService.notifyAllAdmins("ENVANTER ZİMMETLENDİ  "  , dto.getAssignBy() + " TARAFINDAN " +
                "ENVANTER ZİMMETLENDİ");
        return ok(iInventoryAssignmentService.save(dto));
    }
    @PreAuthorize("hasAnyRole('ADMIN','IK', 'ENVANTER')")
    @PutMapping("/update/{id}")
    @Override
    public RootEntity<DtoInventoryAssignment> updateReturnInfo(@PathVariable Long id,@Valid @RequestBody DtoInventoryAssignmentIU dto) {
        notificationService.notifyAllAdmins("ZİMMET GÜNCELLEME" , dto.getAssignBy() + " Tarafından ENVANTER ZİMMETİ GÜNCELLENDİ");
        return ok(iInventoryAssignmentService.updateReturnInfo(id,dto));
    }
    @PreAuthorize("hasAnyRole('ADMIN','IK', 'ENVANTER')")
    @GetMapping("/list-all")
    @Override
    public RootEntity<PageableEntity<DtoInventoryAssignment>> findAll(PageableRequest request) {
        if (request.getPageSize() == 0 || request.getPageSize() < 0){
            request.setPageSize(10);
        }
        else if (request.getPageNumber() < 0 || request.getPageNumber() == 0){
            request.setPageNumber(0);
        }
        return ok(iInventoryAssignmentService.findAll(request));
    }
    @PreAuthorize("hasAnyRole('ADMIN','IK', 'ENVANTER')")
    @GetMapping("/all-assignments/{personalId}")
    @Override
    public RootEntity<List<DtoInventoryAssignment>> getAllAssignmentsByPersonalId(@PathVariable Long personalId) {
        return ok(iInventoryAssignmentService.getAllAssignmentsByPersonalId(personalId));
    }

    @PreAuthorize("hasAnyRole('ADMIN', 'IK')")
    @GetMapping("/active-assignment/{personalId}")
    @Override
    public RootEntity<List<DtoInventoryAssignment>> getActiveAssignmentsByPersonalId(@PathVariable Long personalId) {
        return ok(iInventoryAssignmentService.getActiveAssignmentsByPersonalId(personalId));
    }
    @PreAuthorize("hasAnyRole('ADMIN', 'IK')")
    @DeleteMapping("/delete/{id}")
    @Override
    public RootEntity<String> delete(@PathVariable Long id) {
        iInventoryAssignmentService.delete(id);
        return ok("delete is successfully");
    }
    @GetMapping("/inventory/{inventoryId}/assigned-personal")
    @PreAuthorize("hasAnyRole('ADMIN', 'IK' , 'ENVANTER')")
    @Override
    public RootEntity<DtoPersonal> findTopByInventory_IdAndReturnedDateIsNull(@PathVariable Long inventoryId) {
        return ok(iInventoryAssignmentService.findTopByInventory_IdAndReturnedDateIsNull(inventoryId));
    }

    @GetMapping("/total-assignment")
    @Override
    public ResponseEntity<Long> totalCount() {
        return ResponseEntity.ok(iInventoryAssignmentService.totalAssignment());
    }

    @GetMapping("/my-assignments")
    @PreAuthorize("hasAnyRole('PERSONAL')")
    public RootEntity<List<DtoInventoryAssignment>> getMyAssignments(Authentication authentication) {
        User user = (User) authentication.getPrincipal();

        if (user.getPersonal() == null) {
            throw new BaseException(new ErrorMessage(
                    MessageType.PERSONAL_NOT_FOUND,
                    "Kullanıcıya bağlı bir Personal kaydı bulunamadı."
            ));
        }

        Long personalId = user.getPersonal().getId();
        List<DtoInventoryAssignment> assignments =
                iInventoryAssignmentService.getActiveAssignmentsByPersonalId(personalId);

        return ok(assignments);
    }

}
