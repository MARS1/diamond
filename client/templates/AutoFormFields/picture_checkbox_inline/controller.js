//============================================================================
//      PICTURE-CHECKBOX-INLINE
//============================================================================
(function() {
  AutoForm.addInputType("picture-checkbox-inline", {
    template : "pictureCheckboxInline",
    valueOut : function() {
      var returnValues = [];
      _.each(this.find("[kl-selector]"), function(selector) {
        if ( selector.getAttribute("kl-selected") === "true" ) {
          returnValues.push(selector.dataset.value);
        }
      });
      return returnValues;
    },
    valueIn : function(val) {
      return val;
    },
    contextAdjust : function(context) {
      var options = createJobSchema()[context.name]
        .autoform.options || context.selectOptions;

      context.items = options.map(function(opt) {
        return {
          name :  context.name,
          label:  opt.label,
          src : opt.src,
          value:  opt.value,
          _id :   opt.value,
          selected:_.contains(context.value, opt.value),
          atts:   _.omit(context.atts)
        };
      }) || [];
      return context;
    }
  });

  Template.pictureCheckboxInline.helpers({
    log : function(item) { console.log("template log: ", item); },
    isSelected : function(a,b) {
      //returns a stringified boolean
      if ( a instanceof Array && a.indexOf(b) !== -1 ) {
        return "true";
      }
      return "false";
    },
    eq : function(a,b) { return a === b; },
    dsk : function() { return {"data-schema-key":this.atts["data-schema-key"]}; }
  });

  Template.pictureCheckboxInline.events({
    'click [kl-selector]' : function(e,t) {
      var isSelected = e.currentTarget.getAttribute("kl-selected") === "true";
      toggleValue = (!isSelected)+'';
      e.currentTarget.setAttribute("kl-selected", toggleValue);
    }
  });
})();
