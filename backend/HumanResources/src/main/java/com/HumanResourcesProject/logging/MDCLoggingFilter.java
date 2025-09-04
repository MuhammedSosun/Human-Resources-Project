package com.HumanResourcesProject.logging;

import com.HumanResourcesProject.logging.log.RequestWrapper;
import com.HumanResourcesProject.logging.log.ResponseWrapper;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.io.IOUtils;
import org.slf4j.MDC;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;


@Slf4j
@Component
@RequiredArgsConstructor
public class MDCLoggingFilter extends OncePerRequestFilter {

    @Override
    protected void doFilterInternal(HttpServletRequest request
            , HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {
        RequestWrapper requestWrapper = new RequestWrapper(request);
        ResponseWrapper responseWrapper = new ResponseWrapper(response);
        try {
            setResponseHeader(responseWrapper);
            MDCUtil.setUseContext();
            log.info(requestLogFormatString(requestWrapper));
            String ip = getClientApi(request);
            MDC.put("ip", ip);
            filterChain.doFilter(requestWrapper, responseWrapper);
            log.info(responseLogFormatString(responseWrapper));
        }finally {
            MDC.clear();
        }
    }
    private String getClientApi(HttpServletRequest request){
        String ip = request.getHeader("X-Forwarded-For");
        if (ip == null) {
            return request.getRemoteAddr();
        }
        return ip.split(",")[0];
    }
    private String requestLogFormatString(RequestWrapper requestWrapper){
        return String.format("## %s ## Request Method: %s, Request Uri: %s Request TraceId: %s, Request Headers: %s, Request Body: %s",
                requestWrapper.getServerName(),
                requestWrapper.getMethod(),
                requestWrapper.getRequestURI(),
                MDCUtil.getTraceId(),
                requestWrapper.getAllHeaders(),
                RequestWrapper.body);
    }
    private String responseLogFormatString(ResponseWrapper responseWrapper){
        String contentType = responseWrapper.getContentType();
        String body = "Binary content not logged";

        if (contentType != null && contentType.contains("application/json")) {
            try {
                body = IOUtils.toString(responseWrapper.getCopyBody(), responseWrapper.getCharacterEncoding());
            } catch (Exception e) {
                body = "Error reading response body";
            }
        }
        return String.format("Response Status: %s, Response Headers: %s, Response TraceId: %s, Response Body: %s",
                responseWrapper.getStatus(),
                responseWrapper.getAllHeaders(),
                MDCUtil.getTraceId(),
                body);
    }
    private void setResponseHeader(HttpServletResponse response){
        response.addHeader("X-Trace-Id", MDC.get("trace_id"));    }
}

