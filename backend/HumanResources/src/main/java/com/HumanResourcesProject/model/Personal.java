package com.HumanResourcesProject.model;


import com.HumanResourcesProject.enums.Gender;
import com.HumanResourcesProject.enums.Mezuniyet;
import com.HumanResourcesProject.enums.TaskTitle;
import com.HumanResourcesProject.enums.Unit;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.envers.Audited;

import java.time.LocalDate;

@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
@Entity
@Audited
@Table(name = "personal")
public class Personal extends BaseEntity{
    @Column(name = "first_name", nullable = false, length = 50)
    private String firstName;

    @Column(name = "last_name", nullable = false, length = 50)
    private String lastName;

    @Enumerated(EnumType.STRING)
    @Column(name = "gender", nullable = false)
    private Gender gender;

    @Column(name = "birth_date", nullable = false)
    private LocalDate birthDate;

    @Column(name = "marital_status", nullable = false)
    private String maritalStatus;

    @Column(name = "tckn", nullable = false, unique = true, length = 11)
    private String tckn;

    @Column(name = "registration_no", nullable = false, unique = true)
    private Integer registrationNo;

    @Enumerated(EnumType.STRING)
    private Mezuniyet educationLevel;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Unit unit;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private TaskTitle taskTitle;

    @Column(name = "working", nullable = false)
    private Boolean working;

    @Column(name = "profile_photo_path",length = 300)
    private String profilePhotoPath;

    @Column(name = "start_date")
    private LocalDate startDate;

    @Column(name = "starting_position")
    private String startingPosition;

    @Column(name = "starting_title")
    private String startingTitle;

    @Column(name = "resignation_date")
    private LocalDate resignationDate;

    @Column(name = "resignation_reason")
    private String resignationReason;
    @Column(name = "is_active")
    private Boolean isActive = true;

    public Boolean isActive() {
        return isActive;
    }

    public void setActive(Boolean active) {
        isActive = active;
    }
}
