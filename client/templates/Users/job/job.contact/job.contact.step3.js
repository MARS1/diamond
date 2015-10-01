Template.JobContact.helpers({
    jobContactSchema : function() {
        return JobContactSchema;
    },
    jobContactDoc : function() {
        return Session.get("job:contact")||{};
    }
});






//=====================================
//Template.JobContact.helpers({
//  can_proceed : function() {
//      var newJobObj = Session.get("new:job")||{};
//
//      console.log(newJobObj.contact_name);
//      console.log(newJobObj.contact_email);
//      console.log(newJobObj.contact_phone);
//      return !!newJobObj.contact_name &&
//        !!newJobObj.contact_email &&
//        !!newJobObj.contact_phone;
//  },
//
//  new_job : function() {
//    return Session.get("new:job")||{};
//  },
//
//});
//
//Template.JobContact.events({
//  'change #contact_name' : function(e,t) {
//    var value = e.currentTarget.value;
//    var newJobObj = Session.get("new:job")||{};
//    newJobObj.contact_name = value;
//    Session.setPersistent("new:job", newJobObj);
//  },
//
//  'change #contact_email' : function(e,t) {
//    var value = e.currentTarget.value;
//    var newJobObj = Session.get("new:job")||{};
//    newJobObj.contact_email = value;
//    Session.setPersistent("new:job", newJobObj);
//  },
//
//  'change #contact_phone' : function(e,t) {
//    var value = e.currentTarget.value;
//    var newJobObj = Session.get("new:job")||{};
//    newJobObj.contact_phone = value;
//    Session.setPersistent("new:job", newJobObj);
//  }
//});
