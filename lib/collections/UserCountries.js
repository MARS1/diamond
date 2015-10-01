//  1 - Create Collection

UserCountries = new Mongo.Collection('userCountries');

// 2 - Create Schema
var Schema = {};

Schema.UserCountry = new SimpleSchema({
	name: {
		type: String
	},
	code: {
		type: String,
		regEx: /^[A-Z]{2}$/
	}
});

// 3 Associate Schema to Collection

UserCountries.attachSchema(Schema.UserCountry);