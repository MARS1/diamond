Template.jobConfirm.helpers({
    flooringOptions : function() {
        return [
            {label:"Carpeting", value:"carpeting"},
            {label:"Hardwood", value:"hardwood"},
            {label:"Laminate", value:"laminate"},
            {label:"Tile", value:"tile"},
            {label:"Marble", value:"marble"},
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
    },

    jobConfirmDoc : function() {
        //flatten and merge the session vars
        var jobProperty = Session.get("job:property")||{};
        var jobStory = Session.get("job:story")||{};
        var jobContact = Session.get("job:contact")||{};
        var jobAccess = Session.get("job:access")||{};
        return _.extend(jobProperty, jobStory, jobContact, jobAccess);
    }

});

Template.jobConfirm.events({ });
