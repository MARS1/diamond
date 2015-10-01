//propertyAddress: user initially enters address.

Template.propertyAddress.onCreated(function() {
  //Since we're starting a new property, we want to start fresh:
  Session.set("newProperty", undefined);
});

Template.propertyAddress.events({
  'click #confirm' : submit,
  'keypress input' : function(e,t) {
    if ( e.which === 13 ) {
      submit.apply(this, arguments);
    }
  }
});

function submit(e, t) {
  var address = t.find("#address").value;
  var geocoder = new google.maps.Geocoder();
  geocoder.geocode( { 'address': address}, function(results, status) {
    if (status == google.maps.GeocoderStatus.OK) {

      var address = results[0].formatted_address;
      var loc = results[0].geometry.location;
      Session.set("newProperty", {
        address : address,
        lat : loc.A,
        lon : loc.F
      });

      FlowRouter.go("property.confirm");

    } else {
      alert("Geocode was not successful for the following reason: " + status);
    }

  });
}
