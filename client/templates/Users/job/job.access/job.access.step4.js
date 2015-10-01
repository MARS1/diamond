Template.JobAccess.helpers({
    jobAccessSchema : function() {
        return JobAccessSchema;
    },
    jobAccessDoc : function() {
        return Session.get("job.access")||{};
    }
});













//===============================




//Template.JobAccess.helpers({
//  eq : function(a, b) {
//    return a === b;
//  },
//
//  new_job : function() {
//    return Session.get("new:job");
//  },
//
//  can_proceed : function() {
//    var newJobObj = Session.get("new:job")||{};
//    return newJobObj.access_type === "on_premise" ||
//      ( newJobObj.access_type === "off_premise" &&
//        newJobObj.access_instructions &&
//        newJobObj.access_instructions.length > 10 );
//  }
//});
//
//Template.JobAccess.events({
//  'click input' : function(e,t) {
//    var value = t.find("input:checked").value;
//    var newJobObj = Session.get("new:job")||{};
//    newJobObj.access_type = value;
//    Session.setPersistent("new:job", newJobObj);
//  },
//
//  'change textarea' : function(e,t) {
//    var value = e.currentTarget.value;
//    var newJobObj = Session.get("new:job")||{};
//    newJobObj.access_instructions = value;
//    Session.setPersistent("new:job", newJobObj);
//  }
//
//});
