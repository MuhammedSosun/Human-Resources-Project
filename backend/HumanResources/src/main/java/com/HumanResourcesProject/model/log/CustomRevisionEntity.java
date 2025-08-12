package com.HumanResourcesProject.model.log;

import jakarta.persistence.Entity;
import jakarta.persistence.PrePersist;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.envers.DefaultRevisionEntity;
import org.hibernate.envers.RevisionEntity;

import java.time.LocalDateTime;

@Entity
@RevisionEntity(CustomRevisionListener.class)
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class CustomRevisionEntity extends DefaultRevisionEntity {
    private String executorUsername;
    private LocalDateTime createTime;


    @PrePersist
    public void prePersist() {
        this.createTime = LocalDateTime.now();
    }

}
