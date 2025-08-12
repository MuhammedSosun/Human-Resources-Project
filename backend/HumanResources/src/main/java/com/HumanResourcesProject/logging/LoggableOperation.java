package com.HumanResourcesProject.logging;


import com.HumanResourcesProject.enums.OperationType;

import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

import static java.lang.annotation.ElementType.METHOD;

@Target({METHOD})
@Retention(RetentionPolicy.RUNTIME)
public @interface LoggableOperation {
    OperationType value();
}
