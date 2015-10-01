Template.jobAccess.helpers({
    jobAccessSchema : function() {
        return JobAccessSchema;
    },
    jobAccessDoc : function() {
        return Session.get("job.access")||{};
    }
});
