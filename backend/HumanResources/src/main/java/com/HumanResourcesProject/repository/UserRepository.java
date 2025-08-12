package com.HumanResourcesProject.repository;

import com.HumanResourcesProject.enums.Role;
import com.HumanResourcesProject.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.history.RevisionRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User,Long>,RevisionRepository<User,Long,Integer>{
    Optional<User> findByUsername(String username);
    List<User> findByRole(Role role);
    @Query("SELECT u FROM User u LEFT JOIN FETCH u.personal WHERE u.username = :username")
    Optional<User> findUserWithPersonalByUsername(@Param("username") String username);


}
