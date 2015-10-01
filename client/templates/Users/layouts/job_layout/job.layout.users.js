//GoogleMaps api init
Meteor.startup(function() {
  GoogleMaps.load({
    v: '3',
    key: 'AIzaSyBf0l5NEIKzp2SuD0-YTkIBlUeIiFECIVk',
    libraries: 'geometry,places'
  });
});


(function() {

    // ===============================================================
    // Template -> JobLayoutUsers

    // JobLayoutUsers Helpers
    Template.JobLayoutUsers.onCreated(function() { });

    Template.JobLayoutUsers.helpers({
        linkCurrent : function(routeName) {
            var g = FlowRouter.getParam(); //reactivity
            var currentRoute = FlowRouter.current().route.name;
            if ( currentRoute === routeName ) {
                return 'current';
            } else {
                return '';
            }
        },
        eq : function(a,b) {
            return a === b;
        },
        ne : function(a,b) {
            return a !== b;
        },
        subsReady : function() {
            return FlowRouter.subsReady();
        },
        propertyId : function() {
            return propertyId = FlowRouter.getParam("propertyId") ||
                (Session.get("job:property")||{}).propertyId || "";
        },
        hasDraft : function() {
            var propertyId = FlowRouter.getParam("propertyId") ||
                (Session.get("job:property")||{}).propertyId;

            if ( propertyId ) {
                return !!Jobs.Drafts.find({propertyId:propertyId}).fetch().length;
            }

            return false;
        }
        //return FlowRouter.current().route.name === 'job.confirm';
    });

    // JobLayoutUsers Events
    Template.JobLayoutUsers.events({
        'click [fxn="cancel"]' : function(e,t) {
            var conf = confirm("Sure you want to cancel?");
            if ( conf ) {
                FlowRouter.go("home");
            }
        },
        'click [fxn="saveForLater"]' : function(e,t) {
            var jprop = (AutoForm.getFormValues("jobPropertyForm")||{}) .insertDoc || Session.get("job:property") || {};
            var jstor = (AutoForm.getFormValues("jobStoryForm")||{})    .insertDoc || Session.get("job:story") || {};
            var jcont = (AutoForm.getFormValues("jobContactForm")||{})  .insertDoc || Session.get("job:contact") || {};
            var jacce = (AutoForm.getFormValues("jobAccessForm")||{})   .insertDoc || Session.get("job:access") || {};
            var saveObj = _.extend(jprop, jstor, jcont, jacce);
            Meteor.call("saveJobDraft", saveObj, function(err, data) { });
        },
        'click [fxn=removeDraft]': function(e,t) {
            var propertyId = e.currentTarget.dataset.propertyId;
            Meteor.call("removeJobDraft", propertyId, function(err, data) {
                if ( err ) {
                    toastr.error("error", err+'');
                    throw err;
                } else {
                    if ( data > 0 ) {
                        //clear cache and reload
                        for ( key in Session.keys ) {
                            Session.setPersistent(key, undefined);
                        }
                        FlowRouter.go("job.property", {propertyId:propertyId});
                    }
                }
            });
        },
        'click ul li' : function(e,t) {
            var routeName = e.currentTarget.dataset.routeName;
            //FlowRouter.go(routeName);
        },
    });

})();



// I COMMENTED OUT THE CODE BELOW THIS LINE BECAUSE IT WASN'T WORKING BUT I DIDN'T WANT TO GET RID OF IT UNTIL I WAS CERTAIN THAT WE DIDN'T NEED IT
// (function() {

// // ===============================================================
// // Template -> JobLayoutUsers


// // JobLayoutUsers Helpers
//   Template.JobLayoutUsers.onCreated(function() {
//   });

//   //validationMap is used to determine if a route is enabled or not based on
//   //whether enough data has been satisfied.
//   //It contains a function for each route name that returns true or false based
//   //on its eligibility.
//   var validationMap = {
//     'default' : function() {
//       return true;
//     },

//     'job.property' : function() {
//       var newJobObj = Session.get("new:job")||{};
//       if ( newJobObj.clean_date &&
//            newJobObj.clean_schedule &&
//            ( newJobObj.clean_schedule === "regular" && newJobObj.clean_frequency ||
//              newJobObj.clean_schedule !== "regular" ) &&
//            newJobObj.clean_type &&
//            newJobObj.clean_services &&
//            //newJobObj.clean_pets &&
//            newJobObj.clean_flooring ) {
//         return true;
//       }
//       return false;
//     },

//     'job.story' :function() {
//       var newJobObj = Session.get("new:job")||{};
//       return newJobObj.attention_details;
//     },

//     'job.contact' :function() {
//       var newJobObj = Session.get("new:job")||{};
//       return !!newJobObj.contact_name &&
//         !!newJobObj.contact_email &&
//         !!newJobObj.contact_phone;
//     },

//     'job.access' : function() {
//       var newJobObj = Session.get("new:job")||{};
//       return newJobObj.access_type === "on_premise" ||
//         ( newJobObj.access_type === "off_premise" &&
//           newJobObj.access_instructions &&
//           newJobObj.access_instructions.length > 10 );
//     },

//     'job.confirm' : function() {
//       return true;
//     }

//   };

//   var link_enabled = function(routeName) {
//     //returns a class string based on whether the link is enabled or not.

//     var g = FlowRouter.getParam(); //reactivity


//     //the link you're trying to go to is only valid
//     //if the previous page validates.

//     //so we need to find the previous page in the validationMap to see if
//     //this routeName is enabled.

//     var keys = _.keys(validationMap);
//     var index = keys.indexOf(routeName);
//     index--;

//     var lastRoute = keys[index];

//     var isEnabled = validationMap[lastRoute]||function(){};
//     if ( isEnabled() ) {
//       return 'enabled';
//     } else {
//       return 'disabled';
//     }
//   };

//   Template.JobLayoutUsers.helpers({
//     can_proceed : function(routeName) {
//       routeName = routeName || FlowRouter.current().route.name;
//       var g = FlowRouter.getParam();  //trigger reactivity on page load
//       return (validationMap[routeName]||function(){})();
//     },

//     link_enabled : link_enabled,

//     link_current : function(routeName) {
//       var g = FlowRouter.getParam(); //reactivity
//       var currentRoute = FlowRouter.current().route.name;
//       if ( currentRoute === routeName ) {
//         return 'current';
//       } else {
//         return '';
//       }
//     },

//     eq : function(a,b) {
//       return a === b;
//     },

//     'route_name' : function() {
//       var g = FlowRouter.getParam();  //we just need this to
//                                       //trigger a reactive refresh
//       return FlowRouter.current().route.name;
//     },

//     'back_enabled' : function() {
//       return FlowRouter.current().route.name !== 'job.property';
//     },

//     'next_enabled' : function() {
//       return FlowRouter.current().route.name !== 'job.confirm';
//     },

//     'last_page' : function() {
//       return FlowRouter.current().route.name === 'job.confirm';
//     }
//   });

// // JobLayoutUsers Events
//   Template.JobLayoutUsers.events({
//     'click #cancel' : function(e,t) {
//       var conf = confirm("Sure you want to cancel?");
//       if ( conf ) {
//         Session.setPersistent("new:job", {});
//         FlowRouter.go("/");
//       }
//     },

//     'click #next' : function(e,t) {
//       var rname = FlowRouter.current().route.name;
//       var pagemap = {
//         'job.property' : 'job.story',
//         'job.story' : 'job.contact',
//         'job.contact' : 'job.access',
//         'job.access' : 'job.confirm'
//       };
//       FlowRouter.go(pagemap[rname]);
//     },

//     'click #back' : function(e,t) {
//       var rname = FlowRouter.current().route.name;
//       var pagemap = {
//         'job.confirm' : 'job.access',
//         'job.access' : 'job.contact',
//         'job.contact' : 'job.story',
//         'job.story' : 'job.property'
//       };
//       FlowRouter.go(pagemap[rname]);
//     },

//     'click #confirm' : function(e,t) {
//       alert("work in progress");
//     },


//     'click ul li' : function(e,t) {
//       var routeName = e.currentTarget.dataset.routeName;
//       if ( link_enabled(routeName) === "enabled" ) {
//         FlowRouter.go(routeName);
//       }
//     }

//   });

// })();
