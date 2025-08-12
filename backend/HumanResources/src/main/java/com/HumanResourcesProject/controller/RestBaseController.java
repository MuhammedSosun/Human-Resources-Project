package com.HumanResourcesProject.controller;

import com.HumanResourcesProject.pageable.PageUtil;
import com.HumanResourcesProject.pageable.PageableEntity;
import com.HumanResourcesProject.pageable.PageableRequest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public class RestBaseController {


    public Pageable toPageable(PageableRequest request){
        return PageUtil.toPageable(request);
    }
    public <T> PageableEntity toPageableResponse(Page<?> page, List<T> content){
        return PageUtil.toPageableResponse(page,content);
    }

    public static <T> RootEntity<T> ok(T payload){
        return RootEntity.ok(payload);
    }
    public static <T> RootEntity<T> error(String errorMessage){
        return RootEntity.error(errorMessage);
    }
}
