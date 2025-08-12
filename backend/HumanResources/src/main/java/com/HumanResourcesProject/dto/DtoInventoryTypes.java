    package com.HumanResourcesProject.dto;

    import jakarta.validation.constraints.NotEmpty;
    import lombok.AllArgsConstructor;
    import lombok.Getter;
    import lombok.NoArgsConstructor;
    import lombok.Setter;

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    public class DtoInventoryTypes extends DtoBase{
        @NotEmpty
        private String name;


    }
