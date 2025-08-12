package com.HumanResourcesProject.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "refresh_token")
public class RefreshToken extends BaseEntity{
    @Column(name = "refresh_token")
    private String refreshToken;
    @Column(name = "expire_date")
    private Date expireDate;
    @ManyToOne
    private User user;
}
