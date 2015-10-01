//  1 - Create Collection

BillingAddresses = new Mongo.Collection('billingAddresses');

// 2 - Create Schema
var Schema = {};

Schema.BillingAddress = new SimpleSchema({
	street: {
		type: String,
		label: 'Street Address',
		max: 200
	},
	city: {
		type: String,
		label: 'City',
		max: 100
	},
	state: {
		type: String,
		label: 'State',
		max: 100
	},
	zip: {
		type: String,
		label: 'Zip',
		max: 5
	}
});

// 3 Associate Schema to Collection

BillingAddresses.attachSchema(Schema.BillingAddress);