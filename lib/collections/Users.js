//  1 - Create Collection

// Don't create a collection for Users as Meteor/Mongo does that automatically with the accounts-ui package
// Users = new Mongo.Collection("users");

// 2 - Create Schema
var Schema = {};

Schema.User = new SimpleSchema({
	username: {
		type: String,
		regEx: /^[a-z0-9A-Z_]{3,15}$/
	},
	emails: {
		type: [Object],
		optional: true
	},
	"emails.$.address": {
		type: String
		// regEx: SimpleSchema.RegEx.Email
	},
	"emails.$.verified": {
		type: Boolean
	},
	createdAt: {
		type: Date
	},
	profile: {
		type: Schema.UserProfile,
		optional: true
	}
});

// 3 Associate Schema to Collection

Meteor.users.attachSchema(Schema.User);
// Ex: Collection_Name.attachSchema(Schema.SchemaName);
// Properties.attachSchema(Schema.Property);



