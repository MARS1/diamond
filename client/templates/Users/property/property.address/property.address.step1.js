Meteor.startup(function() {
	GoogleMaps.load({
		v: '3',
		// key: 'AIzaSyBf0l5NEIKzp2SuD0-YTkIBlUeIiFECIVk',
		key: 'AIzaSyDDX3p2XGhgtp0t0dNOes1dv7SxY6kFcn0',
		libraries: 'geometry,places'
	});
});

// STEP 1

Template.PropertyCreate1.onCreated(function() {
	GoogleMaps.ready('Map', function(map) {
		console.log("I'm ready! Map Step 1");
	});
  //Since we're starting a new property, we want to start fresh:
  Session.set("newProperty", undefined);
});

Template.PropertyCreate1.helpers({
	mapOptions: function() {
		if(GoogleMaps.loaded()) {
			return {
				center: new google.maps.LatLng(39.099727, -94.578567),
				zoom: 4
			};
		}
	}
});


Template.PropertyCreate1.events({
	'submit form': function(e,t) {
		e.preventDefault();

		var address = t.find('[name=propertyAddress]').value;
		var geocoder = new google.maps.Geocoder();

		geocoder.geocode( { 'address': address}, function(results, status) {
			if (status == google.maps.GeocoderStatus.OK) {

				var address = results[0].formatted_address;
				var loc = results[0].geometry.location;
				Session.set('newProperty', {
					address : address,
					lat : loc.A,
					lon : loc.F
				});

				FlowRouter.go('propStep2');

			} else {
				alert("Geocode was not successful for the following reason: " + status);
			}

		});
	}

});