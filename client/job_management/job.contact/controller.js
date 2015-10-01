Template.jobContact.helpers({
    jobContactSchema : function() {
        return JobContactSchema;
    },
    jobContactDoc : function() {
        return Session.get("job:contact")||{};
    }
});
