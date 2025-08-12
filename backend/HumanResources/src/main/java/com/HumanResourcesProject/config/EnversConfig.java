package com.HumanResourcesProject.config;

import com.HumanResourcesProject.model.User;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.envers.repository.config.EnableEnversRepositories;
import org.springframework.transaction.annotation.EnableTransactionManagement;

@Configuration
@EnableEnversRepositories(basePackageClasses = User.class)
@EnableTransactionManagement
public class EnversConfig {
}
