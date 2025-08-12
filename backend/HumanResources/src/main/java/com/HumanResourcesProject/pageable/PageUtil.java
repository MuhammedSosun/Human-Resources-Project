package com.HumanResourcesProject.pageable;

import lombok.experimental.UtilityClass;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

import java.util.List;

@UtilityClass
public class PageUtil {


    public boolean isNullOrEmpty(String value){
        return value == null || value.trim().length() == 0;
    }

    public Pageable toPageable(PageableRequest request){
        if (!isNullOrEmpty(request.getColumnName())){
            Sort sortBy = request.isAsc() ? Sort.by(Sort.Direction.ASC, request.getColumnName())
                    :Sort.by(Sort.Direction.DESC, request.getColumnName());
            return PageRequest.of(request.getPageNumber(), request.getPageSize(),sortBy);
        }
        return PageRequest.of(request.getPageNumber(),request.getPageSize());
    }
    public <T> PageableEntity<T>toPageableResponse(Page<?> page, List<T> content){
            PageableEntity<T> pageableEntity = new PageableEntity<>();
            pageableEntity.setContent(content);
            pageableEntity.setPageNumber(page.getNumber());
            pageableEntity.setPageSize(page.getSize());
            pageableEntity.setTotalElements(page.getTotalElements());

            return pageableEntity;
    }
}
