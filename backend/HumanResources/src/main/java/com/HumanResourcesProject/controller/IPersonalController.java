package com.HumanResourcesProject.controller;

import com.HumanResourcesProject.dto.DtoPersonal;
import com.HumanResourcesProject.dto.DtoPersonalIU;
import com.HumanResourcesProject.pageable.PageableEntity;
import com.HumanResourcesProject.pageable.PageableRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;

import java.util.List;

public interface IPersonalController {
    RootEntity<DtoPersonal> save(DtoPersonalIU dto);
    RootEntity<PageableEntity<DtoPersonal>> findAll(PageableRequest request);
    RootEntity<List<DtoPersonal>> searchByRegistrationAndName(Integer registrationNo,String firstName,String lastName);
    RootEntity<List<DtoPersonal>> search(String firstName, String lastName, String tckn, String unit);
    RootEntity<DtoPersonal> getPersonalById(Long id);
    RootEntity<String> deletePersonal(Long id);
    RootEntity<DtoPersonal> updatePersonal(Long id,DtoPersonalIU dto);
    ResponseEntity<Long> getActivePersonalCount();
    RootEntity<List<DtoPersonal>> listAllActivePersonals();
    RootEntity<DtoPersonal> getMyProfile(Authentication authRequest);
}
