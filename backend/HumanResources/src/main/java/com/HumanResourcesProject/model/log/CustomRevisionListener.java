    package com.HumanResourcesProject.model.log;

    import org.hibernate.envers.RevisionListener;
    import org.slf4j.MDC;

    import java.text.DateFormat;
    import java.text.SimpleDateFormat;
    import java.time.LocalDateTime;
    import java.util.Date;

    public class CustomRevisionListener implements RevisionListener {
        @Override
        public void newRevision(Object revisionEntity) {
            CustomRevisionEntity rev = (CustomRevisionEntity) revisionEntity;

            String username = MDC.get("username");
            rev.setExecutorUsername(username !=null ? username : "anonymous");
        }
    }
