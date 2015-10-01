//  1 - Create Collection

UserProfiles = new Mongo.Collection('userProfiles');

// 2 - Create Schema
var Schema = {};

Schema.UserProfile = new SimpleSchema({
	firstName: {
		type: String,
		regEx: /^[a-zA-Z-]{2,25}$/,
		optional: true
	},
	lastName: {
		type: String,
		regEx: /^[a-zA-Z-]{2,25}$/,
		optional: true
	},
	birthday: {
		type: Date,
		optional: true
	},
	organization: {
		type: String,
		regEx: /^[a-z0-9A-Z .]{3,30$/,
		optional: true
	},
	website: {
		type: String,
		regEx: /^[a-z0-9A-Z .]{3,30}$/,
		optional: true
	},
	country: {
		type: Schema.UserCountry,
		optional: false
	}
});

// 3 Associate Schema to Collection

UserProfiles.attachSchema(Schema.UserProfile);