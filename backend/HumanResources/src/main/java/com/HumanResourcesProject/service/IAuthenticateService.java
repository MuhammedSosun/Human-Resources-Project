package com.HumanResourcesProject.service;

import com.HumanResourcesProject.dto.AuthRequest;
import com.HumanResourcesProject.dto.AuthResponse;
import com.HumanResourcesProject.dto.DtoUser;
import com.HumanResourcesProject.dto.RefreshTokenRequest;

public interface IAuthenticateService {
    DtoUser register(DtoUser dto);
    AuthResponse authenticate(AuthRequest authRequest);
    AuthResponse refreshToken(RefreshTokenRequest request);
}
