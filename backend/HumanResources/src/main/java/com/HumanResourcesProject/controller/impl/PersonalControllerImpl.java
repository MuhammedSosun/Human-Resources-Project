package com.HumanResourcesProject.controller.impl;

import com.HumanResourcesProject.controller.IPersonalController;
import com.HumanResourcesProject.controller.RestBaseController;
import com.HumanResourcesProject.controller.RootEntity;
import com.HumanResourcesProject.dto.*;
import com.HumanResourcesProject.exception.BaseException;
import com.HumanResourcesProject.exception.ErrorMessage;
import com.HumanResourcesProject.exception.MessageType;
import com.HumanResourcesProject.model.Personal;
import com.HumanResourcesProject.model.User;
import com.HumanResourcesProject.repository.UserRepository;
import com.HumanResourcesProject.service.IAuthenticateService;
import com.HumanResourcesProject.service.INotificationService;
import com.HumanResourcesProject.service.IPersonalService;
import com.HumanResourcesProject.pageable.PageableEntity;
import com.HumanResourcesProject.pageable.PageableRequest;
import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Base64;
import java.util.List;
import java.util.Objects;

@Slf4j
@RestController
@RequestMapping("/rest/api/personal")
@EnableMethodSecurity
public class PersonalControllerImpl extends RestBaseController implements IPersonalController {

    @Value("${file.upload-dir}")
    private String uploadDir;

    private final IPersonalService personalService;

    private final IAuthenticateService authenticateService;

    private final INotificationService notificationService;

    private final UserRepository userRepository;

    public PersonalControllerImpl(IPersonalService personalService, IAuthenticateService authenticateService, INotificationService notificationService, UserRepository userRepository) {
        this.personalService = personalService;
        this.authenticateService = authenticateService;
        this.notificationService = notificationService;
        this.userRepository = userRepository;
    }
    @PostMapping("/save")
    @PreAuthorize("hasAnyRole('ADMIN', 'IK')")
    @Override
    public RootEntity<DtoPersonal> save(@Valid @RequestBody DtoPersonalIU dto) {
        notificationService.notifyAllAdmins(
                "Yeni Personel", dto.getFirstName() +" "+dto.getLastName() +" " + "Sisteme Eklendi"
                );
        return ok(personalService.save(dto));
    }
    @GetMapping("/list")
    @Override
    public RootEntity<PageableEntity<DtoPersonal>> findAll(PageableRequest request) {
        if (request.getPageSize() == 0 || request.getPageSize() < 0){
            request.setPageSize(10);
        }
        else if (request.getPageNumber() < 0 || request.getPageNumber() == 0){
            request.setPageNumber(0);
        }
        return ok(personalService.findAll(request));
    }
    @GetMapping("/filterByInfo")
    @PreAuthorize("hasAnyRole('ADMIN', 'IK')")
    @Override
    public RootEntity<List<DtoPersonal>> searchByRegistrationAndName(@RequestParam(required = false) Integer registrationNo,
                                                                     @RequestParam(required = false) String firstName,
                                                                     @RequestParam(required = false) String lastName) {
        DtoFilterRegistrationAndName dto = new DtoFilterRegistrationAndName();
        dto.setRegistrationNo(registrationNo);
        dto.setFirstName(firstName);
        dto.setLastName(lastName);
        return ok(personalService.searchByRegistrationAndName(dto));
    }
    @GetMapping("/search")
    @PreAuthorize("hasAnyRole('ADMIN', 'IK')")
    @Override
    public RootEntity<List<DtoPersonal>> search(
            @RequestParam(required = false) String firstName,
            @RequestParam(required = false) String lastName,
            @RequestParam(required = false) String tckn,
            @RequestParam(required = false) String unit) {

        DtoPersonalFilter filter = new DtoPersonalFilter();
        filter.setFirstName(firstName);
        filter.setLastName(lastName);
        filter.setTckn(tckn);
        filter.setUnit(unit);

        return ok(personalService.search(filter));
    }

    @GetMapping("/get/{id}")
    @PreAuthorize("hasAnyRole('ADMIN', 'IK')")
    @Override
    public RootEntity<DtoPersonal> getPersonalById(@PathVariable  Long id) {
        return ok(personalService.getPersonalById(id));
    }

    @DeleteMapping("/delete/{id}")
    @PreAuthorize("hasAnyRole('ADMIN', 'IK')")
    @Override
    public RootEntity<String> deletePersonal(@PathVariable Long id) {
        String result = personalService.deletePersonel(id);
        return ok("Personal is deleted successfully.");
    }
    @PutMapping("/update/{id}")
    @PreAuthorize("hasAnyRole('ADMIN', 'IK')")
    @Override
    public RootEntity<DtoPersonal> updatePersonal(@PathVariable Long id,@Valid @RequestBody DtoPersonalIU dto) {
        notificationService.notifyAllAdmins(
                dto.getFirstName() + " " + dto.getLastName() ," Personel Güncellendi"
        );
        return ok(personalService.update(id,dto));
    }
    @PostMapping(value = "/upload/image")
    public ResponseEntity<String> uploadImage(@RequestBody UploadRequest request){

        try {

            byte[] decoded = Base64.getDecoder().decode(request.getBase64Content());
            Path uploadPath = Paths.get(uploadDir);
            Files.createDirectories(uploadPath);
            String newFileName = "personal_" + request.getPersonalId() + request.getFileName();
            Path filePath = uploadPath.resolve(newFileName);
            Files.write(filePath,decoded);

            personalService.updateProfilePhoto(request.getPersonalId(),newFileName);
            return ResponseEntity.ok("Image uploaded successfully");
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error uploading image: " + e.getMessage());
        }
    }

    @GetMapping("/images/{filename}")
    public ResponseEntity<Resource> getImage(@PathVariable String filename){
        try {
            Objects.requireNonNull(filename, "fileName null geliyor");
            Objects.requireNonNull(uploadDir, "uploadDir null geliyor");

            Path filePath = Paths.get(uploadDir).resolve(filename);
            log.info("Tam dosya yolu: {}", filePath.toAbsolutePath());

            Resource resource = new UrlResource(filePath.toUri());

            if (resource.exists()){
                return ResponseEntity.ok()
                        .contentType(MediaType.IMAGE_JPEG)
                        .body(resource);
            } else {
                log.warn("Dosya bulunamadı: {}", filePath);
                return ResponseEntity.notFound().build();
            }

        } catch (Exception e) {
            log.error("getImage hatası:", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping("/{id}/photo")
    public ResponseEntity<Resource> getPersonalPhoto(@PathVariable Long id) {
        DtoPersonal personal = personalService.getPersonalById(id);
        if (personal == null) {
            log.warn("ID {} için personel bulunamadı", id);
            return ResponseEntity.notFound().build();
        }
        String fileName = personal.getProfilePhotoPath();
        if (fileName == null || fileName.trim().isEmpty()) {
            log.warn("Personel {} için fotoğraf yolu boş!", id);
            return ResponseEntity.notFound().build(); // veya default profil resmi dönebilirsin
        }
        return getImage(fileName);
    }
    @GetMapping("/count/active")
    @Override
    public ResponseEntity<Long> getActivePersonalCount() {
        long count = personalService.countActivePersonals();
        return ResponseEntity.ok(count);    }
    @GetMapping("/list-active")
    @PreAuthorize("hasAnyRole('ADMIN', 'IK','ENVANTER')")
    @Override
    public RootEntity<List<DtoPersonal>> listAllActivePersonals() {
        return ok(personalService.getAllActivePersonals());
    }
    @GetMapping("/me")
    @PreAuthorize("hasAnyRole('PERSONAL')")
    @Override
    public RootEntity<DtoPersonal> getMyProfile(Authentication authentication) {
        User user = (User) authentication.getPrincipal();
        System.out.println(user);
        if (user.getPersonal() == null) {
            throw new BaseException(new ErrorMessage(
                    MessageType.PERSONAL_NOT_LINKED,
                    "Kullanıcıya bağlı bir Personal kaydı bulunamadı."
            ));
        }
        Long personalId = user.getPersonal().getId();
        DtoPersonal dtoPersonal = personalService.getPersonalById(personalId);
        return ok(dtoPersonal);
    }
}
