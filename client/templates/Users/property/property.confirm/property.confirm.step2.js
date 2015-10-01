// STEP 2

Template.PropertyCreate2.onCreated(function() {
	GoogleMaps.ready('MapTwo', function(map) {
		console.log("I'm ready! Map Step 2");
		// Add a marker
		var marker = new google.maps.Marker({
			position: map.options.center,
			map: map.instance
		});
	});
});

Template.PropertyCreate2.helpers({
	mapOptions: function() {

		var newProp = Session.get("newProperty");

		if(newProp) {
			//Only proceed if we have an active property.
      //Session->newProperty gets reset to undefined when you
      //  A) Start a new property or
      //  B) Finish the property adding process.

			var lat = Session.get("newProperty").lat;
			var lon = Session.get("newProperty").lon;

      // Make sure the maps API has loaded
      if(GoogleMaps.loaded()) {
      	// Map initialization options
      	return {
      		center: new google.maps.LatLng(lat, lon),
      		zoom: 18
      	};
      }
    }
	},
	address: function() {
		return (Session.get("newProperty")||{address:''}).address;
	}
});

