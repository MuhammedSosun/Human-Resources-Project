package com.HumanResourcesProject.mapper;

import com.HumanResourcesProject.dto.DtoUser;
import com.HumanResourcesProject.model.User;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.time.LocalDateTime;

public class UserMapper {

    public static User toEntity(DtoUser dto, PasswordEncoder passwordEncoder){
        User user = new User();
        user.setUsername(dto.getUsername());
        user.setPassword(passwordEncoder.encode(dto.getPassword()));
        user.setRole(dto.getRole());
        user.setCreateTime(LocalDateTime.now());
        return user;
    }
    public static DtoUser toDto(User user){
        DtoUser dtoUser = new DtoUser();
        dtoUser.setId(user.getId());
        dtoUser.setUsername(user.getUsername());
        dtoUser.setRole(user.getRole());
        dtoUser.setCreateTime(user.getCreateTime());
        return dtoUser;
    }
}
