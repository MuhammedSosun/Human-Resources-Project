package com.HumanResourcesProject.repository;

import com.HumanResourcesProject.enums.Unit;
import com.HumanResourcesProject.model.Personal;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PersonalRepository extends JpaRepository<Personal,Long> {
    @Query("SELECT p FROM Personal p " +
            "WHERE (:firstName IS NULL OR LOWER(p.firstName) LIKE :firstName) " +
            "AND (:lastName IS NULL OR LOWER(p.lastName) LIKE :lastName) " +
            "AND (:tckn IS NULL OR p.tckn = :tckn ) " +
            "AND (:unit IS NULL OR p.unit = :unit) " +
            "AND p.isActive = true")
    List<Personal> search(@Param("firstName") String firstNamePattern,
                          @Param("lastName") String lastNamePattern,
                          @Param("tckn") String tckn,
                          @Param("unit") Unit unit);
    @Query("SELECT p FROM Personal p " +
            "WHERE (:registrationNo IS NULL OR p.registrationNo = :registrationNo) " +
            "AND (:firstName IS NULL OR LOWER(p.firstName) LIKE :firstName) " +
            "AND (:lastName IS NULL OR LOWER(p.lastName) LIKE :lastName) " +
            "AND (:unit IS NULL OR p.unit = :unit)")
    List<Personal> findPersonalByRegistrationNoAndName(
            @Param("registrationNo") Integer registrationNo,
            @Param("firstName") String firstName,
            @Param("lastName") String lastName,
            @Param("unit") Unit unit);



    List<Personal> findByIsActiveTrue();

    @Query("SELECT MAX(p.registrationNo) FROM Personal p")
    Integer findMaxRegistrationNo();

    long countByIsActiveTrue();

    Optional<Personal> findPersonalByRegistrationNo(Integer registrationNo);


}
