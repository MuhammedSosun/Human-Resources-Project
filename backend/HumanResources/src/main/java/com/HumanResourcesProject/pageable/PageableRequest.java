package com.HumanResourcesProject.pageable;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PageableRequest {
        private int pageNumber;

        private int pageSize;

        private String ColumnName;

        private boolean asc;

}
