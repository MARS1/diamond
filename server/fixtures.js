if (Cards.find().count() === 0) {
	Cards.insert({
		cardType: "Visa",
		nameOnCard: "Marcelo Berta",
		cardNumber: "1234 1234 1233 1233",
		expMo: 12,
		expYr: 2020,
		cvv: 345,
		billingAddress: {
			street: "605 John Marshall Dr. NW",
			city: "Vienna",
			state: "VA",
			zip: "22101"
		},
		css: "visa"
	});
	Cards.insert({
		cardType: "MasterCard",
		nameOnCard: "Guisela Berta",
		cardNumber: "2222 3333 4444 5555",
		expMo: 12,
		expYr: 2019,
		cvv: 225,
		billingAddress: {
			street: "605 John Marshall Dr. NW",
			city: "Vienna",
			state: "VA",
			zip: "22101"
		},
		css: "mastercard"
	});
	Cards.insert({
		cardType: "American Express",
		nameOnCard: "Fabiana Berta",
		cardNumber: "3333 5555 7777 9999",
		expMo: 12,
		expYr: 2021,
		cvv: 777,
		billingAddress: {
			street: "605 John Marshall Dr. NW",
			city: "Vienna",
			state: "VA",
			zip: "22101"
		},
		css: "visa"
	});
}

// Randome date with title, body, createdAt
// function randomDate(start, end) {
//     return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
// }

// Meteor.startup(function () {
//   if (Posts.find().count() === 0) {
//     _(5).times(function (n) {
//       Posts.insert({
//         title: 'Title ' + n,
//         body: 'Content body ' + n,
//         createdAt: randomDate(new Date(2015, 0, 1), new Date())
//       });
//     });
//   }
// });