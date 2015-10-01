// STEP 3

/* Instead of using the session to hold the form data, I'm attaching variables
 * to the template instance.  This is preferable because the memory will be
 * reclaimed when the template instance is collected. For more information
 * about reactive var, see http://docs.meteor.com/#/full/reactivevar_pkg. */

Template.PropertyCreate3.onCreated(function() {
	// the template instance holds all our form data
	this.formData = {
		coverPhoto: new ReactiveVar(),
		typeOfProp: new ReactiveVar(),
		noBedrooms: new ReactiveVar(),
		noBathrooms: new ReactiveVar(),
		sqFeet: new ReactiveVar(),
		levels: new ReactiveVar()
	};
	this.errorMessage = new ReactiveVar();
	this.errorMessage.set("");
});

Template.PropertyCreate3.helpers({
	// Gives the templates the live form data

	address : function() {
    return (Session.get("newProperty")||{address:""})
      .address
      .split(",")
      .slice(0, -1)
      .join(",");
  },
	typeOfProp: function() {
		return Template.instance().formData.typeOfProp.get();
	},
	noBedrooms: function() {
		return Template.instance().formData.noBedrooms.get();
	},
	noBathrooms: function() {
		return Template.instance().formData.noBathrooms.get();
	},
	sqFeet: function() {
		return Template.instance().formData.sqFeet.get();
	},
	levels: function() {
		return Template.instance().formData.levels.get();
	},
	errorMessage: function() {
		return Template.instance().errorMessage.get();
	}
 });

Template.PropertyCreate3.events({
	//typeOfProp
  'click input[type=radio]' : function(e, t) {
    var val = t.find("input[name='propertyType']:checked").value;
    t.formData.typeOfProp.set(val);
  },

  //noBedrooms
  'click #noBedrooms button' : function(e, t) {
    var interval = 1;
    var value = e.currentTarget.innerHTML;
    var previousValue = t.formData.noBedrooms.get()|0;
    if ( value === "+" ) {
      t.formData.noBedrooms.set((previousValue+interval)|0);
    } else {
      if ( previousValue - interval > 0 ) {
        t.formData.noBedrooms.set((previousValue-interval)|0);
      }
    }
  },

  //noBathrooms
  'click #noBathrooms button' : function(e, t) {
    var interval = 1;
    var value = e.currentTarget.innerHTML;
    var previousValue = t.formData.noBathrooms.get()|0;
    if ( value === "+" ) {
      t.formData.noBathrooms.set((previousValue+interval)|0);
    } else {
      if ( previousValue - interval > 0 ) {
        t.formData.noBathrooms.set((previousValue-interval)|0);
      }
    }
  },

  //sqFeet
  'click #sqFeet button' : function(e, t) {
    var interval = 100;
    var value = e.currentTarget.innerHTML;
    var previousValue = t.formData.sqFeet.get()|0;
    if ( value === "+" ) {
      t.formData.sqFeet.set((previousValue+interval)|0);
    } else {
      if ( previousValue - interval > 0 ) {
        t.formData.sqFeet.set((previousValue-interval)|0);
      }
    }
  },

  //levels
  'click #levels button' : function(e, t) {
    var interval = 1;
    var value = e.currentTarget.innerHTML;
    var previousValue = t.formData.levels.get()|0;
    if ( value === "+" ) {
      t.formData.levels.set((previousValue+interval)|0);
    } else {
      if ( previousValue - interval > 0 ) {
        t.formData.levels.set((previousValue-interval)|0);
      }
    }
  },

  //submit
  'click .submit' : function(e, t) {
    //create the property
    Properties.insert({
      address:      Session.get("newProperty").address,
      coverPhoto:   t.formData.coverPhoto.get(),
      typeOfProp:   t.formData.typeOfProp.get(),
      noBedrooms:   t.formData.noBedrooms.get(),
      noBathrooms:  t.formData.noBathrooms.get(),
      sqFeet:       t.formData.sqFeet.get(),
      levels:       t.formData.levels.get()
    },
    function(err, data) {
      if ( err ) {
        console.log(err);
        window.err = err;
        t.errorMessage.set(err.message);
      } else {
        console.log(data);
        FlowRouter.go('home');
      }
    });
  }

});