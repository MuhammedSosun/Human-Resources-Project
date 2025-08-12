package com.HumanResourcesProject.handler;

import com.HumanResourcesProject.exception.BaseException;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.MDC;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.validation.ObjectError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;

import java.net.Inet4Address;
import java.net.UnknownHostException;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Slf4j
@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(value = {BaseException.class})
    public ResponseEntity<ApiError<?>> handleBaseException(BaseException ex,WebRequest request){
        logException(ex,request);
        return ResponseEntity.badRequest().body(createApiError(ex,request));
    }
    @ExceptionHandler(value = {MethodArgumentNotValidException.class})
    public ResponseEntity<ApiError<Map<String,List<String>>>> handleMethodNotValidException(MethodArgumentNotValidException ex,WebRequest request){
        logException(ex,request);
        Map<String,List<String>>map = new HashMap<>();
        for (ObjectError objectError:ex.getBindingResult().getAllErrors()){
            String fieldName = ((FieldError) objectError).getField();
            if (map.containsKey(fieldName)){
                map.put(fieldName,addValue(map.get(fieldName),objectError.getDefaultMessage()));
            }
            else {
                map.put(fieldName,addValue(new ArrayList<>(),objectError.getDefaultMessage()));
            }
        }
        return ResponseEntity.badRequest().body(createApiError(map,request));
    }
    private List<String>addValue(List<String> list,String neWValue){
        list.add(neWValue);
        return list;
    }
    private String getHostName() {
        try {
            return Inet4Address.getLocalHost().getHostName();
        } catch (UnknownHostException e) {
            return "unknown-host: " + e.getMessage();
        }
    }
    public <E> ApiError<E> createApiError(E message, WebRequest request){
        ApiError<E> apiError = new ApiError<>();
        apiError.setStatus(HttpStatus.INTERNAL_SERVER_ERROR.value());

        ErrorDetail<E> errorDetail = new ErrorDetail<>();
        errorDetail.setPath(request.getDescription(false).substring(4));
        errorDetail.setCreateTime(LocalDateTime.now());
        errorDetail.setMessage(message);
        errorDetail.setHost(getHostName());

        apiError.setErrorDetail(errorDetail);
        return apiError;
    }
    private void logException(Exception ex,WebRequest request){
        Map<String,Object> logDetails = new HashMap<>();
        logDetails.put("exception",ex.getClass().getSimpleName());
        logDetails.put("message",ex.getMessage());
        logDetails.put("path",request.getDescription(false).replace("uri"," "));
        logDetails.put("timestamp",LocalDateTime.now().toString());
        logDetails.put("host",getHostName());

        logDetails.put("username", MDC.get("username"));
        logDetails.put("role", MDC.get("role"));
        logDetails.put("ip", MDC.get("ip"));
        logDetails.put("requestId", MDC.get("requestId"));
        logDetails.put("trace_id",MDC.get("trace_id"));

        log.error("Exception occured: {}",logDetails);

    }
}
