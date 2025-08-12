package com.HumanResourcesProject.mapper;

import com.HumanResourcesProject.dto.DtoPersonal;
import com.HumanResourcesProject.dto.DtoPersonalIU;
import com.HumanResourcesProject.model.Personal;

import java.time.LocalDateTime;

public class PersonalMapper {

    public static Personal toEntity(DtoPersonalIU dto){
        Personal personal = new Personal();
        personal.setFirstName(dto.getFirstName());
        personal.setLastName(dto.getLastName());
        personal.setGender(dto.getGender());
        personal.setBirthDate(dto.getBirthDate());
        personal.setMaritalStatus(dto.getMaritalStatus());
        personal.setTckn(dto.getTckn());
        personal.setEducationLevel(dto.getEducationLevel());
        personal.setUnit(dto.getUnit());
        personal.setTaskTitle(dto.getTaskTitle());
        personal.setWorking(dto.getWorking());
        personal.setStartDate(dto.getStartDate());
        personal.setStartingTitle(dto.getStartingTitle());
        personal.setResignationDate(dto.getResignationDate());
        personal.setResignationReason(dto.getResignationReason());
        personal.setCreateTime(LocalDateTime.now());

        return personal;
    }
    public static void UpdatePersonal(Personal personal,DtoPersonalIU dto){
        personal.setFirstName(dto.getFirstName());
        personal.setLastName(dto.getLastName());
        personal.setGender(dto.getGender());
        personal.setBirthDate(dto.getBirthDate());
        personal.setMaritalStatus(dto.getMaritalStatus());
        personal.setTckn(dto.getTckn());
        personal.setEducationLevel(dto.getEducationLevel());
        personal.setUnit(dto.getUnit());
        personal.setTaskTitle(dto.getTaskTitle());
        personal.setWorking(dto.getWorking());
        personal.setStartDate(dto.getStartDate());
        personal.setStartingTitle(dto.getStartingTitle());
        personal.setResignationDate(dto.getResignationDate());
        personal.setResignationReason(dto.getResignationReason());
    }
    public static DtoPersonal toDto(Personal personal){
        DtoPersonal dto = new DtoPersonal();
        dto.setId(personal.getId());
        dto.setFirstName(personal.getFirstName());
        dto.setLastName(personal.getLastName());
        dto.setGender(personal.getGender());
        dto.setBirthDate(personal.getBirthDate());
        dto.setMaritalStatus(personal.getMaritalStatus());
        dto.setTckn(personal.getTckn());
        dto.setProfilePhotoPath(personal.getProfilePhotoPath());
        dto.setRegistrationNo(personal.getRegistrationNo());
        dto.setEducationLevel(personal.getEducationLevel());
        dto.setUnit(personal.getUnit() != null ? personal.getUnit().name() : null);
        dto.setTaskTitle(personal.getTaskTitle());
        dto.setWorking(personal.getWorking());
        dto.setStartDate(personal.getStartDate());
        dto.setStartingTitle(personal.getStartingTitle());
        dto.setResignationDate(personal.getResignationDate());
        dto.setResignationReason(personal.getResignationReason());
        dto.setIsActive(personal.isActive());
        dto.setCreateTime(personal.getCreateTime());

        return dto;
    }

}
