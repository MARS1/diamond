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
