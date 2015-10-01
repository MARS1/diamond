Template.JobStory.helpers({
    jobStorySchema : function() {
        return JobStorySchema;
    },
    jobStoryData : function() {
        return Session.get("job.story")||{};
    }
});

//Template.JobStory.helpers({
//  can_proceed : function() {
//    var newJobObj = Session.get("new:job")||{};
//    return newJobObj.attention_details;
//  },
//
//  new_job : function() {
//    return Session.get("new:job")||{};
//  }
//});
//
//Template.JobStory.events({
//  'change #special_details' : function(e,t) {
//    var text = e.currentTarget.value;
//    var newJobObj = Session.get("new:job")||{};
//    newJobObj.special_details = text;
//    Session.setPersistent("new:job", newJobObj);
//  },
//
//  'change #attention_details' : function(e,t) {
//    var text = e.currentTarget.value;
//    var newJobObj = Session.get("new:job")||{};
//    newJobObj.attention_details = text;
//    Session.setPersistent("new:job", newJobObj);
//  },
//});
