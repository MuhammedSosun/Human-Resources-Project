package com.HumanResourcesProject.service;

import com.HumanResourcesProject.dto.DtoFilterRegistrationAndName;
import com.HumanResourcesProject.dto.DtoPersonal;
import com.HumanResourcesProject.dto.DtoPersonalFilter;
import com.HumanResourcesProject.dto.DtoPersonalIU;
import com.HumanResourcesProject.pageable.PageableEntity;
import com.HumanResourcesProject.pageable.PageableRequest;

import java.util.List;

public interface IPersonalService {
    DtoPersonal save(DtoPersonalIU dtoPersonalIU);
    PageableEntity<DtoPersonal> findAll(PageableRequest request);
    List<DtoPersonal> search(DtoPersonalFilter filter);
    List<DtoPersonal> searchByRegistrationAndName(DtoFilterRegistrationAndName dto);
    DtoPersonal getPersonalById(Long id);
    String deletePersonel(Long id);
    DtoPersonal update(Long id,DtoPersonalIU dto);
    void updateProfilePhoto(Long id,String filename);
    long countActivePersonals();
    List<DtoPersonal> getAllActivePersonals();

}
