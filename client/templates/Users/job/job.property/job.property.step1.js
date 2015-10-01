(function() {

  // Job Property
  Template.JobProperty.onCreated(function() {
    var draftMessage = 0;
    this.autorun(function() {
      draftMessage++;
      var propertyId = FlowRouter.getParam("propertyId");
      console.log("property: ", propertyId);
      if ( propertyId ) {
        //if we're given a property id from the url we've already
        //selected the property before we arrived here.
        //Check first to see if there's a cached draft in Session:
        var cache = Session.get("job:property")||{};
        if ( cache.propertyId && cache.propertyId === propertyId && _.keys(cache).length > 1 ) {
          //There's a session variable set with our property's ID and
          //has at least one other property --
          //We're golden, do nothing...
          console.log("Found matching session. Loading complete.");
        } else {
          //couldn't find cache or cache is for different property
          //load from mongo and cache in Session:
          console.log("No matching session cache. Loading from server.");
          var job = Jobs.Drafts.findOne({propertyId:propertyId});
          console.log("Server returned ", job);
          if ( job ) {
            //This property has a job draft.
            console.log("This property has a job draft.");
            Session.setPersistent("job:property", job||{});
            if ( draftMessage === 1 ) {
              toastr.info("You are editing a draft. Click \"remove draft\" to start over.");
            }
          } else {
            console.log("This property doesn't have a job draft.");
            //This property doesn't have a job draft.
            //Set the property:
            Session.setPersistent("job:property", {propertyId:propertyId});
          }
        }
      } else {
        //This property doesn't have a draft, so we're just going to rely on the Session.
        console.log("creating new job for unknown property. relying on Session.");
      }
    });
  });

  Template.JobProperty.helpers({
    currentValue : function(fieldName) {
      return AutoForm.getFieldValue(fieldName, ["jobPropertyForm"]) || "not selected";
    },

    jobPropertySchema : function() {
      return JobPropertySchema;
    },

    jobPropertyData : function() {
      return Session.get("job:property")||{};
    },

    routeHasProp : function() {
      return !!FlowRouter.getParam('propertyId');
    },


    /* because of a bug in autoform, I wasn't able to define the options in the
    * schema for checkboxes like I was able to do with radios. For some reason,
    * having them in the template controller seems to work. Will probably file
    * an issue on github with aldeed. In the meantime, this is what we've got. */

    flooringOptions : function() {
      return [
        {label:"Carpeting", value:"carpeting"},
        {label:"Hardwood", value:"hardwood"},
        {label:"Laminate", value:"laminate"},
        {label:"Marble", value:"marble"},
        {label:"Tile", value:"tile"},
        {label:"Other", value:"other"}
      ];
    },

    petOptions : function() {
      return [
        {label: "Dogs", value: "dogs"},
        {label: "Cats", value: "cats"},
        {label: "Other", value: "other"}
      ];
    },

    cleanServiceOptions : function() {
      return [
        {label : "Laundry", value : "laundry" },
        {label : "Fridge",  value : "fridge" },
        {label : "Oven",    value : "oven" },
        {label : "Cabinets",value : "cabinets" },
        {label : "Windows", value : "window" },
        {label : "Walls",   value : "walls" }
      ];
    }
  });
})();

//Template.JobProperty.helpers({
//  eq : function(a, b) {
//    return a === b;
//  },
//
//  contains : function(a, b) {
//    return _.contains(a, b);
//  },
//
//  no_country : function(input) {
//    input = (input || '').split(", ");
//    input.pop();
//    return input.join(", ");
//  },
//
//  properties : function() {
//    return Properties.find();
//  },
//
//  regular_clean_schedule : function() {
//    return (Session.get("new:job")||{})
//      .clean_schedule === "regular";
//  },
//
//  irregular_clean_schedule : function() {
//    return (Session.get("new:job")||{})
//      .clean_schedule === "one_time";
//  },
//
//  has_other_flooring : function() {
//    return (((Session.get("new:job")||{})
//      .clean_flooring||{})
//      .flooring_types||[])
//      .indexOf("other") !== -1;
//  },
//
//  new_job : function() {
//    return Session.get("new:job")||{};
//  },
//
//  can_proceed : function() {
//    var newJobObj = Session.get("new:job")||{};
//    if ( newJobObj.clean_date &&
//         newJobObj.clean_schedule &&
//         ( newJobObj.clean_schedule === "regular" && newJobObj.clean_frequency ||
//           newJobObj.clean_schedule !== "regular" ) &&
//         newJobObj.clean_type &&
//         newJobObj.clean_services &&
//         newJobObj.clean_pets &&
//         newJobObj.clean_flooring ) {
//      return true;
//    }
//    return false;
//  },
//
//});

Template.JobProperty.events({
  'change #clean_date input' : function(e,t) {
    var newJobObj = Session.get("new:job")||{};
    newJobObj.clean_date = e.currentTarget.value;
    Session.setPersistent("new:job", newJobObj);
  },

  'click #clean_schedule input' : function(e,t) {
    var radio = t.find("#clean_schedule input:checked");
    var newJobObj = Session.get("new:job")||{};
    newJobObj.clean_schedule = radio.value;
    Session.setPersistent("new:job", newJobObj);
  },

  'click #clean_frequency input' : function(e,t) {
    var radio = t.find("#clean_frequency input:checked");
    var newJobObj = Session.get("new:job")||{};
    newJobObj.clean_frequency = radio.value;
    Session.setPersistent("new:job", newJobObj);
  },

  'click #clean_type input' : function(e,t) {
    var radio = t.find("#clean_type input:checked");
    var newJobObj = Session.get("new:job")||{};
    newJobObj.clean_type = radio.value;
    Session.setPersistent("new:job", newJobObj);
  },

  'click #clean_services input' : function(e,t) {
    var servicesInputs = t.findAll("#clean_services input:checked");
    var servicesArray = _.pluck(servicesInputs, 'value');

    var newJobObj = Session.get("new:job")||{};
    newJobObj.clean_services = servicesArray;
    Session.setPersistent("new:job", newJobObj);
  },

  /*scope.clean_pets {
   *  pet_types : <String>Array,
   *  pet_details : String
   *} */
  'click #clean_pets input' : function(e,t) {
    var petsInputs = t.findAll("#clean_pets input:checked");
    var petsArray = _.pluck(petsInputs, 'value');

    var newJobObj = Session.get("new:job");
    newJobObj.clean_pets = newJobObj.clean_pets||{};
    newJobObj.clean_pets.pet_types = petsArray;
    Session.setPersistent("new:job", newJobObj);
  },

  'change #clean_pets textarea' : function(e,t) {
    var text = e.currentTarget.value;

    var newJobObj = Session.get("new:job");
    newJobObj.clean_pets = newJobObj.clean_pets||{};
    newJobObj.clean_pets.pet_details = text;
    Session.setPersistent("new:job", newJobObj);
  },

  /*clean_flooring {
   *  flooring_types : <String>Array,
   *  flooring_details : String
   *} */
  'click #clean_flooring input' : function(e,t) {
    var flooringInputs = t.findAll("#clean_flooring input:checked");
    var flooringArray = _.pluck(flooringInputs, 'value');

    var newJobObj = Session.get("new:job")||{};
    newJobObj.clean_flooring = newJobObj.clean_flooring||{};
    newJobObj.clean_flooring.flooring_types = flooringArray;
    Session.setPersistent("new:job", newJobObj);
  },

  'change #clean_flooring textarea' : function(e,t) {
    var text = e.currentTarget.value;

    var newJobObj = Session.get("new:job")||{};
    newJobObj.clean_flooring = newJobObj.clean_flooring||{};
    newJobObj.clean_flooring.flooring_details = text;
    Session.setPersistent("new:job", newJobObj);
  }

});


//============================================================================
//      PROPERTY-SELECTOR INPUT TYPE
//============================================================================
//To use:
//{{> afFieldInput type="property-selector"}}
//     -- OR --
//autoform : { afFieldInput : { type : "property-selector" } } */

(function() {
    AutoForm.addInputType("property-selector", {
      template : "propertySelector",
      valueOut : function() {
        return this.val();
      },
      valueIn : function(val) {
        return val;
      },
      contextAdjust : function(ctxObj) {
        ctxObj.reactiveValue = new ReactiveVar();
        var rDep = new Tracker.Dependency();
        Object.defineProperty(ctxObj, "reactiveValue", {
          get : function() {
            rDep.depend();
            return this.value;
          },
          set : function(val) {
            this.value = val;
            rDep.changed();
            return val;
          }
        });
        return ctxObj;
      }
    });

    Template.propertySelector.onCreated(function() {
      this.autorun(function() {
        Meteor.subscribe("properties");
      });
    });

    Template.propertySelector.onRendered(function() { });
    Template.propertySelector.helpers({
      log : function(item) {
        console.log("template log: ", item);
      },
      properties : function() {
        return Properties.find();
      },
      currVal : function() {
        return Template.instance().data.reactiveValue || this.value;
      },
      eq : function(a,b) {
        if ( a === b ) return true;
        return false;
      }
    });

    Template.propertySelector.events({
      'click [kl-property]' : function(e,t) {
        var id = e.currentTarget.dataset.id;
        t.data.reactiveValue = id;
        console.log("event->reactiveValue: ", t.data.reactiveValue);
        setTimeout(function() {
          //trigger change so the framework knows to disable the validation errors
          //when you enter a new value. Also, needs to be async so DOM changes get
          //a chance to refresh.
          $(t.find("input")).trigger("change");
        }, 0);
      }
    });
})();
