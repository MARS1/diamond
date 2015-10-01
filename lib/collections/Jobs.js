Jobs = new Mongo.Collection("jobs");
Jobs.allow({
  insert : function() {
    return true;
  },
  update : function() {
    return true;
  },
  remove : function() {
    return true;
  }
});

/* autoform has some strange bugs. I wanted to just pass jobSchema to the
 * SimpleSchema constructor, but it doesn't work.  I even tried cloning the
 * object first.  You apparently HAVE to define the object in the argument. So
 * weird. Must have something to do with garbage collection, as the only
 * difference I can imagine between the two approaches is that when you define
 * an object outside the argument, it maintains a reference. */

/* addendum : I was right, at least on some level. Having a factory produce the
 * jobSchema object worked by creating a new anonymous object. */

createJobSchema = function() {
  return {
    propertyId : {
      type : String,
      min : 5,
      label : "Property",
      index : true,
      unique : true,
      autoform : {
        afFieldInput : {
          type : "property-selector"
        }
      }
    },
    accessType : {
      type : String,
      min : 5,
      label : "Access Type",
      autoform : {
        afFieldInput : {
          type : "select-radio-inline",
          allowedValues : ["on_premise", "off_premise"],
          options : [
            {label: "I'll be there to let them in.", value : "on_premise"},
            {label: "I'll leave the key with instructions.", value : "off_premise"}
          ],
        }
      }
    },
    accessInstructions : {
      type : String,
      min : 10,
      label : "Access Instructions",
      autoform : {
        afFieldInput : {
          rows : 4
        }
      },
      optional : true,
      custom: function() {
        var condition = this.field('accessType').value === 'off_premise';
        if (condition && !this.isSet && (!this.operator || (this.value === null || this.value === ""))) {
          return "required";
        }
      }
    },
    attentionDetails : {
      type : String,
      min : 5,
      label : "Attention Details"
    },

    flooringTypes : {
      type : [String],
      minCount : 1,
      label : "Flooring types",
      allowedValues : ["carpeting", "hardwood", "laminate", "tile", "marble", "other"],
      autoform : {
        afFieldInput : {
          type : "select-checkbox-inline"
        }
      }
    },

    flooringDetails : {
      type : String,
      min : 5,
      label : "Flooring details",
      optional : true,
      autoform : {
        afFieldInput : {
          rows : 4
        }
      },
      custom: function() {
        var condition = (this.field('flooringTypes').value||[]).indexOf('other') !== -1;
        if (condition && !this.isSet && (!this.operator || (this.value === null || this.value === ""))) {
          return "required";
        }
      }
    },
    petTypes : {
      type : [String],
      minCount : 1,
      label : "Pet Types",
      optional: true,
      allowedValues : ["dogs", "cats", "other"],
      autoform : {
        afFieldInput : {
          type : "select-checkbox-inline"
        }
      }
    },
    petDetails : {
      type : String,
      min : 5,
      label : "Pet details",
      optional : true,
      autoform : {
        afFieldInput : {
          rows : 4
        }
      },
      custom: function() {
        var condition = this.field('petTypes').value && 
          (this.field('petTypes').value||[]).length > 0; //if there's a pet
        if (condition && !this.isSet && (!this.operator || (this.value === null || this.value === ""))) {
          return "required";
        }
      }
    },
    cleanDate : {
      type : String,
      min : 5,
      label : "Clean Date",
      autoform : {
        afFieldInput : {
          type : "date"
        }
      }
    },
    cleanSchedule : {
      type : String,
      label : "Clean Schedule",
      allowedValues: ["one_time", "regular"],
      autoform : {
        afFieldInput : {
          type : "select-radio-inline",
          options : [ {label:"One Time (non-recurring)", value: "one_time"},
                      {label:"Regular", value : "regular"}]
        }
      }
    },
    cleanFrequency : {
      type : String,
      label : "Clean Frequency",
      optional : true,
      allowedValues : ["weekly", "biweekly", "monthly", "bimonthly"],
      autoform : {
        afFieldInput : {
          type : "select-radio-inline",
          options : [
            {label:"Weekly", value:"weekly"},
            {label:"Bi-Weekly", value:"biweekly"},
            {label:"Monthly", value:"monthly"},
            {label:"Bi-Monthly", value:"bimonthly"}
          ]
        }
      },
      custom: function() {
        var condition = this.field('cleanSchedule').value === 'regular';
        if ( Meteor.isClient ) {
          window.cs = this.field('cleanSchedule');
        }
        if (condition && !this.isSet && (!this.operator || (this.value === null || this.value === ""))) {
          return "required";
        }
      }
    },

    cleanServices : {
      type : [String],
      minCount : 1,
      label : "Clean Services",
      allowedValues : ["laundry", "fridge", "oven", "cabinets", "windows", "walls"],
      autoform : {
        afFieldInput : {
          //type : "select-checkbox-inline",
          type : "picture-checkbox-inline",
        },
        options : [
          {label: "Laundry", src :"http://jameslaydigital.com/images/logo.png", value: "laundry"},
          {label: "Fridge", src :"http://jameslaydigital.com/images/logo.png", value: "fridge"},
          {label: "Oven", src :"http://jameslaydigital.com/images/logo.png", value: "oven"},
          {label: "Cabinets", src :"http://jameslaydigital.com/images/logo.png", value: "cabinets"},
          {label: "Winddows", src :"http://jameslaydigital.com/images/logo.png", value: "windows"},
          {label: "Walls", src :"http://jameslaydigital.com/images/logo.png", value: "walls"}
        ]
      }
    },

    cleanType : {
      type : String,
      label : "Clean type",
      allowedValues : ["normal", "heavy"],
      autoform : {
        afFieldInput : {
          type : "select-radio-inline",
          options : [
            {label:"Normal", value:"normal"},
            {label:"Heavy", value:"heavy"}
          ]
        }
      }
    },
    contactEmail : {
      type : String,
      min : 5,
      autoform : {
        group: 'Contact Information'
      },
      label : "Contact email"
    },
    contactName : {
      type : String,
      min : 5,
      autoform : {
        group: 'Contact Information'
      },
      label : "Contact name"
    },
    contactPhone : {
      type : String,
      min : 10,
      autoform : {
        group: 'Contact Information'
      },
      label : "Contact phone"
    },
    specialDetails : {
      type : String,
      min : 10,
      optional : true,
      label : "Special details"
    },
    termsAgreed : {
      type : Boolean,
      label : "Terms Agreed"
    }
  };
}

jobSchema = createJobSchema();
Schema.Jobs = new SimpleSchema(createJobSchema());
Jobs.attachSchema(Schema.Jobs);

//this is for step 1.
JobPropertySchema = new SimpleSchema({
  propertyId :    jobSchema.propertyId,
  cleanDate :     jobSchema.cleanDate,
  cleanSchedule : jobSchema.cleanSchedule,
  cleanFrequency :jobSchema.cleanFrequency,
  cleanType :     jobSchema.cleanType,
  cleanServices : jobSchema.cleanServices,
  petTypes :      jobSchema.petTypes,
  petDetails :    jobSchema.petDetails,
  flooringTypes : jobSchema.flooringTypes,
  flooringDetails:jobSchema.flooringDetails
});

//step 2 : story
JobStorySchema = new SimpleSchema({
  specialDetails : jobSchema.specialDetails,
  attentionDetails : jobSchema.attentionDetails
});

JobContactSchema = new SimpleSchema({
  contactName : jobSchema.contactName,
  contactEmail : jobSchema.contactEmail,
  contactPhone : jobSchema.contactPhone
});

JobAccessSchema = new SimpleSchema({
  accessType : jobSchema.accessType,
  accessInstructions : jobSchema.accessInstructions
});

