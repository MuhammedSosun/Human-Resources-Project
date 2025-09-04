package com.HumanResourcesProject.logging.log;

import jakarta.servlet.ServletOutputStream;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpServletResponseWrapper;

import java.io.IOException;
import java.io.OutputStreamWriter;
import java.io.PrintWriter;
import java.util.HashMap;
import java.util.Map;

public class ResponseWrapper extends HttpServletResponseWrapper {
    private ServletOutputStream outputStream;
    private PrintWriter printWriter;
    private ServletOutputStreamWrapper copi;

    public ResponseWrapper(HttpServletResponse response) {
        super(response);
    }
    //headerleri aldıgımız method tıpkı RequestWrapper sınıfında yazdıgımız gibi
    public Map<String, String> getAllHeaders() {
        Map<String,String> headers = new HashMap<>();
        getHeaderNames().forEach(header ->headers.put(header,getHeader(header)));
        return headers;
    }
    //HttpServletResponseWrapper bir kere dönen responsu biz tekrar tekrar kullanmak için copi attribute ye atıyoruz
    @Override
    public ServletOutputStream getOutputStream() throws IOException {
        if (printWriter != null){
            throw new IllegalStateException("getWriter() has already been called on this response.");
        }
        if (outputStream == null){
            outputStream = getResponse().getOutputStream();
            copi = new ServletOutputStreamWrapper(outputStream);
        }
        return copi;
    }
    //dönen çıktıyı printwritera yazıyoruz
    @Override
    public PrintWriter getWriter() throws IOException {
        if (outputStream != null) {
            throw new IllegalStateException("getOutputStream() has already been called on this response.");
        }
        if (printWriter == null){
            copi =new ServletOutputStreamWrapper(getResponse().getOutputStream());
            printWriter = new PrintWriter(new OutputStreamWriter(copi,getResponse().getCharacterEncoding()),true);

        }
        return printWriter;
    }

    @Override
    public void flushBuffer() throws IOException {
        if (printWriter != null){
            printWriter.flush();
        } else if (outputStream != null) {
            copi.flush();
        }
    }

    public byte[] getCopyBody() {
        if (copi != null){
            return copi.getCopy();
        }
        return new byte[0];
    }

}
