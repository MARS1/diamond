//============================================================================
//      PROPERTY-ADDITIONAL SERVICES INPUT TYPE
//============================================================================
//To use:
//{{> afFieldInput type="property-add-services"}}
//     -- OR --
//autoform : { afFieldInput : { type : "property-add-services" } } */

// (function() {
//     AutoForm.addInputType("property-add-services", {
//         template : "propertyAddServices",
//         valueOut : function() {
//             return this.val();
//         },
//         valueIn : function(val) {
//             return val;
//         },
//         contextAdjust : function(ctxObj) {
//             ctxObj.reactiveValue = new ReactiveVar();
//             var rDep = new Tracker.Dependency();
//             Object.defineProperty(ctxObj, "reactiveValue", {
//                 get : function() {
//                     rDep.depend();
//                     return this.value;
//                 },
//                 set : function(val) {
//                     this.value = val;
//                     rDep.changed();
//                     return val;
//                 }
//             });
//             return ctxObj;
//         }
//     });
// })();
