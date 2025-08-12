package com.HumanResourcesProject.dto;

import com.HumanResourcesProject.enums.Role;
import com.fasterxml.jackson.annotation.JsonInclude;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@JsonInclude(JsonInclude.Include.NON_NULL)
public class DtoUser extends DtoBase{
    @NotEmpty(message = "USERNAME CANNOT BE EMPTY!")
    private String username;
    @NotEmpty(message = "PASSWORD CANNOT BE EMPTY AND at least 6 characters")
    @Size(min = 6,message = "PASSWORD MUST BE LONGER THAN 6 CHARACTERS")
    private String password;
    @NotNull(message = "ROLE CANNOT BE EMPTY")
    private Role role;
    @Min(value = 1000,message = "PLEASE ENTER A NUMBER AT LEAST 4 DIGITS!!")
    private Integer registrationNo;



}
