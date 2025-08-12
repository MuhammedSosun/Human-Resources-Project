package com.HumanResourcesProject.mapper;

import com.HumanResourcesProject.model.RefreshToken;
import com.HumanResourcesProject.model.User;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.UUID;

public class RefreshTokenMapper {

        public static RefreshToken generate(User user){
            RefreshToken refreshToken = new RefreshToken();
            refreshToken.setCreateTime(LocalDateTime.now());
            refreshToken.setUser(user);
            refreshToken.setExpireDate(new Date(System.currentTimeMillis() + 1000*60*60*4));
            refreshToken.setRefreshToken(UUID.randomUUID().toString());

            return refreshToken;
        }
}
