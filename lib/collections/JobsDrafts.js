Jobs.Drafts = new Mongo.Collection("jobs.drafts");

Jobs.Drafts.allow({
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

Schema.JobDraft = new SimpleSchema({
    propertyId : {
        type : String,
        min : 5,
        label : "Property",
        index : true,
        unique : true
    },

    accessType : {
        type : String,
        label : "Access Type",
        optional: true
    },

    accessInstructions : {
        type : String,
        label : "Access Instructions",
        optional : true
    },

    attentionDetails : {
        type : String,
        label : "Attention Details",
        optional : true
    },

    flooringTypes : {
        type : [String],
        label : "Flooring types",
        optional : true
    },

    flooringDetails : {
        type : String,
        label : "Flooring details",
        optional : true
    },

    petTypes : {
        type : [String],
        label : "Pet Types",
        optional: true
    },

    petDetails : {
        type : String,
        label : "Pet details",
        optional : true
    },

    cleanDate : {
        type : String,
        label : "Clean Date",
        optional : true
    },

    cleanSchedule : {
        type : String,
        label : "Clean Schedule",
        optional : true
    },

    cleanFrequency : {
        type : String,
        label : "Clean Frequency",
        optional : true
    },

    cleanServices : {
        type : [String],
        label : "Clean Services",
        optional : true
    },

    cleanType : {
        type : String,
        label : "Clean type",
        optional : true
    },

    contactEmail : {
        type : String,
        label : "Contact email",
        optional : true
    },

    contactName : {
        type : String,
        label : "Contact name",
        optional : true
    },

    contactPhone : {
        type : String,
        label : "Contact phone",
        optional : true
    },

    specialDetails : {
        type : String,
        label : "Special details",
        optional : true
    },

    termsAgreed : {
        type : Boolean,
        label : "Terms Agreed",
        optional : true
    }
});

Jobs.Drafts.attachSchema(Schema.JobDraft);
