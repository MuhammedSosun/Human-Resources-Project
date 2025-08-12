package com.HumanResourcesProject.service.impl;

import com.HumanResourcesProject.dto.DtoFilterRegistrationAndName;
import com.HumanResourcesProject.dto.DtoPersonal;
import com.HumanResourcesProject.dto.DtoPersonalFilter;
import com.HumanResourcesProject.dto.DtoPersonalIU;
import com.HumanResourcesProject.enums.OperationType;
import com.HumanResourcesProject.enums.Unit;
import com.HumanResourcesProject.exception.BaseException;
import com.HumanResourcesProject.exception.ErrorMessage;
import com.HumanResourcesProject.exception.MessageType;
import com.HumanResourcesProject.mapper.PersonalMapper;
import com.HumanResourcesProject.model.Personal;
import com.HumanResourcesProject.repository.PersonalRepository;
import com.HumanResourcesProject.service.IPersonalService;
import com.HumanResourcesProject.pageable.PageUtil;
import com.HumanResourcesProject.pageable.PageableEntity;
import com.HumanResourcesProject.pageable.PageableRequest;
import com.HumanResourcesProject.logging.LoggableOperation;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.web.util.ContentCachingRequestWrapper;
import org.springframework.web.util.ContentCachingResponseWrapper;

import java.util.List;

@Slf4j
@Service
public class PersonalServiceImpl implements IPersonalService {


    private final PersonalRepository personalRepository;

    public PersonalServiceImpl(PersonalRepository personalRepository) {
        this.personalRepository = personalRepository;
    }

    @LoggableOperation(OperationType.PERSONAL_CREATE)
    @Override
    public DtoPersonal save(DtoPersonalIU dtoPersonalIU) {

        log.info("Personal kayıt işlemi başlatıldı. AD: {}, Soyad: {}",dtoPersonalIU.getFirstName(),dtoPersonalIU.getLastName());
        Personal personal = PersonalMapper.toEntity(dtoPersonalIU);
        Integer lastRegNo = personalRepository.findMaxRegistrationNo();
        personal.setRegistrationNo(lastRegNo != null ? lastRegNo + 1 : 1000);
        Personal saved = personalRepository.save(personal);
        log.info("Personal Başarıyla kaydedili. ID: {} ,SicilNo: {}",saved.getId(),saved.getRegistrationNo());

        return PersonalMapper.toDto(saved);
    }
    @LoggableOperation(OperationType.PERSONAL_GET_ALL)
    @Override
    public PageableEntity<DtoPersonal> findAll(PageableRequest request) {

        Pageable pageable =  PageUtil.toPageable(request);
        Page<Personal> page =  personalRepository.findAll(pageable);

        List<DtoPersonal> dtoList = page.getContent()
                .stream().map(PersonalMapper::toDto)
                .toList();
        return PageUtil.toPageableResponse(page,dtoList);
    }
    @LoggableOperation(OperationType.PERSONAL_SEARCH)
    @Override
    public List<DtoPersonal> search(DtoPersonalFilter filter) {
        Unit unitEnum = null;
        if (filter.getUnit() != null && !filter.getUnit().isBlank()) {
            try {
                unitEnum = Unit.valueOf(filter.getUnit()); // String → Enum
            } catch (IllegalArgumentException e) {
                throw new IllegalArgumentException("Invalid unit value: " + filter.getUnit());
            }
        }

        List<Personal> result = personalRepository.search(
                filter.getFirstName(),
                filter.getLastName(),
                filter.getTckn(),
                unitEnum
        );
        log.info("Personal arama işlemi. Ad: {}, Soyad: {}, TCKN: {}, Birim: {} "
                ,filter.getFirstName(),filter.getLastName(),filter.getTckn(),filter.getUnit());
        return result.stream()
                .map(PersonalMapper::toDto)
                .toList();
    }

    @LoggableOperation(OperationType.PERSONAL_FILTER_BY_REGISTRATION_NO_AND_NAME)
    @Override
    public List<DtoPersonal> searchByRegistrationAndName(DtoFilterRegistrationAndName dto) {
        List<Personal> result = personalRepository.findPersonalByRegistrationNoAndName(
                dto.getRegistrationNo(),
                dto.getFirstName(),
                dto.getLastName()
        );
        log.info("🔎 Sicil ve isme göre arama yapılıyor. Sicil No: {}, Ad: {}, Soyad: {}",
                dto.getRegistrationNo(), dto.getFirstName(), dto.getLastName());
        return result.stream().map(PersonalMapper::toDto).toList();
    }
    @LoggableOperation(OperationType.PERSONAL_GET_BY_ID)
    @Override
    public DtoPersonal getPersonalById(Long id) {
        Personal personal = personalRepository.findById(id).orElseThrow(()
                ->new BaseException(new ErrorMessage(MessageType.PERSONAL_NOT_FOUND,id.toString())));
        log.info("ID ile personel getiriliyor: {}", id);
        return PersonalMapper.toDto(personal);
    }
    @LoggableOperation(OperationType.PERSONAL_DELETE)
    @Override
    public String deletePersonel(Long id) {
        log.info("personel silme işlemi başlatılıyor: {}",id);
        Personal personal = personalRepository.findById(id)
                .orElseThrow(() -> new BaseException(new ErrorMessage(MessageType.PERSONAL_NOT_FOUND,id.toString())));

        personal.setActive(false);
        personalRepository.save(personal);
        log.info("ID li personal pasif hale getirildi: {}",id);
        return "deleted";
    }
    @LoggableOperation(OperationType.PERSONAL_UPDATE)
    @Override
    public DtoPersonal update(Long id, DtoPersonalIU dto) {
        log.info("personel silme işlemi başlatılıyor: {}",id);
        Personal personal = personalRepository.findById(id).orElseThrow(
                ()->new BaseException(new ErrorMessage(MessageType.PERSONAL_NOT_FOUND,id.toString())));
        PersonalMapper.UpdatePersonal(personal,dto);
        Personal savedPersonal = personalRepository.save(personal);
        log.info("personel güncellendi: {}",id);
        return PersonalMapper.toDto(savedPersonal);
    }
    @LoggableOperation(OperationType.PERSONAL_UPDATE_PHOTO)
    @Override
    public void updateProfilePhoto(Long id, String filename) {
        Personal personal = personalRepository.findById(id).orElseThrow(
                ()->new BaseException(new ErrorMessage(MessageType.PERSONAL_NOT_FOUND,id.toString())));
        personal.setProfilePhotoPath(filename);
        log.info("profil fotografı güncelleniyor. ID: {},filename: {} ",id,filename);
        personalRepository.save(personal);
    }
    @LoggableOperation(OperationType.PERSONAL_COUNT_ACTIVE)
    @Override
    public long countActivePersonals(){
        return personalRepository.countByIsActiveTrue();
    }

    @LoggableOperation(OperationType.PERSONAL_GET_ALL_ACTIVE)
    @Override
    public List<DtoPersonal> getAllActivePersonals() {
        List<Personal> activePersonals = personalRepository.findByIsActiveTrue();
        log.info("Tüm aktif personeller getirildi");
        return activePersonals.stream().map(PersonalMapper::toDto).toList();
    }

}
