/* Note about the anonymous functions: I'm using them to create private scopes
 * for each template.  I do this whenever I am controlling more than one
 * template in a file. This is unnecessary for this case, but it's generally a
 * good practice for when the app gets more complex. You do not need to copy
 * them over. */

(function() {

  //TEMPLATE displayProperties -> the first screen the user sees

  Template.displayProperties.onCreated(function() {
    //reset entire session:
    for ( var key in Session.keys ) {
      Session.set(key, undefined);
    }
  });

  Template.displayProperties.helpers({
    zeroProps : function() {
      if ( Properties.find().count() === 0 ) {
        return true;
      }
      return false;
    }
  });

  Template.displayProperties.events({
    'click [fxn=delete]' : function(e, t) {
      var id = e.currentTarget.dataset.id;
      var conf = confirm("Sure you want to delete this property?");
      if ( conf ) {
        Properties.remove(id, function(err, data) {
          if ( err ) {
            alert(err.message);
            console.log(err);
          }
        });
      }
    },

    'click [fxn=view_job]' : function(e,t) {
        //TODO - view job
    },

    //'click [fxn=new_job]' : function(e,t) {
    //    var id = e.currentTarget.dataset.id;
    //    var draft = Jobs.Drafts.findOne({propertyId:id});
    //    if ( draft ) {
    //        Session.setPersistent("job:property",   draft["job:property"]||{});
    //        Session.setPersistent("job:story",      draft["job:story"]   ||{});
    //        Session.setPersistent("job:contact",    draft["job:contact"] ||{});
    //        Session.setPersistent("job:access",     draft["job:access"]  ||{});
    //        console.log("draft loaded.");
    //    } else {
    //        console.log("no draft - creating new");
    //    }
    //    FlowRouter.go("job.property");
    //}
  });
})();

//============================================================================

(function() {

  //TEMPLATE homeHasProperties -> shows a stack of all the properties.

  Template.homeHasProperties.helpers({
    properties : function() {
      return Properties.find();
    },

    property_has_job : function(id) {
      return Jobs.find({propertyId : id}).fetch().length > 0;
    }

  });

})();
