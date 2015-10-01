Template.jobStory.helpers({
    jobStorySchema : function() {
        return JobStorySchema;
    },
    jobStoryData : function() {
        return Session.get("job.story")||{};
    }
});

Template.jobStory.events({});
