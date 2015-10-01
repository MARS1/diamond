(function() {

    Template.jobProperty.onCreated(function() {
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

    Template.jobProperty.helpers({
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
        }
    });
})();
