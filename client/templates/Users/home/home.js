/* Note about the anonymous functions: I'm using them to create private scopes
 * for each template.  I do this whenever I am controlling more than one
 * template in a file. This is unnecessary for this case, but it's generally a
 * good practice for when the app gets more complex. You do not need to copy
 * them over. */

(function() {

  //TEMPLATE DisplayProperties -> the first screen the user sees

  Template.DisplayProperties.onCreated(function() {
    //reset entire session:
    for ( var key in Session.keys ) {
      Session.set(key, undefined);
    }
  });

  Template.DisplayProperties.helpers({
    zeroProps : function() {
      if ( Properties.find().count() === 0 ) {
        return true;
      }
      return false;
    }
  });

  Template.DisplayProperties.events({
    'click .delete' : function(e, t) {
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
    }
  });
})();

//============================================================================

(function() {

  Template.HomeHasProperties.onCreated(function() {
    Meteor.Loader.loadJs("http://cdnjs.cloudflare.com/ajax/libs/gsap/1.11.8/TweenMax.min.js");
  });
  //TEMPLATE HomeHasProperties -> shows a stack of all the properties.

  Template.HomeHasProperties.helpers({
    properties : function() {
      return Properties.find();
    }
  });

  Template.HomeHasProperties.events({
    'click .property__options--trigger' : function(e) {
      e.preventDefault();
      var $target = $(e.target);
      $target.parents('.property__options--trigger-container').siblings('.property__options-list-wrapper').toggle(400, 'swing');
    }
  });

})();
