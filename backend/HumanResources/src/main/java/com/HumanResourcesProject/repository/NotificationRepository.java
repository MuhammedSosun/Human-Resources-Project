package com.HumanResourcesProject.repository;

import com.HumanResourcesProject.enums.Role;
import com.HumanResourcesProject.model.Notification;
import com.HumanResourcesProject.model.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface NotificationRepository extends JpaRepository<Notification,Long> {
    //Bu kullanıcının tüm bildirmlerini getirir(en üstte olacak şekilde)
    Page<Notification> findByUserOrderByCreateTimeDesc(User user, Pageable pageable);

    //sadece okunmamıs bildirimler
    List<Notification> findByUserAndReadFalseOrderByCreateTimeDesc(User user);


    //admine gidecek tüm bildirimler
    Page<Notification> findAllByOrderByCreateTimeDesc(Pageable pageable);



}
