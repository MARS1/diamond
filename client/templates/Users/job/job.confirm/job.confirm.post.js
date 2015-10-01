Template.JobConfirm.helpers({
  new_job : function() {
    return Session.get("new:job")||{};
  },
});

Template.JobConfirm.events({
  'click input[type=checkbox]' : function(e,t) {
    //there's only one checkbox, it's the agree to terms box
    var newJobObj = Session.get("new:job")||{};
    newJobObj.terms_agreed = !newJobObj.terms_agreed;
    Session.setPersistent("new:job", newJobObj);
  }
});
