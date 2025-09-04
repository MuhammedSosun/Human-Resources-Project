package com.HumanResourcesProject.logging;

import org.slf4j.MDC;
import org.springframework.security.core.context.SecurityContextHolder;

import java.util.UUID;

public class MDCUtil {

    private static final String TRACE_ID = "trace_id";

    public static void setUseContext() {
        if (MDC.get(TRACE_ID) == null) {
            MDC.put(TRACE_ID, UUID.randomUUID().toString());
        }
        var Authentication = SecurityContextHolder.getContext().getAuthentication();

        if (Authentication != null && Authentication.isAuthenticated()) {
            MDC.put("username", Authentication.getName());
            MDC.put("role", Authentication.getAuthorities().toString());
        }else {
            MDC.put("username", "anonymous");
            MDC.put("role", "NONE");
        }
    }
    public static void clear(){
        MDC.clear();
    }

    public static String getTraceId() {
        return MDC.get(TRACE_ID);
    }
}
