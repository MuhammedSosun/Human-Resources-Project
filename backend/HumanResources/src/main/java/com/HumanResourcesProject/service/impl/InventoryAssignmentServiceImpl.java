package com.HumanResourcesProject.service.impl;

import com.HumanResourcesProject.dto.DtoInventoryAssignment;
import com.HumanResourcesProject.dto.DtoInventoryAssignmentIU;
import com.HumanResourcesProject.dto.DtoPersonal;
import com.HumanResourcesProject.enums.InventoryStatus;
import com.HumanResourcesProject.enums.OperationType;
import com.HumanResourcesProject.exception.BaseException;
import com.HumanResourcesProject.exception.ErrorMessage;
import com.HumanResourcesProject.exception.MessageType;
import com.HumanResourcesProject.mapper.InventoryAssignmentMapper;
import com.HumanResourcesProject.mapper.PersonalMapper;
import com.HumanResourcesProject.model.Inventory;
import com.HumanResourcesProject.model.InventoryAssignment;
import com.HumanResourcesProject.model.Personal;
import com.HumanResourcesProject.repository.IInventoryAssignmentRepository;
import com.HumanResourcesProject.repository.IInventoryRepository;
import com.HumanResourcesProject.repository.PersonalRepository;
import com.HumanResourcesProject.service.IInventoryAssignmentService;
import com.HumanResourcesProject.pageable.PageUtil;
import com.HumanResourcesProject.pageable.PageableEntity;
import com.HumanResourcesProject.pageable.PageableRequest;
import com.HumanResourcesProject.logging.LoggableOperation;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@Service
public class InventoryAssignmentServiceImpl implements IInventoryAssignmentService {

    private final IInventoryAssignmentRepository iInventoryAssignmentRepository;
    private final PersonalRepository personalRepository;
    private final IInventoryRepository inventoryRepository;

    public InventoryAssignmentServiceImpl(IInventoryAssignmentRepository iInventoryAssignmentRepository, PersonalRepository personalRepository, IInventoryRepository inventoryRepository) {
        this.iInventoryAssignmentRepository = iInventoryAssignmentRepository;
        this.personalRepository = personalRepository;
        this.inventoryRepository = inventoryRepository;
    }

    @LoggableOperation(OperationType.ASSIGNMENT_CREATE)
    @Override
    public DtoInventoryAssignment save(DtoInventoryAssignmentIU dto) {
        log.info("Zimmet kaydı oluşturuluyor. Inventory ID: {}, Personal ID: {}", dto.getInventoryId(), dto.getPersonalId());

        Personal personal = personalRepository.findById(dto.getPersonalId()).orElseThrow(
                ()->new BaseException(new ErrorMessage(MessageType.PERSONAL_NOT_FOUND,dto.getPersonalId().toString()))
        );
        Inventory inventory = inventoryRepository.findById(dto.getInventoryId())
                .orElseThrow(()->new BaseException(new ErrorMessage(MessageType.INVENTORY_NOT_FOUND,dto.getInventoryId().toString())));
        if (inventory.getStatus() == InventoryStatus.IN_PERSONAL){
            throw new BaseException(new ErrorMessage(MessageType.INVENTORY_ALREADY_ASSIGNED,":Please choose another inventory"));
        }
        inventory.setStatus(InventoryStatus.IN_PERSONAL);
        InventoryAssignment saved = iInventoryAssignmentRepository.save(InventoryAssignmentMapper.toEntity(dto,inventory,personal));
        log.info("Zimmet başarıyla oluşturuldu. ID: {}", saved.getId());
        return InventoryAssignmentMapper.toDto(saved);
    }
    @LoggableOperation(OperationType.ASSIGNMENT_UPDATE)
    @Override
    public DtoInventoryAssignment updateReturnInfo(Long id, DtoInventoryAssignmentIU dto) {
        log.info("Zimmet güncelleniyor. ID: {}, Inventory ID: {}", id, dto.getInventoryId());
        InventoryAssignment inventoryAssignment = iInventoryAssignmentRepository.findById(id).orElseThrow(
                ()->new BaseException(new ErrorMessage(MessageType.INVENTORY_ASSIGNMENT_NOT_FOUND,id.toString()))
        );
        Inventory inventory = inventoryRepository.findById(dto.getInventoryId())
                .orElseThrow(()->new BaseException(new ErrorMessage(MessageType.INVENTORY_NOT_FOUND,dto.getInventoryId().toString())));
        inventory.setStatus(InventoryStatus.IN_WAREHOUSE);
        InventoryAssignmentMapper.updateInventory(inventoryAssignment,dto);
        InventoryAssignment updatedInventoryAssignment = iInventoryAssignmentRepository.save(inventoryAssignment);
        log.info("Zimmet güncellendi ve envanter teslim alındı. ID: {}", updatedInventoryAssignment.getId());
        return InventoryAssignmentMapper.toDto(updatedInventoryAssignment);
    }
    @LoggableOperation(OperationType.NOTIFICATION_LIST_ALL)
    @Override
    public PageableEntity<DtoInventoryAssignment> findAll(PageableRequest request) {
        log.info("Zimmet listesi isteniyor. Page: {}, Size: {}", request.getPageNumber(), request.getPageSize());

        Pageable pageable = PageUtil.toPageable(request);
        Page<InventoryAssignment> page = iInventoryAssignmentRepository.findAll(pageable);
        List<DtoInventoryAssignment> dtoList = page.getContent().stream()
                .map(InventoryAssignmentMapper::toDto)
                .collect(Collectors.toList());
        log.info("Toplam {} zimmet bulundu.", page.getTotalElements());

        return PageUtil.toPageableResponse(page,dtoList);
    }
    @LoggableOperation(OperationType.ASSIGNMENT_LIST_BY_PERSONAL_ID)
    @Override
    public List<DtoInventoryAssignment> getAllAssignmentsByPersonalId(Long personalId) {
        log.info("Personelin tüm zimmetleri isteniyor. Personal ID: {}", personalId);

        Personal personal = personalRepository.findById(personalId).orElseThrow(
                ()->new BaseException(new ErrorMessage(MessageType.PERSONAL_NOT_FOUND,personalId.toString()))
        );
        List<InventoryAssignment> list = iInventoryAssignmentRepository.findByPersonal_Id(personalId);
        log.info("{} adet zimmet bulundu. Personal ID: {}", list.size(), personalId);

        return list.stream().map(
                InventoryAssignmentMapper::toDto
        ).collect(Collectors.toList());
    }
    @LoggableOperation(OperationType.ASSIGNMENT_GET_ALL_ACTIVE)
    @Override
    public List<DtoInventoryAssignment> getActiveAssignmentsByPersonalId(Long personalId) {
        log.info("Personelin aktif (teslim edilmemiş) zimmetleri isteniyor. Personal ID: {}", personalId);

        Personal personal = personalRepository.findById(personalId).orElseThrow(
                ()->new BaseException(new ErrorMessage(MessageType.PERSONAL_NOT_FOUND,personalId.toString()))
        );
        List<InventoryAssignment> assignments =
                iInventoryAssignmentRepository.findByPersonal_IdAndReturnedDateIsNull(personalId);
        log.info("{} adet aktif zimmet bulundu.", assignments.size());

        return assignments.stream().map(
                InventoryAssignmentMapper::toDto
        ).collect(Collectors.toList());
    }
    @LoggableOperation(OperationType.ASSIGNMENT_FILTER_BY_RETURNED_DATE_IS_NULL)
    @Override
    public DtoPersonal findTopByInventory_IdAndReturnedDateIsNull(Long inventoryId) {
        log.info("Envantere zimmetli personel sorgulanıyor. Inventory ID: {}", inventoryId);

        InventoryAssignment inventoryAssignment = iInventoryAssignmentRepository.findById(inventoryId).orElseThrow(
                ()-> new BaseException(new ErrorMessage(MessageType.INVENTORY_NOT_ASSIGNED,inventoryId.toString()))
        );
        log.info("Zimmetli personel: {}", inventoryAssignment.getPersonal().getFirstName());

        return PersonalMapper.toDto(inventoryAssignment.getPersonal());
    }

    @LoggableOperation(OperationType.ASSIGNMENT_DELETE)
    @Override
    public String delete(Long id) {
        log.info("Zimmet silme işlemi başlatıldı. ID: {}", id);

        InventoryAssignment inventoryAssignment = iInventoryAssignmentRepository.findById(id).orElseThrow(
                ()->new BaseException(new ErrorMessage(MessageType.INVENTORY_ASSIGNMENT_NOT_FOUND,id.toString()))
        );
        iInventoryAssignmentRepository.delete(inventoryAssignment);
        log.info("Zimmet başarıyla silindi. ID: {}", id);

        return "Deleted is successfully";
    }

    @Override
    public long totalAssignment() {
        return iInventoryAssignmentRepository.count();
    }
}
