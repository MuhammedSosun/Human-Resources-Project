package com.HumanResourcesProject.logging;

import com.HumanResourcesProject.enums.OperationType;
import lombok.extern.slf4j.Slf4j;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.slf4j.MDC;
import org.springframework.stereotype.Component;
import org.springframework.util.StopWatch;

@Slf4j
@Aspect
@Component
public class LoggingAspect {
//database için bütün işlemelri loglayan ortak bir yerden yönetebilmemi sağlayan bir uygulama var ve spring ile ilgili
    //enverse implement edilecek
    //önce loglama request response sonra maskeleme sonra yukardaki bu bitti
    @Around("@annotation(loggableOperation)")
    public Object logExecution(ProceedingJoinPoint joinPoint,
                               LoggableOperation loggableOperation) throws Throwable {
    StopWatch stopWatch = new StopWatch();
    stopWatch.start();

    OperationType operation = loggableOperation.value();
    String methodName = joinPoint.getSignature().toShortString();
    Object[] args = joinPoint.getArgs();

        MDC.put("operation", operation.name());

    log.info("🔹 START [{}] -> Method: {}, Args: {}", operation, methodName, args);

    try {
        Object result = joinPoint.proceed();

        stopWatch.stop();
        log.info("END [{}] -> Duration: {} ms", operation, stopWatch.getTotalTimeMillis());
        return result;

    }catch (Exception e){
        stopWatch.stop();
        log.error("ERROR [{}] -> Duration: {} ms, Exception: {}", operation, stopWatch.getTotalTimeMillis(), e.getMessage());
        throw e;
    }finally {
        MDC.remove("operation");
    }
    }
}
