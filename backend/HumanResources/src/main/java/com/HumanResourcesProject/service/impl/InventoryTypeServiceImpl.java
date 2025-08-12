package com.HumanResourcesProject.service.impl;

import com.HumanResourcesProject.dto.DtoInventoryTypes;
import com.HumanResourcesProject.enums.OperationType;
import com.HumanResourcesProject.model.InventoryType;
import com.HumanResourcesProject.repository.IInventoryTypesRepository;
import com.HumanResourcesProject.service.IInventoryTypeService;
import com.HumanResourcesProject.pageable.PageUtil;
import com.HumanResourcesProject.pageable.PageableEntity;
import com.HumanResourcesProject.pageable.PageableRequest;
import com.HumanResourcesProject.logging.LoggableOperation;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.BeanUtils;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Slf4j
@Service
public class InventoryTypeServiceImpl implements IInventoryTypeService {


    private final IInventoryTypesRepository iInventoryTypesRepository;

    public InventoryTypeServiceImpl (IInventoryTypesRepository iInventoryTypesRepository){
        this.iInventoryTypesRepository = iInventoryTypesRepository;
    }

    @LoggableOperation(OperationType.INVENTORY_TYPE_CREATE)
    @Override
    public DtoInventoryTypes save(InventoryType inventoryType) {
        log.info("Envanter tipi kayıt isteği alındı. İsim: {}", inventoryType.getName());
        InventoryType savedInventoryType = iInventoryTypesRepository.save(inventoryType);
        DtoInventoryTypes dtoInventoryTypes = new DtoInventoryTypes();
        BeanUtils.copyProperties(savedInventoryType,dtoInventoryTypes);
        log.info("Envanter tipi başarıyla kaydedildi. ID: {}, İsim: {}", dtoInventoryTypes.getId(), dtoInventoryTypes.getName());
        return dtoInventoryTypes;
    }
    @LoggableOperation(OperationType.INVENTORY_TYPE_LIST)
    @Override
    public PageableEntity<DtoInventoryTypes> getAll(PageableRequest request) {
        log.info("Envanter tipleri listeleniyor. Page: {}, Size: {}", request.getPageNumber(), request.getPageSize());

        Pageable pageable = PageUtil.toPageable(request);
        Page<InventoryType> page = iInventoryTypesRepository.findAll(pageable);

        List<DtoInventoryTypes> dtoList = new ArrayList<>();
        for (InventoryType inventoryType : page.getContent()){
            DtoInventoryTypes dto = new DtoInventoryTypes();
            BeanUtils.copyProperties(inventoryType,dto);
            dtoList.add(dto);
        }
        log.info("Toplam {} envanter tipi bulundu.", page.getTotalElements());

        return PageUtil.toPageableResponse(page,dtoList);
    }


}
