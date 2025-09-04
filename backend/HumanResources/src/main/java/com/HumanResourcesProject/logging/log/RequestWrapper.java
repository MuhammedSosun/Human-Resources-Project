package com.HumanResourcesProject.logging.log;

import jakarta.servlet.ReadListener;
import jakarta.servlet.ServletInputStream;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletRequestWrapper;

import java.io.BufferedReader;
import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.Collections;
import java.util.HashMap;
import java.util.Map;

//normalde getInputStream ve getReader bir kere okunan methodlardır fakat bu classta biz tekrar okunmasını sağlıyoruz
//yani bus sınıf isteğin gövdesini(body) bellekte saklayarak tekrar tekrar okumasını sağlar
public class RequestWrapper extends HttpServletRequestWrapper {
    public static String body;
    //bir body okuyoruz ve getReader okunan veriyi ona atıyoruz sonrada satır satır ekliyoruz verileri
    public RequestWrapper(HttpServletRequest request) {
        super(request);
        this.body = "";
        try(BufferedReader bufferedReader = request.getReader()) {
            StringBuilder sb = new StringBuilder();
            String line;
            //body satır satır okunup Stringbuilder a ekleniyor
            while ((line = bufferedReader.readLine()) != null) {
                sb.append(line);
                body = sb.toString();
            }
        } catch (IOException e) {
            throw new RuntimeException(e);
        }

    }
//header leri topladıgımız method örneğin Authorization = Bearer ***** gibi yazılarda header(Authorization) alıyoruz
    public Map<String, String> getAllHeaders(){
        Map<String,String> headers = new HashMap<>();
        Collections.list(getHeaderNames()).forEach(header ->headers.put(header,getHeader(header)));
        return headers;
    }
    //getInput methodunu byte dizisi olarak okuyoruz ve hazır halini true yapıyoruz
    @Override
    public ServletInputStream getInputStream() throws IOException {
        final ByteArrayInputStream byteArrayInputStream = new ByteArrayInputStream(body.getBytes());
        return new ServletInputStream() {

            @Override
            public int read() throws IOException {
                return byteArrayInputStream.read();
            }
            @Override
            public boolean isFinished() {
                return false;
            }

            @Override
            public boolean isReady() {
                return true;
            }

            @Override
            public void setReadListener(ReadListener readListener) {

            }
        };
    }
    //buda tampon okuyucu (BufferedReader) verilen inputumuzu alıyoruz ve tamponda tutuyoruz
    @Override
    public BufferedReader getReader() throws IOException {
        return new BufferedReader(new InputStreamReader(this.getInputStream()));
    }
}
