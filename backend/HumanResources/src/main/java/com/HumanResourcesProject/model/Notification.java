package com.HumanResourcesProject.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.envers.Audited;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "notification")
public class Notification extends BaseEntity{

    @Column(name = "title")
    private String title;
    @Column(name = "message")
    private String message;

    @Column(name = "read")
    private Boolean read = false;

    @ManyToOne
    private User user;



}
