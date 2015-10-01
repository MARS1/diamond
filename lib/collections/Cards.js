// step 1 - create Collection (see individual file)

Cards = new Mongo.Collection('cards');

// step 2 - Create Schema, all schemas go in this file!
var Schema = {};

Schema.Card = new SimpleSchema({
	cardType: {
		type: String,
		label: "Credit Card Type",
		max: 100,
		optional: false
	},
	nameOnCard: {
		type: String,
		label: "Name on Card",
		optional: false
	},
	cardNumber: {
		type: String,
		label: "Card Number",
		optional: false
	},
	expMo: {
		type: Number,
		label: "Exp Month",
		optional: false
	},
	expYr: {
		type: Number,
		label: "Exp Year",
		optional: false
	},
	cvv: {
		type: Number,
		label: "CVV",
		optional: false
	},
	billingAddress: {
		type: Schema.BillingAddress,
		optional: false
	}
});

// step3 - Attach Schemas to their rightful Collection
Cards.attachSchema(Schema.Card);