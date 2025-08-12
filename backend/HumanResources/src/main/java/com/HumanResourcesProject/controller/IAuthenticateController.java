package com.HumanResourcesProject.controller;

import com.HumanResourcesProject.dto.AuthRequest;
import com.HumanResourcesProject.dto.AuthResponse;
import com.HumanResourcesProject.dto.DtoUser;
import com.HumanResourcesProject.dto.RefreshTokenRequest;

public interface IAuthenticateController {

    RootEntity<DtoUser> register(DtoUser dto);
    RootEntity<AuthResponse> authenticate(AuthRequest request);
    RootEntity<AuthResponse> refreshToken(RefreshTokenRequest request);
}
