package com.HumanResourcesProject.service.impl;

import com.HumanResourcesProject.dto.DtoInventory;
import com.HumanResourcesProject.dto.DtoInventoryIU;
import com.HumanResourcesProject.enums.InventoryStatus;
import com.HumanResourcesProject.enums.OperationType;
import com.HumanResourcesProject.exception.BaseException;
import com.HumanResourcesProject.exception.ErrorMessage;
import com.HumanResourcesProject.exception.MessageType;
import com.HumanResourcesProject.mapper.InventoryMapper;
import com.HumanResourcesProject.model.Inventory;
import com.HumanResourcesProject.repository.IInventoryRepository;
import com.HumanResourcesProject.service.IInventoryService;
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
public class InventoryServiceImpl implements IInventoryService {

    private final IInventoryRepository inventoryRepository;

    public InventoryServiceImpl(IInventoryRepository inventoryRepository) {
        this.inventoryRepository = inventoryRepository;
    }
    @LoggableOperation(OperationType.INVENTORY_CREATE)
    @Override
    public DtoInventory save(DtoInventoryIU dtoInventoryIU) {
        log.info(" Envanter ekleme işlemi alındı. Seri No: {}, Marka: {}, Model: {}",
                dtoInventoryIU.getSerialNumber(), dtoInventoryIU.getBrand(), dtoInventoryIU.getModel());
        Inventory inventory = inventoryRepository.save(InventoryMapper.toEntity(dtoInventoryIU));
        log.info("Envanter başarıyla kaydedildi. Seri No: {}, ID: {}", inventory.getSerialNumber(), inventory.getId());

        return InventoryMapper.toDto(inventory);
    }
    @LoggableOperation(OperationType.INVENTORY_LIST)
    @Override
    public PageableEntity<DtoInventory> findAll(PageableRequest request) {
        log.info("Envanter listesi isteniyor. Page: {}, Size: {}", request.getPageNumber(), request.getPageSize());

        Pageable pageable = PageUtil.toPageable(request);
        Page<Inventory> page = inventoryRepository.findAll(pageable);
        List<DtoInventory> dtoList =  page.getContent().
                stream().map(InventoryMapper::toDto).
                toList();
        log.info("Toplam {} envanter bulundu.", page.getTotalElements());

        return PageUtil.toPageableResponse(page,dtoList);
    }
/*
    @Override
    public DtoInventory findInventoryById(Long id) {
        Inventory inventory = inventoryRepository.findById(id).orElseThrow(()->
                new BaseException(new ErrorMessage(MessageType.INVENTORY_NOT_FOUND,id.toString())));
        return InventoryMapper.toDto(inventory);
    }

    @Override
    public List<DtoInventory> filterByType(Long typeId) {
        List<Inventory> inventoryList;
        if (typeId == null){
            inventoryList =  inventoryRepository.findAll();
        }
        else {
            inventoryList = inventoryRepository.findByInventoryTypes_Id(typeId);
        }
        return inventoryList.stream().map(InventoryMapper::toDto).collect(Collectors.toList());
    }

    @Override
    public List<DtoInventory> findStatus(InventoryStatus status) {
        List<Inventory> list = inventoryRepository.findByStatus(status);
        return list.stream().map(
                InventoryMapper::toDto
        ).toList();
    }
*/
    @LoggableOperation(OperationType.INVENTORY_UPDATE)
    @Override
    public DtoInventory update(Long id, DtoInventoryIU dto) {
        log.info("Envanter güncelleme isteği. ID: {}, Yeni Seri No: {}", id, dto.getSerialNumber());

        Inventory inventory = inventoryRepository.findById(id).orElseThrow(()->
                new BaseException(new ErrorMessage(MessageType.INVENTORY_NOT_FOUND,id.toString())));
         InventoryMapper.updateInventory(inventory,dto);
         Inventory updatedInventory = inventoryRepository.save(inventory);
        log.info("Envanter güncellendi. ID: {}, Yeni Durum: {}", updatedInventory.getId(), updatedInventory.getStatus());

        return InventoryMapper.toDto(updatedInventory);
    }
    @LoggableOperation(OperationType.INVENTORY_DELETE)
    @Override
    public void deleteInventory(Long id) {
        log.info("Envanter silme isteği alındı. ID: {}", id);

        Inventory inventory = inventoryRepository.findById(id).orElseThrow(()->
                new BaseException(new ErrorMessage(MessageType.INVENTORY_NOT_FOUND,id.toString())));
        inventoryRepository.delete(inventory);
        log.info("Envanter başarıyla silindi. ID: {}", id);


    }
    @LoggableOperation(OperationType.INVENTORY_FILTER)
    @Override
    public List<DtoInventory> filterAdvanced(Long typeId, String serialNumber, InventoryStatus status) {
        log.info("Envanter filtreleme. typeId: {}, serialNumber: {}, status: {}", typeId, serialNumber, status);

        List<Inventory> list =  inventoryRepository.findWithFilter(typeId,serialNumber,status);
        log.info("Filtre sonucunda {} envanter bulundu.", list.size());

        return list.stream().map(
                InventoryMapper::toDto
        ).collect(Collectors.toList());
    }

    @Override
    public List<DtoInventory> getUnassignedInventories() {
        log.info("Zimmetlenmemiş envanterler isteniyor.");

        List<Inventory> inventories = inventoryRepository.findAllUnassignedInventories();
        log.info("Zimmetlenmemiş envanter sayısı: {}", inventories.size());

        return inventories.stream()
                .map(InventoryMapper::toDto)
                .collect(Collectors.toList());
    }
    @Override
    public long totalInventory() {
        return inventoryRepository.count();
    }
}
