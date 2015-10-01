Template.ListCards.events({
	'click a': function(e) {
		e.preventDefault();
	}
});

Template.ListCards.helpers({
	getCards: function() {
		return Cards.find();
	}
});

Template.ListCards.created = function() {
	var template = this;
	template.autorun(function() {
		console.log('Are cards ready?', FlowRouter.subsReady('cards'));
		console.log('Are all subscriptions ready?', FlowRouter.subsReady());
	});
};

// Template.CreditCardContent.helpers({
// 	getCard: function() {
// 		// var billingInfo = FlowRouter.getParam('billing_information');
// 		return Cards.findOne();
// 	},
// 	cardName: function() {
// 		return Cards.find('cardType');
// 	}
// });
